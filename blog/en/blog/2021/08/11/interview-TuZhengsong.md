---
title: My first PR in the Apache APISIX community
slug: 2021/08/11/interview-tuzhengsong
author: Apache APISIX
authorURL: "https://github.com/Yangxiamao"
authorImageURL: "https://avatars.githubusercontent.com/u/47442074?v=4"
keywords:
- API Gateway
- APISIX
- Apache APISIX
- Community
- Open Source
description: This article introduces Apache APISIX Zhengsong Tu's growth experience as a committer, and why he should participate in the Apache APISIX community and his contributions to the community.
tags: [Community]
---

> This interview is about Zhengsong Tu's journey from an open source community nerd to an APISIX committer for Apache's top open source project. Zhengsong Tu (GitHub ID: tzssangglass) was elected as an Apache APISIX committer on July 22, 2021 for his deep involvement in Apache APISIX development and his many contributions to the community.

<!--truncate-->

> When I saw that issue, I had a strong urge to get involved in the community. After reading the community's newbie guide, I was like a brave man coming out of the newbie village, ready to fight.
>
> -- Zhengsong Tu, Apache APISIX committer

In 282 days, Zhengsong Tu (GitHub ID: tzssangglass) has grown from an open source community nerd to an Apache APISIX committer.

![Apache APISIX committer tzssangglass github](https://static.apiseven.com/202108/1639549454040-de5d7598-83b7-483f-a5da-55fedeb5fa90.png)

Zhengsong Tu was elected as Apache APISIX committer on July 22, 2021 for his deep involvement in Apache APISIX development and many contributions in the community.

On an uneventful afternoon, we chatted with Zhengsong by phone. Because of the epidemic, he has not been out for many days in Nanjing. Before I talked to him, I didn't expect that the bearded man had traveled such a winding road.

## University, my university

> When I was in college, I studied communication engineering, and the happiest thing I did every day was to play soccer. Now sometimes I think that it would be nice to go back to my college days with the memories I have now.

Zhengsong actually didn't have much contact with programming during his college years, he actually had a C programming class, but he failed it because he was too busy playing soccer. However, he failed a make-up exam after failing the class, resulting in a retake. The most embarrassing thing is that he failed the retake as well, so what did he do afterwards? There was a graduation clearing exam before graduation. This can not be failed again, so Zhengsong went to the library to borrow a C language book to read.

"I was thinking, "Is C really that hard?" Zhengsong said.

Then he kept reading and reading and reading, and suddenly he realized that programming seemed to have some meaning, and he understood it! He finally passed the exam before graduating. After graduation, he found a job as a programmer.

"I was ready to graduate and go home and find a factory to work." , he said half-jokingly.

At that time, he probably wouldn't have thought that today he would be the developer of several well-known open source projects, and involved in the development of some infrastructure that supports millions of concurrent traffic.

## Out of the Ivory Tower

> In industry, the real business scenario is very different from what you learn in school.

Zhengsong's first job was at a wearable device startup, working on the development of smart bracelets. Zhengsong and his former colleagues had to process various sensor data from the smart bracelet to monitor the user's heart rate, exercise, blood pressure and so on.

"It was fun because in industry, the real business scenario is very different from what you learn in school, and a lot of things have to be learned from scratch," Zhengsong said.

One day after work, the owner of this company suddenly sent a message saying that the company's employees were on temporary leave and that they would wait to be notified when to work.

Zhengsong felt something was wrong at that time, how to work well, suddenly on vacation? Then he immediately opened the recruitment software and started looking for a new job. Later, he found out that the owner of the company had a contract dispute with the supplier, and the company was briefly shut down.

Then, Zhengsong went to another company to engage in back-end business development work, to learn the industry norms and further improve technology. After almost a year, he joined the development team of a large company to work on middleware-related development because he liked the simplicity and high performance of technologies like Nginx, OpenResty, and Netty.

"In this big company, I did a little bit far from the business, more technically oriented. "Zhengsong said.

Zhengsong's contact with Apache APISIX was in September 2020, when his team was using Kong, but Kong was not fully meeting their needs, so they redid the technical selection of the gateway to try to find a better solution. Zhengsong was in charge of this technical selection, so he came across the Apache Foundation's top project, Apache APISIX, and was introduced to the Apache APISIX community.

At that time, he had already graduated more than three years ago.

## Out of the newbie village

> I can submit code to the Apache Foundation's top projects! As a technical worker, that's a lot of technical confidence.

Zhengsong's first PR in the open source community was an enhancement type PR, which enabled Apache APISIX to support multi-port listening.

- issue: https://github.com/apache/apisix/issues/1195
- PR: https://github.com/apache/apisix/pull/2409

This feature is needed by Zhengsong and has been mentioned in the issue area for a long time, but for some reason it has been unclaimed. Before that, Zhengsong happened to know something about this, so he thought, "I can propose a PR to Apache APISIX to fix this problem. "So he volunteered to have the issue assigned to him in the issue.

He says, "I had a strong urge to get involved in the community, and then I looked at the Apache APISIX community's Beginner's Guide and was as excited to get involved as if I were coming out of the Beginner's Village with a weapon."

After choosing this issue, Zhengsong started discussing details with his community partners on GitHub, such as the style of the configuration port, the idea of the implementation, and so on. After the discussion, he started to implement it. Every night after work, he went through the Apache APISIX code and tested the use cases. After three or four nights of struggling, the test ran for the first time!

Zhengsong was very excited and immediately followed the guide to bring up the PR. Then he accepted the comments from Code Review and further modified the code. Finally, on October 18, the PR was successfully merged into the repository.

![Apache APISIX committer tzssangglass pr](https://static.apiseven.com/202108/1639549390155-6b6cb167-8c9a-43fb-8859-f58cd6b1aae7.png)

"I was very excited and felt like I was finally substantially involved in the open source community. I could submit code to the Apache Foundation's top projects! As a technical worker, it was a technical confidence."

**This is Zhengsong's first PR in the open source world.**

## Things that impressed me in the community

> Because etcd has a MaxCallRecvMsgSize limit, it was most elegant and appropriate to go to the source of etcd.

When we asked what was the thing that impressed Zhengsong most in the community, Zhengsong thought about it and said it was probably a bug-related issue: etcd's MaxCallRecvMsgSize limitation.

Zhengsong had been tormented by etcd's return size limitation problem, and the community had reflected and discussed this problem many times, but it was not very elegant on Apache APISIX no matter how it was handled.

In April this year, one of our partners submitted a PR to etcd, which finally solved the problem. When Zhengsong heard about this, he was very shocked, he didn't think it would be solved in such a way. But in hindsight, this was the way to go.

"Because etcd has a MaxCallRecvMsgSize limit, it's most elegant and appropriate to go to the source of etcd. This is great example of cross-community collaboration," says Zhengsong.

## Sir, this way

> We're all working together differently, but we're all contributing to open source.

Zhengsong says that when he first started participating in the community, he went through most of the APISIX documentation he could see at the time. So when he was working in his company, his colleagues asked him questions, and although he was not very clear, he knew the distribution of the project's documentation, so he could look it up directly and know roughly what the problem was. He believes that reading the documentation is an appropriate way to get familiar with the project.

The Apache APISIX project website has a good guide for newcomers, including how to raise PR. If you want to participate in the community, you can first read the main documentation on the website and Github to get a basic understanding of the project and the distribution of the project's documentation, and then index the documentation as needed.

If you want to contribute to the code, or participate in the design, some knowledge of Nginx or OpenResty is necessary. This includes looking at their official documentation and code, and learning about their implementation of relevant features.

Zhengsong said, "I think this step is impossible to skip."

Of course, you can get involved in the community as a user. For example, if you think there is something wrong with the documentation, or if you follow the documentation and find that it is not the case, you can also raise some issues to point out these problems.

We are all working together, but we are all contributing to open source.

## Everyone is welcome in the community

> But it's better this way

Zhengsong said, we are all in the open source community, the first thing to pay attention to is to comply with some of the community rules, and the community of partners to communicate on an equal footing.

The points to note when communicating can be divided into two kinds.

The first is that if you encounter some problems, then you should try to accurately describe the problem and provide reproducible use cases. This is actually the most popular, or one of the most effective ways to improve communication. If you can describe a problem very clearly, then people will naturally answer the question very high efficiency.

The second is that if you are proposing ideas, solving problems, etc., before you do it, for points of ambiguity, you need to discuss them in a public forum, such as issue, mailing lists, etc., to reach agreement in the community, and then start doing it after you have achieved consensus.

## About Apache Way

> Consensus will also be updated, and it is a force for the community to move the project forward.

The Apache Way, as Zhengsong understands it, is about community over code.

He believes that the community is essentially a collaboration between people, where everyone divides up the work and does their own job. But before we cooperate and do our own work, we need to form some consensus.

Consensus is built up little by little. The community participants throw out a problem, and the community will discuss, argue, verify, and finally solve these problems. In this process, consensus is slowly formed in the community, and it may be a norm, a boundary, or some other form of consensus. Consensus is also updated, and it is a force for the community to move the project forward. This process has some idealistic overtones.

Community consensus is actually more important than you making code contributions, because with consensus, when you go back to a point of change later, it will be clearer to know the origin of the change and the perspective at that time.

## Finally

Finally, before we shut down the mike, we asked Zhengsong to recommend something to us. After thinking about it, Zhengsong said, "I recommend a German film related to social engineering, Who Am I: No Absolutely Safe System, and a book by Fei-Li Kong, Calling the Spirits: The Great Chinese Demon Panic of 1768. I hope you will not forget to enrich your spiritual life even in the midst of your busy work. "

That's it for this interview! Which community member will we interview next time? Check out the Apache APISIX community and find out! Maybe you'll be the next committer!
