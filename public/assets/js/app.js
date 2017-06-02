$(document).ready(function() {

  //setTimeout(cesar_mapa, 1000);

  if (navigator.geolocation) {
    navigator.geolocation.watchPosition(function(position) {
      mostrarUbicacion(position.coords);
    }, function(failure) {
      $.getJSON('https://ipinfo.io/geo', function(response) {
        var loc = response.loc.split(',');
        var coords = {
          latitude: loc[0],
          longitude: loc[1]
        };
        mostrarUbicacion(coords);
      });
    });
  } else {
    alert("Error! Este navegador no soporta la Geolocalización.");
  };

  function mostrarUbicacion(coords) {
    $.ajax({
      dataType: "json",
      url: "https://nominatim.openstreetmap.org/reverse",
      type: "get",
      data: {
        format: "json",
        lat: coords.latitude,
        lon: coords.longitude
      }
    }).done(function(data) {
      var mun = "nada";
      if (data.address.town != undefined) {
        mun = data.address.town;
      } else if (data.address.county != undefined) {
        mun = data.address.county;
      } else {
        mun = data.address.city;
      }
      ciudad = mun + /*", " + data.address.state +*/ " - " + data.address.country;
      $("#ciudad").html('<i class="material-icons">location_on</i>' + ciudad);
    });
  };

  function mostrarSaludo() {
    var ahora = new Date();
    var hora = ahora.getHours();
    var contenido = "";
    if (hora > 12 && hora < 18) {
      contenido = 'Buenas tardes <img src="../assets/img/tarde.png" width="50px"/>';
    } else if (hora > 18 && hora < 24) {
      contenido = 'Buenas noches <img src="../assets/img/noche.png" width="50px"/>';
    } else {
      contenido = 'Buenos días <img src="../assets/img/dia.png" width="50px"/>';
    }
    document.getElementById("saludo-contenido").innerHTML = contenido;
  }

  setInterval(mostrarSaludo(), 1000);

  $(window).resize(function() {
    if ($(document).width() >= 768 && $(document).width() <= 991) {
      $("#saludo").css({
        "margin-right": "50px",
        "margin-top": "-63px"
      })
    } else if ($(document).width() > 991) {
      $("#saludo").css({
        "margin-right": "30px",
        "margin-top": "0px"
      })
    } else {
      $("#saludo").css({
        "margin-right": "0px",
        "margin-top": "-61px"
      })
    }
  });
});

function cesar_mapa() {
  var svg = document.getElementById("cesar-mapa").getSVGDocument();
  window.dptos = [
    svg.getElementById("aguachica"),
    svg.getElementById("agustin_codazzi"),
    svg.getElementById("astrea"),
    svg.getElementById("becerril"),
    svg.getElementById("bosconia"),
    svg.getElementById("chimichagua"),
    svg.getElementById("chiriguana"),
    svg.getElementById("curumani"),
    svg.getElementById("el_copey"),
    svg.getElementById("el_paso"),
    svg.getElementById("gamarra"),
    svg.getElementById("gonzalez"),
    svg.getElementById("la_gloria"),
    svg.getElementById("la_jagua_de_ibirico"),
    svg.getElementById("la_paz"),
    svg.getElementById("manaure"),
    svg.getElementById("pailitas"),
    svg.getElementById("pelaya"),
    svg.getElementById("pueblo_bello"),
    svg.getElementById("rio_de_oro"),
    svg.getElementById("san_alberto"),
    svg.getElementById("san_diego"),
    svg.getElementById("san_martin"),
    svg.getElementById("tamalameque"),
    svg.getElementById("valledupar")
  ];

  for (var i = 0; i < dptos.length; i++) {
    dptos[i].onclick = departamento;
    if (i<10)
    {
      dptos[i].codigo="00"+(i+1)
    }
    else {
      dptos[i].codigo="0"+(i+1)
    }

  }
}

function departamento()
{

  for (var i = 0; i < window.dptos.length; i++)
   {
    if (window.dptos[i].id === this.id)
    {
      window.dptos[i].style.fill = "rgb(76, 175, 80)";
    }
    else
    {
      window.dptos[i].style.fill = "rgb(249, 249, 249)";
    }
  }

  console.log(this.codigo);

  ConsumoYa.enviarGET("/app/localidad/select", "codigo", this.codigo, function(data){
    $("#MunNom").text(data.nombre);
    $("#MunPob").text(data.poblacion);
    $("#MunAlt").text(data.altitud);
    $("#MunFun").text(data.fundacion);
    $("#MunSup").text(data.superficie);
    $("#MunTem").text(data.temperatura);
  });
  //producto_nombre; promedio_consumo

  /*ConsumoYa.enviarGET("/app/demanda/selectall", "localidad_codigo", this.codigo, function(data){
    for(var i=0; i < data.length; i++){
      if(data.codigo == this.codigo){
        $('#ofert').append('<tr><td>{0}</td><td id="oferta{3}" class="text-right"></td><td class="text-right">{2}</td></tr>').replace("{0}", data[i].producto_nombre).replace("{2}", data[i].promedio_consumo).replace("{3}", i);
      }
    }
  })*/

}

ConsumoYa = {

  enviarPOST: function(url, parametro, valor, callBack) {
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", url);
    xhttp.onreadystatechange = function() {
      if (this.readyState === 4 && this.status == 200) {
        callBack(JSON.parse(xhttp.responseText));
      }
    };
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(parametro + "=" + encodeURIComponent(JSON.stringify(valor)));
  },

  enviarGET: function(url, parametro, valor, callBack) {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", url + '?' + parametro + "=" + encodeURIComponent(valor));
    xhttp.onreadystatechange = function() {
      if (this.readyState === 4 && this.status == 200) {
        callBack(JSON.parse(xhttp.responseText));
      }
    };
    xhttp.send();
  },

  initMaterialWizard: function() {

    // Wizard Initialization
    $('.wizard-card').bootstrapWizard({
      'tabClass': 'nav nav-pills',

      onNext: function(tab, navigation, index) {
        var $valid = $('.wizard-card form').valid();
        if (!$valid) {
          $validator.focusInvalid();
          return false;
        }
      },

      onInit: function(tab, navigation, index) {

        //check number of tabs and fill the entire row
        var $total = navigation.find('li').length;
        $width = 100;
        var $wizard = navigation.closest('.wizard-card');

        $display_width = $(document).width();

        if ($display_width < 600 && $total > 3) {
          $width = 50;
        }

        navigation.find('li').css('width', $width + '%');
        $first_li = navigation.find('li:first-child a').html();
        $moving_div = $('<div class="moving-tab">' + $first_li + '</div>');
        $('.wizard-card .wizard-navigation').append($moving_div);
        refreshAnimation($wizard, index);
        $('.moving-tab').css('transition', 'transform 0s');
      },

      onTabShow: function(tab, navigation, index) {
        var $total = navigation.find('li').length;
        var $current = index + 1;

        var $wizard = navigation.closest('.wizard-card');
        refreshAnimation($wizard, index);
      }
    });

    $('.set-full-height').css('height', 'auto');

    $(window).resize(function() {
      $('.wizard-card').each(function() {
        $wizard = $(this);
        index = $wizard.bootstrapWizard('currentIndex');
        refreshAnimation($wizard, index);

        $('.moving-tab').css({
          'transition': 'transform 0s'
        });
      });
    });

    function refreshAnimation($wizard, index) {
      total_steps = $wizard.find('li').length;
      move_distance = $wizard.width() / total_steps;
      step_width = move_distance;
      move_distance *= index;

      $current = index + 1;

      if ($current == 1) {
        move_distance -= 8;
      } else if ($current == total_steps) {
        move_distance += 8;
      }

      $wizard.find('.moving-tab').css('width', step_width);
      $('.moving-tab').css({
        'transform': 'translate3d(' + move_distance + 'px, 0, 0)',
        'transition': 'all 0.5s cubic-bezier(0.29, 1.42, 0.79, 1)'

      });
    }
  }

}
