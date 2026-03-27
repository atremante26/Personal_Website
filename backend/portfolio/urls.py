from django.urls import path
from .views import AboutView, SkillView, ExperienceView, ProjectView, InterestView, TagView, PublicationView

urlpatterns = [
    path('about/', AboutView.as_view(), name = 'about'),
    path('skill/', SkillView.as_view(), name = 'skill'),
    path('experience/', ExperienceView.as_view(), name = 'experience'),
    path('publication/', PublicationView.as_view(), name='publication'),
    path('project/', ProjectView.as_view(), name = 'project'),
    path('interest/', InterestView.as_view(), name = 'interest'),
    path('tag/', TagView.as_view(), name = 'tag')
]