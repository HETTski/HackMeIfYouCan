import os
import django

# Set up Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'hackMeServer.settings')
django.setup()

from django.core.management.base import BaseCommand
from django.contrib.auth.models import User

class Command(BaseCommand):
    help = 'Seed the database with initial data'

    def handle(self, *args, **kwargs):
        self.stdout.write('Seeding the database...')

        # Usuń istniejące dane, aby uniknąć duplikatów
        User.objects.all().delete()

        # Create sample users
        users = [
            {"username": "admin", "email": "admin@example.com", "password": "admin123", "is_staff": True, "is_superuser": True},
            {"username": "user1", "email": "user1@example.com", "password": "user123", "is_staff": False, "is_superuser": False},
            {"username": "user2", "email": "user2@example.com", "password": "user123", "is_staff": False, "is_superuser": False},
        ]

        for user_data in users:
            if not User.objects.filter(username=user_data["username"]).exists():
                user = User.objects.create_user(
                    username=user_data["username"],
                    email=user_data["email"],
                    password=user_data["password"],
                    is_staff=user_data["is_staff"],
                    is_superuser=user_data["is_superuser"]
                )
                user.save()
                self.stdout.write(f"Created user: {user.username}")
            else:
                self.stdout.write(f"User {user_data['username']} already exists")

        self.stdout.write(self.style.SUCCESS('Database seeded successfully.'))
