# Generated by Django 3.2 on 2021-06-27 00:33

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('rrhh', '0009_permiso_total_permiso'),
    ]

    operations = [
        migrations.AddField(
            model_name='permiso',
            name='rol',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='rrhh.rolpersonal'),
            preserve_default=False,
        ),
    ]