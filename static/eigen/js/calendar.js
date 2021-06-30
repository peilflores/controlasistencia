/*$(document).ready(function() {
    $('#calendar').fullCalendar({
        locale: 'es' ,
        timeZone: 'UTC',
        header: {
            left: 'prev,next',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'
        },
                defaultDate: '2019-12-01',
                defaultView: 'agendaWeek',
                
                events:'',
        dayClick: function (date, jsEvent, view) {
            alert('Has hecho click en: '+ date.format());

        }, 
        eventClick: function (calEvent, jsEvent, view) {
             alert('Has hecho click en: '+ date.format());
            $('#event-title').text(calEvent.title);
            $('#event-description').html(calEvent.description);
            $('#modal-event').modal();
        },  
    });
});*/