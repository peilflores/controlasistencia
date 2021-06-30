
from django import forms

from .models import *

class PersonalForm(forms.ModelForm):
    class Meta:
        model = Personal
        fields=[
            'tipo_documento',
            'nombres',
            'apellido_paterno',
            'apellido_materno',
            'numero_documento',
            'cargo',
            'estado',
            'sexo',
            'estadocivil',
            'fecha_nacimiento',
            'telefono',
            'area'
        ]

        labels={
            'tipo_documento':'Tip.Documento',
            'nombres':'Nombre',
            'apellido_paterno':'Apellido Paterno',
            'apellido_materno':'Apeliido Materno',
            'numero_documento':'Documento',
            'cargo':'Cargo',
            'estado':'Estado',
            'sexo':'Sexo',
            'estadocivil':'Estado Civil',
            'fecha_nacimiento':'Fecha Nacimiento',
            'telefono':'Telefono',
            'area':'Area'
        }

        widgets={
            'tipo_documento':forms.Select(attrs={'class':'form-control'}),
            'nombres':forms.TextInput(attrs={'class':'form-control'}),
            'apellido_paterno':forms.TextInput(attrs={'class':'form-control'}),
            'apellido_materno':forms.TextInput(attrs={'class':'form-control'}),
            'numero_documento':forms.TextInput(attrs={'class':'form-control'}),
            'cargo':forms.Select(attrs={'class':'form-control'}),
            'estado':forms.Select(attrs={'class':'form-control'}),
            'sexo':forms.Select(attrs={'class':'form-control'}),
            'estadocivil':forms.Select(attrs={'class':'form-control'}),
            'fecha_nacimiento':forms.TextInput(attrs={'class':'form-control'}),
            'telefono':forms.TextInput(attrs={'class':'form-control'}),
            'area':forms.Select(attrs={'class':'form-control'}),

        }

class RolPersonalForm(forms.ModelForm):
    class Meta:
        model = RolPersonal
        fields=[
            'area',
            'mes',
            
           
        ]

        labels={
            'area':'Area',
            'mes':'Mes',
            
            
        }

        widgets={
            'area':forms.Select(attrs={'class':'form-control'}),
            'mes':forms.Select(attrs={'class':'form-control'}),
            
            

        }


class DetalleRolForm(forms.ModelForm):
    class Meta:
        model = DetalleRol
        fields=[
            'personal',
            'rol',
            
            
           
        ]

        labels={
            'personal':'Personal',
            'rol':'Rol'
            
            
            
        }

        widgets={
            'personal':forms.Select(attrs={'class':'form-control'}),
            'rol':forms.Select(attrs={'class':'form-control'})
            
            
            

        }