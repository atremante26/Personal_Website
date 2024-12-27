from django.shortcuts import render
from rest_framework import generics
from .models import About, Skill, Experience, Tag, Project, Interest
from .serializers import AboutSerializer, SkillSerializer, ExperienceSerializer, TagSerializer, ProjectSerializer, InterestSerializer

class AboutView(generics.ListAPIView):
    queryset = About.objects.all()
    serializer_class = AboutSerializer

class SkillView(generics.ListAPIView):
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer

class ExperienceView(generics.ListAPIView):
    queryset = Experience.objects.all()
    serializer_class = ExperienceSerializer

class TagView(generics.ListAPIView):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer

class ProjectView(generics.ListAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

class InterestView(generics.ListAPIView):
    queryset = Interest.objects.all()
    serializer_class = InterestSerializer


