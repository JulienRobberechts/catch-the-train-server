# Catch the train Server

This project is the backend of the 'Catch the train' web application. The react frontend project is is also on github: [https://github.com/JulienRobberechts/catch-the-train-client](https://github.com/JulienRobberechts/catch-the-train-client).

The application Catch the train in production: [https://catch-the-train.dev-app.space](https://catch-the-train.dev-app.space) (if deployed)

## Setup the environment

### Install

> npm i

### Start

To start the application locally with mocked data: 

> npm start

To start the application locally or in prod with real ratp data:

> npm run start-prod

## Test

To run tests:

> npm test

then query the api at ['http://localhost:3034/next-trains/rers/A/chatelet+les+halles?missions=UPAC,ZEBU'](http://localhost:3034/next-trains/rers/A/chatelet+les+halles?missions=UPAC,ZEBU)

or one of the query in [requests-next-train.http](./tests/smokeTests/requests-next-train.http)

```
Warning: Mocked data is only returning 'rers/A/chatelet+les+halles'
```

To run tests with watch mode:

> npm run test-watch

To run update the snapshot tests:

> npm run test-update

to launch the app

### Code coverage

open the generated file: [coverage report](./coverage/lcov-report/index.html)

## Deployment

#### Build Docker the image

[Build Docker the image](./doc/1.deploy-locally.md)

#### Deploy on AWS

[Deploy on AWS Fargate with a load balancer](./doc/2.2.deploy-aws-fargate.md)

