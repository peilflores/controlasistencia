from django.shortcuts import render, redirect
from app.rrhh.forms import *
from app.rrhh.models import *
from app.asistencia.models import *
from app.acceso.models import *
from django.http import HttpResponse
from datetime import datetime, date, time, timedelta
from django.http import HttpResponse
import json
from django.core.exceptions import ObjectDoesNotExist
from datetime import datetime, date, time, timedelta
from base64 import b64decode
import base64
from django.core.files.base import ContentFile
from django.contrib.auth.decorators import login_required
from functools import wraps
from django.contrib.auth.models import *

def check_group(group_name):
	def _check_group(view_func):
		@wraps(view_func)
		def wrapper(request, *args, **kwargs):
			if request.user.is_anonymous:
				return redirect('acceso:acceso')
			if not (request.user.groups.filter(name=group_name).exists() or request.user.is_superuser):
				return redirect('acceso:acceso')
			return view_func(request, *args, **kwargs)
		return wrapper
	return _check_group

def datosgenerales(request):
	try:
		modulo = 'rrhh'
		personal = Personal.objects.get(usuario=request.user.id)
		persona = personal
		estado = personal.estado
		try:
			usergrupo = GrupoUser.objects.filter(user=personal.usuario_id)
			contexto = {'estado': estado, 'persona': persona,'usergrupo':usergrupo,'modulo':modulo,'id_personal':personal.id}
		except GrupoUser.DoesNotExist:
			pass
	except Personal.DoesNotExist:
		return HttpResponse('Logeado Pero no estas asignado como Personal')
	return contexto



def personal_list(request):

	personal=Personal.objects.all()

	return render(request,'rrhh/personal_list.html',{'personal':personal,'datogeneral':datosgenerales(request)})


def personal_crear(request):

	if request.method == 'POST':

		form=PersonalForm(request.POST)

		if form.is_valid():

			form.save()

			return redirect('rrhh:personal_list')

		else:

			return HttpResponse(form.errors)

	else:

		form=PersonalForm
		contexto={'form':form,'datogeneral':datosgenerales(request)}


		return render(request,'rrhh/personal_form.html',contexto)


def personal_update(request,id):
    personal = Personal.objects.get(id=id)

    if request.method=='POST':
        form = PersonalForm(request.POST,instance=personal)
        if form.is_valid():
            form.save()
            return redirect('rrhh:personal_list')
        else:
            return HttpResponse(form.errors)

    else:
        form = PersonalForm(instance=personal)

        return render(request,'rrhh/personal_form.html',{'form':form,'personal':personal,'datogeneral':datosgenerales(request)})


def rol_list(request):

	rol=RolPersonal.objects.all()

	return render(request,'rrhh/rol_list.html',{'rol':rol,'datogeneral':datosgenerales(request)})

def rol_crear(request):

	anio=datetime.strftime(datetime.now(), '%Y')

	if request.method == 'POST':

		form=RolPersonalForm(request.POST)

		if form.is_valid():

			rol=form.save(commit=False)
			rol.fecha=datetime.strftime(datetime.now(), '%Y-%m-%d')
			rol.anio=anio
			rol.responsable_id=1
			rol.estado=1
			rol.save()
			return redirect('rrhh:rol_list')
		else:

			return HttpResponse(form.errors)


	else:

		form=RolPersonalForm
		

		return render(request,'rrhh/rol_form.html',{'form':form,'anio':anio,'datogeneral':datosgenerales(request)})


def detalle_rol_form(request,id):

	if request.method == 'POST':

		try:

			detalle_rol=DetalleRol.objects.get(rol_id=id,personal_id=request.POST['id_personal_rol'])
			detallerolpersonal_json=json.loads(request.POST.get("datos_rol"))
			if detallerolpersonal_json:
				for d in detallerolpersonal_json:
					detallerolpersonal=DetalleRolPersonal()
					turno=Turno.objects.get(id=d['id'])
					detallerolpersonal.detallerol_id=detalle_rol.id
					detallerolpersonal.fecha_inicio=d['start']
					detallerolpersonal.fecha_fin=d['start']
					detallerolpersonal.hora_inicio=turno.hora_inicio
					detallerolpersonal.hora_fin=turno.hora_fin
					detallerolpersonal.turno_id=d['id']
					detallerolpersonal.personal_id=d['id_personal']
					
					detallerolpersonal.save()
			return redirect('rrhh:rol_list')
		
		except DetalleRol.DoesNotExist:
			print("no ecxisteee")
			
			form=DetalleRolForm(request.POST)

			if form.is_valid():

				rol_detalle=form.save(commit=False)
				rol_detalle.rol_id= request.POST['rol']
				rol_detalle.personal_id=request.POST['id_personal_rol']
				rol_detalle.estado=1
				rol_detalle.save()

				detallerolpersonal_json=json.loads(request.POST.get("datos_rol"))
				if detallerolpersonal_json:
					for d in detallerolpersonal_json:
						detallerolpersonal=DetalleRolPersonal()
						turno=Turno.objects.get(id=d['id'])
						detallerolpersonal.detallerol=rol_detalle
						detallerolpersonal.fecha_inicio=d['start']
						detallerolpersonal.fecha_fin=d['start']
						detallerolpersonal.hora_inicio=turno.hora_inicio
						detallerolpersonal.hora_fin=turno.hora_fin
						detallerolpersonal.turno_id=d['id']
						detallerolpersonal.personal_id=d['id_personal']
						
						detallerolpersonal.save()
				return redirect('rrhh:rol_list')
			else:

				return HttpResponse(form.errors)

		
		


	else:
		rol=RolPersonal.objects.get(id=id)
		turno=Turno.objects.all()
		print(turno[0].hora_fin)
		personal=Personal.objects.filter(area_id=rol.area_id)
		

		return render(request,'rrhh/detalle_rol_form.html',{'turno':turno, 'personal':personal,'rol':rol,'datogeneral':datosgenerales(request)})


def guardar_foto(request,id_detalle):

	b64_text=request.POST.get('foto')
	format, imgstr = b64_text.split(";base64,")
	ext = format.split("/")[-1]
	data = ContentFile(base64.b64decode(imgstr), name="temp." + ext)

	detalle=DetalleAsistencia.objects.get(id=id_detalle)
	detalle.imagen = data
	detalle.save()

	return redirect('asistencia:asistencia_form')


def permiso_list(request):

	p=datosgenerales(request)

	permiso=Permiso.objects.filter(personal_id=p['id_personal'])

	return render(request,'rrhh/permiso_list.html',{'permiso':permiso,'datogeneral':datosgenerales(request)})


def permiso_form(request):

	if request.method == 'POST':

		anio=int(request.POST['anio_permiso'])

		print(anio)
		mes=request.POST['mes_permiso']
		personal_id=request.POST['id_personal_permiso']

		try:
			

			permiso=Permiso.objects.get(anio=anio,mes=mes,personal_id=personal_id,estado=1)

			permiso.total_permiso=int(permiso.total_permiso)+1
			permiso.save()

			detalle_permiso=DetallePermiso()
			detalle_permiso.permiso_id=permiso.id
			detalle_permiso.descripcion=request.POST['descripcion']
			detalle_permiso.fecha_permiso=request.POST['fecha_permiso']
			detalle_permiso.save()

			return HttpResponse({'success'})


		except Permiso.DoesNotExist:
			

			permiso=Permiso()
			permiso.personal_id=request.POST['id_personal_permiso']
			permiso.estado=1
			permiso.mes=request.POST['mes_permiso']
			permiso.anio=request.POST['anio_permiso']
			permiso.total_permiso=1
			permiso.rol_id=request.POST['rol_permiso']
			permiso.save()

			detalle_permiso=DetallePermiso()
			detalle_permiso.permiso_id=permiso.id
			detalle_permiso.descripcion=request.POST['descripcion']
			detalle_permiso.fecha_permiso=request.POST['fecha_permiso']
			detalle_permiso.save()

			return HttpResponse({'success'})


	else:

		p=datosgenerales(request)

		

		personal=Personal.objects.get(id=p['id_personal'])

		anio = datetime.now().strftime("%Y")

		mes  = datetime.now().strftime("%m")


		rol=RolPersonal.objects.get(anio=anio,mes=mes, area=personal.area_id)

		return render(request,'rrhh/permiso_form.html',{'rol':rol,'personal':personal,'datogeneral':datosgenerales(request)})