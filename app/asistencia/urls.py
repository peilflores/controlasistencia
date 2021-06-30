from django.contrib import admin
from django.urls import path, include
from .views import *

app_name='asistencia'

urlpatterns = [
    
    path('asistencia_form/', asistencia_form,name='asistencia_form'),
    path('asistencia_list/', asistencia_list,name='asistencia_list'),
    path('reporte_form/', reporte_asistencia,name='reporte_form')


]