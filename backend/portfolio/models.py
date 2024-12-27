from django.db import models

class About(models.Model):
    bio = models.TextField()

    def __str__(self):
        return "About Section"


class Skill(models.Model):
    name = models.CharField(max_length=100, unique=True, db_index=True)
    icon = models.ImageField(upload_to='skills/', null=True, blank=True, default='default_icon.jpg')

    def __str__(self):
        return self.name


class Experience(models.Model):
    title = models.CharField(max_length=200)
    company = models.CharField(max_length=200)
    description = models.TextField()
    start_date = models.DateField()
    end_date = models.DateField(null=True, blank=True)
    skills = models.ManyToManyField(Skill)
    image = models.ImageField(upload_to='experience/', null=True, blank=True, default='default.jpg')

    def __str__(self):
        date_range = f"{self.start_date.strftime('%b %Y')} - {self.end_date.strftime('%b %Y') if self.end_date else 'Present'}"
        return f"{self.title} at {self.company} ({date_range})"


class Tag(models.Model):  
    name = models.CharField(max_length=100, unique=True, db_index=True)

    def __str__(self):
        return self.name


class Project(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField()
    github_url = models.URLField(null=True, blank=True)
    site_url = models.URLField(null=True, blank=True)
    tags = models.ManyToManyField(Tag, blank=True)  
    skills = models.ManyToManyField(Skill)
    image = models.ImageField(upload_to='project/', null=True, blank=True, default='default.jpg')

    def __str__(self):
        return self.name


class Interest(models.Model):
    topic = models.CharField(max_length=200)
    description = models.TextField()
    image = models.ImageField(upload_to='interests/', null=True, blank=True, default='default.jpg')
    url = models.URLField(null=True, blank=True)
    tags = models.ManyToManyField(Tag, blank=True) 

    def __str__(self):
        return self.topic