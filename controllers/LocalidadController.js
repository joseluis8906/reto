module.exports = {
  //funciones del controlador
  insert: function(req, res, next) {
      console.log(req.body.info);
      res.send({result: true});
  }
}