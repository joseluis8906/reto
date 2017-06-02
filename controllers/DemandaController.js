var pgp = require('pg-promise')();
var db = pgp("postgres://reto:reto123456789@172.16.16.72:5432/reto");

module.exports = {
  //funciones del controlador
  insert: function(req, res, next) 
  {
      var info = JSON.parse(req.body.info);
      if(info.codigo_localidad && info.codigo_producto && info.promedio_consumo)
      {
          db.one('INSERT INTO "producto_localidad"("localidad_id", "producto_id", "promedio_consumo") SELECT "localidad"."id", "producto"."id", $1 FROM "localidad" INNER JOIN "producto" ON "localidad"."codigo"=$2 AND "producto"."codigo"=$3 RETURNING "id"', [info.promedio_consumo, info.codigo_localidad, info.codigo_producto])
          .then(data => {
              res.send({result: true});
          })
          .catch(error => {
              db.one('UPDATE "producto_localidad" SET "promedio_consumo"=$1 FROM (SELECT "producto"."id" AS "producto_id", "localidad"."id" AS "localidad_id" FROM "producto" INNER JOIN "localidad" ON "producto"."codigo"=$2 AND "localidad"."codigo"=$3) AS "all" WHERE "producto_localidad"."producto_id"="all"."producto_id" AND "producto_localidad"."localidad_id"="all"."localidad_id" RETURNING "id"', [info.promedio_consumo, info.codigo_producto, info.codigo_localidad])
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
      db.one ('SELECT "promedio_consumo" FROM "producto_localidad" INNER JOIN "localidad" ON "producto_localidad"."localidad_id"="localidad"."id" INNER JOIN "producto" ON "producto_localidad"."producto_id"="producto"."id" AND "producto"."codigo"=$1 AND "localidad"."codigo"=$2', [req.query.producto_codigo, req.query.localidad_codigo])
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
    res.render('app/formulariodemanda', {
      isAuthenticated: req.isAuthenticated(),
      user: req.user
    });
  },

  cargaMasiva: function(req, res, next) {
    res.render('app/formulariodemandamasiva', {
      isAuthenticated: req.isAuthenticated(),
      user: req.user
    });
  }
}