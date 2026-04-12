---
title: "Create a simple toggle switch in React"
date: 2020-12-04
excerpt: "Dark themes have become really popular in the recent years, and a lot of websites have given their users the ability to choose between light and dark mode. Toggle switch is, in my opinion, the best way to incorporate light/dark mode feature. Today I’m gonna show you how to create a simple, yet effective toggle switch."
category: "Projects"
tags: []
image: "/blog/images/create-simple-1.png"
---

The first thing we need is a design of your toggle. 
I’ve made mine using Figma. The sun and moon icons are from [Iconify plugin](https://www.figma.com/community/plugin/735098390272716381/Iconify), and gradients were made with [uiGradients plugin](https://www.figma.com/community/plugin/744909029427810418/uiGradients). When you’re happy with your design, save your file and export the icons (if your have them of course, as they are not mandatory).

Now open the editor of your choice, I’m using Visual Studio Code on my personal computer. Open the folder in which you would like your project directory be. Then, open the terminal and type:

```javascript
npx create-react-app toggle 
```
# `toggle` is the name of your project

when your react app is created, go to your project’s directory using:

```javascript
cd toggle
``` 
# again, `toggle` is the name of your project

the last step before we can start our application is starting the server:

```javascript
npm start
```

Your project should now open up in your browser, and you should see generic React app page.

We will be using styled-components, so we need to install it in our project. Open a new terminal window and type:

```javascript
npm install-s styled-components
```

Ok, so let’s have a look at our project’s folders. We have node_modules, public, src, .gitignore, package-lock.json, package.json and README.md. In the src folder, if your have any icons, create a folder for your assets and them here. Create a folder callled components, in which add a new file: toggle.js

Now, open App.js file and delete everything from inside the div className=”App”. This was what you saw in the generic React page in your browser. We won’t be needing in. Ok, now we need to import our component. At the top of the file, type:

`import ToggleComponent from './components/toggle';`

Now we can add this component inside the div, and this is how our App.js file should look like now:

```javascript
import './App.css';
import ToggleComponent from './components/toggle';
function App() {
  return (
    <div className="App">
        <ToggleComponent />
    </div>
  );
}
export default App;
```

Save and then open toggle.js file. At the top of the document, import React, useState, useEffect and also styled (our styled-components) and keyframes for animations.

```javascript
import React, { useState , useEffect} from "react";
import styled, { keyframes } from 'styled-components';
```

To help us out later on, let’s create few const’s that will keep some of our values:

```javascript
const time = '0.1s';
const lightBackground = 'linear-gradient(90deg, #EAC29C 0%, #EDE8CF 100%)';
const darkBackground = 'linear-gradient(90deg, #46517F 0%, #8DA5B4 100%)';
const setAnimation = (from, to) => keyframes({from: from, to: to});
```

Components can have one default function, and many regular ones. Let’s create our default one, which will be exported so we can use it in App.js

```javascript
function ToggleComponent() {
 
    return (
        <OuterWrapper>
            <StyledWrapper>
                <Header>
                    Toggle Switch
                </Header>
                <Toggle />
            </StyledWrapper>
        </OuterWrapper>
      
)}
export default ToggleComponent;
```

Inside the return braces we will code our component, just like you would code in HTML, but with a twist of styled components. 
Styled components let you write CSS inside the .js file, so you don’t have to go back and forth between files and those styled will only apply for that specific component.

To create a styled component, above the function type:

```javascript
const OuterWrapper = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: ${lightBackground};
    animation: ${time} ${({ showBackground }) => showBackground && setAnimation({ background: 
    lightBackground }, { background: darkBackground })} linear;
    animation-fill-mode: forwards;
`;
```

this is my styled div named OuterWrapper. You can see, inside is just a regular CSS values. Ok let’s create const’s for all divs, h1 and span. All the changes will be showing in your browser straight away, so don’t be afraid to use Inspect tab and play around with different values!

```javascript
const OuterWrapper = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: ${lightBackground};
    animation: ${time} ${({ showBackground }) => showBackground && setAnimation({ background: 
    lightBackground }, { background: darkBackground })} linear;
    animation-fill-mode: forwards;
`;
const StyledWrapper = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    height: 50vh;
    margin:0 auto;
    z-index: 10000;
`;
const Header = styled.h1`
    color: #333333;
    animation: ${time} ${({ showLightfont }) => showLightfont && setAnimation({ color: 
    '#333333' }, { color: '#ffffff' })} linear;
    animation-fill-mode: forwards;
    position: relative;
    font-size: 40px;
    font-family: 'Raleway Dots', cursive;
    display: flex;
    align-items: center;
    margin-bottom:40px;
`;
const StyledToggle = styled.div`
   border-radius: 50px;
   background:  linear-gradient(90deg, #FFA751 0%, #FFE259 100%);
   animation: ${time}  ${({dark}) => dark && setAnimation({background: lightBackground}, 
   {background: darkBackground})} linear;
   animation-fill-mode: forwards;
   height: 32px;
   width: 58px;
   display:flex;
   position: relative;
   align-self: center;
   z-index:100;
   box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.04), 0px 0px 2px rgba(0, 0, 0, 0.06), 0px 0px 1px 
   rgba(0, 0, 0, 0.04);
`;
const StyledSwitch = styled.span`
   background: #ffffff url('./assets/smiley-sun.svg') no-repeat center;
   z-index: 101;
   width:28px;
   height: 26px;
   border-radius: 50px;
   display:flex;
   justify-content:center;
   align-self: center;
   margin-left: 3px;
   margin-top:0.5px;
   z-index: 10000;
   animation: ${time}  ${({dark}) => dark && setAnimation({marginLeft: '3px', background: 
   '#ffffff url(\'./assets/smiley-sun.svg\') no-repeat center'}, {marginLeft: '26px', 
   background: '#ffffff url(\'./assets/smiley-moon.svg\') no-repeat center'})} linear;
   cursor: pointer;
   animation-fi
```

Ok let’s create a Toggle component function! Having it separate from the default function, we will be able to use our toggle anywhere else in the app, and have multiple different toggles. **DRY coding!** (don’t repeat yourself)

```javascript
const Toggle = (props) => {
    const [dark, setDark] = useState(false);
    const {onDark, onNotDark} = props;
    useEffect(() => {
        if (!dark) {
            onNotDark();
            return;
        }
        onDark();
    }, [dark])
    const handleClick = () => {
        setDark(!dark)
    }; 
    return (
        <StyledToggle dark={dark}>
            <StyledSwitch dark={dark} onClick={handleClick} />
        </StyledToggle>
    )};
```

In our toggle, we are using states for light and dark setting. We have also added an onClick event to the StyledSwitch span.

We need to remember that any change of state can only go down from a parent to the child element. A child component cannot be responsible for those (because kids aren’t responsible, right? 😂) To make our toggle work, we need to give a parent (our default ToggleComponent) some responsibility.

```javascript
function ToggleComponent() {
    const [showBackground, setShowBackground] = useState(false);
    const [showLightfont, setShowLightfont] = useState(false);
    const handleNotDark = () => setShowBackground(false) & setShowLightfont(false);
    const handleDark = () => setShowBackground(true) & setShowLightfont(true);
    
    return (
        <OuterWrapper showBackground={showBackground}>
            <StyledWrapper>
                <Header showLightfont= {showLightfont}>
                    Toggle Switch
                </Header>
                        <Toggle onNotDark= {handleNotDark} onDark= {handleDark} />
            </StyledWrapper>
        </OuterWrapper>
);
}
```
This is how our parent looks like now.

```javascript
import React, { useState , useEffect} from "react";
import styled, { keyframes } from 'styled-components';
const time = '0.1s';
const lightBackground = 'linear-gradient(90deg, #EAC29C 0%, #EDE8CF 100%)';
const darkBackground = 'linear-gradient(90deg, #46517F 0%, #8DA5B4 100%)';
const setAnimation = (from, to) => keyframes({from: from, to: to});
const OuterWrapper = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: ${lightBackground};
    animation: ${time} ${({ showBackground }) => showBackground && setAnimation({ background: 
    lightBackground }, { background: darkBackground })} linear;
    animation-fill-mode: forwards;
`;
const StyledWrapper = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    height: 50vh;
    margin:0 auto;
    z-index: 10000;
`;
const Header = styled.h1`
    color: #333333;
    animation: ${time} ${({ showLightfont }) => showLightfont && setAnimation({ color: 
    '#333333' }, { color: '#ffffff' })} linear;
    animation-fill-mode: forwards;
    position: relative;
    font-size: 40px;
    font-family: 'Raleway Dots', cursive;
    display: flex;
    align-items: center;
    margin-bottom:40px;
`;
const StyledToggle = styled.div`
   border-radius: 50px;
   background:  linear-gradient(90deg, #FFA751 0%, #FFE259 100%);
   animation: ${time}  ${({dark}) => dark && setAnimation({background: lightBackground}, 
   {background: darkBackground})} linear;
   animation-fill-mode: forwards;
   height: 32px;
   width: 58px;
   display:flex;
   position: relative;
   align-self: center;
   z-index:100;
   box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.04), 0px 0px 2px rgba(0, 0, 0, 0.06), 0px 0px 1px 
   rgba(0, 0, 0, 0.04);
`;
const StyledSwitch = styled.span`
   background: #ffffff url('./assets/smiley-sun.svg') no-repeat center;
   z-index: 101;
   width:28px;
   height: 26px;
   border-radius: 50px;
   display:flex;
   justify-content:center;
   align-self: center;
   margin-left: 3px;
   margin-top:0.5px;
   z-index: 10000;
   animation: ${time}  ${({dark}) => dark && setAnimation({marginLeft: '3px', background: 
   '#ffffff url(\'./assets/smiley-sun.svg\') no-repeat center'}, {marginLeft: '26px', 
   background: '#ffffff url(\'./assets/smiley-moon.svg\') no-repeat center'})} linear;
   cursor: pointer;
   animation-fill-mode: forwards;
`;
const Toggle = (props) => {
    const [dark, setDark] = useState(false);
    const {onDark, onNotDark} = props;
    useEffect(() => {
        if (!dark) {
            onNotDark();
            return;
        }
        onDark();
    }, [dark])
    const handleClick = () => {
        setDark(!dark)
    }; 
    return (<StyledToggle dark={dark}>
        <StyledSwitch dark={dark} onClick={handleClick}></StyledSwitch>
    </StyledToggle>
    )};
function ToggleComponent() {
    const [showBackground, setShowBackground] = useState(false);
    const [showLightfont, setShowLightfont] = useState(false);
    const handleNotDark = () => setShowBackground(false) & setShowLightfont(false);
    const handleDark = () => setShowBackground(true) & setShowLightfont(true);
    
    return (
        <OuterWrapper showBackground={showBackground}>
            <StyledWrapper>
                <Header showLightfont= {showLightfont}>
                    Toggle Switch
                </Header>
                        <Toggle onNotDark= {handleNotDark} onDark= {handleDark} />
            </StyledWrapper>
        </OuterWrapper>
);
}
export default ToggleComponent;
```

And that is our complete component file. If your would like a nice fonts, either import the font into your project, or add a link into the head of index.html file.

OK time to deploy your project and publish it! Github pages will be the best option for our needs today.
Commit your work, then go into your github account and create a new empty repository. Follow the steps to add existing repository:

```javascript
git remote add origin https://github.com/your-username/name-of-your-project.git
git branch -M main
git push -u origin main
```

Now we need to install `gh-pages` package. In your terminal, type:

```javascript
npm install gh-pages --save-dev
```

In package.json file, add:

```javascript
"homepage" : "http://katwlodarczyk.github.io/toggle-switch-react" 
```
#add this after name of the project. this is your github pages url

and lastly, we need to add some new scripts:
```javascript
"predeploy": "npm run build",
"deploy": "gh-pages -d build"
```

Ok. let’s deploy! In the terminal, type:
```javascript
npm run deploy
```
Wait and…. viola! 

### You can see my finished project here:

[https://katwlodarczyk.github.io/toggle-switch-react/](https://katwlodarczyk.github.io/toggle-switch-react/)

### GitHub repository to see the whole code:

[https://github.com/katwlodarczyk/toggle-switch-react](https://github.com/katwlodarczyk/toggle-switch-react)

### Toggle switch project on Behance:

[https://www.behance.net/gallery/108743485/Toggle-switch](https://www.behance.net/gallery/108743485/Toggle-switch)

---

If you’ve done your very own awesome toggle, share the link with me!