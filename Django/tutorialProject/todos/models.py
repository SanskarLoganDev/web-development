from django.db import models

# Create your models here.

class Person(models.Model):
    name = models.CharField(max_length=100)
    age = models.IntegerField()
    
    def __str__(self):
        return f"{self.id} - {self.name}"

# PriorityChoices is NOT a database table.
# It extends models.IntegerChoices, which is just a Python enum — a fixed set of named constants.
# Only classes that extend models.Model become tables. This class is just used to restrict
# what values are allowed in the priority field of the Todo model.
class PriorityChoices(models.IntegerChoices):
    LOW = 1, 'Low'       # stored as integer 1 in the DB, displayed as 'Low'
    MEDIUM = 2, 'Medium' 
    HIGH = 3, 'High'     


# This class extends models.Model, so Django will create a "todos_todo" table in the database for it.
class Todo(models.Model):
    # Django automatically adds an "id" field (auto-incrementing integer primary key) to every
    # model. You never define it yourself — the database assigns it when a new row is inserted.

    # by default all fields are required and non nullable.
    # To allow a null value, set null=True (database level) and blank=True (form validation level).
    title = models.CharField(max_length=100)
    description = models.CharField(max_length=500)
    done = models.BooleanField(default=False)
    deadline = models.DateField(null=True, blank=True)  # optional field
    priority = models.IntegerField(choices=PriorityChoices.choices, null=True, blank=True)
    
    owner = models.ForeignKey(Person, on_delete = models.CASCADE, related_name='todos', blank=True, null=True) # related_name allows us to access a person's todos via person.todos.all()
    
    # __str__ is different from __init__.
    # __init__ is the constructor — called once when an object is first created in memory.
    # __str__ is called automatically by Python whenever it needs a string representation
    # of the object, e.g. print(t), str(t), print(f"Task: {t}") where t = Todo(1, "Buy groceries"), or in the Django admin panel.
    
    def __str__(self):
        return f"{self.id} - {self.title}" # self.id comes from the auto-generated primary key Django adds to every model.