# Apache APISIX® Website

[<img align="right" width="150" src="./website/static/img/join-slack.png">](https://apisix.apache.org/docs/general/join)

The website of [Apache APISIX®](https://apisix.apache.org/), a cloud-native microservices api gateway.

If you want to write a blog or fix some blog-related issues, please read [Apache APISIX Blog Contributing Guide](http://apisix.apache.org/docs/general/blog) first. Then create a pull request.

--- 

# Contribution
Refer these basic steps to contribute. 
## Contents
- [Environment-SetUp](#clone)
- [Start server](#build)
- [Run](#run)
- [Reference](#reference)

## Clone
To run & test the project locally on your machine , you need to clone it locally.
you can do it by :- 

```sh
$ git clone https://github.com/apache/apisix-website.git
$ cd website
```
## Build
```sh
$ yarn build
```
will build the existing project on your local machine.

**Note:-**
- Before using yarn build , make sure you are inside the main project folder.
if your current location on terminal is not inside the project folder then run, 
```sh
$ cd website 
```
then build script.

## Run

Now the main fun begins!! we will be using docusaurus for running and delployng our website on local server.

- To start the server on a specified port say ```3000``` try ,
```sh

$ docusaurus start --port
```
this will start the server on the default port ```3000```

One can also select a server to be accessible externally they can try  
```sh
$ yarn docusaurus serve --host 0.0.0.0
```
or
```sh
$ yarn run start -- --host 0.0.0.0
```
you can run the dev server on ```0.0.0.0``` to make it listen on the local IP.

**Note:-**
- Before starting server, make sure you are inside the main project folder.
if your current location on terminal is not inside the project folder then run, 
```sh
$ cd website 
```
then start server. 

## Reference
For knowing more about ```Docusaurus``` & it's developement using ```yarn```
One can visit the documentation of Docusaurus at [Docs](https://docusaurus.io/docs/cli)

Thanks to [docusaurus](https://docusaurus.io/)
