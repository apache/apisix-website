const fs = require("fs");
const axios = require("axios");
const listr = require("listr")

axios.defaults.timeout = 5000;

const axiosConfig = {
  headers: {
    "content-type": "application/json",
    Accept: "application/vnd.github.v3+json"
  },
}

const repoList = require("../website/config/docs").map(v => v.githubRepo)
const res = {}

const tasks = new listr([
  {
    title: "Fetch repos' info and good first issues",
    task: ()=> new listr(repoList.map((repo)=>{
      return {
        title: `Fetch ${repo}`,
        task: ()=>new listr([
          {
            title: `${repo}'s info`,
            task: () => axios.get(`https://api.github.com/repos/${repo}`, axiosConfig)
              .then((v) => v.data)
              .then((v) => {
                res[repo] = Object.assign(res[repo] || {}, {info: {
                    description: v.description,
                    star: v.stargazers_count,
                    watch: v.subscribers_count,
                    fork: v.forks_count
                  }})
              })
          },
          {
            title: `${repo}'s good first issues`,
            task: () => axios.get(`https://api.github.com/repos/${repo}/issues?state=open&labels=good%20first%20issue`, axiosConfig)
              .then((v) => v.data)
              .then((v) => {
                res[repo] = Object.assign(res[repo] || {}, {issues: v.map((issue)=>({
                    comments: issue.comments,
                    number: issue.number,
                    title: issue.title,
                    htmlUrl: issue.html_url
                  }))
                })
              })
          }
        ])
      }
    }))
  },
  {
    title: "Save repos' info and good first issues to json file",
    task: () => {
      fs.writeFileSync('../website/repos-info.json', JSON.stringify(res))
    }
  }
])


tasks.run()
  .then(()=> {
    console.log("[Finish] Generate repos' info and good first issues finished")
  })
  .catch((err)=>{
    console.error(err)
    process.exit(1)
  })
