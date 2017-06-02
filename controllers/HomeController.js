module.exports = {
  //funciones del controlador
  index: function(req, res, next) {
    res.render('login', {
      message: req.flash('info'),
      authmessage: req.flash('authmessage'),
      verify: req.flash('verify')
    });
  },

  registro: function(req, res, next) {
    res.render('registro', {
      message: req.flash('info')
    })
  },

  indexApp: function(req, res, next) {
    res.render('app/app', {
      isAuthenticated: req.isAuthenticated(),
      user: req.user
    })
  }
}
