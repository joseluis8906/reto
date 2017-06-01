module.exports = {
  //funciones del controlador
  index: function(req, res, next) {
<<<<<<< HEAD
    res.render('login', 
    {
        message: req.flash('info'),
        authmessage: req.flash('authmessage'),
        verify: req.flash('verify')
    });
=======
    res.render('login', {
            message: req.flash('info'),
            authmessage: req.flash('authmessage'),
            verify: req.flash('verify')
        });
>>>>>>> 4befa4dd08d1aa5ee204cce460e5a61f5362a0ef
  }
}