# Generated by Django 3.2 on 2021-06-27 02:27

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('rrhh', '0010_permiso_rol'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='detallepermiso',
            name='descuento',
        ),
        migrations.RemoveField(
            model_name='detallepermiso',
            name='tipo_permiso',
        ),
    ]
