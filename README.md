# expressTodo2022
nodeJs, Express, nodemon CRUD practice (no db connection)

## install dependencies
npm install

## serve with hot reload at [localhost:3030](http://localhost:3030)
nodemon index.js
- - -
## REST API
### GetTodoList
GET - http://localhost:3030/list/GET_LIST

### GetTodoItem
GET - http://localhost:3030/list/GET_ITEM/{id}

### CreateItem
POST - http://localhost:3030/list/CREATE_ITEM
    /* requestBody */  
    {
        "content": "Hello World!"
    }

### UpdateItem
PUT - http://localhost:3030/list/UPDATE_ITEM/{id}
    /* requestBody */  
    {
        "isChecked": true,
        "content": "Happy day"
    }

### DeleteItem
DELETE - http://localhost:3030/list/DELETE_ITEM/{id}