
from django import forms

from .models import *

class TipoDocumentoForm(forms.ModelForm):
    class Meta:
        model = TipoDocumento
        fields=[
            'descripcion',
            'abreviado',
            
        ]

        labels={
            'descripcion':'Descripcion',
            'abreviado':'Abreviado',
            
        }

        widgets={
            'descripcion':forms.TextInput(attrs={'class':'form-control'}),
            'abreviado':forms.TextInput(attrs={'class':'form-control'}),
            

        }



class CargoForm(forms.ModelForm):
    class Meta:
        model = Cargo
        fields=[
            'descripcion',
            'estado',
            
        ]

        labels={
            'descripcion':'Descripcion',
            'estado':'Estado',
            
        }

        widgets={
            'descripcion':forms.TextInput(attrs={'class':'form-control'}),
            'estado':forms.Select(attrs={'class':'form-control'}),
            

        }


class EstadoCivilForm(forms.ModelForm):
    class Meta:
        model = EstadoCivil
        fields=[
            'descripcion',
            'abreviado',
            
        ]

        labels={
            'descripcion':'Descripcion',
            'abreviado':'Abreviado',
            
        }

        widgets={
            'descripcion':forms.TextInput(attrs={'class':'form-control'}),
            'abreviado':forms.TextInput(attrs={'class':'form-control'}),
            

        }


class AreasForm(forms.ModelForm):
    class Meta:
        model = Areas
        fields=[
            'descripcion',
            'estado',
            
        ]

        labels={
            'descripcion':'Descripcion',
            'estado':'Estado',
            
        }

        widgets={
            'descripcion':forms.TextInput(attrs={'class':'form-control'}),
            'estado':forms.Select(attrs={'class':'form-control'}),
            

        }