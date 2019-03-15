:japanese_ogre: # Shrekball: An online multiplayer airhockey game :japanese_ogre:


## [Check out the deployed version here!](https://shrekball.netlify.com)
## What this project is about
![](https://gfycat.com/WearyDentalIrishsetter.gif)


This is a multiplayer game I made in a partner project during my 8th week of learning. The project was a collaboration with **[Charles Callaghan](https://github.com/charlescallaghan/)**, and we did a lot of pair programming together.

The game is actually just airhockey, but there used to be a picture of **[Shrek](https://www.imdb.com/title/tt0126029/)** as our background. It started as a joke, but we kept it because it's catchy!

## Table of contents:

- **[Technologies used](#technologies-used)**
- **[Goals for this project](#goals-for-this-project)**
- **[Features built so far overview with pull requests](#features-built-so-far-overview-with-pull-requests)**
- **[My git workflow](#my-git-workflow)**
- **[My agile workflow and trello board](#my-agile-workflow-and-trello-board)**
- **[create-react-app-docs](#create-react-app)**

## Technologies used
 - Javascript
 - React
 - Redux (& Redux Thunk)
 - Node.js
 - Typescript
 - Koa
 - TypeORM

#### Click links to view some samples in this project

- **[react](/client/src/components/PlayerOneContainer.js)**  
- **[redux](client/src/reducers/puck.js)**  
- **[redux-thunk](/client/src/actions/player.js)**  
- **[TypeORM](/server/src/users/controller.ts)**(Pair programmed)

## Goals for this project:

- To get a better understanding of making full-stack web applications
- To learn how to work together with a partner
- **[To showcase disciplined git usage](#my-git-workflow)**


## Features built so far overview with pull requests

#### Click links to view the pull requests 

- **[Feature/redux collision physics](https://github.com/Tevabo/multiplayer-game/pull/22)**
- **[Feature/smoothAnimations](https://github.com/Tevabo/multiplayer-game/pull/8)**
- **[Fix/reduxActions](https://github.com/Tevabo/multiplayer-game/pull/20)** (Pair programmed)


## My git workflow

In this project I try to use:

- Good commit messages
- Well named branches
- Pull requests with summaries

If you have feedback to improve my git usage: **[please drop me a line!](https://www.linkedin.com/in/teun-van-boxtel-86b624146/)** 

Here is my branching model for this project.

```
master (auto deploys) ______________________
                       \               /
development             \_____________/- pull request
                         \           /
feature/some-feature      \_commits_/- pull request
```

## My agile workflow and Trello board

We tried to use incremental development throughout this project. The idea was to have an MVP ready as soon as possible, and to then try to implement some extra features.

**[Check out my trelloboard here](https://trello.com/b/MgyeVHAo/multiplayer-game)**

## Create React App

This project was scaffolded using the create-react-app cli. 

**[The standard create-react-app docs can be found in here](./create-react-app-docs.md)**
