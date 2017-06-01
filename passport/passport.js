var LocalEstrategia = require('passport-local').Strategy;
var pgp = require('pg-promise')();
var db = pgp("postgres://postgres:joseluis890609@172.16.16.72:5432/reto");
var bcrypt = require('bcryptjs');
var moment = require('moment');

module.exports = function(passport){

  passport.serializeUser(function(user, done) {
        done(null, user);
    });

    passport.deserializeUser(function(obj, done) {
        done(null, obj);
    });

  passport.use(new LocalEstrategia({
    passReqToCallback: true
  }, function(req, email, password, done) {
    db.one('SELECT "correo", "contraseña", "nombre", "apellido", "codigo", "rol" FROM "usuario" WHERE "correo"="' + email + '"')
      .then(function(data) {
        console.log(data);
      })
      .catch(function(error) {
        /*var error = {
          status: 500,
          message: 'Parece que tenemos problemas con el servidor, tu solicitud no pudo ser procesada.'
        };
        return done(error);*/
        return done(null, false, req.flash('authmessage', 'Cuenta no activada o datos incorrectos'));
      })
  }))

}
