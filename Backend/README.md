# The backend API for the Bus Management System
## Directly using the backend hosted online
If you are lazy to configure and install stuff, I hosted the backend API on Google Compute Engine, so you can just type in `http://35.201.158.77:3100/` to access the API. Try `http://35.201.158.77:3100/ping` for API server connection.

## Configuring environment and starting the server
### Staring up the PostgreSQL server
I use PostgreSQL as the backend database. Here is how you start it up.

First, [Install PostgreSQL](https://www.postgresqltutorial.com/install-postgresql/), make sure to set the password as `csci3100` and port to `5432` during the installation step. Then, open the `SQL Shell` and log in using the username `postgres` and password `csci3100`. Next, type in the following command to create the `busApp` database:

```
CREATE DATABASE busapp;
```

**Do not close the SQL Shell while running the backend.**

### Running the backend
First, install [Go](https://golang.org/doc/install). Then run the following command in **this directory** to start the backend system.

```
go get
go run .
```

When running for the second time, make sure to run it as

```
go run . -nomock
```

so that the mock database records won't be generated (thus causing the database conflict error).

Open the browser, type `http://localhost:3100/ping`. If it shows `ok`, you're all set up to use this API!

*I tested this on both Windows and macOS, it should all be fine. However, message me if anything is wrong.*

## How to use a RESTful web API?
### for PHP
[Read this](https://weichie.com/blog/curl-api-calls-with-php/)

### for React Native (Expo)
[Read This](https://ithelp.ithome.com.tw/articles/10187243)

## APIs in Details
All APIs are passed in the form of JSON.
Make sure to prefix the URLs with `http://localhost:3100`. For example, when calling the `ping` API, send a request to `http://localhost:3100/ping`.

### Ping
| Method |     URL     | Description                | API Token Required |
| ------ | ----------- | -------------------------- | ------------------ |
| GET    | /ping       | Check if the server is up. | No                 |

#### GET `/ping`
Used to test whether is server is up or not. If the server is up, it will reply with "ok" in the response body.

* `404 Not Found` will be returned for every failed `GET` request.

### Register & Log in

| Method |     URL     | Description      | API Token Required |
| ------ | ----------- | ---------------- | ------------------ |
| POST   | /register   | Register a user. | No                 |
| POST   | /login      | Login a user.    | No                 |
| POST   | /logout     | Logout a user.   | Yes                |

#### POST `/register`
The POST body should contain the following JSON format:

```
{
    "username": "The username (between 6 and 20 characters)",
    "isAdmin": 1 or 0,
    "password": "The password of the user (between 6 and 20 characters)",
    "email": "The email of the user"
}
```

[How to submit a POST body (in React)?](https://stackoverflow.com/questions/52057337/post-request-in-react)

If the POST request succeeded, `201 Created` will be returned with an empty body.

Otherwise, if the request failed, `400 Bad Request` will be returned with a body in the following JSON format:

```
{
    "error": "The reason of the failure."
}
```

#### POST `/login`
The POST body should contain the following JSON format:

```
{
    "username": "The username",
    "password": "The password"
}
```

If the POST request succeeded, `200 OK` will be returned with a response body in the following JSON format:

```
{
    "apiToken": "<api-token>"
}
```

The api token is required for some of the APIs such as create, update, and delete. **Only the administrator-user will receive a valid API token.**

If the POST request failed, `400 Bad Request` will be returned with the following JSON:

```
{
    "error": "The reason of the failure."
}
```

#### POST `logout`
The POST body should contain the following JSON format:

```
{
    "apiToken": "The apiToken for the user."
}
```

If the POST request succeeded, `200 OK` will be returned with an empty body.

If the POST request failed, `400 Bad Request` will be returned with the following JSON:

```
{
    "error": "The reason of the failure."
}
```

### Bus Route
Bus Route represents the bus routes which buses can follow. Each Bus Route can be uniquely identified by the **Route ID**.

| Method |     URL     | Description                               | API Token Required |
| ------ | ----------- | ----------------------------------------- | ------------------ |
| GET    | /route      | Return the list of all routes.            | No                 |
| GET    | /route/{id} | Return the route {id}.                    | No                 |
| POST   | /route      | Add a new route.                          | Yes                |
| PUT    | /route/{id} | Update the information of the route {id}. | Yes                |
| DELETE | /route/{id} | Delete the route {id}.                    | Yes                |

#### GET `/route`
The full list of the routes will be returned in the following JSON format:

```
{
    "routes": [
        {
            "routeID": 1,
            "routeName": "the route name",
            "buses": [
                {
                    "busID": 1,
                    "latitude": 22.396427,
                    "longitude": 114.109497
                },
                {
                    "busID": 2,
                    "latitude": 22.5893,
                    "longitude": 114.3245
                },
                ...
            ],
            "stations": [
                {
                    "orderInRoute": 1,
                    "stationID": 11,
                    "stationName": "United College",
                    "latitude": 22.52342,
                    "longitude": 114.532523
                },
                {
                    "orderInRoute": 2,
                    "stationID": 17,
                    "stationName": "New Asia College",
                    "latitude": 22.6342,
                    "longitude": 114.552523
                },
                ...
            ]
        },
        {
            "routeID": 2,
            "routeName": "some fancy route name",
            "buses": [...],
            "stations": [...]
        },
        ...
    ]
}
```

* `routes` will be sorted by `routeID`.
* `buses` are the active buses running in the route, they will be sorted by `busID`.
* `stations` are the bus stops in the route, they will be sorted by `orderInRoute`.

#### GET `/route/{id}`
The route with `{id}` will be returned in the following JSON format:

```
{
    "routeName": "the route name",
    "buses": [
        {
            "busID": 1,
            "latitude": 22.396427,
            "longitude": 114.109497
        },
        {
            "busID": 2,
            "latitude": 22.5893,
            "longitude": 114.3245
        },
        ...
    ],
    "stations": [
        {
            "orderInRoute": 1,
            "stationID": 11,
            "stationName": "United College",
            "latitude": 22.52342,
            "longitude": 114.532523
        },
        {
            "orderInRoute": 2,
            "stationID": 17,
            "stationName": "New Asia College",
            "latitude": 22.6342,
            "longitude": 114.552523
        },
        ...
    ]
}
```

* `buses` are the active buses running in the route, they will be sorted by `busID`.
* `stations` are the bus stops in the route, they will be sorted by `orderInRoute`.

#### POST `/route`
A new route will be created. The POST body should be in the following JSON format:

```
{
    "apiToken": "The API token issued upon logging in.",
    "routeName": "the route name",
    "stationIDs": [
        44,
        11,
        ...
    ]
}
```

* `stationIDs` should be sorted in the order of the actual route. (A station should first be created using `POST /station` to obtain a unique `stationID`.)

If the POST request succeeded, `201 Created` will be returned with a response body in the following JSON format:

```
{
    "routeID": 1
}
```
* `routeID` is the unique ID for the newly created route.

If the `apiToken` is invalid, `401 Unauthorized` will be returned.

If there are other errors, `400 Bad Request` will be returned with a body in the following JSON format:

```
{
    "error": "The reason of the failure."
}
```

#### PUT `/route/{id}`
The existing route with `{id}` will be updated. The PUT body should be in the following JSON format:

```
{
    "apiToken": "The API token issued upon logging in.",
    "routeName": "the route name",
    "stationIDs": [
        44,
        11,
        ...
    ]
}
```

* `stationIDs` should be sorted in the order of the actual route. (A station should first be created using `POST /station` to obtain a unique `stationID`.)

If the PUT request succeeded, `200 OK` will be returned.

If the `apiToken` is invalid, `401 Unauthorized` will be returned.

If there are other errors, `400 Bad Request` will be returned with a body in the following JSON format:

```
{
    "error": "The reason of the failure."
}
```

#### DELETE `/route/{id}`
The existing route with `{id}` will be deleted. The DELETE body should be in the following JSON format:

```
{
    "apiToken": "The API token issued upon logging in."
}
```

If the DELETE request succeeded, `200 OK` will be returned.

If the `apiToken` is invalid, `401 Unauthorized` will be returned.

### Bus
Bus represents the active buses driven on a bus route. Each bus can be uniquely identified by the bus id.

| Method |     URL             | Description                                      | API Token Required |
| ------ | ------------------- | ------------------------------------------------ | ------------------ |
| GET    | /bus                | Return the list of all buses.                    | No                 |
| GET    | /bus/{id}           | Return the bus {id}.                             | No                 |
| POST   | /bus                | Add a new bus.                                   | Yes                |
| PUT    | /bus/{id}           | Update the bus {id}.                             | Yes                |
| DELETE | /bus/{id}           | Delete the bus {id}.                             | Yes                |

#### GET `/bus/{routeID}`
The full list of buses in the route with `{routeID}` will be returned in the following JSON format:

```
{
    "buses": [
        {
            "busID": 1,
            "routeID": 1,
            "latitude": 25.12345,
            "longitude": 114.21311
        },
        {
            "busID": 2,
            "routeID": 2,
            "latitude": 23.123123,
            "longitude": 114.12312321
        },
        ...
    ]
}
```

* `buses` will be sorted by `busID`.

#### GET `/bus/{id}`
The bus with `{id}` in route with `{routeID}` will be returned in the following JSON format:

```
{
    "routeID": 2,
    "latitude": 25.12345,
    "longitude": 114.1231
}
```

#### POST `/bus`
A new bus will be created. The POST body should be in the following JSON format:

```
{
    "apiToken": "The API token issued upon logging in.",
    "routeID": 1,
    "latitude": 0.12313,
    "longitude": 1.3213
}
```

The `routeID` must be an existing route.

If the POST request succeeded, `201 Created` will be returned with a response body in the following JSON format:

```
{
    "busID": 1
}
```

* `busID` is the unique ID for the newly created bus.

If the `apiToken` is invalid, `401 Unauthorized` will be returned.

If there are other errors, `400 Bad Request` will be returned with a body in the following JSON format:

```
{
    "error": "The reason of the failure."
}
```

#### PUT `/bus/{id}`
The existing bus with `{id}` will be updated. The PUT body should be in the following JSON format:

```
{
    "apiToken": "The API token issued upon logging in.",
    "routeID": 2,
    "latitude": 11.111,
    "longitude": 22.222
}
```
If the PUT request succeeded, `200 OK` will be returned.

If the `apiToken` is invalid, `401 Unauthorized` will be returned.

If there are other errors, `400 Bad Request` will be returned with a body in the following JSON format:

```
{
    "error": "The reason of the failure."
}
```

#### DELETE `/bus/{id}`
The existing bus with `{id}` will be deleted. The DELETE body should be in the following JSON format:

```
{
    "apiToken": "The API token issued upon logging in."
}
```

If the DELETE request succeeded, `200 OK` will be returned.

If the `apiToken` is invalid, `401 Unauthorized` will be returned.

### Station
A station represents a bus stop. It can be uniquely identified by the **station ID**. Note that the same station can be in multiple bus routes.

| Method |     URL           | Description                       | API Token Required |
| ------ | ----------------  | --------------------------------- | ------------------ |
| GET    | /station          | Return the list of all stations.  | No                 |
| GET    | /station/{id}     | Return the station {id}.          | No                 |
| POST   | /station          | Add a new station.                | Yes                |
| PUT    | /station/{id}     | Update the station {id}.          | Yes                |
| DELETE | /station/{id}     | Delete the station {id}.          | Yes                |

#### GET `/station`
The full list of the stations will be returned in the following JSON format:

```
{
    "stations": [
        {
            "stationID": 1,
            "stationName": "the best station",
            "latitude": 11.2323,
            "longitude": 33.22123,
            "routeIDs": [
                2,
                5,
                ...
            ]
        },
        {
            "stationID": 2,
            "stationName": "also pretty good station",
            "latitude": 44.1111,
            "longitude": 33.2222,
            "routeIDs": [...]
        },
        ...
    ]
}
```

* `stations` are sorted by `stationID`.
* `routeIDs` are the routes which stop at the station.

#### GET `/station/{id}`
The station with `{id}` will be returned in the following JSON format:

```
{
    "stationName": "the best station",
    "latitude": 11.2323,
    "longitude": 33.22123,
    "routeIDs": [
        2,
        5,
        ...
    ]
}
```

* `routeIDs` are the routes which stop at the station.

#### POST `/station`
A new station will be created. The POST body should be in the following JSON format:

```
{
    "apiToken": "The API token issued upon logging in.",
    "stationName": "the name of the station",
    "latitude": 44.4444,
    "longitude": 55.555
}
```

If the POST request succeeded, `201 Created` will be returned with a response body in the following JSON format:

```
{
    "stationID": 1
}
```
* `stationID` is the unique ID for the newly created route.

If the `apiToken` is invalid, `401 Unauthorized` will be returned.

If there are other errors, `400 Bad Request` will be returned with a body in the following JSON format:

```
{
    "error": "The reason of the failure."
}
```

#### PUT `/station/{id}`
The existing station with `{id}` will be updated. The PUT body should be in the following JSON format:

```
{
    "apiToken": "The API token issued upon logging in.",
    "stationName": "The name of the station",
    "latitude": 44.4444,
    "longitude": 55.555
}
```

If the PUT request succeeded, `200 OK` will be returned.

If the `apiToken` is invalid, `401 Unauthorized` will be returned.

If there are other errors, `400 Bad Request` will be returned with a body in the following JSON format:

```
{
    "error": "The reason of the failure."
}
```

#### DELETE `/station/{id}`
The existing station with `{id}` will be deleted. The DELETE body should be in the following JSON format:
```
{
    "apiToken": "The API token issued upon logging in."
}
```

If the DELETE request succeeded, `200 OK` will be returned.

If the `apiToken` is invalid, `401 Unauthorized` will be returned.

## The full API table
| Method |     URL             | Description                                      | API Token Required |
| ------ | ------------------- | ------------------------------------------------ | ------------------ |
| GET    | /ping               | Check if the server is up.                       | No                 |
| POST   | /register           | Register a user.                                 | No                 |
| POST   | /login              | Login a user.                                    | No                 |
| POST   | /logout             | Logout a user.                                   | Yes                |
| GET    | /route              | Return the list of all routes.                   | No                 |
| GET    | /route/{id}         | Return the route {id}.                           | No                 |
| POST   | /route              | Add a new route.                                 | Yes                |
| PUT    | /route/{id}         | Update the information of the route {id}.        | Yes                |
| DELETE | /route/{id}         | Delete the route {id}.                           | Yes                |
| GET    | /bus                | Return the list of all buses.                    | No                 |
| GET    | /bus/{id}           | Return the bus {id}.                             | No                 |
| POST   | /bus                | Add a new bus.                                   | Yes                |
| PUT    | /bus/{id}           | Update the bus {id}.                             | Yes                |
| DELETE | /bus/{id}           | Delete the bus {id}.                             | Yes                |
| GET    | /station            | Return the list of all stations.                 | No                 |
| GET    | /station/{id}       | Return the station {id}.                         | No                 |
| POST   | /station            | Add a new station.                               | Yes                |
| PUT    | /station/{id}       | Update the station {id}.                         | Yes                |
| DELETE | /station/{id}       | Delete the station {id}.                         | Yes                |
