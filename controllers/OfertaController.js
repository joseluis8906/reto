var pgp = require('pg-promise')();
var db = pgp("postgres://reto:reto123456789@127.0.0.1:5432/reto");

module.exports = {
  //funciones del controlador
  insert: function(req, res, next)
  {
      var info = JSON.parse(req.body.info);
      console.log(info);
      if(info.origen && info.cantidad && info.precio && info.embalaje && info.proveedor_codigo && info.producto_codigo)
      {
          db.one('INSERT INTO "proveedor_producto"("proveedor_id", "producto_id", "origen", "cantidad", "precio", "embalaje") SELECT "proveedor"."id", "producto"."id", $1, $2, $3, $4 FROM "proveedor" INNER JOIN "producto" ON "proveedor"."codigo"=$5 AND "producto"."codigo"=$6 RETURNING "id";', [info.origen, info.cantidad, info.precio, info.embalaje, info.proveedor_codigo, info.producto_codigo])
          .then(data => {
              res.send({result: true});
          })
          .catch(error => {
              db.one('UPDATE "proveedor_producto" SET "origen"=$1, "cantidad"=$2, "precio"=$3, "embalaje"=$4 FROM (SELECT "producto"."id" AS "producto_id", "proveedor"."id" AS "proveedor_id" FROM "producto" INNER JOIN "proveedor" ON "producto"."codigo"=$5 AND "proveedor"."codigo"=$6) AS "all" WHERE "proveedor_producto"."producto_id"="all"."producto_id" AND "proveedor_producto"."proveedor_id"="all"."proveedor_id" RETURNING "id"', [info.origen, info.cantidad, info.precio, info.embalaje, info.producto_codigo, info.proveedor_codigo])
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
      db.one ('SELECT "origen", "cantidad", "precio", "embalaje" FROM "proveedor_producto" INNER JOIN "proveedor" ON "proveedor_producto"."proveedor_id"="proveedor"."id" INNER JOIN "producto" ON "proveedor_producto"."producto_id"="producto"."id" AND "producto"."codigo"=$1 AND "proveedor"."codigo"=$2', [req.query.producto_codigo, req.query.proveedor_codigo])
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
      db.any ('SELECT "proveedor"."nombre" AS "proveedor_nombre", "producto"."nombre" AS "producto_nombre", "proveedor_producto"."cantidad" FROM "proveedor" INNER JOIN "proveedor_producto" ON "proveedor"."id"="proveedor_producto"."proveedor_id" AND "proveedor"."codigo"=$1 INNER JOIN "producto" ON "producto"."id"="proveedor_producto"."producto_id"', [req.query.proveedor_codigo])
      .then(function (data)
      {
            res.send (JSON.stringify(data));
      })
      .catch(function(error)
      {
            res.send ({result: false});
      })
  },


  formulario: function(req, res, next) {
    res.render('app/formulariooferta', {
      isAuthenticated: req.isAuthenticated(),
      user: req.user
    });
  },

  cargaMasiva: function(req, res, next) {
    res.render('app/formularioofertamasiva', {
      isAuthenticated: req.isAuthenticated(),
      user: req.user
    });
  }
}
