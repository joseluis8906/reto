var express = require('express');
var router = express.Router();
var passport = require('passport');
var controllers = require('../controllers');
//var AuthMiddleware = require('.././middleware/auth');

router.get('/', controllers.HomeController.index);
