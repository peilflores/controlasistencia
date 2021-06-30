function verifica_asistencia(){

	documento=document.getElementById("id_numero_documento").value;
	url='http://127.0.0.1:8000/rrhh/api/asistencia_control/'+documento;
	if(documento.length==8){

		$.ajax({
		url:url,
		type:'GET',
		success:function(data){
			
			if(data[0].codError=='101'){



			$('#modal-dialog_conteo').modal('show'); // abrir

				setTimeout(function(){
				  	document.getElementById("asistencia_personal").innerHTML=data[0].personal
				  	document.getElementById("hora").innerHTML="HORA : " + data[0].hora
				  	document.getElementById("message").innerHTML=data[0].message

					$('#modal-dialog_conteo').modal('hide'); // abrir
					capturar_foto()
					foto=document.getElementById("foto").value;
					csrf=document.getElementById("csrf").value
					$.ajax({
					    type: 'POST',
					    url: '/rrhh/guardar_foto/'+data[0].id_detalle,
					    data:{
					    foto : foto,
					    csrfmiddlewaretoken : csrf,
					    },
					  
					      success: function (valores) {
					     	
					     	setTimeout(function(){
					     		location.href='/asistencia/asistencia_form'

					     	}, 4000)
					       
					    }
				   
				  	})

				 
				}, 3000);
				
			}else{

				document.getElementById("id_message").innerHTML=data[0].message;
				document.getElementById("id_numero_documento").value=""
				$('#modal-dialog_message').modal('show'); // abrir
			}
			console.log(data)
		}


	})


	}

	

}