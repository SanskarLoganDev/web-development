from django import forms

class PersonForm(forms.Form):
    name = forms.CharField(max_length=100, required = True, label = 'Your Name')
    age = forms.IntegerField(label='Your Age')
    job = forms.CharField(max_length=100, required=False, label = 'Your Job')