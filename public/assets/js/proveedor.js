function reset() {
  var foto = document.getElementById('bandera');
  foto.src = "../assets/img/image_placeholder.jpg";
  $('#codigo').val();
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
    console.log($(this).val());
});

function buscarCodigo() {
  ConsumoYa.enviarGET("localidad/select", "codigo", municipio.children[municipio.selectedIndex].value, function(data) {
    if (data.result !== false) {
      $("#altitud").val(data.altitud);
      $("#temperatura").val(data.temperatura);
      $("#poblacion").val(data.poblacion);
      $("#superficie").val(data.superficie);
      $("#fundacion").val(data.fundacion);
      $('#lbalt').removeClass("is-empty");
      $("#lbpbl").removeClass("is-empty");
      $("#lbsup").removeClass("is-empty");
      $("#lbdtemp").removeClass("is-empty");
      $("#lbfun").removeClass("is-empty");
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
