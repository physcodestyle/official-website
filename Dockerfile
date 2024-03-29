# Basic image
FROM node:alpine

# Required args
ARG USER_NAME
ARG USER_EMAIL
ARG SIGNATURE
ARG G_MAP_KEY

# Setup of user enviroment
ENV GOOGLE_MAP_KEY=${G_MAP_KEY}
RUN apk add git; \
    mkdir -p ~/.ssh; \
    chmod 0700 ~/.ssh; \
    ssh-keyscan github.com > ~/.ssh/known_hosts; \
    echo ${SIGNATURE} > ~/.ssh/id_rsa; \
    chmod 600 ~/.ssh/id_rsa

# Setup project
RUN git config --global user.name "${USER_NAME}"; \
    git config --global user.email "${USER_EMAIL}"
WORKDIR /app
ADD . .
RUN npm ci
EXPOSE 8080/tcp
