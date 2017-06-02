function reset() {
  var foto = document.getElementById('bandera');
  foto.src = "../assets/img/image_placeholder.jpg";
  $('#codigo').val("");
  $("#nombre").val("");
  $("#origen").val("");
  $('#lbcod').addClass("is-empty");
  $("#lbnomb").addClass("is-empty");
  $("#lborg").addClass("is-empty");
}

function msjOK() {
  swal({
    title: "Guardado exitoso!",
    buttonsStyling: false,
    confirmButtonClass: "btn btn-success"
  });
}

$('#codigo').keyup(function() {
  
});



function insertar() {
  var datos ={
    codigo: $("#codigo").val(),
    nombre: $("#nombre").val(),
    origen: $("#origen").val(),
  };
  ConsumoYa.enviarPOST("/app/proveedores/insert", "info", datos, function(data) {
    if (data.result !== false) {
      reset();
      msjOK();
    }
  });
}

function enviar() {
  var municipio = document.getElementById('codigo');
  var consult = {
    codigo: $("#codigo").val(),
    nombre: municipio.children[municipio.selectedIndex].text,
    poblacion: $("#poblacion").val(),
    altitud: $("#altitud").val(),
    temperatura: $("#temperatura").val(),
    superficie: $("#superficie").val(),
    fundacion: $("#fundacion").val()
  }
  ConsumoYa.enviarPOST("localidad/insert", "info", consult, function(data) {
    municipio.selectedIndex = 0;
    reset();
    msjOK();
  });
}
