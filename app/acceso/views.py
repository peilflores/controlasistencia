from django.shortcuts import render, redirect
from functools import wraps
from django.contrib.auth.decorators import login_required
from django.contrib.auth import login
from app.rrhh.models import *
from app.acceso.models import *
from django.contrib.auth.models import *
from django.http import HttpResponse
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
        modulo = 'acceso'
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


def acceso(request):
    username = request.POST.get('username')
    password = request.POST.get('password')
    print(username)
    usu = auth.authenticate(request, username=username,password=password)
    if usu:
        login(request, usu)
        if request.GET.get('next', None):
            return HttpResponseRedirect(request.GET['next'])
        return redirect('rrhh:rol_list')
 
    else:
        return render(request,'acceso/login.html')

@login_required(login_url='configuracion:acceso')
def logout(request):
    auth.logout(request)
    return redirect('configuracion:acceso')


def inicio(request):

	return render(request,'acceso/login.html')



def usuario_list(request):

    personal=Personal.objects.all()

    
    contexto={'personal':personal,'datogeneral':datosgenerales(request)}
      

    return render(request,'acceso/usuario_list.html',contexto)

def usuario_crear(request, id):
    personal = Personal.objects.get(id=id)
    if request.method == 'POST':

        usuario = request.POST['usuario']
        password = request.POST['password']
        personal=Personal.objects.get(pk=id)
        try:

            usuario=User.objects.get(pk=personal.usuario_id)

            if request.POST['password'] =="":

                try:
                    usergroup = GrupoUser.objects.get(user_id=usuario.id,group_id=request.POST['grupo'])


                    return redirect('acceso:usuario_list')
                except GrupoUser.DoesNotExist:
                    usergroup=GrupoUser()
                    usergroup.user_id = personal.usuario_id
                    usergroup.group_id = request.POST['grupo']
                    usergroup.save()

                    permisos=request.POST.getlist('permiso')
                    if len(permisos)>0:
                        for p in permisos:
                            usuariopermiso = UsuarioPermiso()
                            usuariopermiso.user_id = personal.usuario_id
                            usuariopermiso.permission_id = p
                            usuariopermiso.save()

                    return redirect('acceso:usuario_list')


            else:
                usuarios = request.POST['usuario']
                password = request.POST['password']
                usuario.set_password(password)
                usuario.username = usuarios
                usuario.save()

                try:
                    usergroup = GrupoUser.objects.get(user_id=usuario.id,group_id=request.POST['grupo'])


                    return redirect('acceso:usuario_list')
                except GrupoUser.DoesNotExist:
                    usergroup=GrupoUser()
                    usergroup.user_id = personal.usuario_id
                    usergroup.group_id = request.POST['grupo']
                    usergroup.save()

                    permisos=request.POST.getlist('permiso')
                    if len(permisos)>0:
                        for p in permisos:
                            usuariopermiso = UsuarioPermiso()
                            usuariopermiso.user_id = personal.usuario_id
                            usuariopermiso.permission_id = p
                            usuariopermiso.save()

                    return redirect('acceso:usuario_list')
        except User.DoesNotExist:

            user = User.objects.create_user(usuario, '', password)
            user.first_name = ''
            user.last_name = ''
            user.save()

            personal = Personal.objects.get(id=id)
            personal.usuario_id = user.id
            personal.save()


            usergroup = GrupoUser()
            usergroup.user_id = personal.usuario_id
            usergroup.group_id = request.POST['grupo']
            usergroup.save()


            # agregar los permisos 
            permisos=request.POST.getlist('permiso')
     
            if len(permisos)>0:

                for p in permisos:

                    try:

                        permiso=Permiso.objects.get(pk=p)
                    except Permiso.DoesNotExist:
                        print(p)

                    
                    usuariopermiso = UsuarioPermiso()
                    usuariopermiso.user_id = personal.usuario_id
                    usuariopermiso.permission_id = p
                    usuariopermiso.save()




            return redirect('acceso:usuario_list')

    else:

        personal=Personal.objects.get(pk=id)
        try:

            usuario=User.objects.get(pk=personal.usuario_id)
            permisos=UsuarioPermiso.objects.filter(user_id=usuario.id)

            print(permisos)


        except User.DoesNotExist:
            usuario=""
            permisos=""
            print("no existe")
        grupo = Group.objects.all()
        return render(request, 'acceso/usuario_form.html',{'personal':personal,'usuario':usuario,'permisos':permisos, 'grupo':grupo,'datogeneral':datosgenerales(request)})



def logout(request):
    auth.logout(request)
    return redirect('acceso:acceso')