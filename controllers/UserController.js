var pgp = require('pg-promise')();
var db = pgp("postgres://postgres:joseluis890609@172.16.16.72:5432/reto");

module.exports = {
  prueba: function(req, res, next) {
    db.one('SELECT "correo", "contraseña", "nombre", "apellido", "codigo", "rol" FROM "usuario" WHERE "correo"='+"'jkhfksjafda'")
    //db.one('SELECT version()')
      .then(function(data) {
        res.send(data);
      })
      .catch(function(error) {
        res.send("vacio")
      });
  }
}
