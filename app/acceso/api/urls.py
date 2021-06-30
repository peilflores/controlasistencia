from django.urls import path,include
from .views import *
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'permisos',PermissionApiDetailView)


urlpatterns = [
    path('',include(router.urls)),
    path('permiso/', PermissionApiListView.as_view()),
    
 

]

