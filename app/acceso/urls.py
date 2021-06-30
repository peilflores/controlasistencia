from django.urls import path, include
from .views import *

app_name = 'acceso'

urlpatterns = [

    path('usuario_list/', usuario_list, name='usuario_list'),
    path('login/', inicio, name='login'),
    path('usuario_crear/<int:id>', usuario_crear, name='usuario_crear'),
    path('acceso/', acceso, name='acceso'),
    path('logout/', logout, name='logout'),

   









    
]
