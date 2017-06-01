<<<<<<< HEAD
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
=======
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
>>>>>>> 0f1fdb3e58c42f8f3b73db170fe9178d348a1e30
