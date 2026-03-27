from rest_framework import serializers
from .models import About, Skill, Experience, Project, Tag, Interest, Publication


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
    bullets_list = serializers.SerializerMethodField()
 
    class Meta:
        model = Experience
        fields = ['id', 'title', 'company', 'lead', 'bullets', 'bullets_list', 'start_date', 'end_date', 'skills', 'image']
 
    def get_bullets_list(self, obj):
        if not obj.bullets:
            return []
        return [b.strip() for b in obj.bullets.strip().split("\n") if b.strip()]

class ProjectSerializer(serializers.ModelSerializer):
    skills = SkillSerializer(many=True)
    tags = TagSerializer(many=True)
    bullets_list = serializers.SerializerMethodField()
 
    class Meta:
        model = Project
        fields = ['id', 'name', 'lead', 'bullets', 'bullets_list', 'github_url', 'site_url', 'tags', 'skills', 'image']
 
    def get_bullets_list(self, obj):
        if not obj.bullets:
            return []
        return [b.strip() for b in obj.bullets.strip().split("\n") if b.strip()]

class InterestSerializer(serializers.ModelSerializer):
    tags = TagSerializer(many=True)

    class Meta:
        model = Interest
        fields = ['topic', 'description', 'image', 'url', 'tags']

class PublicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Publication
        fields = ['id', 'title', 'authors', 'venue', 'year', 'status', 'description', 'url', 'order']