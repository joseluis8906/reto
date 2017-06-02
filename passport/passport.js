var LocalEstrategia = require('passport-local').Strategy;
var pgp = require('pg-promise')();
var db = pgp("postgres://reto:reto123456789@172.16.16.72:5432/reto");
var bcrypt = require('bcryptjs');
var moment = require('moment');

module.exports = function(passport) {

  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(obj, done) {
    done(null, obj);
  });

  passport.use(new LocalEstrategia({
    passReqToCallback: true
  }, function(req, email, password, done) {
    db.one('SELECT "correo", "contraseña", "nombre", "apellido", "codigo", "rol" FROM "usuario" WHERE "correo"=$1 AND "codigo"=$2', [email, 'full'])
      .then(function(data) {

        var result = bcrypt.compareSync(password, data['contraseña']);

        if (result) {

          return done(null, {
            correo: data['correo'],
            nombre: data['nombre'],
            apellido: data['apellido'],
            rol: data['rol']
          });

        }
      })
      .catch(function(error) {
        console.log("esto " + error.code);
        if (error.code == 42703) {
          return done(null, false, req.flash('authmessage', 'Cuenta no activada o datos incorrectos'));
        } else {
          /*var error = {
            status: 500,
            message: 'Parece que tenemos problemas con el servidor, tu solicitud no pudo ser procesada.'
          };*/
          return done(error);
        }


      })
  }))

}
