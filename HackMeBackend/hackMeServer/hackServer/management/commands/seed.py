import os
import django

# Set up Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'hackMeServer.settings')
django.setup()

from django.core.management.base import BaseCommand
from hackServer.models import User  # Ensure this imports the correct User model
from django.contrib.auth.hashers import make_password

class Command(BaseCommand):
    help = 'Seed the database with initial data'

    def handle(self, *args, **kwargs):
        self.stdout.write('Seeding the database...')

        # Remove existing data to avoid duplicates
        User.objects.all().delete()

        # Create sample users
        users = [
            {"username": "admin", "email": "admin@example.com", "password": "admin123", "is_staff": True, "is_superuser": True, "secret_data": "This is secret data for admin."},
            {"username": "user1", "email": "user1@example.com", "password": "user123", "is_staff": False, "is_superuser": False, "secret_data": "This is secret data for user1."},
            {"username": "user2", "email": "user2@example.com", "password": "user123", "is_staff": False, "is_superuser": False, "secret_data": "This is secret data for user2."},
            {"username": "testtesttest", "email": "usertest@example.com", "password": "user123", "is_staff": False, "is_superuser": False, "secret_data": "This is secret data for testtesttest."},
        ]

        for user_data in users:
            if not User.objects.filter(username=user_data["username"]).exists():
                user = User(
                    username=user_data["username"],
                    email=user_data["email"],
                    is_staff=user_data["is_staff"],
                    is_superuser=user_data["is_superuser"],
                    secret_data=user_data["secret_data"]
                )
                user.password = make_password(user_data["password"])
                user.save()
                self.stdout.write(f"Created user: {user.username}")
            else:
                self.stdout.write(f"User {user_data['username']} already exists")

        self.stdout.write(self.style.SUCCESS('Database seeded successfully.'))
