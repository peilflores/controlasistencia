from django.contrib import admin
from django.urls import path, include
from .views import *

app_name='rrhh'

urlpatterns = [
    path('personal_list/', personal_list, name='personal_list'),
    path('personal_crear/', personal_crear, name='personal_crear'),
    path('personal_update/<int:id>', personal_update, name='personal_update'),

    path('rol_list/', rol_list, name='rol_list'),
    path('rol_crear/', rol_crear, name='rol_crear'),

    path('detalle_rol_form/<int:id>', detalle_rol_form, name='detalle_rol_form'),

    path('guardar_foto/<int:id_detalle>',guardar_foto, name='guardar_foto'),

    path('permiso_list/', permiso_list, name='permiso_list'),
    path('permiso_form/', permiso_form, name='permiso_form'),



    

]