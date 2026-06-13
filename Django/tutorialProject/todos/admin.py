from django.contrib import admin

# Register your models here.
from .models import Person, Todo
admin.site.register(Person)

# admin.site.register(Todo)
# Instead of registering the Todo model with the default ModelAdmin, we create a custom ModelAdmin to customize how it appears in the admin panel.
 
@admin.register(Todo)
class TodoAdmin(admin.ModelAdmin):
    list_display = ('title', 'priority', 'deadline', 'done') # specify which fields to display in the list view of the admin panel
    search_fields = ('title',) # add a search box to search todos by title. We add a comma after 'title' to make it a tuple, since search_fields expects a list or tuple of field names. If we just wrote ('title'), it would be interpreted as a string.
    list_filter = ('priority', 'deadline')