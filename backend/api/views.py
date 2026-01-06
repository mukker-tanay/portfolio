from rest_framework import viewsets, generics, permissions
from django.core.mail import send_mail
from django.conf import settings
from .models import Project, ContactSubmission
from .serializers import ProjectListSerializer, ProjectDetailSerializer, ContactSubmissionSerializer

class ProjectViewSet(viewsets.ReadOnlyModelViewSet):
    """
    ReadOnly API for Projects.
    Lookup field is 'slug' instead of 'pk'.
    """
    queryset = Project.objects.all().order_by('-created_at')
    lookup_field = 'slug'
    permission_classes = [permissions.AllowAny]

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return ProjectDetailSerializer
        return ProjectListSerializer

class ContactSubmissionView(generics.CreateAPIView):
    """
    Write-only API for Contact form.
    """
    queryset = ContactSubmission.objects.all()
    serializer_class = ContactSubmissionSerializer
    permission_classes = [permissions.AllowAny]

    def perform_create(self, serializer):
        submission = serializer.save()
        
        # Send email notification
        try:
            subject = f"Portfolio Contact: Message from {submission.name}"
            message = f"""
            You have received a new message from your portfolio website.
            
            Name: {submission.name}
            Email: {submission.email}
            
            Message:
            {submission.message}
            """
            
            send_mail(
                subject,
                message,
                settings.DEFAULT_FROM_EMAIL,
                ['tanaymukker@gmail.com'],
                fail_silently=False,
            )
        except Exception as e:
            # Log error but don't fail the API response?
            # Or fail it to let user know?
            # For now, print to console, but let the DB save succeed.
            print(f"Error sending email: {e}")

