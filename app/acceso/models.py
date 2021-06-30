from django.db import models

# Create your models here.


from django.contrib.auth.models import *

# Create your models here.

class GrupoUser(models.Model):
    user = models.ForeignKey(User, models.DO_NOTHING)
    group = models.ForeignKey(Group, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_groups'
        unique_together = (('user', 'group'),)

class GrupoPermiso(models.Model):
    group = models.ForeignKey(Group, models.DO_NOTHING)
    permission = models.ForeignKey(Permission, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_group_permissions'
        unique_together = (('group', 'permission'),)

class UsuarioPermiso(models.Model):
    user = models.ForeignKey(User, models.DO_NOTHING)
    permission = models.ForeignKey(Permission, models.DO_NOTHING)
    class Meta:
        managed = False
        db_table = 'auth_user_user_permissions'
        unique_together = (('user', 'permission'),)
