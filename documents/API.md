# Routes

## POST /auth/register

Creates a new user.

### Request Body

The request body should be a JSON object with the following properties:

```json
{
  "first_name": "Adham",
  "last_name": "Haddad",
  "email": "adhamhaddad.dev@gmail.com",
  "password": "secret-password"
}
```

### Response

If the user is successfully created, the server will respond with a status code of 201 and a JSON object representing the new user:

```json
{
  "id": 1,
  "first_name": "Adham",
  "last_name": "Haddad",
  "email": "adhamhaddad.dev@gmail.com"
}
```

<hr />

## POST /auth/login

Authenticate user.

### Request Body

The request body should be a JSON object with the following properties:

```json
{
  "email": "adhamhaddad.dev@gmail.com",
  "password": "secret-password"
}
```

### Response

If the user is exists and authenticated successfully, the server will respond with a status code of 200 and a JSON object representing the authenticated user:

```json
{
  "user": {
    "id": 1,
    "first_name": "Adham",
    "last_name": "Haddad",
    "email": "adhamhaddad.dev@gmail.com"
  },
  "accessToken": "<Access-Token>",
  "refreshToken": "<Refresh-Token>"
}
```

<hr />

## POST /auth/auth-me

Refresh the access and refresh tokens.

### Request Headers

The request headers should have the following properties:

```json
"headers": {
    "Authorization": "Bearer <Access-Token>",
    "X-Refresh-Token": "Bearer <Refresh-Token>"
}
```

### Response

If the refresh token is exists in redis and valid, the server will respond with a status code of 200 and a JSON object representing a new tokens:

```json
{
  "accessToken": "<Access-Token>"
}
```

<hr />

## POST /auth/refresh-token

Refresh the access and refresh tokens.

### Request Headers

The request headers should have the following properties:

```json
"headers": {
    "Authorization": "Bearer <Access-Token>",
    "X-Refresh-Token": "Bearer <Refresh-Token>"
}
```

### Response

If the refresh token is exists in redis and valid, the server will respond with a status code of 200 and a JSON object representing a new tokens:

```json
{
  "accessToken": "<Access-Token>"
}
```

<hr />

## GET /users/:userId

Get a user by id.

### Request Headers

The request headers should have the following properties:

```json
"headers": {
    "Authorization": "Bearer <Access-Token>",
    "X-Refresh-Token": "Bearer <Refresh-Token>"
}
```

### Response

If the user is exists, the server will respond with a status code of 200 and a JSON object representing the received user:

```json
{
  "id": 1,
  "first_name": "Adham",
  "last_name": "Haddad",
  "email": "adhamhaddad.dev@gmail.com"
}
```
