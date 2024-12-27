from rest_framework import serializers
from .models import About, Skill, Experience, Project, Tag, Interest


class AboutSerializer(serializers.ModelSerializer):
    class Meta:
        model = About
        fields = ['bio']

class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = ['name', 'icon']

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['name']

class ExperienceSerializer(serializers.ModelSerializer):
    skills = SkillSerializer(many=True)

    class Meta:
        model = Experience
        fields = ['title', 'company', 'description', 'start_date', 'end_date', 'skills', 'image']

class ProjectSerializer(serializers.ModelSerializer):
    skills = SkillSerializer(many=True)
    tags = TagSerializer(many=True)

    class Meta:
        model = Project
        fields = ['name', 'description', 'github_url', 'site_url', 'tags', 'skills', 'image']

class InterestSerializer(serializers.ModelSerializer):
    tags = TagSerializer(many=True)

    class Meta:
        model = Interest
        fields = ['topic', 'description', 'image', 'url', 'tags']
