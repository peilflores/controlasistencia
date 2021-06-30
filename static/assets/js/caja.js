let parametros
let indexArray;
let detalles
let orden_atencion
let total=0;
let idcosto;
var local = window.location;
const tabladetalles=document.getElementById('tabla-detalles');
let productos=[]
let cadena

function ParametroCaja(tipoComprobante,serie,valor){
	this.tipoComprobante=tipoComprobante;
	this.serie=serie;
	this.valor=valor;


}

ParametroCaja.prototype.getValor=function(){
	return this.valor+1;
}


function agregar_parametro(){

	var tipocomprobante = document.getElementById("id_tipo_comprobante");
	
	var parametro = {'id':tipocomprobante.value,'descripcion':tipocomprobante.options[tipocomprobante.selectedIndex].text,'serie':$("#id_serie").val(),'valor':$("#id_numero_actual").val()};

	if(sessionStorage.getItem('paramentros') === null){
		parametros=[];
	}else{
		parametros=JSON.parse(sessionStorage.getItem('parametros'));
	}

	parametros.push(parametro);

	sessionStorage.setItem('parametros',JSON.stringify(parametros));
	
	
	
	var table = document.getElementById("detalleparametro").getElementsByTagName('tbody')[0];
    var rowCount = table.rows.length
    var row = table.insertRow(rowCount);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);

    cell3.setAttribute('align','right')

    cell1.innerHTML = tipocomprobante.value;//rowCount;
    cell2.innerHTML = tipocomprobante.options[tipocomprobante.selectedIndex].text;
    cell3.innerHTML = document.getElementById("id_serie").value;
    cell4.innerHTML = document.getElementById("id_numero_actual").value;
    cell5.innerHTML = '<a class="btn btn-danger btn-icon  btn-xs" onclick="removerArticulo(this)"><i class="fa fa-minus"></i></a>' 

   limpiarCampos();
}
	
	function enviar_datos_parametro(){
		$('#detalleparametros').val(JSON.stringify(parametros));
		sessionStorage.clear();
	}

function limpiarCampos(){
	$('#id_serie').val('');
	$('#id_numero_actual').val('');
}

function getSerieValor(){
	
	caja = $("#caja").val();
	tipo = $("#id_tipo_comprobante").val();
	
	
	url = "/caja/api/cajas/"+caja;
	$.ajax({
		url:url,
		type:"GET",
		success : function(data) {
			cadena=''
			for(var i=0;i<data.parametros.length;i++){
				
				if(data.parametros[i].tipo_comprobante==tipo){
					
					ceros = 8-data.parametros[i].numero_actual.toString().length;
					for(j=0;j<ceros;j++){
						cadena+='0';
					}
					numero = cadena+data.parametros[i].numero_actual;
					
					$('#numero_comprobante').text(data.parametros[i].serie+"-"+numero)
					$('#id_numero_comprobante').val(data.parametros[i].serie+"-"+numero)

				}else{
					
				}
			}
		
		}
	})
}


function seleccionar_cotizacion(id) {
	
	
	url = "/tesoreria/api/cotizacion/"+id;
	$('#id_cotizacion').val(id);
	$('#id_orden').val(id);
	

	$.ajax({
		url:url,
		type:"GET",
		success: function(data){

			
			document.querySelector("#id_cliente").innerHTML=data.cliente.nombres+" "+data.cliente.apepaterno+" "+data.cliente.apematerno +"  Documento: "+data.cliente.numero_documento +"   Hc:"+data.cliente.historia_clinica+"   Edad:"+calcularEdad(data.cliente.fecha_nacimiento)+" Años";
			document.querySelector("#idcliente").value=data.cliente.id;
	
		
			$('#id_tipo_comprobante').val(1).trigger('change.select2');
			
			cargar_detalle_orden(data);
		}
	})
}




function cargar_detalle_orden(datos){
	limpiar_tabla('detalles')
	subtotal=0;
	descuento =0;
	total = 0
			$.each(datos.detalles, function(idx, opt) {
					subtotal += parseFloat(opt.subTotal);
					var producto = {'id':opt.producto.id,'precio':parseFloat(opt.precio),'subtotal':opt.subTotal,'descuento':opt.descuento,'total':opt.total};
					descuento += parseFloat(opt.descuento);
					total = subtotal-descuento;
					if(sessionStorage.getItem('productos') === null){
						productos=[];
					}else{
						productos=JSON.parse(sessionStorage.getItem('productos'));
					}
				
					productos.push(producto);
				
					sessionStorage.setItem('productos',JSON.stringify(productos));
					
		
					$('#detalles').append('<tr>'+'<td><input type="hidden" value="'+(opt.producto.id)+'" data-precio="'+(parseFloat(opt.precio))+'" class="id_prod"></td>'+'<td>' + opt.cotizacion.id + '</td><td>' + opt.producto.id + '</td><td>' + opt.producto.descripcion + '</td><td>'+ 'UND' +'</td><td>'+opt.cantidad+'</td><td>' + opt.precio + '</td><td>'+ opt.subTotal+ '</td><td>'+opt.descuento+'</td><td>'+(parseFloat(opt.precio)-opt.descuento) +'</td><td>'+ '<a class="btn btn-danger btn-icon  btn-xs" disabled=""><i class="fa fa-minus"></i></a>' +'</td></tr>');




			});



			$("#subtotal").text(subtotal.toFixed(2));
			$("#descuento").text(descuento.toFixed(2));
			$("#total").text(total.toFixed(2));
			$("#id_subtotal").val(subtotal.toFixed(2));
			$("#id_descuento").val(descuento.toFixed(2));
			$("#id_total").val(total.toFixed(2));
			
		
}
function limpiar_tabla(tabla){
	
	var table = document.getElementById(tabla);
	var rowCount = table.rows.length;
	for (var i=rowCount-1; i >=0; i--) {
		table.deleteRow(i);
	}
}


function validar_cliente_nuevo(){
	caja=$("#caja").val();
	costo=$("#id_centrocosto").html()
	
	//id 1 = a particular sin cotizacion
	document.getElementById('id_origen').value='1'

	var documento = document.getElementById('documento').value;
	var tipo = document.getElementById('tipo_documento').value;


	if (tipo == 1 || tipo == 2)
	{
		var data = []
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange=function(){
			if(this.readyState == 4 && this.status == 200){
					
				data = JSON.parse(xhr.responseText);

				if(data.length==0){
					console.log("buscar registro en reniec")
					buscar_reniec(documento,caja,costo);
				}else{
					deshabilitar_barrabusqueda(false)
					llena_paciente(data);

					

				}
			}
			
		};

		xhr.open("GET",'/admision/validarcliente/'+documento,false);
		xhr.send();


	}else if(tipo == 4){

		busca_empresa(documento,caja,costo)


	}
	



	
	
	
}


function llena_paciente(data)
{

		$("#datocliente").show();
		
		for(var i=0;i<data.length;i++){

			data[i].fields.nombres
			$('#idcliente').val(data[i].pk)
			$('#id_cliente').text(data[i].fields.nombres+" "+data[i].fields.apepaterno+" "+data[i].fields.apematerno);
				
			///document.querySelector("#id_numero_documento").innerHTML = data[i].fields.numero_documento;
					
			$('#clientehistoria').val(data[i].fields.cod_archivamiento);
			$('#clientehistoriat').html('<strong> Hist Clin:</strong>' + data[i].fields.cod_archivamiento);
			$('#datapicker').val(data[i].fields.fecha_nacimiento);
			$('#id_sexo').val(data[i].fields.sexo);
			
			$('#divclientet').show();
			$('#clientet').html('<strong>Cliente: </strong>' + data[i].fields.nombres+' '+data[i].fields.apepaterno+' '+data[i].fields.apematerno);
			$('#id_tipo_financiamiento').val(2).trigger('change.select2');
			$('#id_tipo_comprobante').val(1).trigger('change.select2');
			if (data[i].fields.nombres == "")
			{
			
				$("#nuevo").html('<span><a class="btn btn-warning btn-sm text-white" href="/configuracion/actualizar_cliente/'+data[i].pk+'">Nuevo Cliente</a></span>')		
	
			}

			if (data[i].fields.fecha_nacimiento !=null){
				$('#edad').text(calcularEdad(data[i].fields.fecha_nacimiento));
			
			}else{
				$('#edad').text("sin fecha de na");
			
			}
		
		
		
	  
	   
		
		}


}

function buscar_reniec(numero,caja,costo)
{
	var url = 'http://'+local.hostname+':81'+'/bldubigeo/api/ubigeo/dnis/'+numero+'/';
		$.ajax({
		async:false,
		url:url,
		type:'GET',
		
		success: function(data){
			console.log("hay datos reniec")
			
			// llena_paciente_reniec(data);
			$("#nuevo").html('<span><a class="btn btn-warning btn-sm text-white" href="/configuracion/crear_cliente?documento='+numero +'&nombre='+data.nombre+'&apepaterno='+data.apepaterno+'&apematerno='+ data.apematerno+'&costo='+costo +'&caja='+caja +'">Nuevo Cliente</a></span>')

			
		},
		error: function(){
			console.log("soy error")
			busca_sis(numero,caja,costo)	
			
		
		}
	});

}


function busca_sis(sis,caja,costo)
{		
		var url = 'http://'+local.hostname+':81'+'/bldubigeo/api/ubigeo/sis/'+sis+"/";
		var datos;
		
		$.ajax({
		async:false,
		
		url:url,
		
		type:'GET',
		success: function(data){
		
			datos = data;

			// llenar_tabla_cliente_sis(data);
			$("#nuevo").html('<span><a class="btn btn-warning btn-sm text-white" href="/configuracion/crear_cliente?documento='+sis +'&nombre='+""+'&apepaterno='+""+'&apematerno='+ "" +'&costo='+costo +'&caja='+caja +'">Nuevo Cliente</a></span>')

		},
		error:function(){

			$("#nuevo").html('<span><a class="btn btn-warning btn-sm text-white" href="/configuracion/crear_cliente?documento='+ sis +'&nombre='+""+'&apepaterno='+""+'&apematerno='+ "" +'&costo='+costo +'&caja='+caja +'">Nuevo Cliente</a></span>')


		}
		
	});
	return datos;
}




function cargar_cliente(){
	
	validar_cliente_nuevo();
}


function deshabilitar_barrabusqueda(opcion){


	document.getElementById('id_producto').disabled=opcion;
	document.getElementById('id_precio').disabled=opcion;
	document.getElementById('btn_buscar').disabled=opcion;
	if (opcion===true){
		document.getElementById('id_producto').value='';
		document.getElementById('id_precio').value='';
			sessionStorage.clear()
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



function agregar_item_factura(){
	
	
	var elemento = document.getElementById("id_producto");
	

	//calcular los valores de subtotal descuento y total y luego ponerlo en la variable producto
	var producto = {'id':elemento.value,'descripcion':elemento.options[elemento.selectedIndex].text,'precio':parseFloat($("#id_precio").val()),'subtotal':parseFloat($("#id_precio").val())*1,'descuento':0};

	if(sessionStorage.getItem('productos') === null){
		productos=[];
	}else{
		productos=JSON.parse(sessionStorage.getItem('productos'));
		
	}

	productos.push(producto);

	sessionStorage.setItem('productos',JSON.stringify(productos));
	
	
	
	var table = document.getElementById("tabla-detalles").getElementsByTagName('tbody')[0];
    var rowCount = table.rows.length
	var row = table.insertRow(rowCount);
	
    var cell1 = row.insertCell(0);//solicitud
    var cell2 = row.insertCell(1);//codigo producto ,se elimino el campo fecha para que
    var cell3 = row.insertCell(2);//descripcion producto
    var cell4 = row.insertCell(3);//unidad producto
	var cell5 = row.insertCell(4);//cantidad
	var cell6 = row.insertCell(5);//precio
	var cell7 = row.insertCell(6);//sub total
	var cell8 = row.insertCell(7);//descuento
	var cell9 = row.insertCell(8);//total
	var cell10 = row.insertCell(9);//acciones
	var cell11 = row.insertCell(10);

    cell6.setAttribute('align','right')

    cell1.innerHTML = '<input type="hidden" value="'+(elemento.value)+'" data-precio="'+(producto.precio)+'" class="id_prod">';
    cell2.innerHTML = "SIN ORDEN"
    //cell3.innerHTML = new Date().toLocaleDateString("es-PE");
	cell3.innerHTML = elemento.value;
	cell4.innerHTML = elemento.options[elemento.selectedIndex].text;
    cell5.innerHTML = "UND";
	cell6.innerHTML = 1; //cantidad por defecto deberia traer susu propias cantidades
	cell7.innerHTML = producto.precio;
	//cell5.innerHTML = '<a class="btn btn-danger btn-icon  btn-xs" onclick="removerArticulo(this)"><i class="fa fa-minus"></i></a>' 
	//cell5.innerHTML= "Unidad";
	cell8.innerHTML = producto.subtotal;
	cell9.innerHTML = producto.descuento;
	cell10.innerHTML= producto.subtotal-producto.descuento;
	cell11.innerHTML ='<a class="btn btn-danger btn-icon  btn-xs" onclick="delete_producto(this,'+elemento.value+')"><i class="fa fa-minus"></i></a>' 
	
	
	sumarTotal()
	
}



	
function enviar_datos_factura()
{

		$('#productos').val(sessionStorage.getItem('productos'));

		setTimeout(function(){
		 ticket();

		}, 1000);

		sessionStorage.clear();

		
		
}

function ticket(comprobantes)
{	


	comprobante=$("#id_numero_comprobante").val();

	if(comprobante == undefined)
	{
		url='/static/dinamicallygenerated/txt/venta-'+comprobantes+'.txt';
		
	}else{
		url='/static/dinamicallygenerated/txt/venta-'+comprobante+'.txt';

	}
	setTimeout(function(){		
		
		
		window.open(url, "ticket", "width=800, height=400");

	}, 100);

	
}


function removerArticulo(row) {
	var d = row.parentNode.parentNode.rowIndex;
	
	document.getElementById('detalleaten').deleteRow(d);

   
}
function sumarTotal(){
	
	subtotal =0;
	descuento=0
	total =0;

	const detalle = JSON.parse(sessionStorage.getItem('productos'));
	
	if(detalle.length >0) //if(detalle.length==1)
	{	
	detalle.forEach(function(deta){
		
		subtotal+=deta.subtotal;
		descuento+=deta.descuento;
		total = subtotal-descuento;

//terminamo de recorrer el storage
	});

	$('#subtotal').text(subtotal.toFixed(2));
	$('#descuento').text(descuento.toFixed(2));
	$("#total").text(total.toFixed(2));
	
	$("#id_subtotal").val(subtotal.toFixed(2));
	$("#id_descuento").val(descuento.toFixed(2));
	$("#id_total").val(total.toFixed(2));

		
	}


}






function cargarPrecioStock(){
	
	var idproducto = $('#id_producto').val()
	
	var fuente =$('#id_tipo_financiamiento').val();

	var url ='/configuracion/api/productos/'+idproducto;
	
	
	$.ajax({
		url :url,
		type:'GET',
		success: function(data){
			
			if(fuente =='2'){
				
				$("#id_precio").val(parseFloat(data.precios[0].tarifa_hospital).toFixed(1));	
			}
			else{
				
				$("#id_precio").val(parseFloat(data.precios[0].tarifa_convenio).toFixed(1));
			}
			
			//$("#id_precio").val(15.00);
				
		}
	});
}





function delete_producto(t,r)
{
	
	
	detalle= JSON.parse(sessionStorage.getItem('productos'));

	detalle.forEach(function(deta){
				
		if(deta.id == r)
		{
			
			indexArray = deta.precio
			
			
			
		}
		
	});
	
			subtotal=$("#subtotal").html()
			descuento=$("#descuento").text()
			sub_total=parseFloat(subtotal)-parseFloat(indexArray);
			total=parseFloat(sub_total)-parseFloat(descuento)
			
			$("#subtotal").text(sub_total.toFixed(1))
			$("#total").text(total.toFixed(1))

			// DATOS QUE IRAN EN EL INPUT
				$("#id_subtotal").val(sub_total.toFixed(1));
				$("#id_descuento").val(descuento);
				
				$("#id_total").val(total.toFixed(1));



			/// RECALCULANDO EL DESCUENTO EN BASE AL PORCENTAJE Y ACTUALIZANDO LOS MONTOS

			porcentaje=$("#porcentaje").val();

			if(porcentaje !="")
			{
				nuevo_descuento=parseFloat(sub_total)*parseFloat(porcentaje)/100;
				$("#descuento").text(nuevo_descuento.toFixed(1));

				nuevo_total=parseFloat(sub_total)-parseFloat(nuevo_descuento);
				$("#total").text(nuevo_total.toFixed(1));


				// DATOS QUE IRAN EN EL INPUT
				$("#id_subtotal").val(sub_total.toFixed(1));
				$("#id_descuento").val(nuevo_descuento.toFixed(1));
				$("#id_total").val(nuevo_total.toFixed(1));


			}
			

			removerArticulo(t);

	
	
}


function getSinDocumento(){
	
	
	caja=$("#caja").val();
	costo=$("#id_centrocosto").html()
	tipo=$("#tipo_documento").val()

	if (tipo == '3')
	{
		url = "/configuracion/api/sindocumento/";
		$.ajax({
			url:url,
			type:"GET",
			success : function(data) {
				
				cadena=''
				for(var i=0;i<data.length;i++){
					
					ceros = 8-data[i].numero_actual.toString().length;
					for(j=0;j<ceros;j++){
						cadena+='0';
					}
					numero = cadena+data[i].numero_actual;
					documento = $("#documento").val(numero);
					$("#nuevo").html('<span><a class="btn btn-warning btn-sm text-white" href="/configuracion/crear_cliente?documento='+ numero +'&nombre='+""+'&apepaterno='+""+'&apematerno='+ "" +'&costo='+costo +'&caja='+caja +'">Nuevo Cliente</a></span>')

					
					
				}
			
			}
		})


	}else{

		$("#documento").val("");
		$("#nuevo").html("");


	}
	
	
	
}



function busca_empresa(empresa,caja,costo)
{		
		var url = '/configuracion/api/empresa/'+empresa;
		var datos;
		
		$.ajax({
		async:false,
		
		url:url,
		
		type:'GET',
		success: function(data){
			
			datos = data;
			llena_empresa(data,caja,costo)
			

		},
		error:function(){

			$("#nuevo").html('<span><a class="btn btn-warning btn-sm text-white" href="/configuracion/empresa_crear?ruc='+ empresa +'&costo='+costo +'&caja='+caja +'">Nuevo Cliente</a></span>')


		}
		
	});
	return datos;
}


function llena_empresa(data,caja,costo)
{

		$("#datocliente").show();
		$('#idcliente').val(data.id)
		$('#id_cliente').text(data.descripcion);
		$("#idcosto").val(costo);
		document.querySelector("#id_numero_documento").innerHTML = data.ruc;
		$('#id_tipo_financiamiento').val(2).trigger('change.select2');
		$('#id_tipo_comprobante').val(1).trigger('change.select2');
		


}



/* NUEVO CODIGO PARA BUSQUEDA DE ORDENES PENDIENTES DE CAJA  */ 


function search(){

	var busqueda = $('#busqueda'),
    titulo = $('ul li h6');
    $(titulo).each(function(){
		var li = $(this);

		$(busqueda).keyup(function(){

			this.value = this.value.toLowerCase();

			var clase = $('.search i');

			if($(clase).hasClass('fa fa-times')){
				$(clase).click(function(){
				
				$(busqueda).val('');
				
				$(li).parent().show();
				
				$(clase).attr('class', 'fa fa-search');
				});
			}

			$(li).parent().hide();

			var txt = $(this).val();

			if($(li).text().toLowerCase().indexOf(txt) > -1){
				$(li).parent().show();
			}
		});
	});

}

function enviar_solicitud_serviciosocial(csrf){
	

	id=document.getElementById("id_cotizacion").value;
	
	var url = '/serviciosocial/crear_solicitud/';
			
		$.ajax({
		data:{
			csrfmiddlewaretoken : csrf,
			cotizacion:id
		},
		
		url:url,
		type:'POST',
		success: function(data){
			console.log('probando');		
			
			$.gritter.add({
				title:'COTIZACION ENVIADA A SERVICIO SOCIAL',
				text:'Cliente se debe acerca a la Oficina de Servicio social para su evaluacion socioeconomica',
				time:'3000',
				sticky:true,
				class_name:'gritter-light',
				position:'bottom-right'
			});

		},
		error:function(){


		}
	
});
}

$('#btn_notificar').click(function(){
	$.gritter.add({
		title:'COTIZACION ENVIADA A SERVICIO SOCIAL',
		text:'Cliente se debe acerca a la Oficina de Servicio social para su evaluacion socioeconomica',
		time:'1200',
		sticky:true,
		class_name:'gritter-light',
		position:'bottom-right'
	});
	return false;
});
	
