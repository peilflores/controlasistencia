from django.db import models
from app.rrhh.models import *
from app.maestro.models import *
# Create your models here.

class Asistencia(models.Model):

	ESTADO=[
		('1','APERTURADO'),
		('2','CERRADO')

	]

	personal=models.ForeignKey(Personal, on_delete=models.CASCADE)
	fecha_asistencia=models.DateField()
	estado=models.CharField(max_length=1, choices=ESTADO)

class DetalleAsistencia(models.Model):

	TIPO_MARCACION=[

		('1','INGRESO'),
		('2','SALIDA')


	]

	asistencia=models.ForeignKey(Asistencia,on_delete=models.CASCADE)
	hora=models.TimeField()
	tipo_marcacion=models.CharField(max_length=1, choices=TIPO_MARCACION)
	turno=models.ForeignKey(Turno, on_delete=models.CASCADE)
	imagen= models.FileField(verbose_name="imagen",upload_to='photography_attached',null=True, blank=True)
	detallerolpersonal=models.ForeignKey(DetalleRolPersonal, on_delete=models.CASCADE,blank=True, null=True, related_name='detallerolpersonal')

