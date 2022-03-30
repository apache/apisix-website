---
title: Experience sharing from Apache APISIX committer - Interview with Summer of Programming
slug: 2021/06/03/experience-share-from-apache-apisix-committer
author: "赵若妃"
authorURL: "https://github.com/Serendipity96"
authorImageURL: "https://avatars.githubusercontent.com/u/23514812?v=4"
keywords:
- APISIX
- Open Source
description: In this interview, we invited Apache APISIX committer to share his experience of participating in open source projects.
tags: [Interview]
---

> This interview features two students who participated in last year's programming summer, both of whom are now Apache APISIX committers and mentors for this year's community project

<!--truncate-->

## Guest speaker: Shuyang Wu

![yiyiyimu](https://static.apiseven.com/202108/1630546588578-2d8386cd-06c0-4c71-848a-8ed0e1263a4e.png)

**Q: Shuyang, please briefly introduce yourself.**

**Shuyang**: Hi, I'm Shuyang, graduated from Shanghai Jiaotong University's School of Environment last year, and will be starting a Master's degree in Computer Science at Georgia Tech this August. I am currently working full-time at API7.ai, the commercial company behind APISIX, to maintain the open source community, and I am also a committer for both Apache APISIX and Chaos Mesh projects. Last year, I completed the project "Support etcd v3 protocol" in Apache APISIX, which was the major update of APISIX v2.0, and was honored to be awarded as one of the outstanding students of "Programming Summer 2020". After that, I was honored to be selected as an outstanding student of "Programming Summer 2020", and will continue to participate in "Programming Summer 2021" as a mentor this year.

**Q: Why did you choose to participate in Programming Summer last year?**

**Shuyang**: Last year, I had time to stay home with my parents because of the epidemic, so I thought I would try to find a project where I could intern remotely, and I was lucky enough to find an open source community event (here is an advertisement for our company, we work completely remotely). Compared to GSOC and Community Bridge, Summer of Programming has a very high selection rate because there are many projects and each project is guaranteed to have its own slot. **Last year's numbers were: 397 projects, 219 applications, and 185 wins. If you include the three projects you can sign up for, the winning rate is more than 99%, so I, a person with an all-white Github Contribution Graph, can also be selected.**

**Q: Why did you choose the Apache APISIX project last year?**

**Shuyang**: I took a screenshot of the PPT from last year's conference. For those who have a clear goal of interest, naturally you don't need to think about how to choose a project. But if you're like me last year, you don't really understand what you're doing when you look at a project. At this point, you may choose a project with a high star count, but in fact **star count only indicates the popularity of the project, not the "community activity" indicator of how much help you can get from the community. An active community will benefit you at both stages, providing enough help to get started and enough feedback to maintain the community later.**!

![github introduction](https://static.apiseven.com/202108/1630546653087-23ff48eb-8e13-464c-874e-c4225cc32336.png)

**Shuyang**: **The metrics I chose at the time were issue response (whether you can get a timely response when you get started), good first issue (whether there is a good issue to start with, both to increase your understanding of the project and to brush up on your face), and insights (the overall activity of the community).** This year we also wrote a small tool to check the [contributors](https://github.com/api7/contributor-graph) situation in our company, so you can see more intuitively the growth of the community contributors and how many monthly active contributors, which is also a good choice of metrics.

![join opensource](https://static.apiseven.com/202108/1630546703021-d63457b1-4068-45da-8bde-aa9c708c6793.png)

**Shuyang**: Before I got involved with APISIX last year, I had no knowledge of the technology stack required for the project, including Lua/Openresty/etcd and even API gateways, but I actually got up to speed very quickly. I was able to run a few demos with the help of the documentation, and I was able to get started with Lua in half a day. Here we recommend the APISIX PMC moonming big brother's two Openresty must-haves, the free Openresty e-book and the paid Openresty Geek Time course, from which we gained a lot at that time.

**Shuyang introduced this in great detail. What is your biggest takeaway from being a part of the Apache APISIX project?**

**Shuyang**: The most rewarding part was learning for the first time how a **large project works**. Probably because I changed my major, the projects I did at school or on my own were only toy projects, but participating in the open source community was the first time I learned how to develop and maintain a project for production use. It was a great experience to meet all kinds of gods and open source lovers in the community. Thanks to mentor nic-chen for guiding me through the process.

**Q: How did you become a committer? Can you share some of your experience with us?**

**Shuyang**: The main reason is that I contributed a large feature, and because we are an open source community, sharing and collaborating is a very important part of the community, helping others, replying to issues, reviewing PRs, and participating in discussions about new features on the mailing list are all important parts of being involved in the community.

**Q: What would you like to say to the students who want to participate in Summer of Programming 2021?**

**Shuyang**: I hope you'll sign up, don't have too many worries, talk to the community more, everyone is very friendly, and enjoy the three-month development experience.

## Sharing Guest: Zeping Bai

![Zeping Bai](https://static.apiseven.com/202108/1630546751119-8df77cd8-6be0-4f8e-af13-182e77462d73.png)

**Q: Hi Zeping, please do a brief introduction of yourself.**

**Zeping**: I'm Zeping Bai, I'm currently in my junior year of Business Administration at Tianjin University of Commerce. I've been teaching myself programming since I was in junior high school, and it's become one of my hobbies. I specialize in back-end, web front-end development, and once guest-hosted Android development, mainly using Golang, PHP and Javascript.

**Q: Why did you choose to participate in Summer of Programming last year and choose the Apache APISIX project?**

**Zeping**: When I was using the Apache APISIX gateway control panel, I found some features that were not supported, so I submitted some code to improve the functionality of this piece. I applied for GSoC for other community projects before the Summer of Programming event started last year, but was not selected, and then when I saw the Summer of Programming 2020 event advertised, I signed up for it.

**Q: This year you became an Apache APISIX project mentor, what tips can you give to people about applying for the project?**

**Zeping**: In the project application, mainly describe your idea about the current project proposal or the related technical route, and also briefly describe the process of achieving the project goals (starting from each small module to achieve the project goals step by step) and the approximate time required. The rest of the information needed such as a personal introduction, etc. The above can help us to get a quick idea of your capabilities and project proposal, which will help the project application. You can also contact the project supervisor in advance to get more comprehensive information about the project.

**Q: Zeping, you became a mentor for the community program this year, is there anything you would like to share with us about this change in role?**

**Zeping**: I received a lot of guidance and help when I participated in the programming summer as a student last year, and if you choose to participate in the Apache APISIX community project this year, I will likewise provide you with help to get started with project development faster.

**Q: What would you like to say to all the students who want to participate in Summer of Programming 2021?**

**Zeping**: Programming Summer can sharpen your skills and also help you get started faster in collaborating and participating in open source projects. There are many opportunities to apply for the program while the submissions are not difficult, so I hope you won't hesitate to participate!
