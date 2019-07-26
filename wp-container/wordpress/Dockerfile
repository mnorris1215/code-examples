# Remember, paths in this file are relative to the root of the repository,
# and not relative to this file.

FROM alpine:latest

# Set options
ARG PROJECT_NAME=
ARG APP_NAME=
ARG APP_DIRECTORY=
ARG DEV_DIRECTORY=
ARG DEBUG=
ARG NODE_ENV=development
ENV PROJECT_NAME ${PROJECT_NAME}
ENV APP_DIRECTORY /${PROJECT_NAME}
ENV WORKDIR ${APP_DIRECTORY}/${DEV_DIRECTORY}
ENV CONFIG_DIRECTORY etc/containers/wordpress
ENV DEBUG ${DEBUG}
ENV NODE_PATH ${NODE_PATH}
ENV NODE_ENV ${NODE_ENV}

RUN apk update && \
    apk upgrade && \
    apk add --update openssl nginx supervisor && \
    mkdir /run/nginx && \
    rm -rf /var/cache/apk/*

# add user www-data
RUN adduser -S www-data

RUN apk update && \
    apk upgrade && \
    apk add --update libressl libressl-dev \
    php7 \
    php7-fpm \
    php7-pdo_mysql \
    php7-ctype \
    php7-pdo \
    php7-zlib \
    php7-phar \
    php7-openssl \
    php7-cli \
    php7-common \
    php7-dev \
    php7-opcache \
    php7-gd \
    php7-intl \
    php7-mysqli \
    php7-curl \
    php7-json \
    php7-xsl \
    php7-xml \
    php7-pear && \
    mkdir /var/log/supervisor && \
    rm -rf /var/cache/apk/*

RUN rm /etc/nginx/conf.d/*

RUN mkdir -p ${APP_DIRECTORY}

COPY ${CONFIG_DIRECTORY}/nginx.conf /etc/nginx/conf.d/${PROJECT_NAME}.conf
COPY ${CONFIG_DIRECTORY}/php-fpm.conf /etc/php7/php-fpm.conf
COPY ${CONFIG_DIRECTORY}/php-fpm-pool.conf /etc/php7/fpm.d/php-fpm-pool.conf
COPY ${CONFIG_DIRECTORY}/php.ini /etc/php7/php.ini
COPY ${CONFIG_DIRECTORY}/supervisord.conf /etc/supervisord.conf

# Fix supervisord
RUN sed -i -e s/:project/${PROJECT_NAME}/g /etc/supervisord.conf
# Fix nginx
RUN sed -i -e s/:project/${PROJECT_NAME}/g /etc/nginx/conf.d/${PROJECT_NAME}.conf
RUN sed -i -e s/:app/${APP_NAME}/g /etc/nginx/conf.d/${PROJECT_NAME}.conf

# Forward request and error logs to docker log collector
RUN ln -sf /dev/stdout /var/log/nginx/access.log && ln -sf /dev/stderr /var/log/nginx/error.log

EXPOSE 80

ADD src/web ${APP_DIRECTORY}

RUN mkdir -p ${APP_DIRECTORY}/wp-content/uploads
RUN chmod 777 ${APP_DIRECTORY}/wp-content/uploads

CMD ["/usr/bin/supervisord"]
