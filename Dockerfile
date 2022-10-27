FROM node:lts

WORKDIR /app/website

EXPOSE 3000 35729
COPY ./doc /app/doc
COPY ./config /app/config
COPY ./website /app/website
RUN yarn install

CMD ["yarn", "start"]
