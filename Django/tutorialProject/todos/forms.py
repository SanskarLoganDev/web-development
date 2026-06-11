from django import forms
from .models import Todo

class PersonForm(forms.Form):
    name = forms.CharField(max_length=100, required = True, label = 'Your Name')
    age = forms.IntegerField(label='Your Age')
    job = forms.CharField(max_length=100, required=False, label = 'Your Job')
    
class TodoForm(forms.ModelForm): # this is Django model forms, different from Django forms defined in the above class
    class Meta:
        model = Todo
        fields = ['title', 'description', 'done', 'deadline', 'priority']
        
        # widgets override how a field is rendered as HTML in the browser.
        # By default Django renders a DateField as a plain <input type="text">, meaning the user
        # has to type the date manually. By setting type="date", the browser shows a calendar
        # picker instead, which is much more user-friendly.
        widgets = {
            'deadline': forms.DateInput(attrs={'type': 'date'})  # renders <input type="date"> → calendar picker
        }
        
# In a ModelForm, the class body is reserved for defining custom form fields — things you manually add or override. 
# Django watches everything you define directly on the class and treats it as a field.

# The Meta class is a separate, dedicated namespace purely for configuration — telling Django which model to use, which fields to include, how to render them, etc. 
# Django's ModelForm internals specifically look inside Meta for this config, and nowhere else.