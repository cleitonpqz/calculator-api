# calculator-api

## Requirements

- Node.js 18

## Common local setup

```bash
npm install
npm install knex -g
knex migrate:latest
knex seed:run
```

## To start the local server, run the following

```bash
npm start
```

# Rest API

## User SignUp

`POST /api/v1/auth/signup`

#### Request Body

- `username`: email format required
- `password`: min 8 characters

```
{
    "username": "account@email.com",
    "password": "12345678"
}
```

#### Response

- `201` User Registered
- `400` Bad Request (Validation failed)

##### Response Body

```
{
    "message": "User was registered successfully!"
}
```

# Rest API

## User

### Signin

`POST /api/v1/auth/signin`

#### Request body

```
{
    "username": "account@email.com",
    "password": "12345678"
}
```

#### Response status

- `200` Ok
- `404` Not found

##### Response body

```
{
    "id": 3,
    "username": "cleitonpqz@gmail.com",
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNjk2ODUxNDg1LCJleHAiOjE2OTY5Mzc4ODV9._lWLPzF4rf62797yOvdTpMAmC25_6-AugjJgM4DpALM"
}
```

- `id`: User id
- `username`: Email account
- `accessToken`: JWT token to be passed for other operations

## Operations

### Get Operations

`GET /api/v1/operations`

### Headers

```
Authorization: Bearer <accessToken>
```

### Reponse status

- `200` List of operations

#### Response body

```
[
    {
        "id": 1,
        "type": "addition",
        "cost": 0.01,
        "status": 1,
        "created_at": "2023-10-02 12:50:35",
        "updated_at": "2023-10-02 12:50:35"
    },
]
```

## Records

### Get Records

`GET /api/v1/records`

### Headers

```
Authorization: Bearer <accessToken>
```

### Optional params

- `search`: find by operation response field
- `page`
- `per_page`

### Reponse status

- `200` List of records

#### Response body

```
{
    "records": [
        {
            "id": 2,
            "amount": 10,
            "user_balance": 100.01,
            "operation_response": "addition of 10",
            "status": 1,
            "user_id": 3,
            "operation_id": 1,
            "created_at": "2023-10-08 22:52:20",
            "updated_at": "2023-10-08 22:52:20"
        },
        {
            "id": 3,
            "amount": 10,
            "user_balance": 100.01,
            "operation_response": "square of 10",
            "status": 1,
            "user_id": 3,
            "operation_id": 1,
            "created_at": "2023-10-08 23:02:08",
            "updated_at": "2023-10-08 23:02:08"
        }
    ],
    "total": 9,
    "page": 1,
    "per_page": 2,
    "pages": 5
}
```

### Create Record

`POST /api/v1/records`

### Headers

```
Authorization: Bearer <accessToken>
```

#### Request body

```
{
    "operation_id": 6,
    "amount": 10,
    "user_balance": 0
}
```

### Reponse status

- `201` Created
- `400` Request body validation
- `402` User balance with insufficent funds

#### Response body

```
{
    "id": 11,
    "operation_id": 6,
    "user_id": 3,
    "amount": 10,
    "user_balance": 109.9,
    "operation_response": "6gCZVfyOYtaslAKmhWe5X49K1p4dAx",
    "created_at": "2023-10-09 13:41:46",
    "updated_at": "2023-10-09 13:41:46"
}
```

### Delete Record

`POST /api/v1/records/:id`

### Headers

```
Authorization: Bearer <accessToken>
```

### Reponse status

- `200` Created

#### Response body

```
Record removed successfully
```
