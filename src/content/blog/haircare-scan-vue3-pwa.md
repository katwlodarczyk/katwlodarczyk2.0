---
title: "Haircare Scan – Vue3 PWA"
date: 2022-05-11
excerpt: "Crème de la crème project summarising my three years at university — a final major project built with Vue3, Firebase, and Tesseract.js to help people decode hair care ingredient lists."
category: "Projects"
tags: ["vue3", "pwa", "firebase", "figma", "final major project"]
image: "/blog/images/Hair-care-scan-presentation.png"
---

And here it is, crème de la crème project summarising my three years at university — a final major project (FMP).

## The origin

The idea for **Haircare Scan** came from where all projects should come from — a real world problem. My personal struggle to find suitable hair care products for my hair sparked the flame to create an app that would help me (and many others) decipher difficult and lengthy ingredient lists.

After some technology research I decided to create a PWA with Vue3, so my personal portfolio accurately shows off the knowledge I have gained in the last few years.

Design and development took me around 2 months (let's remember it is my dissertation project so the time was very limited).

## Design

### Logo

Most of my design projects start from creating a logo, which then directs the overall character of the design. This case was the same. I like simple, clean forms when it comes to logos, so a scanner icon that clearly manifests the function of the app was just perfect. Matched with a playful font that resembles strands of hair — and voilà. The colour palette is quite feminine and youthful, but so is my potential target user group.

### Low fidelity wireframes

I like doing them as I can plan how many screens I might need and which components should be placed. I don't care about the look yet, so I can focus on functions. **Rough plugin in Figma** is my favourite tool to create low fidelities, because even though they are meant to be speedy in creation, I still want them to look nice and presentable.

As you can see, low fidelity wireframes are very simple. The look of the application is steaming from the specific requirements, and they play the main role in anything I design.

### High fidelity wireframes

When I first started coding, I was designing on the go directly within the code. It wasn't a good idea (actually, it's the worst idea ever), but I didn't know any better. Those days are long gone, and proper design always comes first now. It simplifies the work and minimises the time spent on the project.

High fidelities focus on the details of every aspect and every page of the app.

Having the design ready, I know what I need to code and more or less how it should behave. As this is my personal project, there are a few differences between design and final product, simply because I found a better way to display something. Those changes are very minimal though.

As the app is meant to be used in store whilst shopping, it is designed for mobile phones only. You can, of course, access it from any device, however you will not be able to download it then. Instead, you will see a lovely marketing page.

### Clickable prototype

[View Figma prototype](https://www.figma.com/proto/61BNhs1O7ol7WQaCBhcjRz/HAIRCARE-SCAN?node-id=212%3A127&scaling=scale-down&page-id=1%3A4&starting-point-node-id=212%3A127)

## Development

The reason I chose Vue3 as a framework to build this app is I wanted to have a Vue3 project in my portfolio, so it accurately displays my skills.

### Technologies

I used a few very cool services and packages, some of which I already had experience with, some of which were completely new to me.

**Firebase and Firestore**, which I had used previously in my first React app, have also been used to deploy, host and store the database in Haircare Scan. I hugely recommend this service to anyone wanting to show off their projects on a budget.

**Swiper.js**, used for a slider in the welcome screen, is a popular slider package. I used it a few times while working on work projects, but it's the first time it found its place in my personal project.

**Tesseract.js**, the brain behind the scanning functionality, turned out to be quite easy to implement and work with, however OCR technology is still in its infancy, in my opinion.

**Vue-toastification** — a used and loved package for toast notifications.

**Vue3-markdown-it** package, which helped tremendously in displaying articles in the education tab. Those articles caused a bit of head scratching, as Firestore database is a noSQL db and only stores data in a few data types. I had to use a string to store the whole body of the article, therefore having it in markdown was the only option to allow for some kind of formatting.

And of course **Luxon**, a great date and time formatter.

### Recommendations

I am proud of this project and how it turned out. Nevertheless, limited time and budget played a crucial role in choosing specific technologies, and if I had the chance to redo the app in the future, I would definitely make some amends.

First of all, Haircare Scan 2.0 would definitely be produced with intention for some monetary profit. Having this in mind, presence in the App Store and other app stores would be a must. PWA would change into Ionic + Vue3.

Secondly, the OCR technology and its abilities didn't quite meet the expectations and requirements, so I would change direction and opt for a barcode scanner + access to a paid cosmetics database for the scanning functionality.

## Final product

You can check out the app here: [https://haircare-scan.web.app/](https://haircare-scan.web.app/)

Let me know what you think about this project!
