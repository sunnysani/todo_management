## About

Made as a takeaway task from a company.

This is an API Application sample for Authentication + Todo using Typescript with Express library and MongoDB database managed with typegoose library.

The file structure used is following Django Framework on Python conventional. Because I feel arranging APIs services file is better to be seperated at its own dedicated space.

```
.
├── src
│   ├── api
│   │   ├── auth
│   │   │   ├── controller.ts
│   │   │   ├── model.ts
│   │   │   ├── routes.ts
│   │   │   ├── schema.ts
│   │   │   └── services.ts
│   │   ├── todo
│   │   │   ├── controller.ts
│   │   │   ├── model.ts
│   │   │   ├── routes.ts
│   │   │   ├── schema.ts
│   │   │   └── services.ts
│   │   └── user
│   │   │   ├── controller.ts
│   │   │   ├── model.ts
│   │   │   ├── routes.ts
│   │   │   ├── schema.ts
│   │   │   └── services.ts
│   ├── middleware
│   │   ├── deserializeUser.ts
│   │   ├── requireUser.ts
│   │   └── validateResource.ts
│   ├── utils
│   │   ├── connectToDb.ts
│   │   ├── jwt.ts
│   │   └── logger.ts
│   ├── app.js
│   └── routes.js
├── tsconfig.json
├── package.json
└── README.md
```

## How To Run

### Prerequisite

Make sure NodeJS w/npm and MongoDB installed in your device.

Mongodb should be run at _mongodb://127.0.0.1:27017/_

Installation Links:

- https://nodejs.org/en/download/
- https://www.mongodb.com/docs/manual/installation/

### Step by step how to run this todo API

1. run **npm install**
2. run **npm run dev**

## How To Use The API

### In this API, you can do theese things

1. Register user
2. Login
3. Add a new todo
4. Get list of the todos (can filter based on creator)
5. Update the status of the todo (only by todo creator)
6. Delete existing todo (only by todo creator)

Note: The authentication method is using JWT, not OAuth. So the way to logout is just basiccally remove the accessToken & refreshToken on the client side.

### How To Access The API

**You can use Postman and than import every json file in the _./postman/_ folder and start testing.**

If not, you can use these curl command:

1. Register User:

```
curl --location --request POST 'http://localhost:3000/api/user/create' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "myemail2@gmail.com",
    "username": "myusername2",
    "password": "my-password",
    "passwordConfirmation": "my-password"
}'
```

2. Login User (Make sure to save the access-token & refresh-token):

```

curl --location --request POST 'http://localhost:3000/api/auth/login' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "myemail2@gmail.com",
    "password": "my-password"
}'
```

3. Create Todo (Use the access-token in the Bearer Authorization):

```
curl --location --request POST 'http://localhost:3000/api/todo/create' \
--header 'Authorization: Bearer <YOUR_ACCESS_KEY>' \
--header 'Content-Type: application/json' \
--data-raw '{
    "description": "By myusername"
}'
```

4. Get All Todo:

```
curl --location --request GET 'http://localhost:3000/api/todo' \
--header 'Authorization: Bearer <YOUR_ACCESS_KEY>'
```

5. Get Todo By Username:

```
curl --location --request GET 'http://localhost:3000/api/todo/myusername2' \
--header 'Authorization: Bearer <YOUR_ACCESS_KEY>'
```

6. Toggle Todo Status Todo By Username:

```
curl --location --request PUT 'http://localhost:3000/api/todo' \
--header 'Authorization: Bearer <YOUR_ACCESS_KEY>'
--header 'Content-Type: application/json' \
--data-raw '{
    "id": "<TODO_ID>"
}'
```

7. Delete Todo:

```
curl --location --request DELETE 'http://localhost:3000/api/todo' \
--header 'Authorization: Bearer <YOUR_ACCESS_KEY>'
--header 'Content-Type: application/json' \
--data-raw '{
"id": "<TODO_ID>"
}'
```

Any many more.

## Reference

JWT Auth implementation: https://github.com/TomDoesTech/auth-api-tutorial
