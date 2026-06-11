1) The mismatch is clear. In urls.py:9, the URL captures are named num1 and num2, but in views.py:18, the function parameters are n1 and n2. Django passes captured URL values as keyword arguments matching the names in the URL pattern, so the names must match exactly.
Fix — rename the view parameters to match the URL names

2) For the todos view once the code is written (views.py, urls.py, todos.html, models.py), the work is still not complete as the DB is not aware of it. So close the server and do the migration:
python manage.py makemigrations
python manage.py migrate

3) In a ModelForm, the class body is reserved for defining custom form fields — things you manually add or override. Django watches everything you define directly on the class and treats it as a field.

The Meta class is a separate, dedicated namespace purely for configuration — telling Django which model to use, which fields to include, how to render them, etc. Django's ModelForm internals specifically look inside Meta for this config, and nowhere else.