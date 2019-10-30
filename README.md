# Apache APISIX

> The website of [Apache APISIX](https://github.com/apache/incubator-apisix), a cloud-native microservices api gateway.

## Development
```sh
$ brew install hugo

$ hugo server
```

## Deploy
```sh
# Build Website, and production codes are under /public/ folder.
$ hugo

$ chmod +x publish.sh

# Push production files to master branch
$ ./publish.sh
```

Thanks to [Hugo Framework](https://gohugo.io/) & [Hugo Fresh Theme](https://themes.gohugo.io/hugo-fresh/).
