# Nodejs-Refresh-Token

## Description

Full Authentication & Authorization using nodejs, bcrypt, jsonwebtoken, and pg that integrates accessToken, and refresh token in an advanced way

## Dependencies

- Node v14.15.1 (LTS) or more recent. While older versions can work it is advisable to keep node to latest LTS version

- npm 6.14.8 (LTS) or more recent, Yarn can work but was not tested for this project

## Code Styles

This project uses `eslint` and `prettier`. all configurations for this project inside `package.json` file.

## Installation

### Database setup

**[1]** Open postgres terminal with: `psql postgres`

1- `CREATE DATABASE authentication;`

2- `CREATE ROLE admin WITH PASSWORD 'admin';`

3- `ALTER ROLE admin WITH SUPERUSER CREATEROLE CREATEDB LOGIN;`

4- `GRANT ALL PRIVILEGES ON DATABASE authentication TO admin;`

**[2]** Second to install the node_modules run `npm install` or `yarn`. After installation is done start the api in dev mode with `npm run dev` or `yarn dev`.

## Unit Tests

Unit test available using Jasmine with this command: `npm run test`

## Available Scripts

In the project directory, you can run:

##### `npm run dev` or `yarn dev`

Runs the app in the development mode.
The page will reload automatically if you make edits.

##### `npm run format` or `yarn format`

Will format by prettier and will also see if any lint errors in the console.

##### `npm run test` or `yarn test`

Launches the test runner in the interactive watch mode.
See the section about running tests for more information.

##### `npm run build` or `yarn build`

Builds the app for production to the dist folder.
It's format TypeScript to JavaScript

##### `npm run start` or `yarn start`

Build and runs the app in the clients mode.
Open <http://localhost:3000/> to view it in the browser.

## Built With

- [Node](https://nodejs.org) - Javascript Runtime
- [Express](https://expressjs.com/) - Javascript API Framework
- [PostgreSQL](https://www.postgresql.org/) - Open Source Relational Database
- [Jasmine](https://jasmine.github.io/) - Testing library
- [JWT](https://jwt.io/) - JSON Web Token for generates access and refresh tokens
