# Generated by Django 3.2 on 2021-06-27 05:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('rrhh', '0013_auto_20210626_2239'),
    ]

    operations = [
        migrations.AlterField(
            model_name='detallepermiso',
            name='fecha_permiso',
            field=models.DateField(),
        ),
    ]
