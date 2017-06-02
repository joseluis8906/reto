module.exports = {
  //funciones del controlador
  insert: function(req, res, next) {
    console.log(req.body.info);
    res.send({
      result: true
    });
  },

  formulario: function(req, res, next) {
    res.render('app/formulariolocalidad', {
      isAuthenticated: req.isAuthenticated(),
      user: req.user
    });
  },

  cargaMasiva: function(req, res, next) {
    res.render('app/formulariolocalidadmasiva', {
      isAuthenticated: req.isAuthenticated(),
      user: req.user
    });
  }

}
