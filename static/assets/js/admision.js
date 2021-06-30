var local = window.location;
function valcliente() {
    fullname = $("#fullname").val();
    console.log(fullname);
    url = "/admision/validarcliente/" + this.fullname;
    $.ajax({
        dataType: "json",
        url:url,
        type:'GET',
        success: function(data) {
            var items = [];
            $.each(data, function (key, val) {
                console.log(data);
                if (val['fields'].is_valid=='0') {
                    items.push("<tr class='gradeX even'>" +
                        "<td>" + val['fields'].fullnombres + "</td>" +
                        "<td>" + val['fields'].nombres + "</td>" +
                        "<td>" + val['fields'].apepaterno + "</td>" +
                        "<td>" + val['fields'].apematerno + "</td>" +
                        "<td>" + val['fields'].fecha_nacimiento + "</td>" +
                        "<td>" + val['fields'].sexo + "</td>" +
                        "<td>" + val['fields'].cod_archivamiento + "</td>" +
                        "<td>" + val['fields'].numero_documento + "</td>" +
                        '<td><a onclick="abrircliente('+val.pk+')" class="btn btn-primary" type="button"><i class="ion-refresh text-white"></i></a></td>' +
                        "</tr>");
                } else if(val['fields'].is_valid=='1'){
                    items.push("<tr class='gradeX even'>" +
                        "<td>" + val['fields'].fullnombres + "</td>" +
                        "<td>" + val['fields'].nombres + "</td>" +
                        "<td>" + val['fields'].apepaterno + "</td>" +
                        "<td>" + val['fields'].apematerno + "</td>" +
                        "<td>" + val['fields'].fecha_nacimiento + "</td>" +
                        "<td>" + val['fields'].sexo + "</td>" +
                        "<td>" + val['fields'].cod_archivamiento + "</td>" +
                        "<td>" + val['fields'].numero_documento + "</td>" +
                        '<td><a href="/admision/atencion_cliente/'+val.pk+'" class="btn btn-primary text-white" type="button">Atender</a><i onclick="abrircliente('+val.pk+')" class="ion-refresh text-white"></i></td>' +
                        "</tr>");
                }
                });
            $(".dataTables_empty").remove();
            if (items.length >=1){
                $(".gradeX").remove();
                $("#validar").append(items);
                $("#crear").hide();
            }else{
                $("#crear").show();
                $("#validar").append("<td valign='top' colspan='9' class='dataTables_empty'><h4><p>Cliente no registrado o Ingrese correctamente los Datos</p></h4></td>");
            }
            $(".odd").remove();
        },
    });

}



function opciondnicliente(token) {
    dni = $("#clientedni").val();
    console.log(dni);
    url =  "/configuracion/api/cliente/"+this.dni;
    var datos = {
        'csrfmiddlewaretoken':token,
    };
     $.ajax({
        url:url,
        type:'GET',
        data:datos,
        success: function(data) {
                console.log(data);
                if (data.is_valid=='0') {
                    var items="<tr class='gradeX even'>" +
                        "<td>" + data.fullnombres + "</td>" +
                        "<td>" + data.nombres + "</td>" +
                        "<td>" + data.apepaterno + "</td>" +
                        "<td>" + data.apematerno + "</td>" +
                        "<td>" + data.fecha_nacimiento + "</td>" +
                        "<td>" + data.sexo + "</td>" +
                        "<td>" + data.cod_archivamiento + "</td>" +
                        "<td>" + data.numero_documento + "</td>" +
                        '<td><a onclick="abrircliente('+data.id+')" class="btn btn-primary" type="button"><i class="fas fa-sync text-white"></i></a></td>' +
                        "</tr>";
                } else if(data.is_valid=='1'){
                    var items="<tr class='gradeX even'>" +
                        "<td>" + data.fullnombres + "</td>" +
                        "<td>" + data.nombres + "</td>" +
                        "<td>" + data.apepaterno + "</td>" +
                        "<td>" + data.apematerno + "</td>" +
                        "<td>" + data.fecha_nacimiento + "</td>" +
                        "<td>" + data.sexo + "</td>" +
                        "<td>" + data.cod_archivamiento + "</td>" +
                        "<td>" + data.numero_documento + "</td>" +
                        '<td><a href="/admision/atencion_cliente/'+data.id+'" class="btn btn-primary text-white" type="button">Atender</a><i onclick="abrircliente('+data.id+')" class="fas fa-sync text-white"></i></td>' +
                        "</tr>";
                }
                $(".gradeX").remove();
                console.log(items);
                $("#validar").html(items);
                $("#crear").hide();
        }, error:function () {
              $("#crear").show();
              $("#validar").html("<td valign='top' colspan='9' class='dataTables_empty'><h4><p>Cliente no registrado o Ingrese correctamente los Datos</p></h4></td>");
         }
    });
}

function opcionhccliente(token) {
    hc = $("#clientehc").val();
    console.log(hc);
    url =  "/configuracion/api/clientehc/"+this.hc;
    var datos = {
        'csrfmiddlewaretoken':token,
    };
     $.ajax({
        url:url,
        type:'GET',
        data:datos,
        success: function(data) {
                console.log(data);
                if (data.is_valid=='0') {
                    var items="<tr class='gradeX even'>" +
                        "<td>" + data.fullnombres + "</td>" +
                        "<td>" + data.nombres + "</td>" +
                        "<td>" + data.apepaterno + "</td>" +
                        "<td>" + data.apematerno + "</td>" +
                        "<td>" + data.fecha_nacimiento + "</td>" +
                        "<td>" + data.sexo + "</td>" +
                        "<td>" + data.cod_archivamiento + "</td>" +
                        "<td>" + data.numero_documento + "</td>" +
                        '<td><a onclick="abrircliente('+data.id+')" class="btn btn-primary" type="button"><i class="fas fa-sync text-white"></i></a></td>' +
                        "</tr>";
                } else if(data.is_valid=='1'){
                    var items="<tr class='gradeX even'>" +
                        "<td>" + data.fullnombres + "</td>" +
                        "<td>" + data.nombres + "</td>" +
                        "<td>" + data.apepaterno + "</td>" +
                        "<td>" + data.apematerno + "</td>" +
                        "<td>" + data.fecha_nacimiento + "</td>" +
                        "<td>" + data.sexo + "</td>" +
                        "<td>" + data.cod_archivamiento + "</td>" +
                        "<td>" + data.numero_documento + "</td>" +
                        '<td><a href="/admision/atencion_cliente/'+data.id+'" class="btn btn-primary text-white" type="button">Atender</a><i onclick="abrircliente('+data.id+')" class="fas fa-sync text-white"></i></td>' +
                        "</tr>";
                }
                $(".gradeX").remove();
                console.log(items);
                $("#validar").html(items);
                $("#crear").hide();
        }, error:function () {
              $("#crear").show();
              $("#validar").html("<td valign='top' colspan='9' class='dataTables_empty'><h4><p>Cliente no registrado o Ingrese correctamente los Datos</p></h4></td>");
         }
    });
}

function tablacliente() {

	var table = document.getElementById("tablacliente").getElementsByTagName('tbody')[0];
	var rowCount = table.rows.length
	var row = table.insertRow(rowCount);

	var cell0 = row.insertCell(0);
    var cell1 = row.insertCell(1);
    var cell2 = row.insertCell(2);
    var cell3 = row.insertCell(3);
    var cell4 = row.insertCell(4);
    var cell5 = row.insertCell(5);
    var cell6 = row.insertCell(6);
    var cell7 = row.insertCell(7);
    var cell8 = row.insertCell(8);

    cell0.innerHTML = elemen.value;
    cell1.innerHTML = elemen.options[elemen.selectedIndex].text;
    cell2.innerHTML = elemen.value;
    cell3.innerHTML = elemen.options[elemen.selectedIndex].text;
    cell4.innerHTML = elemen.value;
    cell5.innerHTML = elemen.options[elemen.selectedIndex].text;
    cell6.innerHTML = elemen.value;
    cell7.innerHTML = elemen.options[elemen.selectedIndex].text;
    cell8.innerHTML = '<a class="btn btn-danger btn-icon  btn-xs" onclick="removerArticulo(this)"><i class="fa fa-minus"></i></a>'
}

function elicliente() {
    $("#fullname").val("");
     $("#clientedni").val("");
     $("#clientehc").val("");
    console.log(fullname);
    $(".gradeX").remove();
    $(".dataTables_empty").remove();
}

function abrircliente(valor) {
    val = valor;
    url =  "/admision/abrir_cliente/"+val;
    $("#modal-form").load(url,function(){
        $("#modal-form").modal("show");
    })
}

function  checkboxactivo() {
    dato =[];
        $("input[type=checkbox]:checked").each(function(){
            //cada elemento seleccionado
            dato.push({'id':$(this).val()});
            //alert(dato)
        });
    $("#detallerolusuario").val(JSON.stringify(dato));
    //alert(JSON.stringify(dato));
}

function  eliminaractivo() {
    dato =[];
        $("input[type=checkbox]:checked").each(function(){
            dato.push({'id':$(this).val()});
        });
    $("#eliminarrolusuario").val(JSON.stringify(dato));

}



function checkbox() {
    permiso = $("#clientedni").val();
    url =  "/rrhh/checkbox/";
    var datos = {
        'csrfmiddlewaretoken':token,
        'permiso':permiso,
    };
     $.ajax({
        url:url,
        type:'POST',
        data:datos,
        success: function(data) {

        }, error:function () {

        }
    });
}

function clientebd(token) {
    documento = $("#id_numero_doc").val();
    tipo = $("#id_tipodocumento").val();
    if (this.documento.length==8 && this.tipo=='1'){
	    url = '/rrhh/api/personal/' + this.documento;
    }
	var datos={'csrfmiddlewaretoken':token};
		$.ajax({
		url:url,
		type:'GET',
		data:datos,
		success: function(data) {
            console.log(data);
            if (data.nombres) {
                $('#div_reniec').hide();
                $('#divnonombres').show();
                $('#nonombres').val('Personal Registrado con este DNI');
            }
        },error : function () {
                validarreniec();
		}
	});
}

function validarreniec(token) {
    documento=$("#id_numero_documento").val();
    documentos=$("#id_numero_doc").val();
    if(this.documento == undefined){
        documento = 0;
        tipo = 0;
    }
    else if(this.documentos == undefined){
        documentos = 0;
        tipos = 0;
    }
    console.log(documentos);
	tipo=$("#id_tipo_documento").val();
	tipos=$("#id_tipodocumento").val();
	console.log(tipos);
	var url;
    console.log(documentos);
    console.log(this.documentos.length);
	if(this.documentos.length==8 && this.tipos=='1') {
        url = 'http://'+local.hostname+':81'+'/bldubigeo/api/ubigeo/dni/' + this.documentos;
	
    }
    else if (this.documento.length==8 && this.tipo=='1'){
	    url = 'http://'+local.hostname+':81'+'/bldubigeo/api/ubigeo/dni/' + this.documento;
    }
    var datos1={'csrfmiddlewaretoken':token};
		$.ajax({
		url:url,
		type:'GET',
		data:datos1,
		success: function(data){
		    console.log(data);
            if (data.nombres){
		        $('#div_reniec').show();
		         $('#divnonombres').hide();
		        $('#footer').show();
                $('#id_nombres').val(data.nombres);
                $('#id_apepaterno').val(data.apepaterno);
                $('#id_apematerno').val(data.apematerno);
            }else if (data[6] == 1){
		        $('#div_noreniec').show();
		        $('#nonombres').val('No se encuentra en el Archivo Magnético del RENIEC');
            }else if (data[6] == 2){
		        $('#div_noreniec').show();
		        $('#nonombres').val('Cancelado por fallecimiento.');
            }
		},
	});
}

function permisoasignado() {
    valor=[];
    usuario = $("#usuariopersonal").val();
    console.log('usuario:'+usuario);
    permiso = $("#permgrupo option:selected").text();
    url = '/permiso/api/permisocheck/';
    $.ajax({
        async: false,
        url: url,
        type:'GET',
        success: function (data) {
            //valor = data;
           $.each(data, function (key, dato) {
                //console.log(dato);
             if(dato.user.id == usuario && dato.permission.content_type.app_label == permiso.toLowerCase()) {
                    //alert('ingreso');
                  valor.push({"idu":dato.user.id,"idp":dato.permission.id, 'grupo':dato.permission.content_type.app_label});
               }
           });
            //console.log(valor);

        }
    });
    return valor;
}

function permisousuario(token) {
    datos='';
    permisogrupo = $("#permgrupo option:selected").text();
    console.log(permisogrupo.toLowerCase());
    url = '/permiso/api/permiso/';
    $.ajax({
        async: false,
        url: url,
        type:'GET',
        success: function (data) {
            datos = data;
            valor = permisoasignado();
            llenartabla(data,valor);
            //console.log(valores);
             vaciartabla(valor,data);
        }
    });
    return datos;
}

function limpiar_tabla(tabla){
	var table = document.getElementById(tabla);
	var rowCount = table.rows.length;
	for (var i=rowCount-1; i >=0; i--) {
		table.deleteRow(i);
	}
}

function llenartabla(datos, valores){
    valor = valores;
    console.log(valor);
    //console.log(valor[0].idp);
    limpiar_tabla('cuerpocliente');
    arreglos = [];
    var i=0;
    $.each(datos, function (key, dato) {
        //console.log(dato);
        if(dato.content_type.app_label == permisogrupo.toLowerCase()) {
            console.log(dato.id);
            //console.log(valor.length);
            if(i<valor.length) {
                //console.log(valor[i].idp);
                if (dato.id == valor[i].idp) {
                    arreglos.push({'modelo': dato.content_type.model, 'id': '', 'name': ''});
                    i = i+1;
                } else {
                    arreglos.push({'modelo': dato.content_type.model, 'id': dato.id, 'name': dato.name});
                }
            }else {
                    arreglos.push({'modelo': dato.content_type.model, 'id': dato.id, 'name': dato.name});
            }
        }
    });
    console.log(arreglos);
    var j=0;
    while(j<arreglos.length) {
    //for(var i=0;i<arreglos.length;i+=3){
        var table = document.getElementById("detallecliente").getElementsByTagName('tbody')[0];
        var rowCount = table.rows.length;
        var row = table.insertRow(rowCount);

        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);

        cell1.innerHTML = arreglos[j].modelo.toLocaleUpperCase();
        cell2.innerHTML = "<div class='checkbox checkbox-css checkbox-inline'>"+
                          "<input type='checkbox' value="+arreglos[j].id+" id='inlineCssCheckbox"+j+"'/>" +
                          "<label for='inlineCssCheckbox"+j+"'>"+ arreglos[j].name +"</label>"+
                          "</div>";
        cell3.innerHTML = "<div class='checkbox checkbox-css checkbox-inline'>"+
                          "<input type='checkbox' value="+arreglos[j+1].id+" id='inlineCssCheckbox"+(j+1)+"'/>" +
                          "<label for='inlineCssCheckbox"+(j+1)+"'>"+ arreglos[j+1].name +"</label>"+
                          "</div>";
        cell4.innerHTML = "<div class='checkbox checkbox-css checkbox-inline'>"+
                          "<input type='checkbox' value="+arreglos[j+2].id+" id='inlineCssCheckbox"+(j+2)+"'/>" +
                          "<label for='inlineCssCheckbox"+(j+2)+"'>"+ arreglos[j+2].name +"</label>"+
                          "</div>";
        j= j+3;
    }
}

function vaciartabla(val, dat){
    valor = val;
    limpiar_tabla('cuerpoclientecheck');
    arreglos = [];
    var i =0;
    $.each(dat, function (key, dato) {
        if(dato.content_type.app_label == permisogrupo.toLowerCase()) {
            if(i<valor.length) {
                if (dato.id == valor[i].idp) {
                    arreglos.push({'modelo': dato.content_type.model, 'id': dato.id, 'name': dato.name});
                    i = i+1;
                } else {
                    arreglos.push({'modelo': dato.content_type.model, 'id': '', 'name': ''});
                }
            }else {
                   arreglos.push({'modelo': dato.content_type.model, 'id': '', 'name': ''});
            }
        }
    });
    //console.log(arreglos);
    var j=0;
    while(j<arreglos.length) {
    //for(var i=0;i<arreglos.length;i+=3){
        var table = document.getElementById("detalleclientecheck").getElementsByTagName('tbody')[0];
        var rowCount = table.rows.length;
        var row = table.insertRow(rowCount);

        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);

        cell1.innerHTML = arreglos[j].modelo.toLocaleUpperCase();
        cell2.innerHTML = "<div class='checkbox checkbox-css checkbox-inline'>"+
                          "<input type='checkbox' value="+arreglos[j].id+" id='inlineCssCheckbox"+(j+500)+"'/>" +
                          "<label for='inlineCssCheckbox"+(j+500)+"'>"+ arreglos[j].name +"</label>"+
                          "</div>";
        cell3.innerHTML = "<div class='checkbox checkbox-css checkbox-inline'>"+
                          "<input type='checkbox' value="+arreglos[j+1].id+" id='inlineCssCheckbox"+(j+501)+"'/>" +
                          "<label for='inlineCssCheckbox"+(j+501)+"'>"+ arreglos[j+1].name +"</label>"+
                          "</div>";
        cell4.innerHTML = "<div class='checkbox checkbox-css checkbox-inline'>"+
                          "<input type='checkbox' value="+arreglos[j+2].id+" id='inlineCssCheckbox"+(j+502)+"'/>" +
                          "<label for='inlineCssCheckbox"+(j+502)+"'>"+ arreglos[j+2].name +"</label>"+
                          "</div>";
        j= j+3;
    }
}

function usuariogrupodelete(id, token) {
    var id = id;
    var personal = $("#personalid").val();
    var valor = token;
    var url = '/rrhh/grupousuario_eliminar/'+id;
    var datos = {
        'csrfmiddlewaretoken':valor,
    };
    $.ajax({
        url: url,
        type: "GET",
        data: datos,
        success: function (data) {
        location.href = '/configuracion/configuracion_acceso/'+ personal;
        }
    });
}

function especialidadpersonaldelete(id,token) {
    var id = id;
    var personal = $("#personalespecialidadid").val();
    var valor = token;
    var url = '/rrhh/especialidadpersonal_eliminar/'+id;
    var datos = {
        'csrfmiddlewaretoken':valor,
    };
    $.ajax({
        url: url,
        type: "GET",
        data: datos,
        success: function (data) {
        location.href = '/rrhh/especialidadpersonal/'+ personal;
        }
    });
}

