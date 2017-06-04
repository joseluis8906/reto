var pgp = require('pg-promise')();
var db = pgp("postgres://reto:reto123456789@127.0.0.1:5432/reto");

module.exports = {
  //funciones del controlador
  insert: function(req, res, next)
  {
      var info = JSON.parse(req.body.info);
      if(info.codigo && info.nombre)
      {
          db.one('INSERT INTO "producto"("codigo", "nombre") VALUES($1, $2) RETURNING "id"', [info.codigo, info.nombre])
          .then(data => {
              res.send({result: true});
          })
          .catch(error => {
              db.one('UPDATE "producto" SET "nombre"=$1 WHERE "codigo"=$2 RETURNING "id"', [info.nombre, info.codigo])
              .then(data => {
                  res.send({result: true});
              })
              .catch(error => {
                  console.log (error);
                  res.send({result: false});
              });
          });
      }
      else
      {
          console.log ("datos incompletos");
          res.send({result: false});
      }
  },

  select: function(req, res, next)
  {
      db.one ('SELECT "nombre" FROM "producto" WHERE "codigo"=$1', [req.query.codigo])
      .then(function(data)
      {
          res.send (JSON.stringify(data));
      })
      .catch(function(error)
      {
          res.send ({result: false});
      })
  },

  select_all: function(req, res, next)
  {
        db.any ('SELECT "codigo", "nombre" FROM "producto" ORDER BY "codigo" ASC')
        .then(function(data)
        {
              res.send (JSON.stringify(data));
        })
        .catch(function(error)
        {
            res.send ({result: false});
        })
  },

  formulario: function(req, res, next) {
    res.render('app/formularioproducto', {
      isAuthenticated: req.isAuthenticated(),
      user: req.user
    });
  },

  cargaMasiva: function(req, res, next) {
    res.render('app/formularioproductomasiva', {
      isAuthenticated: req.isAuthenticated(),
      user: req.user
    });
  }
}
