

function servicio_list(){

	id_departamento=document.getElementById("id_centrocosto").value;
	url='http://127.0.0.1:8000/cita/api/servicio_list/'+id_departamento
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



function detallerol_list(){

	id_servicio=document.getElementById("id_servicio").value;
	url='http://127.0.0.1:8000/cita/api/detallerol/'+id_servicio;

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


	
	$('.list_personal').empty();
	var contenido ='';
    for (i = 0; i < data.length; i++) {
    contenido += '<ul class="list_personal">';
    contenido +='<li>';
    contenido +="<a onclick='consultorio_list("+data[i].id_detallerol+")'>"+data[i].medico +"</a>";
   	contenido +='</li>';
    contenido +='</ul>';
  


    }

    $('#dias').append(contenido);

}


function consultorio_list(iddetalle,medico){

	url='http://127.0.0.1:8000/cita/api/personalprogramacionconsultorio/'+iddetalle;
	
	$.ajax({

		url:url,
		type:'GET',

		success:function(data){
			
			div=document.getElementById("calendar")
			new_div=document.getElementById("calendario")
			if (div.style.display =='block'){

				div.style.display ='none'

				
			}
			if(new_div.style.display =='none'){

				new_div.style.display ='block'


				$('#calendario').fullCalendar({
		        locale: 'es' ,
		        timeZone: 'UTC',
		        header: {
		            left: 'prev,next',
		            center: 'title',
		            right: 'month'
		        },
		        navLinks: true,
		        selectable: true,
		        height: 500,
		        showNonCurrentDates: false,
		        events:'http://127.0.0.1:8000/cita/api/personalprogramacionconsultorio/'+iddetalle,
		        dayClick: function (date, jsEvent, view) {
		            

		        }, 
		        eventClick: function (event,info) {
		          	$("#ModalEventos").modal();
		          	servicio=document.getElementById("id_servicio");
		          	document.getElementById("medico").innerHTML=data[0].medico
		          	document.getElementById("id_medico").value=data[0].id_medico
		          	document.getElementById("ups").innerHTML=servicio.options[servicio.selectedIndex].text;
		          	document.getElementById("consultorio").innerHTML=event.title
		          	document.getElementById("fecha").value=event.start.format('Y-MM-DD')
		          	document.getElementById("hora_inicio").value=event.start.format('HH:mm:ss')
		          	document.getElementById("hora_fin").value=event.end.format('HH:mm:ss')
		          	document.getElementById("id_consultorio").value=event.id
		          	document.getElementById("centrocosto_id").value=servicio.value

	

		         


		       
		       		
		       		
		            
		        },  

		       
	    });




			}

		}, error:function(){



		}



	});

}


$(document).ready(function(){

	consultorio=document.getElementById("consultorio_id").value;

	$('#calendario').fullCalendar({
		locale: 'es' ,
		timeZone: 'UTC',
		header: {
			left: 'prev,next',
			center: 'title',
			right: 'month'
		},

		events:'http://127.0.0.1:8000/cita/api/consultorioprogramacion/'+consultorio,

		dayClick:function(date, jsEvent, view){


			limpiar_select(document.getElementById("id_medico"))
			$("#id_canidad_cupos").val("");
			fecha=date.format('Y-MM-DD');
			
			
			$.ajax({


				url:'http://127.0.0.1:8000/cita/api/medico/'+ fecha,
				type:'GET',

				success:function(data){

					verificar_duplicidad(data)

				}


			})
			
			$("#ModalEventos").modal();
			document.getElementById("fecha").value=date.format('Y-MM-DD')

		},


		       
	    });



});

function verificar_duplicidad(data){

	console.log(data)
	dato=[]

	for(i=0;i<data.length;i++){

		
		if(data[i].actividad == 1 || data[i].actividad == 11){

			dato.push({'id':data[i].id,'medico':data[i].medico,'actividad':data[i].actividad})
			

		}
	}

	llenar_combo(dato)

}


function llenar_combo(data){

	const datos = Array.from(new Set(data.map(s => s.id)))
		    .map(id => {
		        return {
		            id: id,
		            medico: data.find(s => s.id == id).medico,
		            actividad:data.find(s => s.id == id).actividad
		        };
		    });

    		
		    
			combo = $('#id_medico');
			combo.append('<option>-----</option>');
			
			for(i=0;i<datos.length;i++){

				combo.append('<option value='+datos[i].id+'>'+datos[i].medico+'</option>');
			}
		}
	

	


function verifica_detallerolmedico(){

	medico=document.getElementById("id_medico")
	fecha=document.getElementById("fecha").value

	url='http://127.0.0.1:8000/cita/api/personal/'+ medico.value+'/fecha/'+ fecha

	$.ajax({

		url:url,
		type:'GET',

		success:function(data){
			console.log(data)
			limpiar_select(document.getElementById("hora"));
			combo = $('#hora');
			combo.append('<option>-----</option>');
			for(i=0;i<data.length;i++){
				if(data[i].actividad == 1 || data[i].actividad == 11){
					combo.append('<option value='+data[i].id+'>'+data[i].hora_inicio+'--'+data[i].hora_fin+'</option>');


				}


		 		}
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





document.addEventListener('DOMContentLoaded', function() {

	consultorio=document.getElementById("consultorio_id").value;

  var calendarEl = document.getElementById('calendar_list');

  var calendar = new FullCalendar.Calendar(calendarEl, {
  	locale: 'es' ,
    plugins: [ 'interaction', 'dayGrid', 'timeGrid' ],
    selectable: true,
    timeZone: 'America/Bogota',
    defaultView: 'timeGridWeek',
    header: {
      left: 'prev,next today',
      center: 'title',
      right: 'timeGridWeek'
    },
    minTime:'07:00:00',
    maxTime:'20:00:00',
    // slotDuration:'00:40:00',
    events: 'http://127.0.0.1:8000/cita/api/consultorioprogramacion/'+consultorio,
    eventClick: function(info,event) {

    	$.ajax({

    		url:'http://127.0.0.1:8000/cita/api/detalleconsultorio/'+info.event.id,
    		type:'GET',
    		success:function(data){
    			console.log(data)
    			$("#detailconsultorio").modal();
    			document.getElementById("medico").innerHTML=data[0].medico
    			document.getElementById("servicio").innerHTML=data[0].centrocosto
    			document.getElementById("fecha_atencion").innerHTML=data[0].fecha
    			document.getElementById("hora_atencion").innerHTML=data[0].hora_inicio+'--'+ data[0].hora_fin
    			document.getElementById("cantidad_cupos").innerHTML=data[0].cantidad_cupos
    			document.getElementById("total_cupos").innerHTML=data[0].total_cupos

    		}


    	})
    	
    },

  });

  calendar.render();
});