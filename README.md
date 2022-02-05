# Kickstart App
TBD

## Requirements
* Node.js: >14.18.1
* Docker

## Setup

```
yarn
```

### Environment variables
Copy `.env.local.template` to `.env.local` and replace all needed keys/values. `.env.local` is only used for local development and is ignored by git.


## Usage

### nvm @mac
```
nvm use -lts
```

### Run application

##### Run client and server in develop mode
```
yarn start:dev
```

##### Run client and server separately
```
yarn server start:dev
yarn client start:dev
```

##### Run server in debug mode
```
yarn server start:debug
```

##### Bump app version
This command will also update versions in all workspaces.
```
yarn run version:set  <version>
```

### Commons and libraries

DTO module:
```
# development
yarn dto build

# watch mode
yarn dto build:watch
```


### Build application

##### Build app for production
```
yarn build
```

##### Run the production build
```
yarn start:dist
```


### App deployment

The application is deployed automatically by Jenkins when a git commit is pushed to these branches: `development`, `integration`, `master`

It is possible to force a deployment from another branch to the `development` environment by setting the environment variable `FORCE_DEV_DEPLOYMENT` in the Jenkinsfile to `true`.



## Troubleshot
- In case changes to modules in libs aren't included in your app, stop your app, delete dist folder and rebuilt the module

## Kickstart CRUD Source
- https://dev.to/carlomigueldy/building-a-restful-api-with-nestjs-and-mongodb-mongoose-2165

## History
[Changelog](ChangeLog)
