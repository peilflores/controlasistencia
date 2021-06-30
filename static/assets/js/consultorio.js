
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



function detallerol_list(){

	id_servicio=document.getElementById("id_servicio").value;
	url='http://localhost:8000/cita/api/detallerol/'+id_servicio;

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

	url='http://localhost:8000/cita/api/personalprogramacionconsultorio/'+iddetalle;
	
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
		        events:'http://localhost:8000/cita/api/personalprogramacionconsultorio/'+iddetalle,
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


// $(document).ready(function(){

// 	consultorio=document.getElementById("consultorio_id").value;

// 	$('#calendario').fullCalendar({
// 		locale: 'es' ,
// 		timeZone: 'UTC',
// 		header: {
// 			left: 'prev,next',
// 			center: 'title',
// 			right: 'month'
// 		},

// 		events:'http://127.0.0.1:8000/cita/api/consultorioprogramacion/'+consultorio,

// 		dayClick:function(date, jsEvent, view){


// 			limpiar_select(document.getElementById("id_medico"))
// 			$("#id_canidad_cupos").val("");
// 			fecha=date.format('Y-MM-DD');
			
			
// 			$.ajax({


// 				url:'http://127.0.0.1:8000/cita/api/detallerolpersonal/'+ fecha,
// 				type:'GET',

// 				success:function(data){

// 					verificar_duplicidad(data)

// 				}


// 			})
			
// 			$("#ModalEventos").modal();
// 			document.getElementById("fecha").value=date.format('Y-MM-DD')

// 		},


		       
// 	    });



// });

function verificar_duplicidad(data){

	
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

	url='http://localhost:8000/cita/api/personal/'+ medico.value+'/fecha/'+ fecha

	$.ajax({

		url:url,
		type:'GET',

		success:function(data){
			
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
	fecha=document.getElementById("id_fecha").value;


  var calendarEl = document.getElementById('calendar_list');

  var calendar = new FullCalendar.Calendar(calendarEl, {
  	locale: 'es' ,
    plugins: [ 'interaction', 'dayGrid', 'timeGrid' ],
    selectable: true,
    timeZone: 'UTC',
    defaultView: 'timeGridWeek',

    header: {
      left: 'prev,next today',
      center: 'title',
      right: 'timeGridWeek'
    },
    minTime:'08:00',
			maxTime:'20:00',
			slotDuration: '00:60:00',
			titleFormat: { // will produce something like "Tuesday, September 18, 2018"
		month: 'short',
		year: 'numeric',
		day: 'numeric',
	
	  },
    // slotDuration:'01:00:00',
    events: 'http://localhost:8000/cita/api/consultorioprogramacion/'+consultorio,
    select: function(info,event) {

    	fecha=moment(info.startStr).format('YYYY-MM-DD')
    	document.getElementById("id_fecha").value=fecha;

    	convertir_fecha();

    	limpiar_select(document.getElementById("id_servicio"));
    	turno_list();
    	limpiar_select_ul(document.getElementById("personal_list"));
    	// alert(fecha)
    	
    },

  });

  calendar.render();
});


function limpiar_select_ul(ul){

	
	var lis = ul.getElementsByTagName("li");

	for(i = lis.length- 1 ; i >= 0 ; i--) {
	    ul.removeChild(lis[i]);
	}
}

function calendar_modal(){
consultorio=document.getElementById("id_consultorio").value;

$('#calendario_modal').fullCalendar({

				plugins: [ 'interaction', 'dayGrid'],
		        locale: 'es' ,
				timeZone: 'UTC',
				

		        header: {
		            left: 'prev,next',
		            center: 'title',
		            right: 'month'
		        },
		       
		        selectable: true,
				height: 300,
				widht:15,
		        showNonCurrentDates: false,
		        events:'http://localhost:8000/cita/api/consultorioprogramacion/'+consultorio,
		       
		        dayClick: function (date, jsEvent, view) {


		        	consultorio=document.getElementById("id_consultorio").value;
		        	fecha=date.format('YYYY-MM-DD')
		        	

		        	url='/cita/consultorioprogramacion_form/'+consultorio+'/fecha/'+fecha

		        	document.getElementById("btn-modal").href = url;

		            
		        	
		        }, 
		        eventClick: function (event,info) {

		        },  

		       
	    });
}


/*    NUEVO CODIGO DE LISTA DE TURNO *!!!!*////


function turno_list(){


	url='http://localhost:8000/rrhh/api/actividades/';

	$.ajax({

		url:url,
		type:'GET',
		success:function(data){

			
			limpiar_select(document.getElementById("id_turno"));
 			combo = $('#id_turno');
 			combo.append('<option value="0">-----</option>');
 			for(i=0;i<data.length;i++){

 				if(data[i].id == 1 || data[i].id == 11){
 					combo.append('<option value='+data[i].id+'>'+data[i].descripcion+'</option>');

 				}

 			}
		}, error:function(){

			limpiar_select(document.getElementById("id_turno"));

		}



	})

}

function cargar_servicio(){

	actividad=document.getElementById("id_turno").value;
	fecha=document.getElementById("id_fecha").value;


	url='http://localhost:8000/cita/api/servicio_programado/'+actividad+'/fecha/'+fecha;

	$.ajax({

		url:url,
		type:'GET',
		success:function(data){

			
			limpiar_select(document.getElementById("id_servicio"));
 			combo = $('#id_servicio');
 			combo.append('<option value="0">-----</option>');
 			for(i=0;i<data.length;i++){

 				combo.append('<option value='+data[i].id+'>'+data[i].servicio+'</option>');

 			}

		}, error:function(){

			limpiar_select(document.getElementById("id_servicio"));

		}





	});


}





function cargar_personal_list(){

	actividad=document.getElementById("id_turno").value;
	fecha=document.getElementById("id_fecha").value;
	
	url='http://localhost:8000/cita/api/detallerolpersonal/'+fecha+'/actividad/'+actividad;

	$.ajax({

		url:url,
		type:'GET',

		success:function(data){

			var ul = document.getElementById('personal_list')
	
			for (i=0;i< data.length;i++){

				var li= document.createElement('li')
				
				li.setAttribute("onclick","modal_asigancion("+data[i].id+")");
				li.innerHTML=data[i].medico + ' -' +data[i].hora_atencion ;
				ul.appendChild(li);

			}
			
			var div = document.getElementById('personal')
			div.appendChild(ul);


		}





	})


}

document.getElementById('personal_list').addEventListener('click', function(e){
	personal=e.target.innerHTML

	
	var string = personal.split("-",6);

	

	document.getElementById('medico').innerHTML=string[0]
	document.getElementById('hora_inicio').value=string[1]
	document.getElementById('hora_fin').value=string[2]


});



function modal_asigancion(id){

	servicio=document.getElementById("id_servicio")
	fecha=document.getElementById("id_fecha").value

	document.getElementById("servicio_id").innerHTML=servicio.options[servicio.selectedIndex].text;
	document.getElementById("centrocosto").value=servicio.value;
	document.getElementById("id_fechas").value=fecha;
	document.getElementById("medico_id").value=id

	$("#modal-asignacion").modal();
}

function convertir_fecha(){

	f=document.getElementById("id_fecha").value;
	fecha_setear=moment(f).format('YYYY-MM-DD HH:mm:ss');
	var fecha= new Date(fecha_setear);
	var options = {year: 'numeric', month: 'long', day: 'numeric' };
	document.getElementById("fecha_seteada").innerHTML=fecha.toLocaleDateString("es-ES", options)

	
}