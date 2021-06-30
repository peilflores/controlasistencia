from rest_framework import viewsets
from rest_framework.response import Response
from .serializers import *
from app.rrhh.models import *
from app.asistencia.models import *
from rest_framework.decorators import action
from rest_framework import serializers, status, generics
from django.http import HttpResponse, JsonResponse
import time
import json
from datetime import datetime, date, time, timedelta
from django.utils import timezone

class RolPersonalViewSet(viewsets.ModelViewSet):

    queryset = RolPersonal.objects.all()
    serializer_class =RolPersonalSerializer


class RolPersonalDetalleRolViewSet(viewsets.ModelViewSet):

	queryset = DetalleRolPersonal.objects.all()
	serializer_class =DetalleRolPersonalSerializer

	@action(detail=True, methods=['GET'])

	def detalle_rol(self,request,pk=None,personal_id=None):

		detalle_rol=DetalleRolPersonal.objects.filter(detallerol__rol_id=pk, personal_id=personal_id)
		serializer = DetalleRolPersonalSerializer(detalle_rol,many=True)
		return Response(serializer.data,status=200)

class DetallePermisoRolViewSet(viewsets.ModelViewSet):

	queryset = DetallePermiso.objects.all()
	serializer_class =DetallePermisoSerializer

	@action(detail=True, methods=['GET'])

	def detalle_permiso(self,request,pk=None,personal_id=None):

		detalle_rol=DetallePermiso.objects.filter(permiso__rol_id=pk, permiso__personal_id=personal_id)
		serializer = DetallePermisoSerializer(detalle_rol,many=True)
		return Response(serializer.data,status=200)


class ControlAsistenciaViewDetail(generics.GenericAPIView):
	def get(self, request, *args, **kwargs):

		lista_detalle_json = []
		anio = datetime.now().strftime("%Y")
		mes  = datetime.now().strftime("%m")
		fecha_actual=datetime.now().strftime("%Y-%m-%d")

		hora_actual=datetime.now().strftime("%H:%M:%S")
		tipo_hora=datetime.now().strftime("%p")


		personal=Personal.objects.get(numero_documento=kwargs['numero_documento'])
		rol=RolPersonal.objects.get(anio=anio,mes=mes,area_id=personal.area_id)
		detalle_rol=DetalleRol.objects.get(rol_id=rol.id,personal_id=personal.id)
		objeto_detalle={}
		detalle_rol_personal=DetalleRolPersonal.objects.filter(detallerol_id=detalle_rol.id, fecha_inicio=fecha_actual)

		if detalle_rol_personal:
			
			for drp in detalle_rol_personal:

				try:
					print(drp.turno.abreviado)
					print(tipo_hora)
					if str(tipo_hora) == str(drp.turno.abreviado):

						asistencia=Asistencia.objects.get(personal_id=personal.id,fecha_asistencia=fecha_actual,estado=1)
						detalle_asistencia=DetalleAsistencia.objects.get(asistencia_id=asistencia.id)
						if detalle_asistencia.turno_id == 1:
							if str(tipo_hora) == 'PM':
								if str(hora_actual) > str(drp.hora_fin):

									detalle_new=DetalleAsistencia()
									detalle_new.asistencia_id=asistencia.id
									detalle_new.hora=hora_actual
									detalle_new.tipo_marcacion=2
									detalle_new.turno_id=drp.turno_id
									detalle_new.imagen='si se pudo'
									detalle_new.save()

									asistencia.estado=2
									asistencia.save()
									objeto_detalle["codError"] = "101"
									objeto_detalle["id_detalle"] = detalle_new.id
									objeto_detalle["hora"] = detalle_new.hora
									objeto_detalle["personal"] = personal.nombres+ ' ' + personal.apellido_paterno + ' ' +  personal.apellido_materno
									objeto_detalle["message"] = "SU SALIDA FUE MARCADA CON EXITO"

									lista_detalle_json.append(objeto_detalle)
									valores=json.dumps(lista_detalle_json)
									return HttpResponse(valores,content_type='application/json')

									

							else:
								objeto_detalle["codError"] = "102"
								objeto_detalle["message"] = "ERROR!! ... USTED ESTA DENTRO DE SU HORA DE TRABAJO"
								lista_detalle_json.append(objeto_detalle)
								valores=json.dumps(lista_detalle_json)
								return HttpResponse(valores,content_type='application/json')

								
						else:
							
							if str(hora_actual) > str(drp.hora_fin):
								detalle_new=DetalleAsistencia()
								detalle_new.asistencia_id=asistencia.id
								detalle_new.hora=hora_actual
								detalle_new.detallerolpersonal_id=drp.id
								detalle_new.tipo_marcacion=2
								detalle_new.turno_id=drp.turno_id
								detalle_new.imagen='si se pudo'
								detalle_new.save()

								asistencia.estado=2
								asistencia.save()
								objeto_detalle["codError"] = "101"
								objeto_detalle["id_detalle"] = detalle_new.id
								objeto_detalle["hora"] = detalle_new.hora
								objeto_detalle["personal"] = personal.nombres+ ' ' + personal.apellido_paterno + ' ' +  personal.apellido_materno
								objeto_detalle["message"] = "SU SALIDA FUE MARCADA CON EXITO"

								lista_detalle_json.append(objeto_detalle)
								valores=json.dumps(lista_detalle_json)
								return HttpResponse(valores,content_type='application/json')

							else:
								objeto_detalle["codError"] = "102"
								objeto_detalle["message"] = "ERROR!! ... USTED ESTA DENTRO DE SU HORA DE TRABAJO"
								lista_detalle_json.append(objeto_detalle)
								valores=json.dumps(lista_detalle_json)
								return HttpResponse(valores,content_type='application/json')
					
					else:



						objeto_detalle["codError"] = "102"
						objeto_detalle["message"] = "ERROR!! ...NO TIENE TURNO PROGRAMADO"
						lista_detalle_json.append(objeto_detalle)
						valores=json.dumps(lista_detalle_json)
						return HttpResponse(valores,content_type='application/json')	


				except Asistencia.DoesNotExist:

					print("noexiste marcada")

					if str(tipo_hora) == str(drp.turno.abreviado):

						if str(hora_actual) > str(drp.hora_inicio):
							print(hora_actual)
							print(drp.hora_inicio)
							objeto_detalle["codError"] = "103"
							objeto_detalle["message"] = "Error!!... ESTA FUERA DE RANGO "
							lista_detalle_json.append(objeto_detalle)
							valores=json.dumps(lista_detalle_json)
							return HttpResponse(valores,content_type='application/json')


							
						else:

							asistencia=Asistencia()
							asistencia.personal_id=personal.id
							asistencia.fecha_asistencia=fecha_actual
							asistencia.estado=1
							asistencia.save()

							### SE ACTUALIZA EL DetalleRolPersonal con check 1

							detallerolpersonal=DetalleRolPersonal.objects.get(pk=drp.id)
							detallerolpersonal.check=1
							detallerolpersonal.save()

							detalle_asistencia=DetalleAsistencia()
							detalle_asistencia.asistencia_id=asistencia.id
							detalle_asistencia.hora=hora_actual
							detalle_asistencia.tipo_marcacion=1
							detalle_asistencia.detallerolpersonal_id=drp.id
							detalle_asistencia.turno_id=drp.turno_id
							detalle_asistencia.imagen='hola'
							detalle_asistencia.save()
							objeto_detalle["codError"] = "101"
							objeto_detalle["id_detalle"] = detalle_asistencia.id
							objeto_detalle["hora"] = detalle_asistencia.hora
							objeto_detalle["personal"] = personal.nombres+ ' ' + personal.apellido_paterno + ' ' +  personal.apellido_materno
							objeto_detalle["message"] = "SE MARCO SU ENTRADA CON EXITO"
							lista_detalle_json.append(objeto_detalle)
							valores=json.dumps(lista_detalle_json)
							return HttpResponse(valores,content_type='application/json')
					else:

						print("fuera de rango")
		else:

			objeto_detalle["codError"] = "102"
			objeto_detalle["message"] = "ERROR!! ...NO EXISTE PROGRAMACION"
			lista_detalle_json.append(objeto_detalle)
			valores=json.dumps(lista_detalle_json)
			return HttpResponse(valores,content_type='application/json')
			
		
						



				

			# if drp.turno_id==1:

			# 	try:

			# 		asistencia=Asistencia.objects.get(personal_id=personal.id,fecha_asistencia=fecha_actual,estado=1)
					
			# 		if str(tipo_hora) != str(drp.turno.abreviado):
			# 			if str(hora_actual) > str(drp.hora_inicio):

			# 				print("USTED NO PUEDE MARCAR ESTA FUERA DE HORA")
			# 			else:
					
			# 				print("SU ASISTENCIA SE MARCO CORRECTAMENTE")


			# 	except Asistencia.DoesNotExist:

			# 		print("crear asistencia")
					





			# 	if str(tipo_hora):

			# 		print(str(tipo_hora))
			# else:

			# 	print("ddd")



			# print(str(tipo_hora))

			# if str(tipo_hora)== str(drp.turno.abreviado):
			# 	print(str(drp.turno.abreviado))

			# 	try:
			# 		asistencia=Asistencia.objects.get(personal_id=personal.id,fecha_asistencia=fecha_actual,estado=1)

			# 		if str(hora_actual) > str(drp.hora_fin):

			# 			print("SE MARCO SU SALIDA CORRECTAMENTE")
			# 		else:
			# 			print("USTED DEBE CULMINAR SU HORARIO DE TRABAJO")


			# 	except Asistencia.DoesNotExist:

			# 		asistencia=Asistencia()

			# 		if str(hora_actual) > str(drp.hora_inicio):

			# 			print("USTED NO PUEDE MARCAR ESTA FUERA DE HORA")
			# 		else:
					
			# 			print("SU ASISTENCIA SE MARCO CORRECTAMENTE")

			# else:



			# 	print("ss")






		# for d in detalle:
		# 	objeto_detalle={}
		# 	objeto_detalle["id"] = d.id
		# 	objeto_detalle["start"] = str(d.programacion_consultorio.fecha_atencion)+' '+ str((d.hora_inicio))
		# 	objeto_detalle["end"] = str(d.programacion_consultorio.fecha_atencion)+' '+ str(d.hora_fin)
		# 	objeto_detalle["title"] = str(d.paciente)
		# 	objeto_detalle["color"] =  '#3A87AD'
		# 	objeto_detalle["textColor"] = '#ffffff'
		# 	lista_detalle_json.append(objeto_detalle)
		# 	valores=json.dumps(lista_detalle_json)

		# return HttpResponse(valores,content_type='application/json')






