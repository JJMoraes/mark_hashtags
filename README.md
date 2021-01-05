<h1 align="center">Welcome to Front-End from Mark Hashtags Project 👋</h1>

>This project is an internship challenge from [Magrathea Labs](https://magrathealabs.com). The challenge consists in to build a web application that's allows to mark twitter hashtags and collect tweets and retweets with it. Is also possible remove the marked hashtags. After collect, the app should to show the tweets as a list by hashtag on front-end.

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

1. I'm using [Nodejs 12](nodejs.org)

### Install Project

```git clone https://github.com/JJMoraes/mark_hashtags-front.git```

```cd mark_hashtags```

```npm install```

```npm run serve```

## Running with docker

> First you'll need to install the [docker](https://docs.docker.com/engine/install/) +19.03 and docker-compose](https://docs.docker.com/compose/install/) +1.17

```git clone https://github.com/JJMoraes/mark_hashtags-front.git```

```docker build --pull --rm -f "mark_hashtags/Dockerfile" -t mark_hashtags:latest "mark_hashtags"```

```docker run --rm -d  -p 80:80/tcp mark_hashtags:latest```

> To stop the container use the hash that's appear after the last command

```docker stop {hash}```

## Show your support ⭐️

Give a ⭐️ if this project helped you!
***