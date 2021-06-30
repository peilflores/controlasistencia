let lista_cliente=[]
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
				llena_dataTable_emergencia();
			}else{
				llenar_tabla_cliente_emergencia(data,2);
				llena_dataTable_emergencia();
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
	xhr.open("GET",'/tesoreria/api/cuenta_corriente/'+data[0].pk,false);
	xhr.send();

		limpiar_tabla('cuerpocliente');
		$("#datocliente").show();
		for(var i=0;i<data.length;i++){
      console.log(data1);
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
      var cell6 = row.insertCell(5);


	    cell1.innerHTML = data[i].fields.nombres+'  '+data[i].fields.apepaterno+'  '+data[i].fields.apematerno;
      if (data1.estado == 1){
  	    cell2.innerHTML = "APERTURADA";
      }
      else{
        if(data1.estado == 2){
         cell2.innerHTML = "BLOQUEADA";
      }
      else{
        cell2.innerHTML = "CERRADA";
      }
      }
	    cell3.innerHTML = data1.linea_credito
		  cell4.innerHTML = data1.cargo
      cell5.innerHTML = data1.saldo
      cell6.innerHTML='<span><a class="btn btn-success btn-xs text-white" href="/tesoreria/detallecuentacorriente/'+data1.id+'">Detalles</a></span>';


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
			console.log(data)
			llenar_tabla_reniec(data,1,1);
		},
		error: function(data){
			console.log("soy error")
			llenar_tabla_reniec(data,2,numero);

		}
	});
}

function llenar_tabla_reniec(data,existe,numero){
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
	if(existe == 1){

	cell5.innerHTML='<span><a class="btn btn-success btn-sm text-white" href="/emergencia/crear_cliente_emergencia?documento='+data.dni+'&nombre='+data.nombre+'&apepaterno='+data.apepaterno+'&apematerno='+data.apematerno+'">Crear Historia</a></span>';
	}
	else{
		cell5.innerHTML='<span><a class="btn btn-success btn-sm text-white" href="/emergencia/crear_cliente_emergencia?documento='+numero+'">Crear Historia</a></span>';
	}

}

function eliminartabla(tabla){
	var table = document.getElementById(tabla);
	var rowCount = table.rows.length;
	for (var i=rowCount-1; i >=0; i--) {
		table.deleteRow(i);
	}
}

function llena_dataTable_emergencia()
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
        ajax: "/emergencia/api/atencionconsulta/"+documento,
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
	        	data:   "estadoatencion",
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

function consultar(){
	tipofin = $("#tipofinanciamiento_id").val()
	console.log(tipofin)
	ok=0
	if (tipofin == '1'){
		$("#darcita_id").hide();
		$("#atencioncliente_id").hide();
		$("#numerocaptcha_id").val("");
		url = "http://181.176.210.204:81/bldubigeo/api/ubigeo/nuevo/"
		ok=1
		documento = recuperadocumento();
		if (documento == null){
			documento = $("#documento").val();
			$("#id_numerodoc").val(documento);
		}
		$("#tipofin_id").val(tipofin);
	}
	else{
		limpiar();
		$("#atencioncliente_id").show();
		$("#darcita_id").show();
		$("#referencia_id").removeAttr("required");
		$("#darcita_id").show();
		$("#imagencaptcha_id").hide();
		$("#resetcampos_id").show();
		$("#numerocaptcha_id").hide();
		$("#botonsis_id").hide();
		$("#segurisis_id").hide();
	}
	if (ok == 1){
		$.ajax({
			url:url,
			type:'GET',
			success:function(data){

				$("#imagencaptcha_id").show();
				$('#imagencaptcha_id').html("<img border='0' height='40' src='"+data.urlimagen+"' width='190'/>");
				$("#numerocaptcha_id").show();
				$("#botonsis_id").show();
				$("#estado_id").val(data.estado);
				$("#validacion_id").val(data.validacion);
			}
		});
	}

}

function buscarpaciente(token){
	token = token
	captcha = $('#numerocaptcha_id').val();
    documento = document.getElementById("id_numerodoc").value;


    if (documento == null){
    	documento = $('#documento').val();
    	$("#id_numerodoc").val(documento)
	}
	tipofin = $("#tipofinanciamiento_id").val()
	ok=0
	if ( captcha.length==5 && tipofin == '1')
	{
		url = "http://181.176.210.204:81/bldubigeo/api/ubigeo/nuevo/"
		data = {
			'dni': documento,
            'estado': $('#estado_id').val(),
            'validacion': $('#validacion_id').val(),
            'valorimagen': captcha,
            'csrfmiddlewaretoken':token,
		}
		ok=1
	}

	if (ok == 1){
		$.ajax({
			url:url,
			type:'POST',
			data:data,
			success:function(data){

				if (data != "Paciente no Registrado en Sis"){
					$("#segurisis_id").show()
					if ('{{admision}}'){

					}
					else{
						checkboxcupo();
					}
					$("#codestablecimiento_id").html(data.codestablecimiento);
					$("#codestablecimiento1_id").val(data.codestablecimiento);
					$("#codrenaes_id").val(data.codrenaes);
					$("#estabsalud_id").html(data.estabsalud);
					$("#estabsalud1_id").val(data.estabsalud);
					$("#ubicacionestabsalud_id").html(data.ubicacionestabsalud);
					$("#planbeneficios_id").val(data.planbeneficios);
					$("#fechaafiliacion_id").val(data.fechaafiliacion);
					$("#numeroafiliacion1_id").val(data.numeroafiliacion);
					$("#numeroafiliacion_id").html(data.numeroafiliacion);
					$("#estadosis_id").html(data.estado);
					$("#tiposeguro_id").val(data.tiposeguro);
					$("#tiposeguro2_id").val(data.tiposeguro2);
					$("#vigenciahasta_id").val(data.vigenciahasta);
					if (data.estado == 'ACTIVO') {
						$("#darcita_id").show();
						$("#atencioncliente_id").show();
						$("#referencia_id").show();
						$("#referencia_id").attr("required");
					}else{
						$("#referencia_id").hide();
						$("#referencia_id").removeAttr("required");
						$("#referencia_id").attr("readonly");
						$("#numerocaptcha_id").hide();
						$("#botonsis_id").hide();
						$("#imagencaptcha_id").hide();
					}
				}else{
					alert("Paciente no Registrado en SiS")
					$("#numerocaptcha_id").hide();
					$("#botonsis_id").hide();
					$("#imagencaptcha_id").hide();
				}
			}
		});
	}

}

function limpiar(){
	$("#numerocaptcha_id").html("");
	$("#codestablecimiento_id").html("");
	$("#codestablecimiento1_id").val("");
	$("#codrenaes_id").val("");
	$("#estabsalud_id").html("");
	$("#estabsalud1_id").val("");
	$("#ubicacionestabsalud_id").html("");
	$("#ubicacionestabsalud1_id").val("");
	$("#planbeneficios_id").val("");
	$("#fechaafiliacion_id").val("");
	$("#numeroafiliacion_id").html("");
	$("#numeroafiliacion1_id").val("");
	$("#estadosis_id").val("");
	$("#tiposeguro_id").val("");
	$("#tiposeguro2_id").val("");
	$("#vigenciahasta_id").val("");
}

function recuperadocumento(){
	dni = window.localStorage.getItem("numerodni");
 	$("#id_numerodoc").val(dni)
 	return dni
}
