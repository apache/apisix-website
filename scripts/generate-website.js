const Listr = require('listr');
const util = require('util');
const fs = require('fs');
const path = require('path');
const { chdir } = require('node:process');
const exec = util.promisify(require('node:child_process').exec);

// Detect CI environment
const isCI = process.env.CI === 'true' || process.env.GITHUB_ACTIONS === 'true';

// Control whether to show logs locally (default: true for convenience)
// Set SHOW_BUILD_LOGS=false to disable local log output
const showLogsLocally = process.env.SHOW_BUILD_LOGS !== 'false';

// Log directory for build outputs
const logDir = '/tmp/apisix-website-build-logs';

// Ensure log directory exists
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

// Helper function to print logs from files
function printLogFiles(logFiles, showAll = false) {
  /* eslint-disable no-console */
  logFiles.forEach((file) => {
    // Only print failed logs, or all logs if showAll is true
    if (showAll || file.failed) {
      console.error(`\n========== ${file.step} ==========`);
      try {
        const content = fs.readFileSync(file.path, 'utf8');
        console.error(content);
      } catch (err) {
        console.error(`Error reading log file: ${err.message}`);
      }
    }
  });
  /* eslint-enable no-console */
}

const tasks = new Listr([
  {
    title: `Change working dir`,
    task: () => chdir('../'),
  },
  {
    title: `Copy docs edit to website`,
    task: () => Promise.allSettled([
      exec('cp ./doc/src/css/edit.scss ./website/src/css'),
      exec('cp ./doc/src/pages/edit.tsx ./website/src/pages'),
    ]),
  },
  {
    title: `Build website's all parts`,
    task: async (ctx) => {
      const buildSteps = [
        { name: 'blog-zh', cmd: 'yarn run build:blog:zh' },
        { name: 'blog-en', cmd: 'yarn run build:blog:en' },
        { name: 'doc', cmd: 'yarn run build:doc' },
        { name: 'website', cmd: 'yarn run build:website' },
      ];

      // Execute all builds in parallel, capturing output
      const results = await Promise.allSettled(
        buildSteps.map((step) => exec(step.cmd)),
      );

      // Check for failures and save logs to files
      const failures = [];
      const logFiles = [];

      results.forEach((result, index) => {
        const step = buildSteps[index];
        const logFilePath = path.join(logDir, `${step.name}.log`);
        let logContent = '';

        if (result.status === 'fulfilled') {
          // Write raw stdout and stderr without extra formatting
          if (result.value.stdout) {
            logContent += result.value.stdout;
          }
          if (result.value.stderr) {
            if (logContent) logContent += '\n';
            logContent += result.value.stderr;
          }
        } else {
          failures.push(step.name);
          // Write raw stdout and stderr for failed builds
          if (result.reason.stdout) {
            logContent += result.reason.stdout;
          }
          if (result.reason.stderr) {
            if (logContent) logContent += '\n';
            logContent += result.reason.stderr;
          }
          // Add error message at the end if available
          if (result.reason.message && !result.reason.stderr?.includes(result.reason.message)) {
            if (logContent) logContent += '\n';
            logContent += `Error: ${result.reason.message}\n`;
          }
        }

        // Write to log file
        fs.writeFileSync(logFilePath, logContent);
        logFiles.push({ path: logFilePath, step: step.name, failed: result.status === 'rejected' });
      });

      // Store in context for later use
      ctx.buildLogFiles = logFiles;
      ctx.buildFailures = failures;

      // If any build failed, throw error
      if (failures.length > 0) {
        throw new Error(`Build failed for: ${failures.join(', ')}`);
      }
    },
  },
  {
    title: `Copy website's all parts to website's root`,
    task: () => Promise.allSettled([
      exec(
        'cp ./.asf.yaml ./.htaccess ./blog/en/build/blog ./blog/en/build/assets ./doc/build/assets ./doc/build/docs ./website/build/ -r',
      ),
      exec(
        'cp ./blog/zh/build/blog ./blog/zh/build/assets ./doc/build/zh/docs ./doc/build/zh/assets ./website/build/zh/ -r',
      ),
    ]),
  },
], {
  renderer: isCI ? 'verbose' : 'default',
});

tasks
  .run()
  .then(() => {
    /* eslint-disable-next-line no-console */
    console.log(`[Finish] Generate website`);

    // In local environment, show log location after successful build
    if (!isCI && showLogsLocally && fs.existsSync(logDir)) {
      /* eslint-disable-next-line no-console */
      console.log(`\nBuild logs: ${logDir}/*.log`);
    }
  })
  .catch((err) => {
    /* eslint-disable-next-line no-console */
    console.error(err);

    // Print information about log files and their content
    if (err.context && err.context.buildLogFiles) {
      /* eslint-disable no-console */
      console.error(`\nBuild logs saved to: ${logDir}`);
      err.context.buildLogFiles.forEach((file) => {
        const status = file.failed ? '❌' : '✓';
        console.error(`  ${status} ${file.step}.log`);
      });
      /* eslint-enable no-console */

      // In local environment, automatically print failed logs
      if (!isCI && showLogsLocally) {
        printLogFiles(err.context.buildLogFiles, false);
      } else if (!isCI) {
        /* eslint-disable-next-line no-console */
        console.error(`\nView logs: cat ${logDir}/*.log`);
      }
    }

    process.exit(1);
  });
