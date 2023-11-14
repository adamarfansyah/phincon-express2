## API Reference

## URL

_Server_

```
http://localhost:3000
```

## Global Response

_Response (500 - Internal Server Error)_

```
{
  "message": "Internal Server Error"
}
```

## RESTful endpoints

### POST /api/pokemon/catch/:pokemonName

> Catch Pokemon by pokemon name

_Request Header_

```
not needed
```

_Request Body_

```
not needed
```

_Response (200)_

```
{
    "data": [<data_pokemon>],
    "status": "Success"
}
```

_Response (400 - Pokemon Already Existed)_

```
{
    "message": "Pokemon Already Existed"
}
```

_Response (400 - Catch unsuccessful)_

```
{
    "message": "Catch unsuccessful"
}
```

_Response (500 - Server Error)_

```
{
    "message": "Server Error"
}
```

### GET /

#### Pokemon List

```http
    GET /api/pokemon/
```

_Request Header_

```
not needed
```

_Request Body_

```
not needed
```

_Response (200)_

```
{
    "data": [<data_pokemon>],
    "status": "Success"
}
```

_Response (500 - Server Error)_

```
{
    "message": "Server Error"
}
```

#### Pokemon Detail

```http
    GET /api/pokemon/:pokemonName
```

_Request Header_

```
not needed
```

_Request Body_

```
not needed
```

_Request Params_

```
pokemonName
```

_Response (200)_

```
{
    "data": [<data_pokemon>],
    "status": "Success"
}
```

_Response (404 - Data not found)_

```
{
    "message": "Data not found"
}
```

_Response (500 - Server Error)_

```
{
    "message": "Server Error"
}
```

#### Get List My Pokemon List

```http
    GET /api/myPokemonList
```

_Request Header_

```
not needed
```

_Request Body_

```
not needed
```

_Response (200)_

```
{
    "data": [<data_pokemon>],
    "status": "Success"
}
```

_Response (404 - Data not found)_

```
{
    "message": "Data not found"
}
```

_Response (500 - Server Error)_

```
{
    "message": "Server Error"
}
```

### PUT /api/pokemon/rename/:id

> Update by id

_Request Params_

```
/<id_pokemon_list>
```

_Request Header_

```
not needed
```

_Request Body Pokemon Name_

```
{
    "name": "<string.min_length(0).max_length(12)>",
}
```

_Response (200)_

```
{
    "data": [
        <my_pokemon_list_data>
    ],
    "message": "Success"
}
```

_Response (400 - Validation Error)_

```
{
    "status": 404,
    "message": "\"value\" length must be less than or equal to 12 characters long"
}
```

_Response (404 - Error Not Found)_

```
{
    "message": "Data Not Found"
}
```

### DELETE /api/pokemon/release/:id

> Delete pokemon on my pokemon list

_Request Params_

```
/<id_pokemon_list>
```

_Request Header_

```
not needed
```

_Request Body_

```
not needed
```

_Response (200)_

```
{
    "message": "Success"
}
```

_Response (404 - Error Not Found)_

```
{
    "message": "Data Not Found"
}
```
