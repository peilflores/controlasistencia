from rest_framework import serializers
from ..models import *
from django.contrib.auth.models import *

class ContentypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContentType
        fields = ('id','app_label','model')

class PermissionSerializer(serializers.ModelSerializer):
    content_type = ContentypeSerializer(many=False, read_only=True)
    class Meta:
        model = Permission
        fields = ('id','name','content_type','codename')
