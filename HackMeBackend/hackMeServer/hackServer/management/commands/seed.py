from django.core.management.base import BaseCommand
from hackServer.models import User

class Command(BaseCommand):
    help = 'Seed the database with initial data'

    def handle(self, *args, **kwargs):
        self.stdout.write('Seeding the database...')

        # Usuń istniejące dane, aby uniknąć duplikatów
        User.objects.all().delete()

        # Dodaj użytkownika zwykłego
        User.objects.create(
            username="user1",
            email="user1@example.com",
            is_admin=False,
            secret_data="This is user1's secret."
        )

        # Dodaj użytkownika administratora
        User.objects.create(
            username="admin",
            email="admin@example.com",
            is_admin=True,
            secret_data="This is admin's secret."
        )

        self.stdout.write(self.style.SUCCESS('Database seeded successfully.'))
