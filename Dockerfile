FROM node:17.6.0-alpine3.14 as main

RUN npm install --global nodemon

RUN adduser -S \
--disabled-password \
 master 

WORKDIR /code

RUN chown master -R /code/
RUN chown master -R /usr/local/lib/

USER master

COPY --chown=master:master /src /code/src/
COPY --chown=master:master /public /code/public/
COPY --chown=master:master package.json /code/
COPY --chown=master:master server.js /code/
COPY --chown=master:master nodemon.json /code/
COPY --chown=master:master .env /code/
# COPY --chown=master:master boot.sh /code/

RUN npm install


CMD npm run dev
