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

router.get('/', controllers.HomeController.index);
router.post('/auth/signin', controllers.UserControllers.isLogin);

module.exports = router;
>>>>>>> 0871a72ce3898b1c45ab0b56023a13f488287701
