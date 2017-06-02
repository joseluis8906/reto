function msjOK() {
  swal({
    title: "Guardado exitoso!",
    buttonsStyling: false,
    confirmButtonClass: "btn btn-success"
  });
}

function reset() {
  var foto = document.getElementById('bandera');
  foto.src = "../assets/img/image_placeholder.jpg";
  $('#municipio').val("");
  $("#producto").val("");
  $("#consumo").val("");
  $('#lbprod').addClass("is-empty");
  $("#lbcon").addClass("is-empty");
  $("#lbcod").addClass("is-empty");
}

function cambiarSelect() {
  var foto = document.getElementById('bandera');
  var municipio = document.getElementById('municipio');
  if (municipio.children[municipio.selectedIndex].value == "") {
    reset();
  }
  foto.src = municipio.children[municipio.selectedIndex].getAttribute('url');
}

$(document).ready(function() {
  ConsumoYa.enviarGET("productos/selectall", "codigo", "100", function(data) {
    for (var i = 0; i < data.length; i++) {
      $("#producto").append('<option value="{0}">{1}</option>'.replace("{0}", data[i].codigo).replace("{1}",data[i].nombre));
    }
  });
})

function guardar ()
{
    var municipio = $("#municipio").val();
    var producto = $("#producto").val();
    var consumo = $("#consumo").val();
    ConsumoYa.enviarPOST("demanda/insert", "info", {codigo_localidad: municipio, codigo_producto: producto, promedio_consumo: consumo}, function(data){console.log(data);});

    msjOK();
    reset();
}
