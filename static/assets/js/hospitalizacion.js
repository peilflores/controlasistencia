



function cambio_turno(){


	url='/rrhh/api/cambioturno'

	$.ajax({
			url:url,
			type:'GET',
			success:function(data){

				combo = $('#personal_id');
				for(i=0;i<data.length;i++){



					combo.append('<option value='+data[i].id_medico+'>'+data[i].medico+'</option>');



				}



			}


	});




}


function rol(){

	url='/rrhh/api/rolmedico'

	$.ajax({
			url:url,
			type:'GET',
			success:function(data){


				console.log(data)
				combo = $('#personal_id');
				for(i=0;i<data.length;i++){

					if(data[i].actividad == '2' ||  data[i].actividad=='3' || data[i].actividad=='5' || data[i].actividad=='10'){

						if (data[i].estado !='0'){


							if(data[i].estado == '2' || data[i].estado== '3' || data[i].estado =='4' ){

								if (data[i].actividad == '2'){

									if(data[i].fecha_inicio == '2019-10-23'){

										if('19' >= data[i].hora_inicio || '7' <=data[i].hora_fin){


											cambio_turno()
										}


									}else if(data[i].fecha_fin =='2019-10-24'){

										if('19' >= data[i].hora_inicio || '7' <=data[i].hora_fin ){


											cambio_turno()
										}

									}

								}else{

									if (data[i].fecha_inicio == '2019-10-23'){

										if( '7' >= data[i].hora_inicio||  '13'< data[i].hora_fin){

												console.log("CAMBIO DE TURNO MAÑANA")

										}else if ('13' >= data[i].hora_inicio || '19' < data[i].hora_fin ){

												console.log("CAMBIO DE TURNO TARDE")

										}else if('19' >= data[i].hora_inicio || '7' < data[i].hora_fin){


												console.log("CAMBIO DE TURNO GUARDIA")
										}

										


									}

								}

								/*  GENERAR UNA FUNCION QUE LLEVARA A CAMBIO DE TURNO  */
							}else if(data[i].estado=='1'){

								if (data[i].fecha_inicio == '2019-10-23'){

									console.log("LICENCIA") /* GENERAR UNA FUNCION QUE LLEVARA A LICENCIA */

								}
							}


								
						}else{


								if (data[i].actividad == '2'){

									if(data[i].fecha_inicio == '2019-10-23'){

										if('19' >= data[i].hora_inicio || '7' <=data[i].hora_fin){


											combo.append('<option value='+data[i].id+'>'+data[i].medico+'</option>');

											console.log("NOCTURNO")
										}


									}else if(data[i].fecha_fin =='2019-10-24'){

										if('19' >= data[i].hora_inicio || '7' <=data[i].hora_fin ){


											combo.append('<option value='+data[i].id+'>'+data[i].medico+'</option>');
										}

									}

								}else{
									
									if (data[i].fecha_inicio == "2019-10-23"){

										

										if( '7' >= data[i].hora_inicio||  '13'< data[i].hora_fin){

												combo.append('<option value='+data[i].id+'>'+data[i].medico+'</option>');
												console.log(data[i].id)

										}else if ('13' >= data[i].hora_inicio || '19' < data[i].hora_fin ){

												combo.append('<option value='+data[i].id+'>'+data[i].medico+'</option>');

												console.log(data[i].id)

										}else if('19' >= data[i].hora_inicio || '7' < data[i].hora_fin){


												combo.append('<option value='+data[i].id+'>'+data[i].medico+'</option>');
												console.log(data[i].id)

										}

										


									}
								}

							
						}



					}

				
				 
				}


			}


	});

}



function removerArticulo(row) {
	var d = row.parentNode.parentNode.rowIndex;
	
	document.getElementById('detallediagnostico').deleteRow(d);

    // recalcular_montos(d);
    
}

function ciex(){

	var ciex = document.getElementById("id_diagnostico");
	

	var table = document.getElementById("detallediagnostico").getElementsByTagName('tbody')[0];
    var rowCount = table.rows.length
    var row = table.insertRow(rowCount);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);

    cell1.innerHTML = ciex.value;//rowCount;
    cell2.innerHTML = ciex.options[ciex.selectedIndex].text;
    cell3.innerHTML = "<select class='form-control tipodiagnostico' style='width:140px' name='tipodiagnostico'><option value='1'>DEFINITIVO</option><option value='2'>PRESUNTIVO</option><option value='3'>REPETITIVO</option></select>"
    cell4.innerHTML = '<a class="btn btn-danger btn-icon  btn-xs" onclick="removerArticulo(this)"><i class="fa fa-minus"></i></a>' 


}

function recorrer_diagnostico(){

	dato=[]

	$("#detallediagnostico tbody tr").each(function(key,value){


		id=$(this).find('td').eq(0).text();
		tipo=document.getElementsByName('tipodiagnostico')[key].value;

		dato.push({'id':id,'tipo':tipo})




	});

	$("#id_detail_diagnostcio").val(JSON.stringify(dato));




}

function recorre_hospitalizacion(){



	dato=[]

	$("#detallediagnostico tbody tr").each(function(key,value){


		id=$(this).find('td').eq(0).text();
		tipo=document.getElementsByName('tipodiagnostico')[key].value;

		dato.push({'id':id,'tipo':tipo})




	});

	$("#id_detalle_hospitalizacion").val(JSON.stringify(dato));

}



function servicio_list(){

	servicio=document.getElementById("id_servicio").value;
	div=document.getElementById('mostrar');


	if( servicio == 3){

		if (div.style.display == "none"){

			div.style.display = 'block';
		}
		

	}else{

		if (div.style.display == "block"){

			div.style.display = 'none';
		}


		
	}

}


function condicion_list(){

	condicion=document.getElementById("id_condicion").value;
	div=document.getElementById('condicion_alta');


	if( condicion ==1 || condicion == 7){

		if (div.style.display == "block"){

			div.style.display = 'none';
		}


		

	}else{

		


		if (div.style.display == "none"){

			div.style.display = 'block';
		}
		
		
	}

}