var express = require('express');
var router = express.Router();
var passport = require('passport');
var controllers = require('controllers');

router.get('/', controllers.HomeController.index);

module.exports = router;
