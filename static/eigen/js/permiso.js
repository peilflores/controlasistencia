
let calendario_pro;
let calendario_cupos;
let calendario_pro_permiso;
async function  list_detallerolpersonal(){

    id_personal=document.getElementById("id_personal").value;
    rol_id=document.getElementById("id_rol").value;
    data= await fetch('http://127.0.0.1:8000/rrhh/api/personal/'+id_personal+'/rol/'+rol_id+'/detalle_rol/')


    datos=data.json()

    return datos

}

function resultado_detallerolpersonal(n){


    var events= [];
    var temp=[];
    id_personal=document.getElementById("id_personal");
    document.getElementById("name_personal").innerHTML='Personal : '+ id_personal.options[id_personal.selectedIndex].text;
    document.getElementById("id_personal_rol").value=id_personal.value;
    for(var i=0; i<n.length ; i++){

        events.push({
          id: n[i].id,
          title: n[i].turno.descripcion+'('+n[i].hora_inicio + ' - ' + n[i].hora_fin+')',
          start: n[i].fecha_inicio,
        });


      }

     cargar_calendarioProgramado(events)
                           
          
        
  };
       

function detallepersonalrol(){

    list_detallerolpersonal().then(resultado_detallerolpersonal)
}



function inicializar_calendar(){
  var calendario_elemento = document.getElementsByClassName('calendar')[0];
  calendario_pro = new FullCalendar.Calendar(calendario_elemento,{
    plugins: [ 'interaction', 'dayGrid' ],
  
    selectable: true,
    defaultView:'dayGridMonth',
    titleFormat: { // will produce something like "Tuesday, September 18, 2018"
    month: 'short',
    year: 'numeric',
    day: 'numeric',
  
    },
   
      dayClick: function(date, jsEvent, view) {

      
    
    },
    eventClick: function (info) {

    	document.getElementById("fecha").innerHTML=moment(info.event.start).format("YYYY-MM-DD")

    	document.getElementById("fecha_permiso").value=moment(info.event.start).format("YYYY-MM-DD")

    	console.log(moment(info.event.startStr).format('HH:mm'))
    	 $('#modal-dialog').modal('show'); // abrir
    	 console.log("a")

      
    },  
    
    select: function(info){

   		console.log(moment(info.start).format("YYYY-MM-DD"))

      
    }
  
  });
    calendario_pro.render();

    
}

function cargar_calendarioProgramado(source){


  var e =calendario_pro.getEventSources()

  console.log(e.length)
 if(e.length>0){
  for(i=0;i<e.length;i++){

     e[i].remove();
  }
  
   

  }
  calendario_pro.addEventSource(source)
}

function guardar_datos_rol(){

  document.getElementById("datos_rol").value=sessionStorage.getItem('new_rol')

  sessionStorage.clear();

}


function enviar_permiso(){

	csrf=document.getElementById("csrf").value
	anio_permiso=document.getElementById("id_anio_permiso").value;
	mes_permiso=document.getElementById("id_mes_permiso").value;
	id_personal_permiso=document.getElementById("id_personal_permiso").value;
	descripcion=document.getElementById("id_descripcion").value;
	fecha_permiso=document.getElementById("fecha_permiso").value;
	rol_permiso=document.getElementById("id_rol_permiso").value;

	$.ajax({
		type: 'POST',
		url: '/rrhh/permiso_form/',
		data:{

			anio_permiso:anio_permiso,
			mes_permiso:mes_permiso,
			id_personal_permiso:id_personal_permiso,
			descripcion:descripcion,
			fecha_permiso:fecha_permiso,
			rol_permiso:rol_permiso,

			csrfmiddlewaretoken : csrf,
		},

		success: function (valores) {

			location.href='/rrhh/permiso_form/'

				detallepersonalrol()

			

		}

	})

}



/* CRONOGRAMA PARA PERMISO */


function inicializar_calendarioProgramados(){

	var calendario_elemento = document.getElementById('calendario_list');
	calendario_cupos = new FullCalendar.Calendar(calendario_elemento,{
			locale:'es',
			plugins: [ 'interaction','dayGrid', 'timeGrid','list' ],
			timeZone: 'UTC',
			defaultView: 'timeGrid',
			 views: {
      listDay: { buttonText: 'list day' },
      listWeek: { buttonText: 'list week' },
      listMonth: { buttonText: 'list month' }
    },

			selectable:true,
	
			eventClick: function (event, calEvent, jsEvent, view) {
				 console.log(event)

			},
			dateClick: function(info) {
				
			},
			select: function(info) {
				
			
				
			}

		
	});

	calendario_cupos.render()
}






async function  list_detallepermiso(){

    id_personal=document.getElementById("id_personal").value;
    rol_id=document.getElementById("id_rol").value;
    data= await fetch('http://127.0.0.1:8000/rrhh/api/personal/'+id_personal+'/rol/'+rol_id+'/detalle_permiso/')


    datos=data.json()

    return datos

}

function resultado_detallepermiso(n){


    var events= [];
    var temp=[];
    id_personal=document.getElementById("id_personal");
    document.getElementById("name_personal").innerHTML='Personal : '+ id_personal.options[id_personal.selectedIndex].text;
    document.getElementById("id_personal_rol").value=id_personal.value;
    for(var i=0; i<n.length ; i++){

        events.push({
          id: n[i].id,
          title: 'Permiso :' + n[i].fecha_permiso,
          start: n[i].fecha_permiso,
          color:'#2b7ad0',
        });


      }

     cargar_calendarioProgramadoPermiso(events)
                           
          
        
  };
       

function detallepermiso(){

    list_detallepermiso().then(resultado_detallepermiso)
}


function cargar_calendarioProgramadoPermiso(source){


  var e =calendario_cupos.getEventSources()

  console.log(e.length)
 if(e.length>0){
  for(i=0;i<e.length;i++){

     e[i].remove();
  }
  
   

  }
  calendario_cupos.addEventSource(source)
}
