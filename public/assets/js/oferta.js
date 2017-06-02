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
  $('#proveedor').val("");
  $("#producto").val("");
  $("#origen").val("");
  $("#cantidad").val("");
  $("#precio").val("");
  $("#embalaje").val("");
  $('#lbprov').addClass("is-empty");
  $("#lbprod").addClass("is-empty");
  $("#lborigen").addClass("is-empty");
  $("#lbcant").addClass("is-empty");
  $("#lbprec").addClass("is-empty");
  $("#lbembal").addClass("is-empty");
}

$(document).ready(function(){
  ConsumoYa.enviarGET("proveedores/selectall", "coldk","54", function(data){
    for(var i = 0; i < data.length; i++){
      $("#proveedor").append('<option value="{0}">{1}</option>'.replace("{0}", data[i].codigo).replace("{1}",data[i].nombre));
    }
  })

  ConsumoYa.enviarGET("productos/selectall", "codigo", "100", function(data) {
    for (var i = 0; i < data.length; i++) {
      $("#producto").append('<option value="{0}">{1}</option>'.replace("{0}", data[i].codigo).replace("{1}",data[i].nombre));
    }
  });
})

function guardar ()
{
    ConsumoYa.enviarPOST("demanda/insert", "info", { proveedor_codigo: $('#proveedor').val(), origen: $("#origen").val(), cantidad: $("#cantidad").val(), precio: $("#precio").val(), embalaje:$("#embalaje").val(), producto_codigo: $("#producto").val() }, function(data){console.log(data);});
    msjOK();
    reset();
}
