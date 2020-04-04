# Catch the train Server

## Setup Dev

### Install

> npm i

### Start

To start the application locally with mocked data: 

> npm start

To start the application locally or in prod with real ratp data:

> npm run start-prod

### Test

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
