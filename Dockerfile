FROM node:16-alpine as builder

WORKDIR /app

COPY package.json package-lock.json /app/

RUN npm install

COPY ./ /app/

# Build the project and copy the files
RUN npm run build


FROM nginx:alpine

#!/bin/sh

COPY ./nginx.conf /etc/nginx/nginx.conf

## Remove default nginx index page
RUN rm -rf /usr/share/nginx/html/*

# Copy from the stahg 1
COPY --from=builder /app/build /usr/share/nginx/html

#EXPOSE 3000 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]
