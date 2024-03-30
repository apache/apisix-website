---
title: Apache APISIX North America Tour
authors:
  - name: Nicolas Fränkel
    title: Author
    url: https://github.com/nfrankel
    image_url: https://avatars.githubusercontent.com/u/752258
keywords:
  - APISIX
  - Security
  - Good practices
description: >
  Once in a while, I write non-technical blog posts when I've something worth sharing. Today, I'd like to write about my North America "Tour" across several conferences and user groups.
tags: [Community]
image: https://static.apiseven.com/uploads/2024/03/26/qIgl44le_globe-1311758_1280.jpg
---

<head>
    <link rel="canonical" href="https://blog.frankel.ch/apisix-north-america-tour/" />
</head>

>Once in a while, I write non-technical blog posts when I've something worth sharing. Today, I'd like to write about my North America "Tour" across several conferences and user groups.

<!--truncate-->

The first leg of my journey started in Oakland, California, with [Developer Week](https://developerweek2024.sched.com/event/1WpId). Developer Week is an established conference with different editions in several locations and online during the year. Though I'm on their advisory board, this is only the second time I've spoken at one of their events. Pro-tip: Avoid being on any board of a conference where you speak. It's bad taste and casts doubt on whether you validated yourself.

I flew from Geneva the day before my talk and crashed into my hotel bed. Of course, I woke up very early in the morning and decided to check the demo of a talk planned for the end of the tour. It didn't work, so I tried to remove the stopped containers. Tired as I was, I deleted **all** my Docker images, including the ones I'd need a few hours later for my talk on [Open](https://blog.frankel.ch/end-to-end-tracing-opentelemetry/) [Telemetry](https://blog.frankel.ch/improve-otel-demo/)!

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Kicking off <a href="https://twitter.com/DeveloperWeek?ref_src=twsrc%5Etfw">@DeveloperWeek</a> by learning about Telemetry from <a href="https://twitter.com/nicolas_frankel?ref_src=twsrc%5Etfw">@nicolas_frankel</a> <a href="https://t.co/rLCDPCzExV">pic.twitter.com/rLCDPCzExV</a></p>&mdash; Scott McAllister (@stmcallister) <a href="https://twitter.com/stmcallister/status/1760397694282121559?ref_src=twsrc%5Etfw">February 21, 2024</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

The talk is heavily based on a demo. When I tried to start the latter, I noticed the issue immediately and realized my mistake, but it was too late. Even though I had a Docker Compose file with `build` statements, one of the components is in Rust—there was no time to compile it.

Long story short, it was an epic fail. I apologize again for this to the attendees if any of them read this post; I hope the explanations and slides were enough for them to play with the GitHub repository.

Afterward, my friend [Josh](https://mastodon.online/@starbuxman) drove me to San Francisco for lunch and a lovely walk along the piers.

![Josh Long and Nicolas Fränkel in San Francisco](https://static.apiseven.com/uploads/2024/03/26/Wyn1YAFH_IMG_8884_50.webp)

The next day, I woke early to fly to Montréal, Canada. It was a pretty long flight; the day after, I had to talks at [ConFoo](https://confoo.ca/en/speaker/nicolas-fraenkel), one of my favorite conferences in North America. ConFoo started as a PHP conference, hence the elephant mascot, but has now widened its horizon _a lot_.

![ConFoo mascots](https://static.apiseven.com/uploads/2024/03/26/YG0Jjpjj_GHItGeSXwAEuU1z.jpg)

I had two talks there: Open Telemetry (again) and [Chopping](https://blog.frankel.ch/chopping-monolith/) [the Monolith](https://blog.frankel.ch/chopping-monolith-smarter-way/). I had rebuilt my images, and both talks went flawlessly this time.

<blockquote class="twitter-tweet"><p lang="en" dir="ltr"><a href="https://twitter.com/nicolas_frankel?ref_src=twsrc%5Etfw">@nicolas_frankel</a> talking about decomposing the monolith. The first step on the micro services journey is reorg /cc <a href="https://twitter.com/adrianco?ref_src=twsrc%5Etfw">@adrianco</a> <a href="https://t.co/YU6yFR8IJF">pic.twitter.com/YU6yFR8IJF</a></p>&mdash; Spencer Gibb (@spencergibb@social.sdf.org) (@spencerbgibb) <a href="https://twitter.com/spencerbgibb/status/1761046658303877615?ref_src=twsrc%5Etfw">February 23, 2024</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

Over the weekend, my friend [Anthony](https://framapiaf.org/@anthonydahanne) invited me to ski in Sutton. The temperature was very low compared to what I'm used to, around-10°C. Fortunately, Anthony was prepared and gave me self-heating thingies for my hands; unfortunately, he only had one - but it was enough nonetheless. Anthony also connected me with all the meetups I have the pleasure of presenting at in Canada, so I'm fortunate to count him as a friend.

![Anthony Dahanne, his son and Nicolas Fränkel in skiing gear](https://static.apiseven.com/uploads/2024/03/26/7VgErrYQ_GHItGeXWoAAXzNR.jpg)

Having survived the Canadian cold, I ran one of my favourite runs on Monday: from the Bonaventure Hotel to the top of the Mount Royal. The slope is pretty steep at the foot of the mount, so you either choose to use the twisty path to the top or the multiple stairs that cut a more direct route. I managed to use all the stairs but the last (and longest) one and caught my breath running along the regular path.

![Nicolas Fränkel on top of Mont Royal with Montréal in the background](https://static.apiseven.com/uploads/2024/03/26/Kw3W7lNo_GHOBEWkWIAAQ-Zf.jpg)

In the evening of the same day, I talked at the [Software Crafters Montréal](https://www.meetup.com/fr-FR/software-crafters-montreal/events/298710071/) meetup. It's interesting because though I've been a developer for a long time, I never belonged to the "crafter" movement, though it resonates. The talk chosen was [Evolving your APIs](https://blog.frankel.ch/evolve-apis/). The room was packed, and I believe it was pretty well received.

![Software Crafters Montréal meetup](https://static.apiseven.com/uploads/2024/03/26/N7Ehs8CW_GHWe9eLWMAAsKUe.jpg)

The next step in my journey was the [Ottawa Java User Group](https://www.meetup.com/ottawa-java-user-group/events/299043919). I spent most of my developer years on the JVM, so my network is quite developed among JUGs. The organizer is [Sebastien Pelletier](https://www.linkedin.com/in/pelletis/): he's been accommodating and has driven me from my hotel and back again. He's trying to rebuild the Ottawa JUG back to its pre-COVID attendance. If you're a speaker and plan to be around Ottawa, please get in touch with him: his organizational skills are second to none.

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">I had the pleasure of watching <a href="https://twitter.com/nicolas_frankel?ref_src=twsrc%5Etfw">@nicolas_frankel</a> speak at <a href="https://twitter.com/realOttawaJUG?ref_src=twsrc%5Etfw">@realOttawaJUG</a> this evening. The room was packed!! <a href="https://t.co/XEotZOh95E">pic.twitter.com/XEotZOh95E</a></p>&mdash; Theresa Mammarella (@t_mammarella) <a href="https://twitter.com/t_mammarella/status/1762628620193775717?ref_src=twsrc%5Etfw">February 27, 2024</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

Ottawa is located between Montréal and Toronto, so the [Toronto JUG](https://www.meetup.com/toronto-java-users-group/events/298952265/) was a logical step in my tour. I stayed for a couple of days, including the weekend, so I had time to explore the city, including the CN Tower, as it was my first time there. [Therese Mammarella](https://mastodon.social/@t_mammarella) is the organizer there, and I'm sure she'll be happy to host you. You may have noticed she liked my talks so much that she drove to Ottawa on purpose the week before to attend the one I did at the JUG. The talk was well-attended but less than I expected for a city of this size. Anyway, I had a lot of fun presenting Evolving your APIs - I hope the attendees had too.

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Great have <a href="https://twitter.com/nicolas_frankel?ref_src=twsrc%5Etfw">@nicolas_frankel</a> drop into the <a href="https://twitter.com/hashtag/Toronto?src=hash&amp;ref_src=twsrc%5Etfw">#Toronto</a> JUG on his <a href="https://twitter.com/hashtag/APISIXNorthAmericaTour?src=hash&amp;ref_src=twsrc%5Etfw">#APISIXNorthAmericaTour</a>! <a href="https://t.co/KcRhA2nOpm">pic.twitter.com/KcRhA2nOpm</a></p>&mdash; Shaun Smith 🇨🇦❤️🇺🇦 (@shaunmsmith) <a href="https://twitter.com/shaunmsmith/status/1764812180992426409?ref_src=twsrc%5Etfw">March 5, 2024</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

Toronto is quite close to Niagara Falls. It would have been a shame not to go there, but I felt sick the weekend, so I decided to skip it. Yet, some things are just bound to happen. After the talk, a couple of us went to have dinner. There, I met a Ukrainian guy who had moved to Toronto years before the war and knew about me and my support for Ukraine. After talking together, we realized we had friends in common. He offered to drive me there as he was not working the next day. I happily took a day off myself and didn't regret it one bit! Thanks, Ihor, for the drive and the conversation.

![Nicolas Fränkel with Niagara Falls and a rainbow in the background](https://static.apiseven.com/uploads/2024/03/26/CgcCvJfC_GH8m0dEWUAAm3eJ.jpg)

Afterward, I returned to the USA, namely Chicago, Illinois, to speak at [Chicago JUG](https://www.meetup.com/chicagojug/events/299412641/). I have known the JUG leader, [Mary Grygleski](https://mastodon.social/@mgrygles), for over a decade. She took the time to organize the meetup despite her busy schedule.

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Our meetup with the amazing <a href="https://twitter.com/nicolas_frankel?ref_src=twsrc%5Etfw">@nicolas_frankel</a> has just started <a href="https://twitter.com/hashtag/ApacheAPISIX?src=hash&amp;ref_src=twsrc%5Etfw">#ApacheAPISIX</a>! Thanks <a href="https://twitter.com/IBM?ref_src=twsrc%5Etfw">@IBM</a>-Chicago <a href="https://twitter.com/arunavaibm?ref_src=twsrc%5Etfw">@arunavaibm</a> for hosting us tonight, and <a href="https://twitter.com/ChehHoo?ref_src=twsrc%5Etfw">@ChehHoo</a> @software29927 for helping! There&#39;s still time to join us: <a href="https://t.co/qiy8WXYXBR">https://t.co/qiy8WXYXBR</a> <a href="https://t.co/9iiCtvPT4a">pic.twitter.com/9iiCtvPT4a</a></p>&mdash; Mary Grygleski (@mgrygles) <a href="https://twitter.com/mgrygles/status/1765903150668517579?ref_src=twsrc%5Etfw">March 8, 2024</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

[Matt Raible](https://github.com/mraible) is a familiar face in the Java community - and beyond. He's also the leader of the Denver Java User Group. I was lucky to know him, as he also arranged a double hit: [Boulder](https://www.meetup.com/boulderjavausersgroup/events/299454075/), then [Denver](https://www.meetup.com/denverjavausersgroup/events/gjngbtygcfbrb/). Even better, [Venkat Subramaniam](https://mastodon.social/@venkats), whom I don't need to introduce, lives close to Boulder **and** was there to invite me for a hike. But before that, I spend my weekend hiking according to his suggestion. First, I went to Boulder Moutain Park, and then, the day after, I went to Lake Bernard.

![Nicolas Fränkel in the Colorado mountains](https://static.apiseven.com/uploads/2024/03/26/SStMBJvP_GIbjAqvXEAA3Is2.jpg)

The not-so-fun part about the second hike: for a reason unknown, mid-way, my head started to hurt. The headache lasted for the whole day. I checked online, and since I had my water bag and kept drinking, it might have been mountain sickness. It's weird since I live close to the mountains and go on top regularly, but it's the only explanation I could find. Fortunately, it went away the next day, and the talks went well.

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">March <a href="https://twitter.com/denverjug?ref_src=twsrc%5Etfw">@denverjug</a> - <a href="https://twitter.com/nicolas_frankel?ref_src=twsrc%5Etfw">@nicolas_frankel</a> discussing “Evolving your APIs, a pragmatic approach” at Thrive in Cherry Creek. <a href="https://t.co/cOksUDihVm">pic.twitter.com/cOksUDihVm</a></p>&mdash; Greg Ostravich (@GregOstravich) <a href="https://twitter.com/GregOstravich/status/1768070218855612800?ref_src=twsrc%5Etfw">March 14, 2024</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

It was time for me to leave for the last leg of my journey, the [Southern California Linux Expo](https://www.socallinuxexpo.org/scale/21x/presentations/back-basics-getting-traffic-your-kubernetes-cluster) in Pasadena. Before that, life took an interesting turn of events: the forecast warned about a snowstorm in the area. The airline rebooked me twice: from 6 AM to 7 AM, then from 7 AM to 11 AM. I was lucky enough to get a seat, and though spraying the plane with unfreezing liquid took a bit of time, it managed to leave anyway. I left Denver under the snow and landed a handful of hours later in Los Angeles under the sun.

It was my second time at SCaLE, _aka_, SoCalLinux; the first time was the year of Covid. I need to explain why speaking at SCaLE during this journey was necessary. At the time, I was to speak at two different meetups in San Francisco, then SCaLe, fly to Romania, then Istanbul, get back home on Saturday, and leave on Monday for Australia. Granted, it was not terrific planning, but I like to think that I lived and learned since then. Anyway, one of the meetups was canceled, and I did the other online from my hotel room. At SCaLe, the venue was pretty empty for an event this size. Some people were wearing masks, and antiseptic gel dispensers were everywhere. I had around ten people in my room, which was my record at the time - I've done worse since then.

Later, the Romanian conference announced they would cancel the event. I called the Istanbul one, but they confirmed the event would occur. I rebooked to Istanbul, then one day later, they canceled as well. When life gives you lemons, you make lemonade; I decided to keep it that way to avoid more rebooking fees and spend the days in Istanbul anyway.

![A mosque in Istanbul](https://static.apiseven.com/uploads/2024/03/26/Kc2z1PSm_20200313_175252.jpg)

For the record, on Sunday, the whole world stopped. The Australian conference was also canceled, and I had no chance to go there since. Thus, that was what went in my head by preparing for my talk at SCaLE: I wanted to exorcise my previous experience. I'm happy to say it worked!

<blockquote class="twitter-tweet"><p lang="en" dir="ltr"><a href="https://twitter.com/nicolas_frankel?ref_src=twsrc%5Etfw">@nicolas_frankel</a> is starting a great talk on the basics of network traffic options on Kubernetes at <a href="https://twitter.com/hashtag/Scale21x?src=hash&amp;ref_src=twsrc%5Etfw">#Scale21x</a> in the <a href="https://twitter.com/hashtag/kcdla?src=hash&amp;ref_src=twsrc%5Etfw">#kcdla</a> track in ballroom B <a href="https://twitter.com/socallinuxexpo?ref_src=twsrc%5Etfw">@socallinuxexpo</a> <a href="https://t.co/vIQckW5QYt">pic.twitter.com/vIQckW5QYt</a></p>&mdash; Steve Wong (@cantbewong) <a href="https://twitter.com/cantbewong/status/1768725626306150526?ref_src=twsrc%5Etfw">March 15, 2024</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

Before leaving for home, though, I met with my friends from Yugabites: [Denis Magda](https://github.com/dmagda) and [Franck Pachot](https://mastodon.social/@FranckPachot). We had lunch, then enjoyed an hour or so walking on the shore of Venice Beach. Here, you can see them counting on their fingers:

![Nicolas Fränkel, Franck Pachot, and Denis Magda (left to righ) on Venice Beach](https://static.apiseven.com/uploads/2024/03/26/U4yG3DDI_GIwX6QxWUAALNkz.jpg)

Did you notice that you count on your fingers differently depending on where you were raised? Hint: find out how the English spies unwillingly reveal themselves in the Inglorious Basterds movie, despite speaking flawless German.

It was time to get home after this last pause on American soil. Many hours later, I was at home, tired but happy from all those events. Many thanks to all the organizers who made them possible, especially Anthony, who worked as my agent for Canada. I also want to thank the people who came to my talks: speakers are nobody if there's no audience to listen to them. Finally, I want to thank my employer [api7.ai](https://api7.ai/), who made it all possible.

See you soon [somewhere](https://blog.frankel.ch/speaking/)!

PS: I tried to document my journey via #APISIXNorthAmericaTour. Find more pictures on [Twitter](https://twitter.com/search?q=%23APISIXNorthAmericaTour&src=typed_query&f=live), [LinkedIn](https://www.linkedin.com/search/results/all/?keywords=%23APISIXNorthAmericaTour&origin=GLOBAL_SEARCH_HEADER), [Mastodon](https://mastodon.top/tags/APISIXNorthAmericaTour) and [BlueSky](https://bsky.app/search?q=%23APISIXNorthAmericaTour).
