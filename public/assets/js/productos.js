$(document).ready(function() {
  ConsumoYa.enviarGET("productos/select", "sdf", "sdvd", function(data) {
    $("#contenido").append('<tr><td><input id="aggCodigo"></td><td><input id="aggNombre"></td><td class="td-actions text-right"><a id="agg" onClick="javascript:NuevoProd()" href="#" class="btn btn-simple btn-warning btn-icon edit"><i class="material-icons">dvr</i></a></td></tr>');
    for (var i = 0; i < data.length; i++) {
      $("#contenido").append('<tr><td id="idproducto-{4}">{0}</td><td>{1}</td><td class="td-actions text-right"><a onClick="javascript:editar({3})" class="btn btn-success btn-simple"><i class="material-icons">edit</i></a><a class="btn btn-danger btn-simple">\
<i class="material-icons">close</i></a></td></tr>'.replace("{0}", data[i].codigo).replace("{1}", data[i].nombre).replace("{3}", i).replace("{4}", i));
    }
  });
});

function NuevoProd (){
      ConsumoYa.enviarPOST("productos/insert", "info", {codigo: $("#aggCodigo").val(), nombre: $("#aggNombre").val()}, function(data){
      msjOK();
    })
  }

function msjOK() {
  swal({
    title: "Guardado exitoso!",
    buttonsStyling: false,
    confirmButtonClass: "btn btn-success"
  });
}

function editar(codigo) {
  var c=$("#idproducto-"+codigo).html();
  swal({
    title: 'Producto codigo: ' + c,
    html: '<div class="form-group">' +
      '<input id="input-field" type="text" placeholder="Nombre" class="form-control" required/>' +
      '</div>',
    showCancelButton: true,
    confirmButtonClass: 'btn btn-success',
    cancelButtonClass: 'btn btn-danger',
    buttonsStyling: false
  }).then(function(result) {
    ConsumoYa.enviarPOST("productos/insert", "info", {codigo: c, nombre: $('#input-field').val()}, function(data){window.location.reload();});
    swal({
      type: 'success',
      html: 'Actualizado: <strong>' +
        $('#input-field').val() +
        '</strong>',
      confirmButtonClass: 'btn btn-success',
      buttonsStyling: false
    });
  }).catch(swal.noop)
}
