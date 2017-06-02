module.exports = {

    //redirecciona a login si la sesion expiro
    isLogged: function(req, res, next) {
        if (req.isAuthenticated()) {
            next();
        } else {
            res.redirect('/');
        }
    },

    //redirecciona a la app si trata entrar alguna pagina general
    logged: function(req, res, next){
      if(req.isAuthenticated()){
        res.redirect('/app');
      }else{
        next();
      }
    }
}
