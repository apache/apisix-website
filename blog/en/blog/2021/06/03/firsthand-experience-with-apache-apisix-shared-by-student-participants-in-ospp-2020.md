---
title: First Experience with Apache APISIX Shared by Student in OSPP 2020
slug: /blog/2021/06/03/firsthand-experience-with-apache-apisix-from-ospp-2020-students
author: "Ruofei Zhao"
authorURL: "https://github.com/Serendipity96"
authorImageURL: "https://avatars.githubusercontent.com/u/23514812?v=4"
keywords:
- APISIX
- Apache APISIX
- API Gateway
- Open Source
- OSPP
- Open Source Promotion Plan
- Firsthand Experience

description: In this interview, we invited two Apache APISIX committers to share their experience with Apache APISIX in the Summer 2020 of Open Source Promotion Plan.
tags: [Community]
---

> This interview features two students who participated in the Summer 2020 of Open Source Promotion Plan, both of whom are now Apache APISIX committers and OSPP 2021 mentors for APISIX-related projects.

<!--truncate-->

## Guest speaker: Shuyang Wu

![yiyiyimu](https://static.apiseven.com/202108/1630546588578-2d8386cd-06c0-4c71-848a-8ed0e1263a4e.png)

**Q: Shuyang, please briefly introduce yourself.**

**Shuyang**: Hi, I'm WU Shuyang. I graduated from the School of Environmental Science and Engineering at Shanghai JiaoTong University last year, and I will start a Master's degree in Computer Science at Georgia Tech this August. I am currently working full-time at API7.ai, the commercial company offering paid technical support for APISIX and enterprise products, to maintain the open source community, and I am also a committer for both Apache APISIX and Chaos Mesh projects. Last year, I completed the project "Support etcd v3 protocol" in Apache APISIX, which is the highlight of APISIX v2.0, and was honored to be awarded as one of the outstanding students in the Summer 2020 of Open Source Promotion Plan. This year, I will participate in the Summer 2021 of Open Source Promotion Plan as a mentor.

**Q: Why did you participate in OSPP 2020 last year?**

**Shuyang**: Last year, I stayed home with my parents for a while because of the COVID-19 pandemic. During this period, I tried to find a project for which I could work as an intern remotely. Luckily, I found the open source project Apache APISIX (Join us! We work fully remote!) and the OSPP event. Compared to the GSOC and Community Bridge, the Open Source Promotion Plan has a very high selection rate because there are a great number of projects and each project has its slot. Here are the statistics: **There were a total of 397 projects, 219 applications, and 185 wins in OSPP 2020. If I signed up for three projects, the hit rate was more than 99%. So though I had no record on the Github Contribution Graph, I could still get enrolled in the plan.**

**Q: Why did you choose the Apache APISIX project last year?**

**Shuyang**: I took a screenshot of the PPT from last year's conference. For those who had a clear goal and interest, they didn't need to think much about how to choose a project. But on my part, I had no idea about it. Applicants like me may choose a project with a high star count, but in fact, **the star count only indicates the popularity of the project rather than the pulse of the community which indicates how much help you can get from the community. An active community will benefit you from two aspects, guiding you through the first stage of your journey and offering extensive and constructive feedback while you do the maintaining work for the community.**

![Apache APISIX Stats on Github](https://static.apiseven.com/202108/1649237784272-8fddf8cb-0ba7-4040-86f9-014cb25cdca6.jpg)

**Shuyang**: **The metrics I chose at the time are response duration (whether you can get a timely response when you bring up an issue), number of good first issues (whether there is a good issue to help you get a good start by increasing your understanding of the project and increasing your visibility), and insights (the overall activity of the community).** This year we developed a small tool to track the [contributors](https://github.com/api7/contributor-graph) statistics in our company, so you can get a clear insight into the growth of the contributor base and the number of monthly active contributors, which are also meaningful metrics.

![How to Contribute](https://static.apiseven.com/202108/1649238296632-c5b31d4b-0af4-41eb-a72a-4ee1ab68e0d0.jpg)

**Shuyang**: Before I got involved with APISIX last year, I knew nothing about the technology stacks required for the project, including Lua, OpenResty, etcd, and even API gateways, but I got up to speed very quickly. I was able to run a few demos with the help of the documentation, and I was able to get started with Lua in half a day. Here I'd like to share with you two must-have materials for new OpenResty learners, namely a free e-book and a series of paid courses on the GeekTime App, both created by WEN Ming, the PMC Chair of Apache APISIX. These two materials did help me a lot.

**Q: What is your takeaway from having been engaged in the Apache APISIX community?**

**Shuyang**: The most rewarding part was learning for the first time how **a large project works**. Probably because I changed my major, the projects I did at school or on my own were only toy projects, but participating in the open source community was the first time I learned how to develop and maintain a project for production use. It was also a great experience to meet so many geeks and open-source lovers from different backgrounds in the community. Also many thanks to my mentor nic-chen for guiding me through the journey.

**Q: How did you become a committer? Could you share some tips with us?**

**Shuyang**: The main reason is that I have contributed many features, and in an open-source community, sharing and collaboration are essential to the community. By offering help, replying to issues, reviewing PRs, and participating in discussions about new features on the mailing list, I got along well with others in the community.

**Q: What would you like to say to the students who want to participate in the Summer 2021 of Open Source Promotion Plan?**

**Shuyang**: Sign up for the activity. Don't hesitate and worry too much. Just engage yourself in the community and enjoy the three-month-long coding journey. Have fun！

## Sharing Guest: Zeping Bai

![Zeping Bai](https://static.apiseven.com/202108/1630546751119-8df77cd8-6be0-4f8e-af13-182e77462d73.png)

**Q: Hi Zeping, please make a brief introduction of yourself.**

**Zeping**: I'm BAI Zeping, majoring in Business Management at Tianjin University of Commerce. This is my junior year at college. I've been teaching myself programming since I was in junior high school, and it's become one of my hobbies. I specialize in front-end web development and back-end development. I also tried Android development. The three coding languages I use most are Golang, PHP, and JavaScript.

**Q: Why did you participate in the Summer 2020 of Open Source Promotion Plan and choose the Apache APISIX project?**

**Zeping**: When I was using the control panel of the Apache APISIX gateway, I found that some features were not supported, so I committed some code for the new features. In the Apache APISIX community, there are many tech-savvy contributors, from who I learned a lot, built up my confidence, and gained the motivation to contribute to more open-source projects. Last year, I applied for other community-based projects in GSoC, but I didn't get enrolled. Then I got to know the OSPP 2020, so I signed up for it.

**Q: This year you are a mentor for the Apache APISIX project. What tips do you have for those who want to participate in the project?**

**Zeping**: First, elaborate on the project proposal or technical plans in the project application documents, and then briefly describe the process towards achieving project goals and the approximate time required. Besides, do make a self-introduction. With the above information, we can get a quick idea of your capabilities and project proposal. You can also contact the project supervisor in advance for complete project information.

**Q: Is there anything you would like to share about this role change?**

**Zeping**: Last year, when I participated in the OSPP 2020 as a student, I got a lot of guidance and help from the community. This year, I will be a mentor for APISIX-related projects. If you are interested in contributing to our Apache APISIX community, I will help you prepare for the start of project development.

**Q: What would you like to say to all the students who want to participate in the Summer 2021 of Open Source Promotion Plan?**

**Zeping**: An experience in the Open Source Promotion Plan can sharpen your skills and help you get started faster in collaborating and participating in open-source projects. There are many projects you can apply for and the preparations are not that difficult. So don't hesitate! Just join us!
