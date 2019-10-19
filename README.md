# APISIX

> The website of [APISIX](https://github.com/iresty/apisix), a cloud-native microservices api gateway.

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

# Production codes will be published to origin/gh-pages branch.
$ ./publish.sh

# Config source to gh-pages branch in GitHub Pages settings.
```

Thanks to [Hugo Framework](https://gohugo.io/) & [Hugo Fresh Theme](https://themes.gohugo.io/hugo-fresh/).