from django.contrib import admin
from .models import About, Skill, Experience, Project, Interest, Tag, Publication

# Register your models here.
admin.site.register(About)
admin.site.register(Skill)
admin.site.register(Experience)
admin.site.register(Publication)
admin.site.register(Project)
admin.site.register(Interest)
admin.site.register(Tag)