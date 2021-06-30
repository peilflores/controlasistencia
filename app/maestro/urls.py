from django.urls import path, include
from .views import *

app_name = 'maestro'

urlpatterns = [
    path('tipo_documento_list/', tipo_documento_list, name='tipo_documento_list'),
    path('tipo_documento_crear/', tipo_documento_crear, name='tipo_documento_crear'),
    path('tipo_documento_update/<int:id>', tipo_documento_update, name='tipo_documento_update'),

    path('cargo_list/', cargo_list, name='cargo_list'),
    path('cargo_crear/', cargo_crear, name='cargo_crear'),
    path('cargo_update/<int:id>', cargo_update, name='cargo_update'),

    path('estado_civil_list/', estado_civil_list, name='estado_civil_list'),
    path('estado_civil_crear/', estado_civil_crear, name='estado_civil_crear'),
    path('estado_civil_update/<int:id>', estado_civil_update, name='estado_civil_update'),

    path('area_list/', area_list, name='area_list'),
    path('areas_crear/', areas_crear, name='areas_crear'),
    path('areas_update/<int:id>', areas_update, name='areas_update'),









    
]
