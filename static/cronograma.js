
let calendario_pro;


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
  var calendario_elemento = document.getElementById('calendar');
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
      
    },  
    
    select: function(info){

      var events=[]
      id_turno=document.getElementById("id_turno");
      
      personal=document.getElementById("id_personal");

      data_hora=id_turno.options[id_turno.selectedIndex].text.split("(")
      // hora_guion=data_hora[1].split("-")
      // hora_incio=hora_guion[0]
      // hora_fin=hora_guion[1]

       
      var temp={id:id_turno.value , title: id_turno.options[id_turno.selectedIndex].text, start: moment(info.start).format("YYYY-MM-DD"),id_personal:personal.value};

      events.push(temp);


      if(sessionStorage.getItem("new_rol")===null){

        data=[];
      }else{


        data=JSON.parse(sessionStorage.getItem("new_rol"))

        
        
      }

      data.push(temp)

      sessionStorage.setItem("new_rol",JSON.stringify(data))
      console.log(JSON.parse(sessionStorage.getItem("new_rol")))





     

      calendario_pro.addEventSource(events)

      
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