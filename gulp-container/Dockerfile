# Remember, paths in this file are relative to the root of the repository,
# and not relative to this file.
FROM node:8-alpine

# Set options
ARG PROJECT_NAME=
ARG APP_NAME=
ARG APP_DIRECTORY=
ARG DEBUG=
ARG NODE_ENV=production
ENV PROJECT_NAME ${PROJECT_NAME}
ENV APP_NAME ${APP_NAME}
ENV THEME_DIRECTORY wp-content/themes/${APP_NAME}
ENV APP_DIRECTORY /${PROJECT_NAME}/${THEME_DIRECTORY}

RUN apk update && \
    apk upgrade && \
    apk add --upgrade --virtual .build-deps \
    build-base \
    autoconf \
    libtool \
    nasm \
    automake \
    bash \
    lcms2-dev \
    libsass \
    libpng-dev \
    libjpeg-turbo-dev \
    git \
    python2 && \
    rm -rf /var/cache/apk/*

# Install Gulp
RUN npm install --global gulp-cli && \
    npm install gulp gulp-sass && \
    npm rebuild bcrypt --build-from-source

# Handle NPM dependencies
RUN mkdir -p ${APP_DIRECTORY}/dev

COPY src/web/${THEME_DIRECTORY}/dev/package.json ${APP_DIRECTORY}/dev

WORKDIR ${APP_DIRECTORY}/dev

RUN npm install --dev
RUN npm audit fix
