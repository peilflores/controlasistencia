from django.db import models

# Create your models here.

class TipoDocumento(models.Model):

	descripcion=models.CharField(max_length=100)
	abreviado=models.CharField(max_length=10)

	def __str__(self):

		return self.descripcion

class EstadoCivil(models.Model):
    descripcion = models.CharField(max_length=30)
    abreviado = models.CharField(max_length=5)


    def __str__(self):
        return '{}'.format(self.descripcion)

class Empresa(models.Model):
	descripcion=models.CharField(max_length=150)
	direccion=models.CharField(max_length=50)
	telefono=models.CharField(max_length=10)

class Turno(models.Model):

	descripcion=models.CharField(max_length=20)
	hora_inicio=models.TimeField()
	hora_fin=models.TimeField()
	abreviado=models.CharField(max_length=4)

	




class Areas(models.Model):

	ESTADO=[
		('1','ACTIVO'),
		('2','INACTIVO')

	]

	descripcion=models.CharField(max_length=50)
	estado=models.CharField(max_length=1, choices=ESTADO)

	def __str__(self):

		return self.descripcion

class Cargo(models.Model):

	ESTADO=[

		('1','ACTIVO'),
		('2','INACTIVO')

	]
	descripcion=models.CharField(max_length=50)
	estado=models.CharField(max_length=1, choices=ESTADO)

	def __str__(self):

		return self.descripcion