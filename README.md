# WIP

[koaAuthAndSocket ](https://github.com/Zhenia/koaAuthAndSocket)

# Docker Image for npm

[![Stories in Ready](https://badge.waffle.io/terinjokes/docker-npmjs.png?label=ready)](https://waffle.io/terinjokes/docker-npmjs)

**Docker Versions**: 18.09.8  



## Building

This image can be built by running the following docker command:

go to folder with project
```
docker-compose up --build -d

```
list container
```
docker ps

```
get id the container for image  koaauthandsocket_app and go into the container
```
sudo docker exec -it XXXXXXXXXXX sh

```
```
npm run build

```
```
npm run watch-server

```