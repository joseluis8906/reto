var express = require('express');
var router = express.Router();
var passport = require('passport');
var controllers = require('.././controllers');

router.get('/', controllers.HomeController.index);
//router.post('/auth/signin', controllers.UserControllers.isLogin);
router.post('/auth/signin', passport.authenticate('local', {
    successRedirect: '/app/',
    failureRedirect: '/',
    failureFlash: true
}));

module.exports = router;
