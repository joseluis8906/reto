$(document).ready(function() {

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
      contenido = 'Buenas días <img src="../assets/img/dia.png" width="50px"/>';
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

ConsumoYa = {

  enviarPOST: function(url, parametro, valor, callBack){
    var xhttp = new XXMLHttpRequest();
    xhttp.open("POST", url);
    xhttp.onreadystatechange = function(){
      if(this.readyState === 4 && this.status == 200){
        callBack(JSON.parse(xhttp.responseText));
      }
    };
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(parametro + "=" + encodeURIComponent(JSON.stringify(valor)));
  },

  initVectorMap: function() {
    var mapData = {
      "AU": 760,
      "BR": 550,
      "CA": 120,
      "DE": 1300,
      "FR": 540,
      "GB": 690,
      "GE": 200,
      "IN": 200,
      "RO": 600,
      "RU": 300,
      "US": 2920,
    };

    $('#worldMap').vectorMap({
      map: 'world_mill_en',
      backgroundColor: "transparent",
      zoomOnScroll: false,
      regionStyle: {
        initial: {
          fill: '#e4e4e4',
          "fill-opacity": 0.9,
          stroke: 'none',
          "stroke-width": 0,
          "stroke-opacity": 0
        }
      },

      series: {
        regions: [{
          values: mapData,
          scale: ["#AAAAAA", "#444444"],
          normalizeFunction: 'polynomial'
        }]
      },
    });
  }
}
