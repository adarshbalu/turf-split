# Getting started

- Install Firebase

```
npm install firebase
```

- Install JSON Server

```
npm install json-server
```
Run Json server :
```
json-server --watch db.json
```
JSON Schema : 
```
{
    "users": [
        {
        "id": 1,
        "name": "username",
        "email": "username@email.com",
        "balance": 10,
        "events": [10, 20]
    },
    {
        "id": 2,
        "name": "name",
        "email": "name@email.com",
        "balance": -200,
        "events": [4, 6]
    }
    ],
    "events": [
        {
        "id": 1,
        "name": "some comment",
        "date": "2014-01-01T23:28:56.782Z",
        "amount": 400,
        "paidBy": 1,
        "players": [1, 2]
    },
    {
        "id": 2,
        "name": "some new comment",
        "date": "2014-01-01T23:28:56.782Z",
        "amount": 400,
        "paidBy": 7,
        "players": [10, 6,9,5,2]
    }
    ]

}
```
- Folder Structure

```
project
│   README.md
│   tsconfig.json
|     
│
└───src
│   │   index.css
│   │   index.tsx
|   |   react-app-env.d.ts
│   │
│   └─── components
│   └─── services
│   └─── types    
|   └─── utils
│       
|
│   
└───public
    │   index.html
    │   ...

```

- Firebase - Google authentication
- JSON server - User and event management