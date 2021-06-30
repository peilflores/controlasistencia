
function cambioUnidad(csrf){
  idunidad=$('#unidades').val();
  
$.ajax({
    type: 'POST',
    url: '/rrhh/seleccionfecha/',
    data:{
    id : idunidad,
    csrfmiddlewaretoken : csrf,
    },
  
      success: function (valores) {
     $('#mdp-demo').multiDatesPicker('destroy');
     $('#mdp-demo').multiDatesPicker({
     stepMonths: 0,
     dateFormat: "yy-mm-dd",
     showButtonPanel: false,
     defaultDate: valores,
     altField: '#altField',
    
    });
       $('#calendar').fullCalendar( 'gotoDate', valores );
       
    }
   
  })
$.ajax({
    type: 'POST',
    url: '/rrhh/comboPersonalAnidado/',
    data:{
    id : idunidad,
    csrfmiddlewaretoken : csrf,
  },
    success: function (valores) {
      id = 0;
      $(document).ready(function() {
      $('#calendar').fullCalendar('next');
      $('#calendar').fullCalendar('prev');

    
 });
      $('#idpersonalp').empty();
      $('#idpersonalp2').empty();
      $('#idpersonalp3').empty();
      $('#personalp').empty();
      $('#personaldescripcion').empty();
      $('#botonvalidar').empty();
      $('#botonprimario').empty();
      $('#horasacumuladas').empty();
      $('#detallerolestado').empty();
      $('#personal').html(valores);
      $('#idunidad').val(idunidad);
      $('#idunidad2').val(idunidad);
      $('#idunidad3').val(idunidad);
      $('#idunidad4').val(idunidad);
     
    }
})

return false;
}

function pasarCronograma(id){
  $('#cronograma').val(id);
}
function seleccionarPersonal(csrf){

  id=$('#personal').val();
  $.ajax({
    type: 'POST',
    url: '/rrhh/comboPersonalSeleccionado/',
    data:{
    id : id,
    csrfmiddlewaretoken : csrf,
    },
  
      success: function (valores) {
      $('#botonprimario').empty();
      $('#idpersonalp').val(id);
      $('#idpersonalp2').val(id);
      $('#idpersonalp3').val(id);
      $('#personalp').html(valores);
      $('#personaldescripcion').html(valores);
    }
  })
   $.ajax({
    type: 'POST',
    url: '/rrhh/estadoPersonalSeleccionado/',
    data:{
    id : id,
    csrfmiddlewaretoken : csrf,
    },
  
      success: function (valores) {
      
      $('#detallerolestado').html(valores);
    }
  })
   $.ajax({
    type: 'POST',
    url: '/rrhh/observacionesPersonalSeleccionado/',
    data:{
    id : id,
    csrfmiddlewaretoken : csrf,
    },
  
      success: function (valores) {
      
      $('#observaciones').html(valores);
    }
  })
  $.ajax({
    type: 'POST',
    url: '/rrhh/cronograma/',
    data:{
    id : id,
    csrfmiddlewaretoken : csrf,
    },
  
      success: function (valores) {
      $('#botonprimario').html(valores);
    }
  })
  $.ajax({
    type: 'POST',
    url: '/rrhh/validarcronograma/',
    data:{
      id : id,
      csrfmiddlewaretoken : csrf,
    },
    success: function (valores) {
      
      $('#botonvalidar').html(valores);
  }
  });
  $.ajax({
    type: 'POST',
    url: '/rrhh/horasacumuladas/',
    data:{
    id : id,
    csrfmiddlewaretoken : csrf,
    },
  
      success: function (valores) {
      $('#horasacumuladas').html(valores);
    }
  })

  $(document).ready(function() {
    $('#calendar').fullCalendar('next');
    $('#calendar').fullCalendar('prev');

    
 });
}

