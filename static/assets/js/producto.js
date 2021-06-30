function cargar_componentes_producto()
{
productos=[]
elemen=document.getElementById("componente");
var producto = {'id':elemen.value,'descripcion':elemen.options[elemen.selectedIndex].text};

	if(sessionStorage.getItem('productos') === null){
		productos=[];

	}else{
		productos=JSON.parse(sessionStorage.getItem('productos'));

	}

	productos.push(producto);

	sessionStorage.setItem('productos',JSON.stringify(productos));

	var table = document.getElementById("detalle_componentes").getElementsByTagName('tbody')[0];
	var rowCount = table.rows.length
	var row = table.insertRow(rowCount);

	var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);

    cell1.innerHTML = elemen.value;
    cell2.innerHTML = elemen.options[elemen.selectedIndex].text;
    cell3.innerHTML = '<a class="btn btn-danger btn-icon  btn-xs" onclick="removerArticulo(this)"><i class="fa fa-minus"></i></a>' 


}


function cargar_atributos_producto()
{
atributos=[]
elemen=document.getElementById("atributo");
var atributo = {'id':elemen.value,'descripcion':elemen.options[elemen.selectedIndex].text};

	if(sessionStorage.getItem('productos') === null){
		atributos=[];

	}else{
		atributos=JSON.parse(sessionStorage.getItem('productos'));

	}

	atributos.push(atributo);

	sessionStorage.setItem('atributos',JSON.stringify(atributos));

	var table = document.getElementById("detalle_atributos").getElementsByTagName('tbody')[0];
	var rowCount = table.rows.length
	var row = table.insertRow(rowCount);

	var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);

    cell1.innerHTML = elemen.value;
    cell2.innerHTML = elemen.options[elemen.selectedIndex].text;
    cell3.innerHTML = '<a class="btn btn-danger btn-icon  btn-xs" onclick="removerArticulo(this)"><i class="fa fa-minus"></i></a>' 


}


function enviar_dato()
{

	$("#detalle_componente").val(JSON.stringify(productos));
	$("#detalle_atributo").val(JSON.stringify(productos));
	
	
	sessionStorage.clear();
}

function removerArticulo(row) {
	var d = row.parentNode.parentNode.rowIndex;
	document.getElementById('detalle_componentes').deleteRow(d);
    
}