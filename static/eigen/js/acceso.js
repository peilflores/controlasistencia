

function permission(){

	grupo=document.getElementById("id_grupo");
	combo=document.getElementById("id_permiso");

	$("#id_permiso").empty();
	url='http://127.0.0.1:8000/acceso/api/permisos/?content_type__app_label='+grupo.options[grupo.selectedIndex].text;

	$.ajax({

		url:url,
		type:'GET',
		success:function(data){

			console.log(data)
			
			for(var i=0; i<data.length;i++){

				option = document.createElement("option");
				option.setAttribute("value", data[i].id )
				option.textContent="("+data[i].content_type.model+")" + ' - ' + data[i].name;
				combo.appendChild(option)


				console.log(data[i].content_type.model+ '-' +data[i].name)




			}
		}

	})
}