let examenes;
let insumos=[];
let lista_cliente=[]
let local = window.location;

function agregar_insumo(){

	var item=new Object();

	idinsumo =$('#id_producto').val();
	cantidad = $('#id_cantidad').val();

	unidad = $('#id_unidad').val();

	var url = '/configuracion/api/productos/'+idinsumo;
	$.ajax({
		url:url,
		type:'GET',
		success:function(data){

			item.id=data.id;
			item.descripcion=data.descripcion;
			item.cantidad = cantidad;
			item.unidad = data.unidadmedida;
			item.precio = data.precio;

			llenar_tablacostounitario(item);
		}
	});

}

function mostrar_reporte()
{


	$id=$("#reporte").val();

	if($id =='2')
	{
		$(".mostrar_div").show();
		$(".mostrar_div2").show();
		$(".general").hide();
		$(".mostrar_div3").hide();
		$('#id_servicio').removeAttr("required");

	}else{if($id =='3'){
		$(".mostrar_div").hide();
		$(".mostrar_div2").hide();
		$(".general").show();
		$(".mostrar_div3").show();
		$('#id_servicio').removeAttr("required");
	}else{
		$(".mostrar_div").hide();
		$(".mostrar_div2").show();
		$(".general").show();
		$(".mostrar_div3").hide();
		$('#id_servicio').prop("required", true);
	}


	}
}

function mensaje2(){
	$('#modal-dialog').modal('hide')
	$('#principal').hide();
	$('#secundario').show();
}

function devuelve_prestamo(){

	dato=[];
	var check;


	$("#tbl tbody tr").each(function(){

		check=($(this).find('td').find('input').is(':checked'));

		dato.push({'id':$(this).find('td').eq(0).text(),'estado':check});


	});

	$("#detalleprestamos").val(JSON.stringify(dato));


}
function limpiar_tabla(tabla){
	var table = document.getElementById(tabla);
	var rowCount = table.rows.length;
	for (var i=rowCount-1; i >=0; i--) {
		table.deleteRow(i);
	}
}


function llenar_tablacostounitario(linea){


	var table = document.getElementById("tablacosto").getElementsByTagName('tbody')[0];

    var rowCount = table.rows.length
    var row = table.insertRow(rowCount);
    var cell1 = row.insertCell(0);//item
    var cell2 = row.insertCell(1);//insumo
    var cell3 = row.insertCell(2);//cant
    var cell4 = row.insertCell(3);//unidad medida
    var cell5 = row.insertCell(4);//precio
    var cell6 = row.insertCell(5);//total
    var cell7 = row.insertCell(6);//opciones

    cell1.innerHTML = linea.id;
    cell2.innerHTML = linea.descripcion;
    cell3.innerHTML = linea.cantidad;
    cell4.innerHTML = linea.unidad.abreviado;
    cell5.innerHTML = linea.precio;
    cell6.innerHTML =linea.cantidad*linea.precio;
    cell7.innerHTML = '<a class="btn btn-danger btn-icon  btn-xs" onclick="removerArticulo(this)"><i class="fa fa-minus"></i></a>'

	insumos.push(linea);
}

function enviar_detallecostounitario(){

	console.log(JSON.stringify(insumos));
	$('#insumos').val(JSON.stringify(insumos));
}

//funcion agregada para hacer ajax este metdo se eimplentara en todos las funciones donde se requiera implementar ajax
function validar_cliente_nuevo(){
	var documento = document.getElementById('documento').value;
	var data = []
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange=function(){
		if(this.readyState == 4 && this.status == 200){

			data = JSON.parse(xhr.responseText);

			if(data.length==0){
				console.log("buscar registro en reniec")
				validar_reniec(documento);
			}else{
				llenar_tabla_cliente(data,2);
			}
		}

	};

	xhr.open("GET",'/admision/validarcliente/'+documento,false);
	xhr.send();


}



function validarcliente() {
	var datos;
	documento=$("#documento").val();
	tipo=$("#tipodocumento").val();

	//var url = 'http://192.168.5.201:8080/configuracion/api/cliente/'+this.documento;
	var url = '/admision/validarcliente/'+this.documento;
	$.ajax({
		    async:false,
			url:url,
			type:'GET',
		success: function(data){
			   	console.log(data.length);
				if(data.length==0){
					buscar_reniec(documento);
			$('#agregarcliente').show();
			$('#existe').show();
				}else{
					llenar_tabla_cliente(data,2);
				}
			datos = data;
		},
	  error: function() {
	  /*
		buscar_reniec(documento);
         $('#agregarcliente').show();
         $('#existe').show();*/
      }
	});

 return datos
}


function validarcliente1() {
	var datos;
	documento=$("#documento").val();
	tipo=$("#tipodocumento").val();
	var url;
	var ok=0;
	if(documento.length==8 && tipo=='1') {
			url = '/configuracion/api/cliente/'+this.documento;
			ok = 1;
	}

	if (ok==1){
		$.ajax({
		//async:false,
		url:url,
		type:'GET',
		success: function(data){
			$("#datos").html(data.nombres + '  ' + data.apepaterno +'   '  + data.apematerno);

			$("#idcliente").val(data.id);

			datos = data;
		},
	  error: function() {

		buscar_reniec(documento);
         $('#agregarcliente').show();
         $('#existe').show();
      }
	});
 }
 return datos
}

function cargar_cliente(){
	//validarcliente();
	///////////validar_cliente_nuevo();
	buscar_ordenes_rayosx();
}

function buscar_ordenes_laboratorio(){
	var documento = document.getElementById('documento').value;
	var data = []
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if(this.readyState == 4 && this.status == 200){
			data = JSON.parse(xhr.responseText);
			
			if(data.length>0){
			
				orden = data[0]
			document.getElementById('datos_orden').innerHTML ="Orden N°: " +   orden.id + '//--  Medico Tratante: '+ orden.personal.apepaterno +" "+orden.personal.apematerno +" "+ orden.personal.nombres + "//--  Servicio : " +orden.centrocosto.descripcion
			document.getElementById('resultado_busqueda').setAttribute('style','display:block')
			
				orden.detalles.map(d=>{
					crear_lista_examenes(d.producto.id+" - "+"("+d.producto.codigo_anterior+") " + d.producto.descripcion)
					console.log(d.producto.descripcion)
				})
			}
		}

}
	//xhr.open("GET",'http://localhost:8000/rayosx/api/atencione2/'+documento,false);
	xhr.open("GET",'http://localhost:8000/rayosx/api/ordenes/130/cliente/'+documento,false);
	xhr.send();
}


function buscar_ordenes_rayosx(){
	var documento = document.getElementById('documento').value;
	var data = []
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if(this.readyState == 4 && this.status == 200){
			data = JSON.parse(xhr.responseText);
			
			if(data.length>0){
			
				orden = data[0]
			document.getElementById('datos_orden').innerHTML ="Orden N°: " +   orden.id + '//--  Medico Tratante: '+ orden.personal.apepaterno +" "+orden.personal.apematerno +" "+ orden.personal.nombres + "//--  Servicio : " +orden.centrocosto.descripcion
			document.getElementById('resultado_busqueda').setAttribute('style','display:block')
			
				orden.detalles.map(d=>{
					crear_lista_examenes(d.producto.id+" - "+"("+d.producto.codigo_anterior+") " + d.producto.descripcion)
					console.log(d.producto.descripcion)
				})
			}
		}

}
	//xhr.open("GET",'http://localhost:8000/rayosx/api/atencione2/'+documento,false);
	xhr.open("GET",'http://localhost:8000/rayosx/api/ordenes/130/cliente/'+documento,false);
	xhr.send();
}


function crear_lista_examenes(examen){
	var ul = document.getElementById('detalle_examenes')
	
	var li = document.createElement('li')
	
	li.innerHTML = examen
	
	ul.appendChild(li)

}

function cargar_datosCliente(){

	data = validarcliente();


	$('#datos_cliente').show();

	$('#clientenombres').val(data.nombres);
	$('#clienteapepaterno').val(data.apepaterno);
	$('#clienteapematerno').val(data.apematerno);

	$('#clientehistoria').val(data.cod_archivamiento);
	$('#clientehistoriat').html('<strong> Hist Clin:</strong>' + data.cod_archivamiento);
	$('#datapicker').val(data.fecha_nacimiento);
	$('#id_sexo').val(data.sexo);

	$('#divclientet').show();
	$('#clientet').html('<strong>Cliente: </strong>' + data.nombres+' '+data.apepaterno+' '+data.apematerno);
	$('#id_cliente').val(data.id);
	$('#divexistecliente').show();
}


//candidato a modificar por el sisintegrado
function buscar_sis(sis)
{
		var url = 'http://'+local.hostname+':81'+'/bldubigeo/api/ubigeo/sis/'+sis+"/";
		var datos;

		$.ajax({
		async:false,

		url:url,

		type:'GET',
		success: function(data){
			console.log(data);
			datos = data;
			llenar_tabla_cliente_sis(data,1);
		},
		error:function(){
			location.href="/configuracion/crear_cliente/"
		}
	});
	return datos;
}

function buscar_reniec(numero)
{
	var url = 'http://'+local.hostname+':81'+'/bldubigeo/api/ubigeo/dnis/'+numero+'/';
		$.ajax({
		async:false,
		url:url,
		type:'GET',

		success: function(data){
			console.log("hay datos reniec")
			llenar_tabla_cliente_reniec(data,1);

		},
		error: function(){
			console.log("soy error")
			buscar_sis(numero)
			//location.href="/configuracion/crear_cliente/"

		}
	});

}

function llenar_tabla_cliente(data,existe){

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
				cell5.innerHTML = '<span><a class="btn btn-success btn-sm text-white" href="/configuracion/crear_cliente?documento='+docu+'">Crear Historia</a></span>'+' ' +'<span><a class="btn btn-primary btn-sm text-white" href="/rayosx/crear_atencion?cliente_id='+data[i].pk+'">Orden</a></span>'
			}else{
				cell5.innerHTML = '<span><button onclick="enviar_datos_cliente()" class="btn btn-primary btn-sm text-white" h>Fusionar Historia</button></span>'
			}
		}else if(existe==3){
			if(data.length==1){
				cell5.innerHTML = '<span><a onclick="dar_cita()" class="btn btn-primary btn-sm text-white">Dar Cita</button></a>'
			}else{
				cell5.innerHTML = '<span><button onclick="enviar_datos_cliente()" class="btn btn-primary btn-sm text-white" h>Fusionar Historia</button></span>'
			}
		}
	    else{
			if(data.length==1){
	    		cell5.innerHTML = '<span><a class="btn btn-success btn-sm text-white" href="/configuracion/actualizar_cliente/'+data[i].pk+'">Actualizar Historia</a></span>'+' ' +'<span><a class="btn btn-primary btn-sm text-white" href="/rayosx/crear_atencion?cliente_id='+data[i].pk+'" >Orden</a></span>'
			}else{
				cell5.innerHTML = '<span><button onclick="enviar_datos_cliente()" class="btn btn-primary btn-sm text-white" h>Fusionar Historia</button></span>'
			}
		}
	}
}


function llenar_tabla_cliente_reniec(data,existe){

	limpiar_tabla('cuerpocliente');
	$("#datocliente").show();


	$('#id_cliente').val(data.id);
	//lista_cliente.push({'id':data.id})
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
		cell5.innerHTML = '<span><a class="btn btn-success btn-sm text-white" href="/configuracion/crear_cliente?documento='+docu+'&nombre='+data.nombre+'&apepaterno='+data.apepaterno+'&apematerno='+data.apematerno+'">Crear Historia</a></span>'
	}
}


function llenar_tabla_cliente_sis(data,existe){

	limpiar_tabla('cuerpocliente');
	$("#datocliente").show();


	$('#id_cliente').val(data.id);
	//lista_cliente.push({'id':data.id})
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
	cell3.innerHTML = data.nombres+'  '+data.apepaterno+'  '+data.apematerno;
	cell4.innerHTML = calcularEdad(data.fecha_nacimiento);

	if(existe==1){
		cell5.innerHTML = '<span><a class="btn btn-success btn-sm text-white" href="/configuracion/crear_cliente?documento='+docu+'&nombre='+data.nombre+'&apepaterno='+data.apepaterno+'&apematerno='+data.apematerno+'">Crear Historia</a></span>'
	}
}


function agregarcliente() {
	documento=$("#documento").val();
	tipo=$("#tipo").val();
	var url;
	var ok=0;
	if(documento.length==8 && tipo=='1') {

			url = 'http://'+local.hostname+':81'+'/bldubigeo/api/ubigeo/sis'+this.documento+'/';
			ok = 1;
	}
	else if (documento.length==11 && tipo=='3'){
			url = 'http://'+local.hostname+':81'+'/bldubigeo/api/ubigeo/ruc/'+this.documento+'/';
			ok=1;
	}


	if (ok==1){
		$.ajax({
		url:url,
		type:'GET',

		success: function(data){
			if(data =='No tiene SIS'){
				$('#success').hide();
				$('#clientenombres').removeAttr('disabled');
				$('#clienteapepaterno').removeAttr('disabled');
				$('#clienteapematerno').removeAttr('disabled');
				$('#divnuevocliente').show();
			}
			else {
                $('#agregarcliente').hide();
                $('#success').show();
                $('#error').hide();
                $('#divcliente').show();
                $('#clientenombres').val(data.nombres);
                $('#clienteapepaterno').val(data.apepaterno);
                $('#clienteapematerno').val(data.apematerno);
                $('#divclientet').show();
                $('#clientet').val(data.nombres + ' ' + data.apepaterno + ' ' + data.apematerno);
                $('#clientehistoriat').val(data.cod_archivamiento);
                $('#divnuevocliente').show();
            }
		},error: function() {
         $('#agregarcliente').show();
         $('#error').show();
      }
	});
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


function grabarcliente(token) {
	var documento=$("#documento").val();
	var tipo=$("#tipo").val();
	var nombres=$('#clientenombres').val();
	var apepaterno=$('#clienteapepaterno').val();
	var apematerno=$('#clienteapematerno').val();
	var fecha=$('#datapicker').val();
	var fechanac = fecha.split("/").reverse().join("-");
	var historia =$('#clientehistoria').val();
	var sexo = $('#id_sexo').val();
	var url = '/configuracion/api/cliente/';
	var datos = {
        'nombres':nombres,
        'apepaterno':apepaterno,
        'apematerno':apematerno,
        'fecha_nacimiento':fechanac,
        'sexo':sexo,
        'cod_archivamiento':historia,
        'numero_documento':documento,
        'tipo_documento':tipo,
        'csrfmiddlewaretoken':token,
    };
		$.ajax({
		url:url,
		type:'POST',
		data:datos,
		success: function(data){
            console.log('guardo cliente');
            $("#modal-form").modal("hide");
		}
	});
}

function detalleexamen() {
	var examen = $('#id_examen').val();
	var insumo = $('#id_insumoalternativo').val();
	var precio = $('#id_precio').val();

}



function cargarPrecioStock(){

	var idproducto = $('#id_producto').val()

	var fuente =$('#id_financiamiento').val();

	var url ='/configuracion/api/productos/'+idproducto;


	$.ajax({
		url :url,
		type:'GET',
		success: function(data){

			if(fuente =='2'){

				$("#id_precio").val(parseFloat(data.precios[0].tarifa_hospital).toFixed(2));
			}
			else{

				$("#id_precio").val(parseFloat(data.precios[0].tarifa_convenio).toFixed(2));
			}

			//$("#id_precio").val(15.00);

		}
	});
}

function agregar_item(){

	Parametro_rayosx()
	if($('#id_precio').val()!=''){

	var elemento = document.getElementById("id_producto");
	var financiamento = document.getElementById("id_financiamiento");
	var examen = {'id':elemento.value,'descripcion':elemento.options[elemento.selectedIndex].text,'precio':$("#id_precio").val()};

	if(sessionStorage.getItem('examenes') === null){
		examenes=[];
	}else{
		examenes=JSON.parse(sessionStorage.getItem('examenes'));
	}

	examenes.push(examen);

	sessionStorage.setItem('examenes',JSON.stringify(examenes));



	var table = document.getElementById("detalleaten").getElementsByTagName('tbody')[0];
    var rowCount = table.rows.length
    var row = table.insertRow(rowCount);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    var cell6 = row.insertCell(5);
    var cell7 = row.insertCell(6);

    cell1.innerHTML = '<input type="hidden" value="'+(elemento.value)+'" data-precio="'+parseFloat(document.getElementById("id_precio").value).toFixed(2)+'" class="iddetalle_new">';

    cell2.innerHTML = elemento.value;//rowCount;
    cell3.innerHTML = elemento.options[elemento.selectedIndex].text;
      if(sessionStorage.getItem("correlativo") !=0)
    {

    	cell4.innerHTML = '<input type="text" class="form-control id_correlativo" value="'+sessionStorage.getItem("correlativo")+'" style="width:90px " >';
    }
    else{
    	cell4.innerHTML = '<input type="hidden" class="form-control id_correlativo" value="'+sessionStorage.getItem("correlativo")+'" style="width:90px " >';



    }
    cell5.innerHTML = parseFloat(document.getElementById("id_precio").value).toFixed(2);
    cell6.innerHTML = financiamento.options[financiamento.selectedIndex].text;
    cell7.innerHTML = '<a class="btn btn-danger btn-icon  btn-xs" onclick="removerArticulo(this)"><i class="fa fa-minus"></i></a>'


    $("#total").text(sumarTotal());

}
}
function enviar_datos_cliente(){
	$('#id_cliente').val(JSON.stringify(lista_cliente));

}

function enviar_datos(){

		dato=[]
		datos=[]
		$(".iddetalle_new").each(function(){

			dato.push({'id':$(this).val(),'precio':$(this).attr("data-precio")});

		})

		$(".id_correlativo").each(function(){


			datos.push({'archivo_new':$(this).val()});
		})
		$('#codarchivo').val(JSON.stringify(datos));
		$('#detalleexamen').val(JSON.stringify(dato));



		sessionStorage.clear();

		loader();
	}

function removerArticulo(row) {
	var d = row.parentNode.parentNode.rowIndex;
	document.getElementById('detalleaten').deleteRow(d);

}
function sumarTotal(){
	const detalle = JSON.parse(sessionStorage.getItem('examenes'));
	total =0;
	detalle.forEach(function(deta){
		total += parseFloat(deta.precio);
	});
	console.log(total)
	return total.toFixed(2);
}


function financiador(){
	var dni = $('#id_numero_documento').val();
	console.log(dni)
	var data = buscar_sis(dni);

	console.log(data)

		var table = document.getElementById("financiador").getElementsByTagName('tbody')[0];
		var rowCount = table.rows.length
		var row = table.insertRow(rowCount);

		var cell1 = row.insertCell(0);
	    var cell2 = row.insertCell(1);
	    var cell3 = row.insertCell(2);
	    var cell4 = row.insertCell(3);
	    var cell5 = row.insertCell(4);


	    cell1.innerHTML = data.seguro;
	    cell2.innerHTML = 'ACTIVO';
	    cell3.innerHTML = data.codafiliado;
	    cell4.innerHTML = data.eess;
	    cell5.innerHTML= data.departamento+'/'+data.provincia+'/'+data.distrito;
	//if (data == 'No tiene SIS'){
	//	limpiar_tabla('financiador');
	//}

}


function llenacliente(){
	numero = $('#documento').val();
	var url = 'http://'+local.hostname+':81'+'/bldubigeo/api/ubigeo/dni/'+numero;
		$.ajax({
		// async:false,
		url:url,
		type:'GET',

		success: function(data){

			$('#id_nombres').val(data.nombres);
			$('#id_apepaterno').val(data.apepaterno);
			$('#id_apematerno').val(data.apematerno);


		}
	});

}

function recorre_input()
{

	datos=[];
	dato=[];
	cantidad_componente=$(".componente").length;
	cantidad_producto=$(".producto").length;


	for(i=0;i<cantidad_componente;i++)
		{
			compo=document.getElementsByName("componente")[i].value;
			resultadocompo=document.getElementsByName('resultadocompo')[i].value;

			dato.push({'compo':compo,'resultadocompo':resultadocompo});

		}
		console.log(dato);

		$("#detallecomponente").val(JSON.stringify(dato));
	for(i=0;i<cantidad_producto;i++)
		{
			producto=document.getElementsByName("producto")[i].value;
			resultadoprodu=document.getElementsByName("resultadoproducto")[i].value;

			datos.push({'producto':producto,'resultadoprodu':resultadoprodu});

		}

	$("#detalleproducto").val(JSON.stringify(datos));

	}

function guardar_muestra()
{

	datos=[];
	var check;

	$("#muestra tbody tr").each(function(){

		check=($(this).find('td').find('input').is(':checked'));
		datos.push({'id':$(this).find('td').eq(0).text(),'estado':check});

	});
	console.log(datos);
	$("#detallemuestra").val(JSON.stringify(datos));
}


function getatenciones(){

    dni=$("#id_cliente").val();

    if(dni.length==8)
    {
    	url='/configuracion/api/clienteatencion/'+dni+'/atenciones';

		$.ajax({

			url:url,
			type:'GET',
			dataType:'json',
			success:function(data){
					console.log(data)
				 $("#aten").children().remove();
			$.each(data, function (key,value) {
	        	//$('<option>').text(this).appendTo("#aten");
	        	console.log(data[key].cliente.nombres)
	        	$("#cliente").html(data[key].cliente.nombres +' ' +data[key].cliente.apepaterno+' ' +data[key].cliente.apematerno );
	        	$("#aten").append('<option value="'+data[key].id+'">'+data[key].id+'-'+data[key].fecha+'</option>');
	    	})
				 $("#aten").bootstrapDualListbox('refresh', true);

			}

		});
    }
}

function enviar_datosprestamo()
{

	var datos=[];
	// var atencion= new Object();
	$("#bootstrap-duallistbox-selected-list_").each(function(){
		$(this).children("option").each(function(){
			// atencion.id=$(this).val();
			datos.push($(this).val());

		})
		// console.log($('option',this).attr('value'));
		// console.log('option'+$(this).text()+'valor'+$(this).attr('value'));

	})

	$("#prestamo").val(JSON.stringify(datos));


}

function CargarCboDistrito(){
	lugarresidencia = $("#lugar_residencia_id").val()
	lugarnacimiento = $("#lugar_nacimiento_id").val()
	$.ajax({
		url: 'http://'+local.hostname+':81'+'/bldubigeo/api/ubigeo/distritos/',
		type:'GET',
		success: function(data){

			var combo = $('#lugar_residencia');
			var combo2 =$('#lugar_nacimiento');
			combo.append('<option value=""></option>');
			combo2.append('<option value=""></option>');
    		$.each(data, function (obj, item) {
    			if(item.coddist==lugarresidencia){
    				combo.append('<option value="' + item.coddist + '" selected>' + item.provincia.departamento.descripcion + '/' + item.provincia.descripcion + '/' +item.descripcion +'</option>');
    			}
    			if(item.coddist==lugarnacimiento){
    				combo2.append('<option value="' + item.coddist + '" selected>' + item.provincia.departamento.descripcion + '/' + item.provincia.descripcion + '/' +item.descripcion +'</option>');
    			}
    			else{
    				combo.append('<option value="' + item.coddist + '">' + item.provincia.departamento.descripcion + '/' + item.provincia.descripcion + '/' +item.descripcion +'</option>');
					combo2.append('<option value="' + item.coddist + '">' + item.provincia.departamento.descripcion + '/' + item.provincia.descripcion + '/' +item.descripcion +'</option>');
    			}
			});
		}
	});
}


function loader(){

	$('#modal-loader').modal('show');
}


function Parametro_rayosx()
{
	costo=$("#centrocosto_id").html()
	count=0
	dato=[]
	num=$("#totalregistro").val();
	if (costo == 130)
	{
		var url ='/rayosx/api/parametroatencion/'+costo;


	$.ajax({

		async:false,
		url:url,
		type:'GET',
		success:function(data)
		{

			if(num == ""){

			tot=data.numero_actual
			sessionStorage.setItem('correlativo',tot);

			}else{
				$("#detalleaten tbody tr").each(function(){

					count =count+1
					tot=count+data.numero_actual
					sessionStorage.setItem('correlativo',tot);


			});


			}





		}

	})


	$("#totalregistro").val(JSON.stringify(count));


	}else{

		tot=0;
		sessionStorage.setItem('correlativo',tot);

	}

}


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



function validar_reniec(numero)
{
	var url = 'http://localhost:8001/bldubigeo/api/ubigeo/dnis/'+numero+'/';
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
	}else{
		cell5.innerHTML='<span><a class="btn btn-success btn-sm text-white" href="/configuracion/crear_cliente?documento='+data.dni+'&nombre='+data.nombre+'&apepaterno='+data.apepaterno+'&apematerno='+data.apematerno+'">Crear Historia</a></span>';

	}
}
