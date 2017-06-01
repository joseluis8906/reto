var LocalEstrategia = require('passport-local').Strategy;
var pgp = require('pg-promise');
var db = pgp("postgres://reto:password@172.16.16.72:5432/reto");
var bcrypt = require('bcryptjs');
var moment = require('moment');

module.exports = {
  passport.serializeUser(function(user, done){
    done(null, user);
  });

  passport.deserializeUser(function(obj, done){
    done(null, obj);
  });

  passport.use(new LocalEstrategia({
    passReqToCallback: true
  }, function(req, email, password, done){
    
  }))

}
