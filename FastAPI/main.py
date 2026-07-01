from fastapi import FastAPI, HTTPException
# HTTPException is imported here (unlike basic.py) so we can return proper HTTP error codes
# like 404. In basic.py, errors were returned as plain strings like "Error, not found" which
# is bad practice — clients (browsers, apps) check status codes, not response text.

from typing import List, Optional
# List and Optional let us add type hints to function return values and model fields.
# basic.py had no type hints on responses, so FastAPI had no idea what shape the data would be.

from enum import IntEnum
# Lets us define a fixed set of named integer constants (e.g. priority levels).
# basic.py had no concept of priority at all.

from pydantic import BaseModel, Field
# Pydantic is the core difference between main.py and basic.py.
# In basic.py, todos were plain Python dicts — no validation, no structure enforced.
# Here, Pydantic models define exactly what fields exist, their types, and their constraints.
# If a request sends bad data (e.g. a name that's too short), FastAPI rejects it automatically.

api = FastAPI()

# ── SCHEMAS ──────────────────────────────────────────────────────────────────
# In basic.py there were no schemas — data was just raw dicts.
# Schemas define the "shape" of your data and are the standard approach because:
#   1. Validation is automatic — bad input is rejected before your code even runs
#   2. Auto-docs (/docs page) shows exactly what fields each endpoint expects/returns
#   3. Your editor can autocomplete field names (impossible with dicts)

class Priority(IntEnum):
    # Restricts priority to only these 3 integer values.
    # basic.py had no priority field, so any garbage value could have been stored.
    Low = 3
    Medium = 2
    High = 1

class TodoBase(BaseModel):
    # BaseModel is the Pydantic base class — any class that inherits from it gets
    # automatic validation, serialization, and documentation.
    # basic.py used plain dicts, so there was zero validation on any of these fields.
    todo_name: Optional[str] = Field(..., min_length=3, max_length=512, description='name of todo')
    # Field(...) means the field is required (... is Python shorthand for "required").
    # min_length/max_length are enforced automatically — FastAPI returns a 422 error if violated.
    todo_description: Optional[str] = Field(..., min_length=10, max_length=512, description='description of todo')
    priority: Optional[Priority] = Field(None, description='priority of todo')
    # Optional with a default of None means this field is not required in requests.

class TodoCreate(TodoBase):
    # Inherits all fields from TodoBase. Used specifically for POST (creating a todo).
    # We don't include todo_id here because the ID is assigned by the server, not the client.
    # In basic.py, create_todo accepted a raw dict — any fields (or no fields) could be sent.
    pass

class Todo(TodoBase):
    # Extends TodoBase with todo_id — this is the full todo as stored and returned by the API.
    # Having separate Create vs Read schemas is standard: clients never send IDs, servers always return them.
    todo_id: int = Field(..., description='Unique identifier of the todo')

class TodoUpdate(BaseModel):
    # Used for PUT requests. Fields are non-optional (no default) so the client MUST send all values.
    # basic.py's update_todo accepted a raw dict, so you could send partial/empty data with no error.
    todo_name: str = Field(..., min_length=3, max_length=512, description='name of todo')
    todo_description: str = Field(..., min_length=10, max_length=512, description='description of todo')
    priority: Priority = Field(default=Priority.Low, description='priority of todo')

# ── FAKE DATABASE ─────────────────────────────────────────────────────────────
# Still an in-memory list (same as basic.py), but now each item is a validated
# Pydantic object instead of a raw dict. This means typos in field names raise
# errors immediately rather than silently creating broken data.
all_todos = [
    Todo(
        todo_id=1,
        todo_name="Clean house",
        todo_description="Cleaning the house thoroughly",
        priority=Priority.High
    ),
    Todo(
        todo_id=2,
        todo_name="Sports",
        todo_description="Going to the gym for workout",
        priority=Priority.Medium
    ),
    Todo(
        todo_id=3,
        todo_name="Read",
        todo_description="Read chapter 5 of the book",
        priority=Priority.Low
    ),
    Todo(
        todo_id=4,
        todo_name="Work",
        todo_description="Complete project documentation",
        priority=Priority.Medium
    ),
    Todo(
        todo_id=5,
        todo_name="Study",
        todo_description="Prepare for upcoming exam",
        priority=Priority.Low
    )
]


# ── ENDPOINTS ─────────────────────────────────────────────────────────────────

# localhost:8000/
@api.get('/')
def index():
    return {"Logan": "Hey Bub!"}

# localhost:8000/todos
# localhost:8000/todos?first_n=2
@api.get('/todos', response_model=List[Todo])
# response_model tells FastAPI what shape the response will be.
# This does two things basic.py didn't do:
#   1. FastAPI validates the response before sending it (catches bugs in your own code)
#   2. The /docs page shows exactly what fields the response will contain
def get_all_todos(first_n: int = None):  # :int enforces type — FastAPI rejects non-integer values automatically
    if first_n:
        return all_todos[:first_n]
    else:
        return all_todos

# The path /todos has no {placeholders}
# So first_n can't be a path parameter — FastAPI treats it as a query parameter
# Called like: /todos?first_n=5

# localhost:8000/todo/2
@api.get('/todo/{todo_id}', response_model=Todo)
def get_todo(todo_id: int):  # normally this call would be to a database and would be async
    for todo in all_todos:
        if todo.todo_id == todo_id:  # dot notation (todo.todo_id) instead of dict access (todo['todo_id'])
            return todo              # because todo is a Pydantic object, not a dict
    # HTTPException sends a proper 404 status code in the HTTP response.
    # basic.py returned the string "404 does not exist" with a 200 OK status — misleading and non-standard.
    raise HTTPException(status_code=404, detail="Todo not found")

# parameter name found in {path}  →  path parameter   → part of the URL
# parameter name NOT in path      →  query parameter  → comes after ?

# create a todo
@api.post('/todos', response_model=Todo)
def create_todo(todo: TodoCreate):
    # TodoCreate instead of dict (basic.py used dict).
    # FastAPI now validates the incoming request body against the TodoCreate schema before
    # this function even runs. If a required field is missing or too short, it auto-rejects with 422.
    new_todo_id = max([todo_e.todo_id for todo_e in all_todos]) + 1  # dot notation on Pydantic objects
    new_todo = Todo(
        todo_id=new_todo_id,
        todo_name=todo.todo_name,
        todo_description=todo.todo_description,
        priority=todo.priority
    )
    all_todos.append(new_todo)
    return new_todo

# PUT — replace the entire resource (client must send all fields)
# PATCH — update just one field (client sends only the changed field)

# on youtube he actually used put to achieve functionality of patch
@api.put('/todos/{todo_id}', response_model=Todo)
def update_todo(todo_id: int, updated_todo: TodoUpdate):
    # TodoUpdate instead of dict — all fields are required and validated.
    # basic.py accepted any dict, so a client could send {"foo": "bar"} with no error.
    for todo in all_todos:
        if todo.todo_id == todo_id:
            if updated_todo.todo_name is not None:
                todo.todo_name = updated_todo.todo_name
            if updated_todo.todo_description is not None:
                todo.todo_description = updated_todo.todo_description
            if updated_todo.todo_priority is not None:
                todo.priority = updated_todo.priority
            return todo
    raise HTTPException(status_code=404, detail="Todo not found")

# delete
@api.delete('/todo/{todo_id}', response_model=Todo)
def delete_todo(todo_id: int):
    for todo in all_todos:
        if todo.todo_id == todo_id:
            deleted = all_todos.pop(todo.todo_id)
            return deleted
    raise HTTPException(status_code=404, detail="Todo not found")
