# Temperature Scale Conversion API

## Tools and Frameworks

* Nodejs
* Yarn
* Serverless
* Typescript
* Jest

## Installation Instructions

Setup NodeJS
Setup Yarn <https://classic.yarnpkg.com/lang/en/docs/install/>
Setup Serverless CLI <https://www.serverless.com/framework/docs/getting-started>

Running locally . This should spin up a local server and deploy the APIs on it

```sh
yarn install
yarn build
sls offline 
```

Run test

```sh
yarn test
yarn bundle-test // test transpiled code 
```

AWS deployment

```sh
serverless deploy
```

Note : This assumes that you have AWS credentials in config or via env variables

AWS Deploy

## NOTES

### Tools Used

* The API are built with Typescript Nodejs
* Used library Jest for simple Unit testing
* Using Serverless Framework to deploy infrastructure creation on AWS
* Using AWS API Gateway and Lambda for the current requirement easy to build and deploy and cost effective

### API Design

Added three APIs considering the requirement . Refer OpenAPI Doc - doc/openapi.yml
I have added 2 seperate APIS as well for celcius to Farenheit and Farenheit to Celcius conversion seperately

* This allows us to have granular control over the API if clients are allowed to access only one of them. (eg. They can be seperate scopes in OAuth JWT Security )
* Seprate APIS are easy to manage by path at ingress/proxy layer

All the APIs are POST APIs . As path parameters and query paramters dont fit the requirement as we are not identifying a resource on the backend nor we are filtering information

Notes :

* Generic response bodies across all three APIs
* Computed Value and Scale are in seperate fields in the response
