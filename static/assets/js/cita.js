
let calendario_pro;
let calendario_cupos
let cliente
let admision
let sis=[]
let sisi
function cliente_valadmision(){
	//incializamos los datos de cliente y admision en null
	localStorage.clear()

	cliente=''
	admision=''
	var documento = document.getElementById('documento').value;
	var data = []
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if(this.readyState == 4 && this.status == 200){
			data = JSON.parse(xhr.responseText);
			
			if(data.length>0){
				
				cliente = data[0]
				localStorage.setItem('cliente',JSON.stringify(data[0]))

				buscar_citas_pendientes(documento);
			}	
			else{
				validar_reniec_admision(documento);
			}
		}
	};
	
	buscar_sis_integrado(documento)

	limpiarcliente();
	
	//xhr.open("GET",'/admision/admisionpaciente/'+documento,false);
	xhr.open("GET",'/admision/validarcliente/'+documento,false);
	xhr.send();
}

function buscar_citas_pendientes(dni){
	console.log('buscando')
	data=[]
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if(this.readyState==4 && this.status==200){
			data = JSON.parse(xhr.responseText);
			console.log(data.length)
			if(data.length>0){
				if(data[0].estado==6){
					admision=data[0]
					console.log("admision estado",data[0].estado)
				}
				else if(data[0].estado=='2'){//admitido
					console.log("admision estado",data[0].estado)
					alert('tiene una admision pendiente de cerrar')
				}
			
			}else{
				llenar_tabla_cliente_cita()
			}
			
		}
	};
	xhr.open("GET","/admision/api/admisioncitas/"+dni,false);
	xhr.send()
}


function validar_reniec_admision(numero)
{
	var url = 'http://localhost:8001/bldubigeo/api/ubigeo/dnis/'+numero+'/'
		$.ajax({
		async:false,
		url:url,
		type:'GET',

		success: function(data){
			console.log("hay datos reniec")
			localStorage.setItem('cliente',JSON.stringify(data))
			llenar_tabla_reniec(data,1);

		},
		error: function(data){
			console.log("soy error")
			llenar_tabla_reniec(data,2);

		}
	});
}

function buscarreniec(){
	tipodoc = $("#tipodocu_id").val();
	if (tipodoc == undefined){
		tipodoc = $("#tipodocumento_id").val();
	}else{
		tipodoc = tipodoc
	}
	console.log(tipodoc)
	ok=0
	docu = $('#documento').val();
	if (docu.length==8 && tipodoc == '1')
	{
		url = "http://localhost:8001/bldubigeo/api/ubigeo/dnis/"+docu+'/';
		ok=1
	}
	if (ok == 1){
		$.ajax({
			url:url,
			type:'GET',
			success:function(data){
				clientereniec(data);

				if (data.personafallecida=='A'){
					$("#guardar_id").hide()
					$("#personafallecida_id").val("PERSONA FALLECIDA")
					$("#divpersonafallecida_id").show()
				}
				$("#apepaterno_id").val(data.apepaterno)
				$("#apematerno_id").val(data.apematerno)
				$("#nombres_id").val(data.nombre)
				$("#nuevapersona_id").hide();
			},error: function(data){
			console.log("soy error")
		}
		});
	}
}

function llenar_tabla_reniec(data,existe){
	eliminartabla('cuerpocliente');
	$("#datocliente").show();
	$("#numerodocdni_id").val("data.apematerno")
	$('#id_cliente').val(data.id);

	docu = $('#documento').val();
	var table = document.getElementById("detallecliente").getElementsByTagName('tbody')[0];
	var rowCount = table.rows.length
	var row = table.insertRow(rowCount);

	var cell1 = row.insertCell(0);
	var cell2 = row.insertCell(1);
	var cell3 = row.insertCell(2);
	var cell4 = row.insertCell(3);
	var cell5 = row.insertCell(4);


	cell1.innerHTML = 'D.N.I';
	cell2.innerHTML = $('#documento').val();
	cell3.innerHTML = data.nombre+'  '+data.apepaterno+'  '+data.apematerno;
	cell4.innerHTML = calcularEdad(data.fecha_nacimiento);
	if(existe==1){

	cell5.innerHTML='<span><a class="btn btn-success btn-sm text-white" href="/configuracion/crear_cliente?documento='+data.dni+'&nombre='+data.nombre+'&apepaterno='+data.apepaterno+'&apematerno='+data.apematerno+'">Crear Historia</a></span>';
	}
}

function guardarcliente(token){
	token=token
	url = '/configuracion/api/clienteguardar/'
	data = {
		'csrfmiddlewaretoken':token,
	    "nombres": $("#nombres_id").val(),
	    "apepaterno": $("#apepaterno_id").val(),
	    "apematerno": $("#apematerno_id").val(),
	    "fecha_nacimiento": $("#fechanacimiento_id").val(),
	    "sexo": $("#sexo_id").val(),
	    "direccion": $("#direccion_id").val(),
	    "telefono": $("#telefono_id").val(),
	    "historia_clinica": $("#numerodoc_id").val(),
	    "tipo_documento": $("#tipodocu_id").val(),
	    "numero_documento": $("#numerodoc_id").val(),
	    "lugar_residencia": $("#lugar_residencia").val(),
	    "lugar_nacimiento": $("#lugarnacimiento_id").val(),
	    "nombre_madre": $("#nombremadre_id").val(),
	    "nombre_padre": $("#nombrepadre_id").val(),
	    "estadocivil": $("#estadocivil_id").val(),
	    "grado_instruccion": $("#id_grado_instruccion").val(),
	    "etnia": $("#etnia_id").val(),
	}
	$.ajax({
		url:url,
		type:'POST',
		data:data,
		success:function(data){
			// $("#crear_historia").hide()
			//console.log("Paciente Creado")
		}
	});
}

function actualizarcliente(token){
	numero = $("#numerodoc_id").val(),
	token=token
	url = '/configuracion/api/clienteactualizar/'+ numero;
	data = {
	    "nombres": $("#nombres_id").val(),
	    "apepaterno": $("#apepaterno_id").val(),
	    "apematerno": $("#apematerno_id").val(),
	    "fecha_nacimiento": $("#fechanacimiento_id").val(),
	    "sexo": $("#sexo_id").val(),
	    "direccion": $("#direccion_id").val(),
	    "telefono": $("#telefono_id").val(),
	    "historia_clinica": $("#numerodoc_id").val(),
	    "tipo_documento": $("#tipodocu_id").val(),
	    "numero_documento": $("#numerodoc_id").val(),
	    "lugar_residencia": $("#lugar_residencia").val(),
	    "lugar_nacimiento": $("#lugarnacimiento_id").val(),
	    "nombre_madre": $("#nombremadre_id").val(),
	    "nombre_padre": $("#nombrepadre_id").val(),
	    "estadocivil": $("#estadocivil_id").val(),
	    "grado_instruccion": $("#id_grado_instruccion").val(),
	    "etnia": $("#etnia_id").val(),
	}
	$.ajax({
		url:url,
		headers:{"X-CSRFToken": token},
		type:'PUT',
		data:data,
		success:function(data){

		}
	});
}

function eliminartabla(tabla){
	var table = document.getElementById(tabla);
	var rowCount = table.rows.length;
	for (var i=rowCount-1; i >=0; i--) {
		table.deleteRow(i);
	}
}


$("#formulario" ).submit(function() {

});


function limpiarcliente(){
	window.localStorage.removeItem("numerodni");
}


function llenar_tabla_cliente_cita(){

	console.log(admision)
	console.log("clientesss",cliente)
	console.log(JSON.parse(localStorage.getItem('cliente')))

		limpiar_tabla('cuerpocliente');
		$("#datocliente").show();
			
		docu = $('#documento').val();
		var table = document.getElementById("detallecliente").getElementsByTagName('tbody')[0];
		var rowCount = table.rows.length
		var row = table.insertRow(rowCount);

		var cell1 = row.insertCell(0);
	    var cell2 = row.insertCell(1);
	    var cell3 = row.insertCell(2);
	    var cell4 = row.insertCell(3);
	    var cell5 = row.insertCell(4);
	    var cell6 = row.insertCell(5);

	    cell1.innerHTML = cliente.fields.numero_documento; //pronto cambiar por el campo HC
	    cell2.innerHTML = cliente.fields.numero_documento
		cell3.innerHTML = cliente.fields.nombres+'  '+cliente.fields.apepaterno+'  '+cliente.fields.apematerno;
		cell4.innerHTML = calcularEdad(cliente.fields.fecha_nacimiento);
		
		if(admision){
			cell5.innerHTML = '<span><a class="btn btn-success btn-sm text-white" href="/admision/confirmar_admision/'+admision.id+'">Admitir</a></span>'
				//cell5.innerHTML = '<span><a class="btn btn-success btn-sm text-white" href="/admision/clientebasico/'+data[i].pk+'">Actualizar Historia</a></span>'+' ' +'<span><a class="btn btn-primary btn-sm text-white" href="/rayosx/crear_atencion?cliente_id='+data[i].pk+'" >Orden</a></span>'
		}else{
			cell5.innerHTML = '<span><a class="btn btn-success btn-sm text-white" href="/configuracion/actualizar_cliente/'+cliente.pk+'">Actualizar Historia</a></span>'+' ' +'<span><a class="btn btn-primary btn-sm text-white" href="/cita/cita_crear/'+cliente.pk+'" >Cita</a></span>'
				//cell5.innerHTML = '<span><a class="btn btn-success btn-sm text-white" href="/admision/clientebasico/'+data[i].pk+'">Actualizar Historia</a></span>'+' ' +'<span><a class="btn btn-primary btn-sm text-white" href="/rayosx/crear_atencion?cliente_id='+data[i].pk+'" >Orden</a></span>'
		
		}
			
		//}/
	}


function servicio_list(){

	id_departamento=document.getElementById("id_centrocosto").value;
	url='http://localhost:8000/cita/api/servicio_list/'+id_departamento
	$.ajax({

		url:url,
 		type:'GET',
 		success:function(data){
 			
 			limpiar_select(document.getElementById("id_servicio"));
 			combo = $('#id_servicio');
 			combo.append('<option value="0">-----</option>');
 			for(i=0;i<data.length;i++){

 				combo.append('<option value='+data[i].id+'>'+data[i].descripcion+'</option>');

 			}
 		}, error:function(){

 			limpiar_select(document.getElementById("id_servicio"));
 		}




	});

}


function limpiar_select(selectbox){
	var i;
    for(i = selectbox.options.length - 1 ; i >= 0 ; i--)
    {
        selectbox.remove(i);
    }
}



function PersonalMedico_list(){

	id_servicio=document.getElementById("id_servicio").value;
	url='http://localhost:8000/cita/api/personalmedico_list/'+id_servicio;

	$.ajax({

		url:url,
		type:'GET',
		success:function(data){

			PersonalDisponibles_list(data)

		},
		error:function(){


			}

	})


}



function PersonalDisponibles_list(data){

	var ul = document.getElementById('lista_medicos')
	
	for (i=0;i< data.length;i++){

		var li= document.createElement('li')
		
		li.setAttribute("onclick","cargar_calendarioProgramado("+data[i].id_medico+")");
		li.innerHTML=data[i].medico
		ul.appendChild(li);

	}
	
	var div = document.getElementById('dias')
	div.appendChild(ul);
   
}


document.getElementById('lista_medicos').addEventListener('click', function(e){
	console.log(e.target)
	document.getElementById('medico').innerHTML=e.target.innerHTML
});

function inicializar_calendar(){
	var calendario_elemento = document.getElementById('calendario');
	calendario_pro = new FullCalendar.Calendar(calendario_elemento,{
		plugins: [ 'interaction', 'dayGrid' ],
		locale:'es',
		timeZone:'UTC',
		selectable: true,
		defaultView:'dayGridMonth',
		titleFormat: { // will produce something like "Tuesday, September 18, 2018"
		month: 'short',
		year: 'numeric',
		day: 'numeric',
	
	  },
		dateClick: function(info) {
			console.log(info.dateStr)
			
		},
		eventClick: function (info) {
		
			calendario_cupos.gotoDate(info.event.start)
			console.log(info.event.id)
			iddetalle= info.event.id
			cargar_programados(iddetalle)

		},  
 
		select: function(info){
			console.log(info.startStr)
		}
	
	});
		calendario_pro.render();
		
}

function cargar_calendarioProgramado(id_medico){

	document.getElementById('id_medicoconsulta').value=id_medico
	source ='http://localhost:8000/cita/api/programacionconsultorio/'+id_medico

	var e =calendario_pro.getEventSources()
	if(e.length>0){
		e[0].remove();
	}
	calendario_pro.addEventSource( source )
}

function inicializar_calendarioProgramados(){

	var calendario_elemento = document.getElementById('calendario_list');
	calendario_cupos = new FullCalendar.Calendar(calendario_elemento,{
			locale:'es',
			plugins: [ 'interaction','dayGrid', 'timeGrid','list' ],
			timeZone: 'UTC',
			defaultView: 'timeGridDay',
			selectable:true,
			minTime:'08:00',
			maxTime:'14:00',
			slotDuration: '00:20:00',
			titleFormat: { // will produce something like "Tuesday, September 18, 2018"
		month: 'short',
		year: 'numeric',
		day: 'numeric',
	
	  },
			eventClick: function (event, calEvent, jsEvent, view) {
				 console.log(event)

			},
			dateClick: function(info) {
				
			},
			select: function(info) {
				$("#ModalEventos").modal();
				
				ups=document.getElementById("id_centrocosto");
				buscar_sis_contingencia_cita() 		
				document.getElementById("ups").innerHTML=ups.options[ups.selectedIndex].text;
				//document.getElementById('medico').innerHTML=nombre_medico
				document.getElementById("fecha").value=moment(info.startStr).format('YYYY-MM-DD')
				document.getElementById("hora").value= moment.utc(info.startStr).format('HH:mm')
				document.getElementById('id_servicioconsultorio').value=ups.value
				
				//document.getElementById('id_medicoconsulta').value=
			
				
			}

		
	});

	calendario_cupos.render()
}


function cargar_programados(idprogramacionconsultorio){
	console.log(idprogramacionconsultorio)
	document.getElementById('id_programacion').value=idprogramacionconsultorio
	source = 'http://localhost:8000/cita/api/detalleprogramacionconsultorio/1'
	if(calendario_cupos.getEventSources().length>0){
		calendario_cupos.getEventSources()[0].remove()
	}

	calendario_cupos.addEventSource(source)
}


function buscar_sis_contingencia(){
			sis = JSON.parse(localStorage.getItem('sis'))
			
			if(sis.codError==='1001'){
				document.getElementById('id_estadosis').innerHTML=sis.resultado
				document.getElementById('fuente').selectedIndex='1'
				document.getElementById('fuente').dispatchEvent(new Event('change'))
				document.getElementById('fuente').setAttribute('disabled','true')
				document.getElementById('fuente_fi').value='2'
				document.getElementById('referencia').removeAttribute('type')
				document.getElementById('referencia').setAttribute('type','hidden')
				document.getElementById('id_referencia').setAttribute('style','display:none')
				
			}else{
				
				document.getElementById('id_referencia').removetAttribute('style')
				document.getElementById('id_estadosis').innerHTML= document.getElementById('id_paciente').value +" "+sis.estado
				
			}
		
	
	
	limpiarcliente();
	
}


function cargar_combo_ubigeo(){
	combo1=document.getElementById('lugar_residencia')
	combo2=document.getElementById('lugar_nacimiento')
	console.log(combo1)
	var data = []
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if(this.readyState == 4 && this.status == 200){
			data = JSON.parse(xhr.responseText);
			data.map(u=>{

				var option = document.createElement("option")
				var option2 = document.createElement("option")
				option.value=u.cod_dis_reniec
				option.text = u.nom_dep_reniec+"/"+u.nom_pro_reniec+"/"+u.nom_dis_reniec
				
				option2.value=u.cod_dis_reniec
				option2.text = u.nom_dep_reniec+"/"+u.nom_pro_reniec+"/"+u.nom_dis_reniec
				
				combo1.appendChild(option)
				combo2.appendChild(option2)
			})
		}
	
	};
	
	
	xhr.open("GET",'http://localhost:8001/bldubigeo/api/ubigeo/ubigeoall/',false);
	xhr.send();
}
//funcion que se usa en el formulario del cliente crear y actualizr mover al sitio adecuado
function consulta_sis(){
	var documento = document.getElementById('id_numero_documento').value
	console.log(documento)
	var data = []
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if(this.readyState == 4 && this.status == 200){
			data = JSON.parse(xhr.responseText);
			
			llenar_tabla_fuente(data);
		}
	
	};
	
	
	xhr.open("GET",'http://localhost:8001/bldubigeo/api/ubigeo/sisintegrado/'+documento,false);
	xhr.send();
}

function llenar_tabla_fuente(data){
	
	eliminartabla('detalle_fuente');
	data = data[0];
	var table = document.getElementById("detalle_fuente_finan").getElementsByTagName('tbody')[0];
	var rowCount = table.rows.length
	var row = table.insertRow(rowCount);

	var cell1 = row.insertCell(0);
	var cell2 = row.insertCell(1);
	var cell3 = row.insertCell(2);
	var cell4 = row.insertCell(3);
	var cell5 = row.insertCell(4);


	cell1.innerHTML = data.descTipoSeguro;
	cell2.innerHTML = data.estado;
	cell3.innerHTML = data.contrato;
	cell4.innerHTML = data.descEESS;
	cell5.innerHTML = data.descEESSUbigeo
	
}

function buscar_sis_integrado(documento){
	
	//var documento = document.getElementById('cliente_numero_documento').value
	var data = []
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if(this.readyState == 4 && this.status == 200){
			data = JSON.parse(xhr.responseText);
			localStorage.setItem('sis',JSON.stringify(data[0]) )
			dato=JSON.parse(localStorage.getItem('sis'))
			console.log(dato)
		}
	};
	
	limpiarcliente();
	//xhr.open("GET",'/admision/admisionpaciente/'+documento,false);
	xhr.open("GET",'http://localhost:8001/bldubigeo/api/ubigeo/sisintegrado/'+documento,false);
	xhr.send();
}


function buscar_sis_contingencia_cita(){
			sis =JSON.parse(localStorage.getItem('sis'))
			console.log(sis)
			if(sis.codError==='1001'){
			
				document.getElementById('id_estadosis').innerHTML=sis.resultado
				document.getElementById('id_tipofinanciamiento').value='2'
				
			}else{
				console.log(sis.estado)
				document.getElementById('id_estadosis').innerHTML= sis.estado
				document.getElementById('id_tipofinanciamiento').value='1'
			}
		
	limpiarcliente();
	
}