from fastapi import FastAPI

# without pydantic, basci functionality with vulnerabilities
# README for enum

api = FastAPI()

all_todos = [
    {
        "todo_id": 1,
        "todo_name": "Sports",
        "todo_description": "Go to the gym"
    },
    {
        "todo_id": 2,
        "todo_name": "Read",
        "todo_description": "Read 10 pages"
    },
    {
        "todo_id": 3,
        "todo_name": "Shop",
        "todo_description": "Go shopping"
    },
    {
        "todo_id": 4,
        "todo_name": "Study",
        "todo_description": "Study for exam"
    },
    {
        "todo_id": 5,
        "todo_name": "Meditate",
        "todo_description": "Meditate 20 minutes"
    }
]

# GET, POST, PUT, DELETE

# localhost:8000/
@api.get('/')
def index():
    return {"Logan": "Hey Bub!"}

# localhost:8000/todos
# localhost:8000/todos?first_n=2
@api.get('/todos')
def get_all_todos(first_n:int = None): # must mention :int otherwise by default, api will look for string. FastAPI uses PyDantic for type verification
    if first_n:
        return all_todos[:first_n]
    else:
        return all_todos

# The path /todos has no {placeholders}
# So first_n can't be a path parameter — FastAPI treats it as a query parameter
# Called like: /todos?first_n=5

# localhost:8000/2
@api.get('/todo/{todo_id}')
def get_todo(todo_id: int): # normally this call would be to a database and would be async
    for todo in all_todos:
        if todo['todo_id'] == todo_id:
            return {'result': todo}
    return "404 does not exist"
         
         
# parameter name found in {path}  →  path parameter   → part of the URL
# parameter name NOT in path      →  query parameter  → comes after ?


@api.post('/todos')
def create_todo(todo: dict):
    new_todo_id = max([todo_e['todo_id'] for todo_e in all_todos])+1
    new_todo = {
        'todo_id': new_todo_id,
        'todo_name': todo['todo_name'],
        'todo_description': todo['todo_description']
    }
    
    all_todos.append(new_todo)
    return new_todo

# PUT — replace the entire user (need to send all values in request)
# PATCH — update just one field (need to send just the updated value)
@api.put('/todos/{todo_id}')
def update_todo(todo_id: int, updated_todo: dict):
    for todo in all_todos:
        if todo['todo_id'] == todo_id:
            todo['todo_name'] = updated_todo['todo_name']
            todo['todo_description'] = updated_todo['todo_description']
            return todo
    return "Error, not found"

# delete
@api.delete('/todo/{todo_id}')
def delete_todo(todo_id:int):
    for todo in all_todos:
        if todo['todo_id']==todo_id:
            deleted = all_todos.pop(todo["todo_id"])
            return deleted
    return "Error, not found"
