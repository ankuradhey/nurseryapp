
var express = require('express');
var router = express.Router();
 
var auth = require('./auth.js');
var userController = require('../controllers/userController.js');
var schoolController = require('../controllers/schoolController.js');
var dashboardController = require('../controllers/dashboardController.js');
var locationController = require('../controllers/locationController.js');
//var user = require('./users.js');
 
/*
 * Routes that can be accessed by any one
 */
router.post('/login', auth.login);
router.post('/sociallogin', auth.socialLogin);
router.post('/register', userController.register);
//router.post('/sociallogin',auth.);
/*
 * Routes that can be accessed only by authenticated users
 */
router.get('/api/v1/schools', schoolController.getAll);
router.get('/api/v1/user/:userId', userController.getOne);

/*
 * Routes that can be accessed by admin
 */

router.get('/adminapi/v1/schools',schoolController.getAll);
router.get('/adminapi/v1/dashboard',dashboardController.getCount);
router.get('/adminapi/v1/boards',schoolController.getBoards);
router.get('/adminapi/v1/country',locationController.getCountries);
router.get('/adminapi/v1/state/:countryId',locationController.getStates);
router.get('/adminapi/v1/state',locationController.getStates);
router.get('/adminapi/v1/city/:stateId',locationController.getCities);
router.get('/adminapi/v1/city',locationController.getCities);
router.get('/adminapi/v1/area/:cityId',locationController.getAreas);
router.get('/adminapi/v1/area',locationController.getAreas);
router.get('/adminapi/v1/zone/:areaId',locationController.getZones);
router.get('/adminapi/v1/zone',locationController.getZones);

module.exports = router;