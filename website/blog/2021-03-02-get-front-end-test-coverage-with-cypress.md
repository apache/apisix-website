---
title: "Get Front-End Test Coverage with Cypress"
author: Yi Sun
authorURL: "https://github.com/LiteSun"
authorImageURL: "https://static.apiseven.com/202108/1635774907188-09be4395-4a77-4e0a-b05a-351a7e8840cd.jpeg"
---

> [@LiteSun](https://github.com/LiteSun), Apache APISIX Committer from [Shenzhen Zhiliu Technology Co.](https://www.apiseven.com/)
>
> Source:
>
> - https://github.com/apache/apisix
> - https://github.com/apache/apisix-dashboard

## Background

In the article ["Stable Product Delivery with Cypress"](/blog/2021/02/08/stable-product-delivery-with-cypress), we discussed why we chose Cypress as our E2E testing framework. After spending nearly two months refining the test cases, we needed test coverage to quantify whether the test coverage was sufficient.This article will describe how to get APISIX Dashboard front-end E2E coverage using Cypress.

## What is code coverage?

Code coverage is a metric in software testing that describes the proportion and extent to which the source code in a program is tested, and the resulting proportion is called code coverage. Test code coverage reflects the health of the code to a certain extent.

## Installation Dependencies & Configuration

To collect test coverage data, we need to put some probes in the original business code for Cypress to collect the data.

Cypress officially recommends two approaches, the first is to generate a temporary directory via `nyc` and run the code that has been written to the probe to collect test coverage data. The second way is to do the code conversion in real time through the code conversion pipeline, which eliminates the hassle of temporary folders and makes collecting test coverage data relatively refreshing. We choose the second way to collect front-end E2E coverage.

1. Installing Dependencies

```shell
yarn add  babel-plugin-istanbul --dev
```

2. Install the cypress plug-in

```shell
yarn add  @cypress/code-coverage --dev
```

3. Configuring babel

```ts
// web/config/config.ts
extraBabelPlugins: [
    ['babel-plugin-istanbul',  {
      "exclude": ["**/.umi", "**/locales"]
    }],
  ],
```

4. Configuring Cypress code coverage plugin

```javaScript
// web/cypress/plugins/index.js
module.exports = (on, config) => {
  require('@cypress/code-coverage/task')(on, config);
  return config;
};
```

```javaScript
// web/cypress/support/index.js
import '@cypress/code-coverage/support';
```

5. Get Test Coverage

After the configuration is done, we need to run the test case. After the test case is run, Cypress will generate `coverage` and `.nyc_output` folders, which contain the test coverage reports.

![1.png](https://static.apiseven.com/202108/1635775020690-26b10a81-63d5-4a90-870a-b63e46f3af93.png)

The test coverage information will appear in the console after executing the following command.

```shell
npx nyc report --reporter=text-summary
```

![2.png](https://static.apiseven.com/202108/1635775083279-c8eeeac4-a882-4d92-8078-a160ec51740b.png)

Under the coverage directory, a more detailed report page will be available, as shown here.

![3.png](https://static.apiseven.com/202108/1635775133014-489206ff-e425-4975-9e8d-802236784c50.png))

- Statements indicates whether each statement was executed

- Branchs indicates whether each if block was executed

- Functions indicates whether each function is called

- Lines indicates whether each line was executed

## Summary

The test coverage rate reflects the quality of the project to a certain extent. At present, APISIX Dashboard front-end E2E coverage rate has reached 71.57%. We will continue to work with the community to enhance the test coverage rate and provide more reliable and stable products for users.
