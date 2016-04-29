
var express = require('express');
var router = express.Router();
 
var auth = require('./auth.js');
var userController = require('./controller/userController.js');
var schoolController = require('./controller/schoolController.js');
//var user = require('./users.js');
 
/*
 * Routes that can be accessed by any one
 */
router.post('/login', auth.login);
router.post('/register', userController.register);

/*
 * Routes that can be accessed only by authenticated users
 */
router.get('/api/v1/schools', schoolController.getAll);
 