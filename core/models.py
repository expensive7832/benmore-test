from django.db import models

from django.contrib.auth.models import User

# Create your models here.
class Task(models.Model):
    
    status_choice = (
        ("inPro", "In Progress"),
        ("comp", "Completed"),
        ("overdue", "Overdue"),
    )
    priority_choice = (
        ("low", "LOW"),
        ("medium", "MEDIUM"),
        ("high", "HIGH"),
    )
    
    title = models.CharField(max_length=50)
    description = models.TextField()
    status = models.CharField(
        max_length=20,
        choices=status_choice,
        default="inPro"
    )
    priority = models.CharField(
        max_length=20,
        choices=priority_choice,
    
    )
    due_date = models.DateTimeField()
    category = models.CharField(max_length=20)
    assigned_to = models.ForeignKey(User, on_delete=models.RESTRICT)
    
    
    def __str__(self) -> str:
        return self.title + " " + self.status