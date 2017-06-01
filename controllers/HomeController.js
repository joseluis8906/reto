module.exports = {
  //funciones del controlador
  index: function(req, res, next) {
    res.render('login', {
            message: req.flash('info'),
            authmessage: req.flash('authmessage'),
            verify: req.flash('verify')
        });
  }
}
