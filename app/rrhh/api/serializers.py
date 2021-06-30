from rest_framework import serializers
from app.rrhh.models import *



class RolPersonalSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = RolPersonal
        fields = ('id','fecha','anio','mes','area','responsable','estado','detalle_rol')

       

class DetalleRolSerializer(serializers.ModelSerializer):
    class Meta:
        model=DetalleRol
        fields=('id','personal','rol','estado')

class DetalleRolPersonalSerializer(serializers.ModelSerializer):

    class Meta:
        model=DetalleRolPersonal
        fields=('id','detallerol','fecha_inicio','fecha_fin','hora_inicio','hora_fin','turno','personal','check')
        depth=1

class PermisoSerializer(serializers.ModelSerializer):
    class Meta:

        model=Permiso
        fields='__all__'

class DetallePermisoSerializer(serializers.ModelSerializer):
    class Meta:

        model=DetallePermiso
        fields='__all__'
