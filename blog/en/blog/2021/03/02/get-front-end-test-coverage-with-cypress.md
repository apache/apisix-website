---
title: "Get Front-End Test Coverage with Cypress"
author: "Yi Sun"
authorURL: "https://github.com/LiteSun"
authorImageURL: "https://avatars.githubusercontent.com/u/31329157?s=400&u=e81b4bb4db2be162c1fcac6d188f5b0f82f71920&v=4"
keywords:
- APISIX
- Apache APISIX
- API Gateway
- Cypress
description: This article will explain how to use Cypress to get API Gateway Apache APISIX Dashboard front-end E2E coverage and what is code coverage.
tags: [Ecosystem]
---

> In the article ["Stable Product Delivery with Cypress"](/blog/2021/02/08/stable-product-delivery-with-cypress), we discussed why we chose Cypress as our E2E testing framework. After spending nearly two months refining the test cases, we needed test coverage to quantify whether the test coverage was sufficient.This article will describe how to get APISIX Dashboard front-end E2E coverage using Cypress.

<!--truncate-->

> Source:
>
> - https://github.com/apache/apisix
> - https://github.com/apache/apisix-dashboard

## What is code coverage

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

![1.png](https://lh4.googleusercontent.com/o-tyQagmCjprpNkuTjMFLaALZKtW4pyC9nj-GcPx4MM3xK0zrMED9Nndk5ZmZkZsQ5SIJPEovcrHyjWP2YXtEcYYDpLL49aV_97N83doTkOuMXlFsVjGu53A9FdlxOCr6i3aIDTA)

The test coverage information will appear in the console after executing the following command.

```shell
npx nyc report --reporter=text-summary
```

![2.png](https://lh4.googleusercontent.com/n0CON1WF64wEnh3IYEc3wwwOJ2Ft_WmMLfkhOPKIKxoW0NP6Eq8VplJ87EepL5zIWOeyfJhlDmhc3ImE0ivgRlXWe1RuW2x7vL_JEri7Mz6b3tOY0it8bVvUe83CAHNgeoyXZnsy)

Under the coverage directory, a more detailed report page will be available, as shown here.

![3.png](https://lh4.googleusercontent.com/skjR9YUcbmeytfoYnR0it7Vfc7mheCJDt7PSUsp549IbOdfqskTrIOqUXw01e0fnuNwpGoo3GtqAER3eQjNoTIdmU7HY6hc_sZ5NYc3h-MyxqmVz_NaC3AM-J4rWJFy-9IoTWjpn)

- Statements indicates whether each statement was executed

- Branches indicates whether each if block was executed

- Functions indicates whether each function is called

- Lines indicates whether each line was executed

## Summary

The test coverage rate reflects the quality of the project to a certain extent. At present, APISIX Dashboard front-end E2E coverage rate has reached 71.57%. We will continue to work with the community to enhance the test coverage rate and provide more reliable and stable products for users.
