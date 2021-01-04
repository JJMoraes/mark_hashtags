<h1 align="center">Welcome to Front-End from Mark Hashtags Project 👋</h1>

> This project is a internship challenge from [Magrathea Labs](https://magrathealabs.com). The challenge consists in to build a web application with allow to mark twitter hashtags and collect tweets em retweets with it. Is also possible remove the marked hashtags. After collect, the app should to show the tweets as a list by hashtag on front-end.


## The front-end repository

- On this repository you will find:

    - A Single Page Application with Vue.js
    - The most common mapping REST requests using axios, as DELETE, GET and POST
    - A system design using Vuetify plugin
    - Authentication Twitter OAuth and JWT Token

***


## Useful links
- [Back-end Repository](https://github.com/JJMoraes/mark_hashtags-back.git)
- [Magrathea Labs](https://magrathealabs.com)

***

## Running using cli

> First you'll need to install the external requirements

### External Requirements

1. We are using [Nodejs 12](nodejs.org)

### Install Project
```git clone https://github.com/JJMoraes/mark_hashtags-front.git```

```cd mark_hashtags```

```npm install```

```npm run serve```

## Running with docker

```git clone https://github.com/JJMoraes/mark_hashtags-front.git```

```docker build --pull --rm -f "mark_hashtags/Dockerfile" -t mark_hashtags:latest "mark_hashtags"```

```docker run --rm -d  -p 80:80/tcp mark_hashtags:latest```

> To stop the container use the hash that's appear after the last command

```docker stop {hash}```

## Show your support ⭐️

Give a ⭐️ if this project helped you!
***