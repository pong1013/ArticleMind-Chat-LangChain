# Fetching the latest node image on alpine linux
FROM node:alpine AS development

LABEL maintainer="Peng"

# Declaring env
ENV NODE_ENV development

# Setting up the work directory
WORKDIR /chatbot-gui

# Installing dependencies
COPY ./package.json /chatbot-gui
COPY ./yarn.lock /chatbot-gui

RUN yarn --frozen-lockfile --link-duplicates

# Copying all the files in our project
COPY . /chatbot-gui

# Starting our application
CMD ["yarn", "start"]