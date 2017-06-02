var pgp = require('pg-promise')();
var db = pgp("postgres://postgres:joseluis890609@172.16.16.72:5432/reto");

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
