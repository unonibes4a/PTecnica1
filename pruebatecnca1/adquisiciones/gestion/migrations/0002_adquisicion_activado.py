# Generated by Django 5.0.6 on 2024-06-30 03:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('gestion', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='adquisicion',
            name='activado',
            field=models.BooleanField(default=True),
        ),
    ]
