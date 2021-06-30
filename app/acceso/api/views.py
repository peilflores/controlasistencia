from .serializers import *
from rest_framework.generics import *
from ..models import *
from django_filters.rest_framework import DjangoFilterBackend

from rest_framework import generics,viewsets

class PermissionApiListView(ListCreateAPIView):
    queryset = Permission.objects.all()
    serializer_class = PermissionSerializer

class PermissionApiDetailView(viewsets.ModelViewSet):
    queryset =  Permission.objects.all()
    serializer_class = PermissionSerializer

    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['content_type__app_label']