"""controlasistencia URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from app.maestro import urls
from app.rrhh import urls
from app.acceso import urls


urlpatterns = [
    path('admin/', admin.site.urls),
    path('maestro/',include('app.maestro.urls')),
    path('rrhh/',include('app.rrhh.urls')),
    path('rrhh/api/',include('app.rrhh.api.urls')),
    path('asistencia/',include('app.asistencia.urls')),
    path('acceso/',include('app.acceso.urls')),
    path('acceso/api/',include('app.acceso.api.urls')),


]
