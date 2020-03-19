# Deployment

## 1 Run locally

### Run npm

> npm i --only=production

> npm run start-prod

### Test locally

URL: http://localhost:8080/schedules

if you have any problem to reach localhost, try 127.0.0.1

## 2 Run in Docker

### Build Docker image

> docker build --tag ctt-server:nodejs .

You can check the docker image has been created ('docker images' command).

### Run the Docker image

> docker run --rm -p 8034:8080 ctt-server:nodejs

In case of connection problem try: docker stop \$(docker ps -a -q)

You can check the docker container is running ('docker ps' command).

### 1.3.2 Test the Docker image

URL: http://localhost:8034/schedules

if you have any problem to reach localhost, try 127.0.0.1
