# Generated by Django 3.2.25 on 2025-01-26 17:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('hackServer', '0005_auto_20250119_1129'),
    ]

    operations = [
        migrations.CreateModel(
            name='EncryptedData',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('data', models.TextField()),
                ('secret_key', models.CharField(max_length=32)),
            ],
        ),
    ]
