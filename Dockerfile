FROM node:8

LABEL maintainer 'Gabriel Dal Farra de Freitas <gdfreitasdev@gmail.com>'

COPY ./src src

COPY *.json ./