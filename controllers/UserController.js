var pgp = require('pg-promise')();
var db = pgp("postgres://reto:reto123456789@172.16.16.72:5432/reto");
var bcrypt = require('bcryptjs');
var moment = require('moment');
var util = require('.././util/util.js');

module.exports = {
  prueba: function(req, res, next) {
    db.one('SELECT "correo", "contraseña", "nombre", "apellido", "codigo", "rol" FROM "usuario" WHERE "correo"=' + "'jkhfksjafda'")
      //db.one('SELECT version()')
      .then(function(data) {
        res.send(data);
      })
      .catch(function(error) {
        res.send("vacio")
      });
  },

  signup: function(req, res, next) {
    var salt = bcrypt.genSaltSync(10);
    var password = bcrypt.hashSync(req.body.password, salt);

    var code = util.random(4);
    var mensaje = util.msjRegistro(req.body.email, code);

    db.one('INSERT INTO "usuario" ("correo", "contraseña", "nombre", "apellido", "codigo", "rol") VALUES ($1,$2,$3,$4,$5,$6) RETURNING "id"', [req.body.email, password, req.body.nombre, req.body.apellido, code, 1])
      .then(function(data) {
        if (data.id > 0) {
          var mail = util.sendMail(req.body.email, "Registro Agro Report", mensaje, res);
          req.flash('info', 'Verifique su bandeja de entrada de su correo, para activar la cuenta.');
          return res.redirect('/');
        }
      })
      .catch(function(error) {
        console.log(error.code);
        if (error.code == 23505) {
          req.flash('info', 'Ya existe una cuenta creada con el correo ' + req.body.email);
          res.redirect('/registrarme');
        } else {
          return util.errorServidor(res)
        }
      })

  },

  verificar: function(req, res, next) {
    if (req.query.email != undefined || req.query.code != undefined) {
      db.one('SELECT "id" FROM "usuario" WHERE "correo"=$1 AND "codigo"=$2', [req.query.email, req.query.code])
        .then(function(data) {
          if (data.id > 0) {
            db.none('UPDATE "usuario" SET "codigo"=$1', ["full"])
              .then(() => {
                req.flash('verify', 'Cuenta activada correctamente');
                return res.redirect('/');
              })
              .catch(error => {
                req.flash('verify', 'Codigo de verificacion incorrecto.');
                return res.render('verificar', {
                  message: req.flash('verify')
                });
              })
          }
        })
        .catch(function(error) {
          if (error.code == 42703) {
            req.flash('verify', 'No se encuentra ningun registro asociado al correo ' + req.query.email);
            return res.render('verificar', {
              message: req.flash('verify')
            });
          }

        })
    }
  },

  logout: function(req, res, next) {
        req.logout();
        res.redirect('/');
    },


}
