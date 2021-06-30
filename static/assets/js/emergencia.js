$('#tablaprincipal').on('click', '.btncalificar', function(event) {
	var uno = $(this).parents('tr').find('td:first-child').text();
 	location.href="/emergencia/admision_emergencia/"+uno+"";
});
$('#tablaprincipal').on('click', '.btneliminar', function(event) {
	var uno = $(this).parents('tr').find('td:first-child').text();
 	location.href="/admision/cancelar_admision/"+uno+"";
});

function getSinDocumento(){
	tipo=$("#tipodocumento").val()

	if (tipo == '3')
	{
		url = "/configuracion/api/sindocumento/";
		$.ajax({
			url:url,
			type:"GET",
			success : function(data) {
				console.log(data)
				cadena=''
				for(var i=0;i<data.length;i++){
					// console.log(data.parametros[i].numero_actual.toString().length);
					ceros = 8-data[i].numero_actual.toString().length;
					for(j=0;j<ceros;j++){
						cadena+='0';
					}
					numero = cadena+data[i].numero_actual;
					documento = $("#documento").val(numero);

				}
			}
		})
	}else{
		$("#documento").val("");

	}
}

function cargar_cliente_emergencia(){
	//validarcliente();
	validar_cliente_nuevo_emergencia();
}

function validar_cliente_nuevo_emergencia(){
	var documento = document.getElementById('documento').value;
	var data = []
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange=function(){
		if(this.readyState == 4 && this.status == 200){

			data = JSON.parse(xhr.responseText);

			if(data.length==0){
				console.log("buscar registro en reniec")
				validar_reniec(documento);
				llena_dataTable();
			}else{
				llenar_tabla_cliente_emergencia(data,2);
				llena_dataTable();
			}
		}

	};

	xhr.open("GET",'/admision/validarcliente/'+documento,false);
	xhr.send();


}


function llenar_tabla_cliente_emergencia(data,existe){
	var documento = document.getElementById('documento').value;
	var data1 = []
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange=function(){
		if(this.readyState == 4 && this.status == 200){

			data1 = JSON.parse(xhr.responseText);

			if(data1.length==0){
					console.log('no hay');
			}else{
				console.log(data1);
			}
		}

	};
	xhr.open("GET",'/emergencia/buscartriaje/'+documento,false);
	xhr.send();

		limpiar_tabla('cuerpocliente');
		$("#datocliente").show();
		for(var i=0;i<data.length;i++){

		//$('#id_cliente').val(data[i].pk);
			lista_cliente.push({'id':data[i].pk})
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
	    cell3.innerHTML = data[i].fields.nombres+'  '+data[i].fields.apepaterno+'  '+data[i].fields.apematerno;
		cell4.innerHTML = calcularEdad(data[i].fields.fecha_nacimiento);


			if(data.length==1){
				if(data1.length==0){
					cell5.innerHTML = '<span><a class="btn btn-success btn-sm text-white" href="/configuracion/actualizar_cliente/'+data[i].pk+'">Actualizar Historia</a></span>'+' ' +'<span><a class="btn btn-primary btn-sm text-white" href="/emergencia/triaje/'+data[i].pk+'" >Triaje</a></span>'
				}
				else{
					cell5.innerHTML = '<span><a class="btn btn-success btn-sm text-white" href="/configuracion/actualizar_cliente/'+data[i].pk+'">Actualizar Historia</a></span>'+' ' +'<span><a class="btn btn-primary btn-sm text-white" href="/emergencia/triados/'+data1[0].pk+'" >Consulta Medico</a></span>'
				}
			}else{
				cell5.innerHTML = '<span><button onclick="enviar_datos_cliente()" class="btn btn-primary btn-sm text-white" h>Fusionar Historia</button></span>'
			}
		}
}
function llenar_tabla_cliente_emergencia1(data,existe){

		limpiar_tabla('cuerpocliente');
		$("#datocliente").show();
		for(var i=0;i<data.length;i++){

		//$('#id_cliente').val(data[i].pk);
			lista_cliente.push({'id':data[i].pk})
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
	    cell3.innerHTML = data[i].fields.nombres+'  '+data[i].fields.apepaterno+'  '+data[i].fields.apematerno;
		cell4.innerHTML = calcularEdad(data[i].fields.fecha_nacimiento);

	    if(existe==1){
			if(data.length==1){
				cell5.innerHTML = '<span><a class="btn btn-success btn-sm text-white" href="/configuracion/crear_cliente?documento='+docu+'">Crear Historia</a></span>'+' ' +'<span><a class="btn btn-primary btn-sm text-white" href="/emergencia/triaje?/'+data[i].pk+'">Triaje</a></span>'
			}else{
				cell5.innerHTML = '<span><button onclick="enviar_datos_cliente()" class="btn btn-primary btn-sm text-white" h>Fusionar Historia</button></span>'
			}
		}
	    else{
			if(data.length==1){
	    		cell5.innerHTML = '<span><a class="btn btn-success btn-sm text-white" href="/configuracion/actualizar_cliente/'+data[i].pk+'">Actualizar Historia</a></span>'+' ' +'<span><a class="btn btn-primary btn-sm text-white" href="/emergencia/triaje/'+data[i].pk+'" >Triaje</a></span>'
			}else{
				cell5.innerHTML = '<span><button onclick="enviar_datos_cliente()" class="btn btn-primary btn-sm text-white" h>Fusionar Historia</button></span>'
			}
		}
	}
}

function limpiar_tabla(tabla){
	var table = document.getElementById(tabla);
	var rowCount = table.rows.length;
	for (var i=rowCount-1; i >=0; i--) {
		table.deleteRow(i);
	}
}

function calcularEdad(fecha) {
    var hoy = new Date();
    var cumpleanos = new Date(fecha);
    var edad = hoy.getFullYear() - cumpleanos.getFullYear();
    var m = hoy.getMonth() - cumpleanos.getMonth();

    if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
        edad--;
    }

    return edad;
}
function validar_reniec(numero)
{
	var url = 'http://181.176.210.204:81/bldubigeo/api/ubigeo/dnis/'+numero+'/';
		$.ajax({
		async:false,
		url:url,
		type:'GET',

		success: function(data){
			console.log("hay datos reniec")
			llenar_tabla_reniec(data,1);
		},
		error: function(data){
			console.log("soy error")
			llenar_tabla_reniec(data,2);

		}
	});
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

function eliminartabla(tabla){
	var table = document.getElementById(tabla);
	var rowCount = table.rows.length;
	for (var i=rowCount-1; i >=0; i--) {
		table.deleteRow(i);
	}
}

function llena_dataTable()
{

	documento=document.getElementById("documento").value;
	 var tabla = $('.dataTables-example').DataTable({
	 	"language": {
                  "url": "/static/assets/plugins/DataTables/language/Spanish.json"
        },


        responsive: true,
        order: [[ 0, "desc" ]],
        processing: true,
        retrieve: true,
        ajax: "/admision/api/admision/"+documento,
        dataSrc: "data",
        search : "Búsqueda",



        columns: [
	        {data:'id' },
	        {
	        	data:   "servicio",
	        	render: function ( data, type, row ) {
	        		if ( data === '1' ) {
	        			return 'CONSULTA EXTERNA';
	        		}
	        		if ( data === '2' ) {
	        			return 'EMERGENCIA';
	        		}
	        		if ( data === '3' ) {
	        			return 'HOSPITALIZACION';
	        		}

	        		return data;
	        		},
	        		className: "dt-body-center"
	        },
	        { data: 'consultorio'},
	        { data: 'medico'},
	        { data: 'fecha_atencion'},
	        {
	        	data:   "estado",
	        	render: function ( data, type, row ) {
	        		if ( data === '1' ) {
	        			return '<span class="label label-danger">PENDIENTE</span>';
	        		}
	        		if ( data === '2' ) {
	        			return '<span class="label label-warning">ADMITIDO</span>';
	        		}
	        		if ( data === '3' ) {
	        			return '<span class="label label-danger">CANCELADO</span>';
	        		}
	        		if ( data === '4' ) {
	        			return '<span class="label label-success">ATENDIDO</span>';
	        		}
							if ( data === '5' ) {
	        			return '<span class="label label-info">PENDIENTE DE ATENCION</span>';
	        		}

	        		return data;
	        		},
	        		className: "dt-body-center"
	        },

	        {
	        	data:   "estado",

	        	render: function ( data, type, row ) {
	        		if ( data === '1' ) {
	        			return ' <button class="btn  btn-xs btn-green btncalificar"><i class="fas fa-eye"></i></button> <button class="btn btn-xs atencion btn-danger btneliminar"><i class="fa fa-times-circle"></i></button>';
	        		}if ( data === '2' ) {
	        			return ' <button class="btn  btn-xs btn-green btncalificar"><i class="fas fa-eye"></i></button> <button class="btn btn-xs atencion btn-danger btneliminar"><i class="fa fa-times-circle"></i></button>';
	        		}
								return ' <button class="btn  btn-xs btn-green btncalificar"><i class="fas fa-eye"></i></button> <button class="btn btn-xs atencion btn-danger btneliminar"><i class="fa fa-times-circle"></i></button>';






	        		/*return '';*/
	        		},
	        		className: "dt-body-center"
	        },


	        ],

	 });

	  $('.dataTables-example tbody').on( 'click', 'button.muestra', function () {

	  		var fila = tabla.row( $(this).parents('tr') ).data();
             abrir_modal('/laboratorio/recepcionmuestras/' + fila['id']);
        });
}
