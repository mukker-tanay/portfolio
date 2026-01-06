from django.db import models
from django.utils.text import slugify

class Project(models.Model):
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True, blank=True)
    description = models.TextField(help_text="Short description for SEO and listings")
    role = models.CharField(max_length=200, help_text="My role & ownership")
    problem = models.TextField(help_text="Problem statement")
    constraints = models.TextField(help_text="Technical or business constraints")
    outcome = models.TextField(help_text="Outcome / learnings")
    
    # Key decisions & trade-offs could be part of sections or a field
    key_decisions = models.TextField(help_text="Key decisions & trade-offs", blank=True)

    featured = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    # Tech stack as a comma separated string or JSON
    tech_stack = models.JSONField(default=list, blank=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title

class ProjectSection(models.Model):
    project = models.ForeignKey(Project, related_name='sections', on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    content = models.TextField(help_text="Markdown or HTML content")
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return f"{self.project.title} - {self.title}"

class MediaAsset(models.Model):
    image = models.ImageField(upload_to='project_images/')
    alt_text = models.CharField(max_length=255)
    caption = models.TextField(blank=True)
    project = models.ForeignKey(Project, related_name='media', on_delete=models.SET_NULL, null=True, blank=True)
    
    def __str__(self):
        return self.alt_text

class ContactSubmission(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)

    def __str__(self):
        return f"Message from {self.name}"
