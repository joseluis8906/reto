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



//localidad
router.post('/app/localidad/insert', AuthMiddleware.isLogged, controllers.LocalidadController.insert);
router.get('/app/municipio', AuthMiddleware.isLogged, controllers.LocalidadController.formulario);
router.get('/app/municipio-file', AuthMiddleware.isLogged, controllers.LocalidadController.cargaMasiva);


router.get('/app/localidad/select', controllers.LocalidadController.select);

router.get('/app/proveedores/insert', controllers.ProveedorController.insert);
router.get('/app/proveedores/select', controllers.ProveedorController.select);
router.get('/app/proveedores', AuthMiddleware.isLogged, controllers.ProveedorController.formulario);

module.exports = router;
