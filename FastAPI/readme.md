# FastAPI Notes

## Starting the Server

```bash
# Using uvicorn directly
uvicorn main:api --port 9999

# Using the FastAPI CLI
fastapi dev main.py
fastapi dev main.py --port 9999
```

---

## `enum` and `IntEnum`

`enum` is a built-in Python module (no install needed) that lets you define a fixed set of named constants.

`IntEnum` specifically makes those constants behave like integers, so you can compare them with `==`, use them in math, etc.

**Without enum** — magic numbers, easy to make mistakes:

```python
priority = 1  # what does 1 mean? nobody knows
```

**With IntEnum:**

```python
from enum import IntEnum

class Priority(IntEnum):
    LOW    = 1
    MEDIUM = 2
    HIGH   = 3

priority = Priority.HIGH
print(priority)               # Priority.HIGH  (readable name)
print(priority == 3)          # True  (still acts like an int)
print(priority > Priority.LOW) # True
```

**In a FastAPI context**, `IntEnum` is commonly used to restrict what values a path/query parameter can accept:

```python
class Priority(IntEnum):
    LOW    = 1
    MEDIUM = 2
    HIGH   = 3

@api.get('/todos')
def get_todos(priority: Priority):
    ...
```

FastAPI will automatically reject any request where `priority` isn't `1`, `2`, or `3`, and will document the valid values in the auto-generated `/docs` page.
