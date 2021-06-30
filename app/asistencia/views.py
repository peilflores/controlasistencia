from django.shortcuts import render
from app.rrhh.models import *
from app.maestro.models import Areas
from app.asistencia.models import *
from django.http import HttpResponse

from app.acceso.models import *
from reportlab.pdfgen import canvas
import time
from io import BytesIO
from reportlab.platypus import LongTable, Table, TableStyle, SimpleDocTemplate, Paragraph, BaseDocTemplate, Frame, NextPageTemplate, PageTemplate, Spacer,Image
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle, StyleSheet1
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4,A7, landscape, A5, letter
from reportlab.lib.units import cm, inch
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_RIGHT, TA_JUSTIFY

import json
from functools import wraps
from django.contrib.auth.models import *
def check_group(group_name):
	def _check_group(view_func):
		@wraps(view_func)
		def wrapper(request, *args, **kwargs):
			if request.user.is_anonymous:
				return redirect('acceso:acceso')
			if not (request.user.groups.filter(name=group_name).exists() or request.user.is_superuser):
				return redirect('acceso:acceso')
			return view_func(request, *args, **kwargs)
		return wrapper
	return _check_group

def datosgenerales(request):
	try:
		modulo = 'asistencia'
		personal = Personal.objects.get(usuario=request.user.id)
		persona = personal
		estado = personal.estado
		try:
			usergrupo = GrupoUser.objects.filter(user=personal.usuario_id)
			contexto = {'estado': estado, 'persona': persona,'usergrupo':usergrupo,'modulo':modulo,'id_personal':personal.id}
		except GrupoUser.DoesNotExist:
			pass
	except Personal.DoesNotExist:
		return HttpResponse('Logeado Pero no estas asignado como Personal')
	return contexto




def asistencia_form(request):

	return render(request,'asistencia/asistencia_form.html',{'datogeneral':datosgenerales(request)})


def asistencia_list(request):
	p=datosgenerales(request)

	asistencia=DetalleAsistencia.objects.filter(asistencia__personal_id=p['id_personal'])

	return render(request,'asistencia/asistencia_list.html',{'asistencia':asistencia,'datogeneral':datosgenerales(request)})

def reporte_asistencia(request):

	if request.method == 'POST':

		response = HttpResponse(content_type='application/pdf')
		response['Content-Disposition'] = 'inline; filename="mypdf.pdf"'
		buffer = BytesIO()
		rol = RolPersonal.objects.get(anio=request.POST['año'],mes=request.POST['mes'],area=request.POST['area'])
		detalle_rol=DetalleRol.objects.filter(rol_id=rol.id)
		

		styleSheet = StyleSheet1()
		styleSheet.add(ParagraphStyle(name='Heading1',fontName = 'Times-Bold', alignment=TA_CENTER, fontSize=18, leading=22, spaceAfter=5), alias='h1')
		styleSheet.add(ParagraphStyle(name='BodyText',fontName='Times-Bold',fontSize=9,leading=12,spaceAfter=6,alignment=TA_LEFT))
		styleSheet.add(ParagraphStyle(name='BodyText1',fontName='Times-Roman',fontSize=6,leading=12,spaceBefore=-4, spaceAfter=-4))
		styleSheet.add(ParagraphStyle(name='BodyText2',fontName='Times-Roman',fontSize=10,leading=12,spaceAfter=6,spaceBefore=15))
		styleSheet.add(ParagraphStyle(name='BodyText3',fontName='Times-Roman',fontSize=7,leading=12,spaceAfter=-5,alignment=TA_CENTER))
		styleSheet.add(ParagraphStyle(name='Firma1',fontName='Times-Roman',fontSize=10,leading=12,spaceBefore=60,alignment=TA_CENTER))
		styleSheet.add(ParagraphStyle(name='Firma2',fontName='Times-Roman',fontSize=10,leading=12,spaceBefore=0,alignment=TA_CENTER))
		styleSheet.add(ParagraphStyle(name='tabla',fontName='Times-Roman',fontSize=7,leading=0,spaceBefore=0,alignment=TA_CENTER))
		styleSheet.add(ParagraphStyle(name='tabla1',fontName='Times-Roman',fontSize=8,leading=10,spaceBefore=0,alignment=TA_LEFT))
		styleSheet.add(ParagraphStyle(name='tabla2',fontName='Times-Roman',fontSize=8,leading=10,spaceBefore=0,alignment=TA_CENTER))
		elements = []
		im = Image('./static/assets/img/logo.jpeg', 3*inch,1.2*inch)
		im.hAlign = 'LEFT'
		elements.append(Spacer(40, -70))
		elements.append(im)
		
		encabezados1 = ['#','Personal','Fecha', 'Tipo Ingreso']

		encabezados = ['','','','']
		
		detalles = []
		mes = rol.get_mes_display()
		doc = SimpleDocTemplate(
	     buffer,
	     pagesize=A4,
	     rightMargin=72,
	     leftMargin=72,
	     topMargin=50,
	     bottomMargin=50)
		
		
		
		elements.append(Paragraph("REPORTE DE ASISTENCIA " +mes+ " DEL " +str(rol.anio), styleSheet['Heading1']))
		elements.append(Paragraph("Area : "+str(rol.area)+"&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160"))
		elements.append(Spacer(0, 10))
		datas = []
		detalle1=[]
		for dr in detalle_rol:

			detallerolpersonal=DetalleRolPersonal.objects.filter(detallerol_id=dr.id)

			for drp in detallerolpersonal:

				detalle_asistencia=DetalleAsistencia.objects.filter(detallerolpersonal_id=drp.id)

				for da in detalle_asistencia:

					print(da.id)
					detalle1=[str(da.id),str(da.detallerolpersonal.personal),str(da.asistencia.fecha_asistencia),str(da.get_tipo_marcacion_display())]


					detalles.append(detalle1)

				detalle_orden = LongTable([encabezados1]+[encabezados] + detalles, colWidths=[2*cm,4.4*cm,4*cm,4.62*cm],repeatRows=2)
			detalle_orden.setStyle(TableStyle(
			[
					('BACKGROUND',(0,0),(-1,1),colors.HexColor(0x00eeebe9)),
					('SPAN',(0,0),(0,1)),
					('SPAN',(1,0),(1,1)),
					('SPAN',(2,0),(2,1)),
					('SPAN',(3,0),(3,1)),

					

					
					
					('VALING',(0,0), (-1,-1), 'MIDDLE'),
					('ALIGN',(1,0),(-1,-1),'CENTER'),
					('GRID', (0, 0), (-1, -1), 0.2, colors.black),

					('FONTSIZE', (0, 0), (-1, -1), 7),
					('ALIGN',(2,2),(-1,-1),'CENTER'),
					
					]
				))
			elements.append(detalle_orden)
			
			
			frame = Frame(72, doc.bottomMargin, doc.width, doc.height, id='normal')
			doc.addPageTemplates([PageTemplate(id='longtable', frames=frame)])
			doc.build(elements)
			pdf = buffer.getvalue()
			buffer.close()
			response.write(pdf)
			return response
	else:

		area=Areas.objects.all()

		return render(request,'asistencia/reporte_form.html',{'area':area})


