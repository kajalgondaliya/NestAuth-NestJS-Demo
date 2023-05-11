# Nest sample project

## Description
Simple signup and login flow using Nest.js, TypeORM and JWT.

## Installation

```bash
$ npm install
```

# TypeORM
First change typeORM configuration in app.module.ts file according tou your system.and then start mysql server.

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
npm run start:prod
```
Project will start on port 3000 on localhost (http://localhost:3000).

## Test
No tests included this time. Just playing around with the framework.

## Functionality
The project contain for functionality as given below.

- signUp
- login
- user account deactivation
- user account deletion

## signUp
To create user you need to pass email,name,password in body of API (http://localhost:3000/auth/signup).
Multiple user can not be created with same email.

## login
For login you need to pass email and password in body of API (http://localhost:3000/auth/login).

## user account deactivation
To deactivate user account you need to pass password of that user in body API and id of user in params of API.
### Example
API- (http://localhost:3000/users/5/account-deactivation)
BODY-"password":"1234"

## user account deletion    
To deactivate user account you need to pass password of that user in body API and id of user in params of API.
### Example
API- (http://localhost:3000/users/5/account-deletion)
BODY-"password":"1234"


