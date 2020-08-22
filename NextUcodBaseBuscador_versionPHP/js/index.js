$(document).ready(function () {
    $('#formulario').submit(function (e) {
        e.preventDefault();

        $.ajax({
            type: "POST",
            url: './buscador.php',
            data: $(this).serialize(),
            success: function (response) {
                var jsonData = JSON.parse(response);
                $(".informacion").empty();
                if (jsonData) {
                    colocaHtml(jsonData);
                }
            }
        });
    });
});



$.ajax({
    url: "./data-1.json",
    type: "GET",
    data: {},
    dataType: 'json', 
    success: function (data) {
        
        var ciudad = {};
        var ciudades = data.filter(function (e) {
            if (ciudad[e.Ciudad]) {
                return false;
            } else {
                ciudad[e.Ciudad] = true
                return true;
            }

        });
        for (var i = 0; i <= 5; i++) {
            $("#selectCiudad").append("<option value= '" + ciudades[i].Ciudad + "'>" + ciudades[i].Ciudad + "</option>");
        }

        var tipo = {};
        var tipos = data.filter(function (e) {
            if (tipo[e.Tipo]) {
                return false;
            } else {
                tipo[e.Tipo] = true
                return true;
            } 
        });
        for (var i = 0; i <= 2; i++) {
            $("#selectTipo").append("<option value='" + tipos[i].Tipo + "'>" + tipos[i].Tipo + "</option>");
        }

        $('select').material_select(); 

    }
})





$('#mostrarTodos').click(function () {
    mostrarTodos();
});

function mostrarTodos() {
    $.ajax({
        url: "mostrar.php",
        type: "GET",
        success: function (response) {
            response = JSON.parse(response);
            $(".informacion").empty();
            colocaHtml(response);
        }
    });
}

function colocaHtml(arreglo) {
    $.each(arreglo, function (i, data) {
        $(".informacion").append(`
            <div class="tituloContenido card itemMostrado">
                <img src="img/home.jpg">
                <div class="card-stacked">
                   <div class="card-content">
                      <b>Id:</b> ${data.Id}<br>
                      <b>Dirección:</b> ${data.Direccion} <br>
                      <b>Ciudad:</b> ${data.Ciudad}<br>
                      <b>Telefono:</b> ${data.Telefono}<br>
                      <b>Codigo Postal:</b> ${data.Codigo_Postal}<br>
                      <b>Tipo:</b> ${data.Tipo}<br>
                      <b>Precio:</b> ${data.Precio}<br>
                      </div>
                  <div class="card-action"> <a href="#">Ver mas</a> </div> </div> </div> </div>

        `)
    });
}


$.fn.scrollEnd = function (callback, timeout) {
    $(this).scroll(function () {
        var $this = $(this);
        if ($this.data('scrollTimeout')) {
            clearTimeout($this.data('scrollTimeout'));
        }
        $this.data('scrollTimeout', setTimeout(callback, timeout));
    });
};





function inicializarSlider() {
    $("#rangoPrecio").ionRangeSlider({
        type: "double",
        grid: false,
        min: 0,
        max: 100000,
        from: 200,
        to: 80000,
        prefix: "$"
    });
}



function playVideoOnScroll() {
    var ultimoScroll = 0,
        intervalRewind;
    var video = document.getElementById('vidFondo');
    $(window)
        .scroll((event) => {
            var scrollActual = $(window).scrollTop();
            try {
                if (scrollActual > ultimoScroll) {
                    video.currentTime = 0;
                    video.play();
                } else {
                    
                    video.currentTime = 0;
                    video.play();
                }
            } catch (e) {

            }
            ultimoScroll = scrollActual;
        })
        .scrollEnd(() => {
            video.pause();
        }, 10)
}



inicializarSlider();
playVideoOnScroll();