from django.shortcuts import render, redirect
from django.http import HttpResponse, HttpResponseNotAllowed
from .forms import PersonForm # to create a PersonForm object and fill it with the data
from .forms import TodoForm
from .models import Todo

# Create your views here. These are also called endpoints

def home(request):
    return HttpResponse('Home page')

def hello_world_view(request):
    return HttpResponse('Hello World')

def hello_html_view(request):
    return render(request, 'todos/hello.html')

def hello_path(request, name):
    return HttpResponse(f'Hello {name}!')

def add(request, num1, num2):
    return HttpResponse(f'The sum is {num1+num2}!')

def hello_query(request):
    # mysite.com/search?q=dsakabjdla
    return HttpResponse(f'Your query was {request.GET.get("q")}')

def special_view(request):
    return redirect('html') # instead of returning simply redirect towards a url; use URL name here


def post_example(request):
    # accept the post request
    if request.method=='POST':
        # name = request.POST.get('name')
        # age = request.POST.get('age')
        # job = request.POST.get('job')
        # instead get it from the form and form is going to get it from the post dictionary
        form = PersonForm(request.POST)
        if form.is_valid():
            name = form.cleaned_data['name']
            age = form.cleaned_data['age']
            job = form.cleaned_data['job']
            
        return HttpResponse(f"You posted: {name}, {age}, {job}")
    else:
        return HttpResponseNotAllowed('POST')
    
def submit_example(request):
    return render(request, 'todos/submit.html')

# using Django forms is a better way to deal with forms
def submit_django_form(request):
    form = PersonForm()
    return render(request, 'todos/submit_django_form.html', {'form': form})

def template_view(request):
    context = {
        "name": "Logan",
        "age": 30,
        "skills": ["Python", "Django", "Terraform"]
    }
    
    return render(request, "todos/template_demo.html", context)

def todos_view(request):
    if request.method == 'POST':
        form = TodoForm(request.POST)
        
        if form.is_valid():
            todo = form.save()
            return HttpResponse('Todo successfully created!')
    
    # handling the GET request
    # What the user sees: a list of their todos + a form to add a new one.
    else:
        form = TodoForm()
        todos = Todo.objects.all()
        # Todo — the model class, which maps to the todos_todo table in your database.
        # .objects — every Django model automatically gets a "manager" called objects. It is the interface between your Python code and the database. You never create it yourself; Django adds it for free.
        # .all() — tells the manager to fetch every row from the table. It returns a QuerySet, which behaves like a list.
        
        return render(request, 'todos/todos.html', {'form': form, 'todos': todos})
    