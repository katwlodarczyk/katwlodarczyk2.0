---
title: "Raspberry Pi scroll bot- soldering, building, coding"
date: 2020-06-02
excerpt: "Although I am a frontend developer with all my heart, I was always fascinated by how to build robots or wearable technology. I haven’t done anything about it until…."
category: "Projects"
tags: []
image: "/blog/images/harrison-broadbent-c3ypscwjb04-unsplash-scaled.jpg"
---

Although I am a frontend developer with all my heart, I was always fascinated by how to build robots or wearable technology.

I haven’t done anything about it until I’ve seen a post on Twitter about some guy who has built a little display unit to show his family whether he has a meeting or is free to bother (anyone WFH and with kids out of school will understand the need for stuff like this :D) Anyway, the display looked really cool, I retweeted, and my good friend sent me a link to a Raspberry Pi shop ([PiHut](https://thepihut.com/)) and encouraged me to buy something and start building.

I needed something relatively simple for my first project, so products from Kits/Bundles tab seemed perfect.

I decided on this little scroll bot:

![](/blog/images/zero-w-kits-square-3_600x.jpg)

The package came super-quick, within 24 hrs.

Beware, this is a soldering project (😱 ), but you can also buy no-solder hammer headers to complete it.

My friend Jack has a soldering iron, which he kindly agreed to lend me. (Thank you!)

I have never soldered before, and it’s been nerve-racking activity, but after a quick youtube tutorial, I managed to solder both **raspberry pi zero** and **scroll phat hd** boards. (spoiler-alert! I have not messed up this step and everything works perfectly! So if I could do that, there is a high chance that you can do it too!)

The next step was to build the orange robot frame, and here I have followed the original assembly instructions, which you can access via [this link](https://learn.pimoroni.com/tutorial/sandyj/assembling-scroll-bot).

![](/blog/images/img_9334-e1591044219283.jpg)

My robot was complete, but with the end of instructions, ended my knowledge on what to do next 😂

Do not worry though, as every programmer’s best friend aka Google helped me out. I plugged in HDMI cable into a mini-HDMI connector (included in the bundle) and onto my Raspberry Pi Zero board. I plugged in a USB for the wireless keyboard and mouse ( there is only one USB port, thankfully my keyboard and mouse set use the same USB, but if you have separate ones, you will need a USB hub to connect both to the Pi). Lastly, I inserted a micro SD card and plugged the whole thing to power.

The result…..nothing happened! 😱

I googled some more and realised I slotted an empty SD card, so of course, nothing could have happened. I tried adding a raspbian image downloaded from the internet straight onto the card, but it didn’t work for me. [Raspberry Imager](https://www.raspberrypi.org/downloads/) came to the rescue. This utility downloads the right file for you, and it’s really straightforward. I recommend this way if you are not entirely sure what you’re doing.

I tried again, the LED light on Pi Zero went on, and I saw a lovely Raspberry logo on the monitor. Victory! 🏆

![](/blog/images/img_4847.jpg)

The first step was to install the scroll phat hd python library. For this step and few of my first coding tests, I followed this tutorial from Pimoroni website ([CLICK HERE for tutorial](https://learn.pimoroni.com/tutorial/sandyj/getting-started-with-scroll-phat-hd))

At that point, I still had no idea whether my scroll phat hd board works, so when I tried one of the examples (downloaded with the library) and my robot came alive, I was really proud of myself and my soldering skills (haha).

The first little projects I did were a simple clock and displaying different strings, both static and scrolled ones.

![](/blog/images/img_9330.jpg)

![](/blog/images/img_8219.jpg)

For example, to code the clock you can see in the picture above, simple type:

![](/blog/images/carbon-2-e1591087928547.png)

As this post turned out quite lengthy, I will go in-depth about the final project for my little scroll bot later this month.

Let me know if you have ever done anything with Raspberry Pi, or maybe if you would like to in the future!

*Featured Photo by [Harrison Broadbent](https://unsplash.com/@harrisonbroadbent?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)