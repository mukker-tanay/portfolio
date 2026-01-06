from rest_framework import serializers
from .models import Project, ProjectSection, MediaAsset, ContactSubmission

class ProjectSectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectSection
        fields = ['id', 'title', 'content', 'order']

class MediaAssetSerializer(serializers.ModelSerializer):
    class Meta:
        model = MediaAsset
        fields = ['id', 'image', 'alt_text', 'caption']

class ProjectListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ['id', 'title', 'slug', 'description', 'role', 'featured', 'tech_stack', 'created_at']

class ProjectDetailSerializer(serializers.ModelSerializer):
    sections = ProjectSectionSerializer(many=True, read_only=True)
    media = MediaAssetSerializer(many=True, read_only=True)

    class Meta:
        model = Project
        fields = [
            'id', 'title', 'slug', 'description', 'role', 
            'problem', 'constraints', 'outcome', 'key_decisions',
            'featured', 'tech_stack', 'created_at', 'updated_at',
            'sections', 'media'
        ]

class ContactSubmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactSubmission
        fields = ['name', 'email', 'message']
