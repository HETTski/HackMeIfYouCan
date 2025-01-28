from django.core.management.base import BaseCommand
from hackServer.models import User, EncryptedData
from Crypto.Cipher import AES
from Crypto.Util.Padding import pad
import base64

class Command(BaseCommand):
    help = 'Seed the database with initial data'

    def handle(self, *args, **kwargs):
        self.stdout.write('Seeding the database...')

        # Usuń istniejące dane, aby uniknąć duplikatów
        User.objects.all().delete()
        EncryptedData.objects.all().delete()

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

        # Seed encrypted data
        secret_key = 'mysecretkey12345'  # 16 bytes key for AES-128
        sensitive_data = "This is some sensitive data."

        cipher = AES.new(secret_key.encode(), AES.MODE_CBC)
        ct_bytes = cipher.encrypt(pad(sensitive_data.encode(), AES.block_size))
        iv = base64.b64encode(cipher.iv).decode('utf-8')
        ct = base64.b64encode(ct_bytes).decode('utf-8')
        encrypted_data = iv + ct

        EncryptedData.objects.create(
            data=encrypted_data,
            secret_key=secret_key
        )

        self.stdout.write(self.style.SUCCESS('Database seeded successfully.'))
