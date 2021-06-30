from django.shortcuts import render, redirect
from app.maestro.forms import *
from app.rrhh.models import *
from django.http import HttpResponse
# Create your views here.
from django.core.files.base import ContentFile
from django.contrib.auth.decorators import login_required
from functools import wraps
from django.contrib.auth.models import *

from app.acceso.models import *
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
                return redirect('acceso:usuario_list')
            return view_func(request, *args, **kwargs)
        return wrapper
    return _check_group

def datosgenerales(request):
    try:
        modulo = 'maestro'
        personal = Personal.objects.get(usuario=request.user.id)
        estado = personal.estado
   
        try:
            usergrupo = GrupoUser.objects.filter(user_id=personal.usuario_id)
            
            #menu = Menu.objects.filter(grupo_id=2)
            #print(menu)
            
            contexto = {'estado': estado, 'persona': personal,'usergrupo':usergrupo,'modulo':modulo}
            
        except GrupoUser.DoesNotExist:
            pass
    except Personal.DoesNotExist:
        return HttpResponse('Logeado Pero no estas asignado como Personal')
    return contexto





def tipo_documento_list(request):

	tipo_documento=TipoDocumento.objects.all()

	return render(request,'maestro/tipo_documento_list.html',{'tipo_documento':tipo_documento,'datogeneral':datosgenerales(request)})

def tipo_documento_crear(request):

	if request.method=='POST':

		form=TipoDocumentoForm(request.POST)

		if form.is_valid():

			form.save()

			return redirect('maestro:tipo_documento_list')
		else:

			return HttpResponse(form.errors)

	
	else:
		form=TipoDocumentoForm
		return render(request,'maestro/tipo_documento_form.html',{'form':form})

def tipo_documento_update(request,id):
    tipo_documento = TipoDocumento.objects.get(id=id)

    if request.method=='POST':
        form = TipoDocumentoForm(request.POST,instance=tipo_documento)
        if form.is_valid():
            form.save()
            return redirect('maestro:tipo_documento_list')
        else:
            return HttpResponse(form.errors)

    else:
        form = TipoDocumentoForm(instance=tipo_documento)

        return render(request,'maestro/tipo_documento_form.html',{'form':form,'tipo_documento':tipo_documento,'datogeneral':datosgenerales(request)})


def cargo_list(request):

	cargo=Cargo.objects.all()

	return render(request,'maestro/cargo_list.html',{'cargo':cargo,'datogeneral':datosgenerales(request)})


def cargo_crear(request):

	if request.method=='POST':

		form=CargoForm(request.POST)

		if form.is_valid():

			form.save()

			return redirect('maestro:cargo_list')
		else:

			return HttpResponse(form.errors)

	
	else:
		form=CargoForm
		return render(request,'maestro/cargo_form.html',{'form':form,'datogeneral':datosgenerales(request)})


def cargo_update(request,id):
    cargo = Cargo.objects.get(id=id)

    if request.method=='POST':
        form = CargoForm(request.POST,instance=cargo)
        if form.is_valid():
            form.save()
            return redirect('maestro:cargo_list')
        else:
            return HttpResponse(form.errors)

    else:
        form = CargoForm(instance=cargo)

        return render(request,'maestro/cargo_form.html',{'form':form,'cargo':cargo,'datogeneral':datosgenerales(request)})


def estado_civil_list(request):

	estado_civil=EstadoCivil.objects.all()

	return render(request,'maestro/estado_civil_list.html',{'estado_civil':estado_civil,'datogeneral':datosgenerales(request)})

def estado_civil_crear(request):

	if request.method=='POST':

		form=EstadoCivilForm(request.POST)

		if form.is_valid():

			form.save()

			return redirect('maestro:estado_civil_list')
		else:

			return HttpResponse(form.errors)

	
	else:
		form=EstadoCivilForm
		return render(request,'maestro/estado_civil_form.html',{'form':form,'datogeneral':datosgenerales(request)})


def estado_civil_update(request,id):
    estado_civil = EstadoCivil.objects.get(id=id)

    if request.method=='POST':
        form = EstadoCivilForm(request.POST,instance=estado_civil)
        if form.is_valid():
            form.save()
            return redirect('maestro:estado_civil_list')
        else:
            return HttpResponse(form.errors)

    else:
        form = EstadoCivilForm(instance=estado_civil)

        return render(request,'maestro/estado_civil_form.html',{'form':form,'estado_civil':estado_civil,'datogeneral':datosgenerales(request)})


def area_list(request):

	area=Areas.objects.all()

	return render(request,'maestro/area_list.html',{'area':area,'datogeneral':datosgenerales(request)})

def areas_crear(request):

	if request.method=='POST':

		form=AreasForm(request.POST)

		if form.is_valid():

			form.save()

			return redirect('maestro:area_list')
		else:

			return HttpResponse(form.errors)

	
	else:
		form=AreasForm
		return render(request,'maestro/area_form.html',{'form':form,'datogeneral':datosgenerales(request)})


def areas_update(request,id):
    areas = Areas.objects.get(id=id)

    if request.method=='POST':
        form = AreasForm(request.POST,instance=areas)
        if form.is_valid():
            form.save()
            return redirect('maestro:area_list')
        else:
            return HttpResponse(form.errors)

    else:
        form = AreasForm(instance=areas)

        return render(request,'maestro/area_form.html',{'form':form,'areas':areas,'datogeneral':datosgenerales(request)})
