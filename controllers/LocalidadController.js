var pgp = require('pg-promise')();
var db = pgp("postgres://reto:reto123456789@127.0.0.1:5432/reto");

module.exports = {
  //funciones del controlador
  insert: function(req, res, next)
  {
      var info = JSON.parse(req.body.info);
      if(info.codigo && info.nombre && info.poblacion && info.altitud && info.temperatura && info.superficie && info.fundacion)
      {
          db.one('INSERT INTO "localidad"("codigo", "nombre", "poblacion", "altitud", "temperatura", "superficie", "fundacion")VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING "id"', [info.codigo, info.nombre, info.poblacion, info.altitud, info.temperatura, info.superficie, info.fundacion])
          .then(data => {
              res.send({result: true});
          })
          .catch(error => {
              console.log (error);
              db.one('UPDATE "localidad" SET "nombre"=$1, "poblacion"=$2, "altitud"=$3, "temperatura"=$4, "superficie"=$5, "fundacion"=$6 WHERE "codigo"=$7 RETURNING "id"', [info.nombre, info.poblacion, info.altitud, info.temperatura, info.superficie, info.fundacion, info.codigo])
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
      db.one ('SELECT "nombre", "poblacion", "altitud", "temperatura", "superficie", "fundacion" FROM "localidad" WHERE "codigo"=$1', [req.query.codigo])
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
    res.render('app/formulariolocalidad', {
      isAuthenticated: req.isAuthenticated(),
      user: req.user
    });
  },

  cargaMasiva: function(req, res, next) {
    res.render('app/formulariolocalidadmasiva', {
      isAuthenticated: req.isAuthenticated(),
      user: req.user
    });
  }

}
