#stage1
FROM node:16 as builder

WORKDIR /app
COPY package.json package-lock.json /app/
COPY .git/ ./.git/
RUN npm install
# Build the project and copy the files
COPY ./ /app/
RUN npm run build

#stage2
FROM nginx:alpine

#copy nginx conf, remove def index page, copy from first stage
COPY ./nginx.conf /etc/nginx/nginx.conf
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]
