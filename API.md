# Routes

## POST /auth/register

Creates a new user.

### Request Body

The request body should be a JSON object with the following properties:

```json
{
  "first_name": "Adham",
  "last_name": "Haddad",
  "username": "adhamhaddad",
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
  "username": "adhamhaddad",
  "email": "adhamhaddad.dev@gmail.com"
}
```

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
    "username": "adhamhaddad",
    "email": "adhamhaddad.dev@gmail.com",
  },
  "accessToken": "<Access-Token>"
}
```

## POST /auth/refresh-token

Refresh the access and refresh tokens.

### Request Headers

The request headers should have a Cookies with the following properties:

```json
  refreshToken="<Refresh-Token>"
```

### Response

If the refresh token is exists in redis and valid, the server will respond with a status code of 200 and a JSON object representing a new tokens:

```json
{
  "accessToken": "<Access-Token>",
}
```

## GET /users/:userId

Get a user by id.

### Request Headers

The request headers should have a Cookies with the following properties:

```json
  accessToken="<Access-Token>"
  refreshToken="<Refresh-Token>"
```

### Response

If the user is exists, the server will respond with a status code of 200 and a JSON object representing the received user:

```json
{
  "id": 1,
  "first_name": "Adham",
  "last_name": "Haddad",
  "username": "adhamhaddad",
  "email": "adhamhaddad.dev@gmail.com"
}
```

## PATCH /users/:userId

Get a user by id.

### Request Headers

The request headers should have a Cookies with the following properties:

```json
  accessToken="<Access-Token>"
  refreshToken="<Refresh-Token>"
```

### Request Body

The request body should be a JSON object with the following properties:

```json
{
  "first_name": "Adham",
  "last_name": "Ashraf",
  "username": "adhamhaddad",
  "email": "adhamhaddad.dev@gmail.com"
}
```

### Response

If the user is exists and updated, the server will respond with a status code of 204 and a JSON object representing the received user:

```json
{
  "id": 1,
  "first_name": "Adham",
  "last_name": "Ashraf",
  "username": "adhamhaddad",
  "email": "adhamhaddad.dev@gmail.com"
}
```
