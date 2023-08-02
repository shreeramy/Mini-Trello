from django.db import models
    

class Task(models.Model):
    name = models.CharField(max_length=100)
    status = models.CharField(max_length=80, blank=True, null=True)
    
    def __str__(self):
        return self.name