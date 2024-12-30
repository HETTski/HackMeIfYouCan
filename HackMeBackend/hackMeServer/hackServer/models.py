from django.db import models

class User(models.Model):
    username = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    is_admin = models.BooleanField(default=False)
    secret_data = models.TextField(blank=True, null=True)  

    def __str__(self):
        return self.username
