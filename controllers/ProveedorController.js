var pgp = require('pg-promise')();
var db = pgp("postgres://reto:reto123456789@172.16.16.72:5432/reto");

module.exports = {
  //funciones del controlador
  insert: function(req, res, next) 
  {
      var info = JSON.parse(req.body.info);
      if(info.codigo && info.nombre && info.origen)
      {
          db.one('INSERT INTO "proveedor"("codigo", "nombre", "origen") VALUES($1, $2, $3) RETURNING "id"', [info.codigo, info.nombre, info.origen])
          .then(data => {
              res.send({result: true});
          })
          .catch(error => {
              console.log (error);
              db.one('UPDATE "proveedor" SET "nombre"=$1, "origen"=$2 WHERE "codigo"=$3 RETURNING "id"', [info.nombre, info.origen, info.codigo])
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
      db.one ('SELECT "nombre", "origen" FROM "proveedor" WHERE "codigo"=$1', [req.query.codigo])
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
      db.any ('SELECT "codigo", "nombre", "origen" FROM "proveedor"')
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
    res.render('app/formularioproveedor', {
      isAuthenticated: req.isAuthenticated(),
      user: req.user
    });
  },

  cargaMasiva: function(req, res, next) {
    res.render('app/formularioproveedormasiva', {
      isAuthenticated: req.isAuthenticated(),
      user: req.user
    });
  }

}