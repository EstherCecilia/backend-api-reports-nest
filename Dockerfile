FROM node:16-alpine as backend

WORKDIR /app
COPY package.json /app/package.json
RUN npm install
COPY . /app

CMD ["/bin/bash","/app/entrypoint.sh"]