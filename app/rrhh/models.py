from django.db import models
from app.maestro.models import *
# Create your models here.
from django.contrib.auth.models import User




class Personal(models.Model):

    SEXO=[

        ('1','MASCULINO'),
        ('2','FEMENINO')

    ]

    ESTADO=[

        ('1','ACTIVO'),
        ('2','INACTIVO')


    ]

    tipo_documento=models.ForeignKey(TipoDocumento,on_delete=models.CASCADE)
    nombres=models.CharField(max_length=100)
    apellido_paterno=models.CharField(max_length=150)
    apellido_materno=models.CharField(max_length=150)
    numero_documento=models.CharField(max_length=11)
    cargo=models.ForeignKey(Cargo,on_delete=models.CASCADE)
    estado=models.CharField(max_length=1,choices=ESTADO)
    sexo=models.CharField(max_length=1,choices=SEXO)
    estadocivil = models.ForeignKey(EstadoCivil, blank=True, null=True, on_delete=models.CASCADE)
    fecha_nacimiento = models.DateField(blank=True, null=True)
    usuario = models.OneToOneField(User, blank=True, null=True, on_delete=models.CASCADE)
    telefono = models.CharField(max_length=12, blank=True, null=True)
    area=models.ForeignKey(Areas, on_delete=models.CASCADE)

    def __str__(self):

        return self.nombres + ' ' + self.apellido_paterno + ' ' + self.apellido_materno


 	
class TipoSistemaPesiones(models.Model):

	descripcion=models.CharField(max_length=120)
	abreviado=models.CharField(max_length=6)
	porcentaje=models.IntegerField()



class RolPersonal(models.Model):
    MES_CHOICE = [
        ('01', 'ENERO'),
        ('02', 'FEBRERO'),
        ('03', 'MARZO'),
        ('04', 'ABRIL'),
        ('05', 'MAYO'),
        ('06', 'JUNIO'),
        ('07', 'JULIO'),
        ('08', 'AGOSTO'),
        ('09', 'SEPTIEMBRE'),
        ('10', 'OCTUBRE'),
        ('11', 'NOVIEMBRE'),
        ('12', 'DICIEMBRE'),
    ]

    ESTADO_ROLPERSONAL= [
        ('1', 'ACTIVO'),
        ('2', 'ENVIADO'),
        ('3', 'APROBADO'),
        ('4', 'OBSERVADO'),
       
    ]

    fecha = models.DateField()
    anio = models.SmallIntegerField()
    mes = models.CharField(max_length=2, choices=MES_CHOICE)

    area = models.ForeignKey(Areas, on_delete=models.CASCADE)
    responsable = models.ForeignKey(Personal, on_delete=models.CASCADE)
    estado = models.CharField(max_length=1, choices=ESTADO_ROLPERSONAL)

    


class DetalleRol(models.Model):
    ESTADO_DETALLEROL_CHOICE = [
        ('1', 'ACTIVO'),
        ('2', 'VALIDADO EN AREA'),
        ('3', 'VALIDADO EN PERSONAL'),
        ('4', 'OBSERVADO EN PERSONAL'),
        ('5', 'ACEPTADO DIRECTOR'),
        ('6', 'OBSERVADO DIRECTOR'),

    ]
    personal = models.ForeignKey(Personal, on_delete=models.CASCADE, blank=True, null=True)
    rol = models.ForeignKey(RolPersonal, on_delete=models.CASCADE)
    estado = models.CharField(max_length=2, choices=ESTADO_DETALLEROL_CHOICE)
    observaciones = models.TextField(blank=True, null=True)
   



class DetalleRolPersonal(models.Model):

    detallerol = models.ForeignKey(DetalleRol, on_delete=models.CASCADE)
    fecha_inicio = models.DateField(auto_now_add=False, auto_now=False, blank=True, null=True)
    fecha_fin = models.DateField(auto_now_add=False, auto_now=False, blank=True, null=True)
    hora_inicio=models.TimeField()
    hora_fin=models.TimeField()
    turno = models.ForeignKey(Turno, on_delete=models.CASCADE)
    personal=models.ForeignKey(Personal,on_delete=models.CASCADE, blank=True,null=True)
    check=models.BooleanField(default=False)

    class Meta:
        verbose_name = 'Detalle Rol Personal'
        verbose_name_plural = 'Detalles Roles Personales'

class TipoPermiso(models.Model):
    ESTADO=[

        ('1','ACTIVO'),
        ('2','INACTIVO')


    ]
    descripcion=models.CharField(max_length=120)
    estado=models.CharField(max_length=1,choices=ESTADO)

class DescuentoxPermiso(models.Model):
    ESTADO=[
        ('1','ACTIVO'),
        ('2','INACTIVO')


    ]
    tipo_permiso=models.ForeignKey(TipoPermiso, on_delete=models.CASCADE)
    descuento=models.DecimalField(max_digits=9,decimal_places=2)
    estado=models.CharField(max_length=1,choices=ESTADO)

class Permiso(models.Model):
    ESTADO=[
        ('1','ABIERTO'),
        ('2','CERRADO'),
    ]


    MES_CHOICE = [
        ('01', 'ENERO'),
        ('02', 'FEBRERO'),
        ('03', 'MARZO'),
        ('04', 'ABRIL'),
        ('05', 'MAYO'),
        ('06', 'JUNIO'),
        ('07', 'JULIO'),
        ('08', 'AGOSTO'),
        ('09', 'SEPTIEMBRE'),
        ('10', 'OCTUBRE'),
        ('11', 'NOVIEMBRE'),
        ('12', 'DICIEMBRE'),
    ]
   
    personal=models.ForeignKey(Personal,on_delete=models.CASCADE)
    estado=models.CharField(max_length=1,choices=ESTADO)
    mes=models.CharField(max_length=2, choices=MES_CHOICE)
    anio=models.IntegerField()
    total_permiso=models.IntegerField()
    rol=models.ForeignKey(RolPersonal,on_delete=models.CASCADE)

class DetallePermiso(models.Model):
    ESTADO=[
        ('1','PENDIENTE'),
        ('2','ACEPTADO'),
        ('3','RECHAZADO'),
        ('4','CANCELADO')
    ]
    permiso=models.ForeignKey(Permiso,on_delete=models.CASCADE)
    descripcion=models.TextField(blank=True, null=True)
    fecha_permiso=models.DateField()
    fechahora_registro=models.DateTimeField(auto_now=True)
    


class Remuneracion(models.Model):

    ESTADO=[

        ('1','APERTURADO'),
        ('2','CERRADO')


    ]

    personal=models.ForeignKey(Personal,on_delete=models.CASCADE)
    sueldo_bruto= models.DecimalField(max_digits=9,decimal_places=3)
    fecha_inicio=models.DateField()
    fecha_fin=models.DateField(blank=True, null=True)
    estado=models.CharField(max_length=1,choices=ESTADO)
    fecha_registro=models.DateField(auto_now=True)


class DetalleRemuneracion(models.Model):
    tipo_sistema_pension=models.ForeignKey(TipoSistemaPesiones,on_delete=models.CASCADE)
    