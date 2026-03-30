from django.db import models

class About(models.Model):
    bio = models.TextField()

    def __str__(self):
        return "About Section"


class Skill(models.Model):
    name = models.CharField(max_length=100, unique=True, db_index=True)
    icon = models.URLField(blank=True, default="")

    def __str__(self):
        return self.name


class Experience(models.Model):
    title = models.CharField(max_length=200)
    company = models.CharField(max_length=200)
    lead = models.CharField(max_length=500, blank=True, default="")
    bullets = models.TextField(blank=True, default="")
    start_date = models.DateField()
    end_date = models.DateField(null=True, blank=True)
    skills = models.ManyToManyField(Skill, blank=True)
    image = models.URLField(blank=True, default="")

    def __str__(self):
        date_range = f"{self.start_date.strftime('%b %Y')} - {self.end_date.strftime('%b %Y') if self.end_date else 'Present'}"
        return f"{self.title} at {self.company} ({date_range})"


class Tag(models.Model):
    name = models.CharField(max_length=100, unique=True, db_index=True)

    def __str__(self):
        return self.name


class Project(models.Model):
    name = models.CharField(max_length=200)
    lead = models.CharField(max_length=500, blank=True, default="")
    bullets = models.TextField(blank=True, default="")
    github_url = models.URLField(null=True, blank=True)
    site_url = models.URLField(null=True, blank=True)
    tags = models.ManyToManyField(Tag, blank=True)
    skills = models.ManyToManyField(Skill, blank=True)
    image = models.URLField(blank=True, default="")

    def __str__(self):
        return self.name


class Interest(models.Model):
    topic = models.CharField(max_length=200)
    description = models.TextField()
    image = models.URLField(blank=True, default="")
    url = models.URLField(null=True, blank=True)
    tags = models.ManyToManyField(Tag, blank=True)

    def __str__(self):
        return self.topic


class Publication(models.Model):

    STATUS_CHOICES = [
        ('published', 'Published'),
        ('under_review', 'Under Review'),
        ('in_preparation', 'In Preparation'),
    ]

    title = models.CharField(max_length=300)
    authors = models.CharField(max_length=500)
    venue = models.CharField(max_length=200, blank=True, default="")
    year = models.IntegerField(null=True, blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='published')
    description = models.TextField(blank=True, null=True)
    url = models.URLField(blank=True, null=True)
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order', '-year']

    def __str__(self):
        return f"{self.title} ({self.venue}, {self.year})"