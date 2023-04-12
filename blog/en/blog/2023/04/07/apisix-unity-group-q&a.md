---
title: "Utilize APISIX in E-Commerce: User-friendly, Robust, and Delightful"
authors:
  - name: Qi Zeng
    title: Author
    url: https://github.com/Qizeng-api7
    image_url: https://github.com/Qizeng-api7.png
keywords:
  - APISIX
  - Unity Group
  - AWS
description: Lukasz Biegaj, System Architect of Unity Group, shares the changes that APISIX has brought to their company in the interview.
tags: [Ecosystem]
image: https://static.apiseven.com/uploads/2023/04/12/3nO2O6PU_img_v2_9b8e4b36-7a1b-49ca-817d-baa509f2761g.png

---
> Lukasz Biegaj, System Architect of Unity Group, shares the changes that APISIX has brought to their company in the interview.
"Simple to use, powerful, and enjoyable to use. For projects using the APISIX, the time-to-market is considerably shorter and we - as a team or as a company - are able to deliver solutions more quickly." - This is the evaluation of APISIX by Lukasz Biegaj.
<!--truncate-->

We are honored to have Lukasz Biegaj, the System Architect of Unity Group, as our guest in this interview. Unity Group is one of the leading providers of e-commerce solutions in Poland. They have been facing the challenge of strong separation of roles, which has significantly increased their workload. This interview is presented in a Q&A format. Lukasz Biegaj will provide us with a detailed overview of the challenges that their company faced before adopting APISIX, the reasons behind selecting APISIX after comparing it with other alternatives, how APISIX resolved their pain points, and an overall assessment of their experience using APISIX.

## Background Information

**1. Would you give me a quick overview of Unity Group?**

Unity Group is one of the largest providers of e-commerce solutions in Poland. The company exists for 25 years and has been providing technology for the digital transformation of enterprises. Most of our clients are e-commerce companies. We offer support in business and technology consulting, as well as software development.

**2. Can you describe your role and your team?**

I'm a System Architect working with a team of 11 DevOps engineers. We design, implement and launch large-scale sites mainly related to e-commerce. We often use cloud services and Kubernetes as a platform to launch applications.

**3. What was your team's process before using APISIX?**

A few years ago, we had a process of designing and implementing applications that were strongly separated. The system administrator teams created the infrastructure, installed the components, and set up the deployment mechanisms. And the Development teams used them, focusing basically only on writing code and pressing the 'Deploy' button.

This separation has become very blurred in recent years. Roles such as DevOps have emerged, and even developers themselves often want to be involved in deployment preparation or component selection.

From the technical view, almost all components that we deploy require some form of HTTP communication. A few years ago, we used simple web servers, like the Apache Web Server. As the projects grew, we started using load balancers, like for example Haproxy or NGINX as they supported HTTP/2 before Apache2 and could be used as a reverse proxy.

We also tried some strictly API Gateway solutions, but most were expensive and difficult to deploy and support.

**4. Were there any costs associated with the process before using APISIX?**

I am not privy to the cost aspects and do not want to be. My focus is on technicalities and solutions that are good in a technical way.

What I do know is that we rejected many closed-source solutions because the cost of implementing and maintaining them was high. Even leaving aside the licensing issues, just maintaining the knowledge was expensive.

**5. What were the major pain points of your process before using APISIX?**

Strong separation of roles: one person provisioned and configured the infrastructure, and another person - a developer - used it. Every change required communication and arrangements.

**6. What other challenges were you and your team experiencing before using APISIX?**

Setting up the monitoring properly was time-consuming. I am referring to metrics such as SLOs and monitoring of individual endpoints.

## About the Technical Selection

**1. How did you hear about APISIX?**

We have been investing heavily in Kubernetes, and the APISIX was mentioned as one of the projects implementing the new Gateway API.

**2. How long have you been looking for a solution to previous problems?**

Well, we deploy many projects so I would like to say: constantly. It's an iterative process. We always try to choose the best solutions for us and our customers, and the specific solutions change when a better one appears.

**3. Were you comparing alternative solutions? Why us? Pros and cons? How long have you been using APISIX?**

The fact that APISIX is under the umbrella of the Apache Software Foundation was a very big advantage.

The rest came out of simple testing and proof-of-concept implementation.

We are using and deploying APISIX for about one year.

## About the Implementing Process

**1. Would you share some details about how your team implemented APISIX?**

All of our deployments of APISIX are within a Kubernetes cluster within AWS.

We are installing it from the official helm charts, exposing it through AWS Network Load Balancer. We terminate the SSL at the NLB so we can take advantage of AWS Certificate Manager.

We use the APISIX Ingress Controller to allow the users to configure the routes on their own, along with other manifests describing their Kubernetes application.

We use the built-in Prometheus plugin to consume and process data metrics, to create alerting rules and dashboards visualizing the application state.

**2. Were there any internal risks or additional costs involved with implementing APISIX? If so, how did you address them?**

I don't think we took any risks. Granted, this was a new software, a new solution, but being an open-source one we could comfortably test it in a proof-of-concept scenario.

It took some hours, but - I believe - not as much as would sending team members to workshops to learn an alternative, commercial solution.

**3. How do you and your team currently use APISIX? What types of goals or tasks are you using APISIX to accomplish?**

At the moment it is our go-to API Gateway of choice in Kubernetes environments.

It allows us to easily set up an environment that can be perused by development teams in many projects to quickly prototype, create and deploy production-ready workloads.

**4. What was the most obvious advantage you felt about APISIX?**

Single most obvious advantage: the ease of use.
More advantages: being Kubernetes-native and open-source.

## Achievements after Using APISIX

**1. By using APISIX, can you measure any improvements in productivity or time savings?**

For projects using the APISIX, the time-to-market is considerably shorter and we - as a team or as a company - are able to deliver solutions more quickly.

**2. In the beginning, you had concerns about the maturity of APISIX; how do you feel about them now?**

We're very used to using open-source projects, and it is of great concern for us for the projects to be actively maintained. We've run into some issues with the helm charts at the beginning, but they either were fixed quickly (a bug report for one was already being fixed and merged) or our patches were quickly accepted into the main branch. In summary, we feel that the project is active, that it cares about its users and we currently have no concerns about its development.

## Future Goals

**1. What are the biggest challenges on the horizon for your industry?**

From my perspective, the key challenges are:

First challenge: M A C H. Where M stands for Microservices, A for API First, C for Cloud Native, and H for Headless. It's a great trend, but it's also a great challenge. How to enable teams to focus on individual areas and how shift the performance where it's needed? How to make the connection to the infrastructure? APISIX is one of the tools that enable us to deliver such solutions.

Second challenge: Artificial Intelligence and Machine Learning in general. Everyone can see the new LLM slash GPT craze. It is a disruptive technology. I can foresee more and more adoption of it in many projects.

**2. What’s your plan for the next half year?**

Create and deploy great projects. Provide more globally-used services. It's great to see your software used worldwide.

**3. Is there anything we can do to improve APISIX or process for working together in the future?**

I don't like to nitpick, but if you're really interested, I have mixed feelings regarding the bitnami's etcd dependency. I'd like it replaced to not rely on a component delivered by a 3rd party.

**4. How would you describe APISIX if you explained it to a friend?**

I'd say it's a Kubernetes-native, powerful, and simple-to-use API Gateway.

**5. Could you please use one sentence to summarize your feeling about APISIX?**

Simple to use, powerful, and enjoyable to use.

## Summary

"Simple to use, powerful, and enjoyable to use." - This is the evaluation of APISIX by Lukasz Biegaj, a System Architect of Unity Group.

With its superior performance and Kubernetes-native and open-source features, APISIX has become the ultimate choice for Unity Group. APISIX allows Unity Group to easily set up an environment that can be accessed by development teams in multiple projects to quickly prototype, create, and deploy production-ready workloads, addressing the problem of strong separation of roles and reducing time costs.

If you are facing the same problem as Unity Group, please feel free to contact us. By choosing APISIX, you will solve your problems effortlessly!
