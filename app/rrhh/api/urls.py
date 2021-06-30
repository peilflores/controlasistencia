from django.urls import path,include
from rest_framework.routers import DefaultRouter

from .views import *


router = DefaultRouter()
router.register(r'rolpersonal',RolPersonalViewSet)
router.register('personal/(?P<personal_id>[^/.]+)/rol',RolPersonalDetalleRolViewSet)
router.register('personal/(?P<personal_id>[^/.]+)/rol',DetallePermisoRolViewSet)


urlpatterns = [
    path('',include(router.urls)),
    path('asistencia_control/<str:numero_documento>',ControlAsistenciaViewDetail.as_view()),

   
]

