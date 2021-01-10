# Basic image
FROM node

# Required args
ARG USER_NAME
ARG USER_EMAIL
ARG SIGNATURE

# Setup of user enviroment
RUN apt-get update; apt-get install -y vim
RUN mkdir -p ~/.ssh; \
    chmod 0700 ~/.ssh; \
    ssh-keyscan github.com > ~/.ssh/known_hosts; \
    echo ${SIGNATURE} > ~/.ssh/id_rsa; \
    chmod 600 ~/.ssh/id_rsa

# Setup project
RUN git config --global user.name "${USER_NAME}"; \
    git config --global user.email "${USER_EMAIL}"
WORKDIR /app
ADD . .
RUN npm install
EXPOSE 8080/tcp