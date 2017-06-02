<<<<<<< HEAD
var express = require('express');
var router = express.Router();
var passport = require('passport');
var controllers = require('controllers');

router.get('/', controllers.HomeController.index);

module.exports = router;
=======
var express = require('express');
var router = express.Router();
var passport = require('passport');
var controllers = require('.././controllers');
var AuthMiddleware = require('.././middleware/auth');

//index
router.get('/', AuthMiddleware.logged, controllers.HomeController.index);
//registrarme
router.get('/registrarme', AuthMiddleware.logged, controllers.HomeController.registro);


//validar inicio de sesion
router.post('/auth/signin', passport.authenticate('local', {
    successRedirect: '/app/',
    failureRedirect: '/',
    failureFlash: true
}));
//registro usuario
router.post('/auth/signup', controllers.UserController.signup);

router.get('/auth/logout', controllers.UserController.logout);

router.get('/verify', controllers.UserController.verificar);
router.get('/app', AuthMiddleware.isLogged, controllers.HomeController.indexApp);

module.exports = router;
>>>>>>> 0871a72ce3898b1c45ab0b56023a13f488287701
