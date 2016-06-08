
var express = require('express');
var router = express.Router();
 
var auth = require('./auth.js');
var userController = require('../controllers/userController.js');
var schoolController = require('../controllers/schoolController.js');
var dashboardController = require('../controllers/dashboardController.js');
var locationController = require('../controllers/locationController.js');
var reviewController = require('../controllers/reviewController.js');
var subscriptionController = require('../controllers/subscriptionController.js');
//var user = require('./users.js');
 
/*
 * Routes that can be accessed by any one
 */
router.post('/login', auth.login);
router.post('/admin/login', auth.adminLogin);
router.post('/sociallogin', auth.socialLogin);
router.post('/register', userController.register);
//router.post('/sociallogin',auth.);
/*
 * Routes that can be accessed only by authenticated users
 */
router.get('/api/v1/schools', schoolController.getAllActive);
router.get('/api/v1/user/:userId', userController.getOne);

/*
 * Routes that can be accessed by admin
 */

router.get('/adminapi/v1/schools',schoolController.getAll);
router.get('/adminapi/v1/school/:schoolId',schoolController.getOne);
router.post('/adminapi/v1/school',schoolController.addSchool);
router.put('/adminapi/v1/school/:schoolId',schoolController.updateSchool);
router.delete('/adminapi/v1/school/:schoolId',schoolController.deleteSchool);
router.get('/adminapi/v1/dashboard',dashboardController.getCount);

router.get('/adminapi/v1/boards',schoolController.getBoards);
router.post('/adminapi/v1/board',schoolController.addBoard);
router.get('/adminapi/v1/board/:boardId',schoolController.getBoard);
router.delete('/adminapi/v1/board/:boardId',schoolController.deleteBoard);
router.put('/adminapi/v1/board/:boardId',schoolController.updateBoard);

router.get('/adminapi/v1/country',locationController.getCountries);
router.post('/adminapi/v1/country',locationController.addCountry);
router.get('/adminapi/v1/country/:countryId',locationController.getCountry);
router.put('/adminapi/v1/country/:countryId',locationController.updateCountry);
router.patch('/adminapi/v1/country/:countryId',locationController.updateCountryStatus);
router.delete('/adminapi/v1/country/:countryId',locationController.deleteCountry);

router.get('/adminapi/v1/state/:countryId',locationController.getStates);
router.get('/adminapi/v1/state',locationController.getStates);
router.get('/adminapi/v1/state/stateid/:stateId',locationController.getState);
router.put('/adminapi/v1/state/:stateId',locationController.updateState);
router.patch('/adminapi/v1/state/:stateId',locationController.updateStateStatus);
router.post('/adminapi/v1/state',locationController.addState);
router.delete('/adminapi/v1/state/:stateId',locationController.deleteState);


router.get('/adminapi/v1/city/:stateId',locationController.getCities);
router.get('/adminapi/v1/city/cityid/:cityId',locationController.getCity);
router.get('/adminapi/v1/city',locationController.getCities);
router.put('/adminapi/v1/city/:cityId',locationController.updateCity);
router.patch('/adminapi/v1/city/:cityId',locationController.updateCityStatus);
router.post('/adminapi/v1/city',locationController.addCity);
router.delete('/adminapi/v1/city/:cityId',locationController.deleteCity);


router.get('/adminapi/v1/area/:cityId',locationController.getAreas);
router.get('/adminapi/v1/area/areaid/:areaId',locationController.getArea);
router.get('/adminapi/v1/area',locationController.getAreas);
router.put('/adminapi/v1/area/:areaId',locationController.updateArea);
router.patch('/adminapi/v1/area/:areaId',locationController.updateAreaStatus);
router.post('/adminapi/v1/area',locationController.addArea);
router.delete('/adminapi/v1/area/:areaId',locationController.deleteArea);


router.get('/adminapi/v1/zone/:areaId',locationController.getZones);
router.get('/adminapi/v1/zone',locationController.getZones);
router.get('/adminapi/v1/zone/zoneid/:zoneId',locationController.getZone);
router.put('/adminapi/v1/zone/:zoneId',locationController.updateZone);
router.patch('/adminapi/v1/zone/:zoneId',locationController.updateZoneStatus);
router.post('/adminapi/v1/zone',locationController.addZone);
router.delete('/adminapi/v1/zone/:zoneId',locationController.deleteZone);


router.get('/adminapi/v1/parents',userController.getParents);
router.get('/adminapi/v1/parent/:userId',userController.getOne);
router.post('/adminapi/v1/parent',userController.addParent);
router.put('/adminapi/v1/parent/:parentId',userController.updateParent);
router.delete('/adminapi/v1/parent/:parentId',userController.deleteParent);

router.get('/adminapi/v1/schooltypes',schoolController.getSchoolTypes);
router.get('/adminapi/v1/schooltype/:schoolTypeId',schoolController.getSchoolType);
router.post('/adminapi/v1/schooltype',schoolController.addSchoolType);
router.put('/adminapi/v1/schooltype/:schoolTypeId',schoolController.updateSchoolType);
router.patch('/adminapi/v1/schooltype/status/:schoolTypeId',schoolController.updateSchoolTypeStatus);
router.delete('/adminapi/v1/schooltype/:schoolTypeId',schoolController.deleteSchoolType);

router.get('/adminapi/v1/reviews',reviewController.getReviews);
router.put('/adminapi/v1/review/:reviewId',reviewController.updateReview);
router.delete('/adminapi/v1/review/:reviewId',reviewController.deleteReview);

router.get('/adminapi/v1/subscriptions',subscriptionController.getAll);
router.get('/adminapi/v1/subscription/:subscriptionId',subscriptionController.getOne);

router.get('/adminapi/v1/mediums',schoolController.getMediums);
router.get('/adminapi/v1/medium/:mediumId',schoolController.getMedium);
router.post('/adminapi/v1/medium',schoolController.addMedium);
router.put('/adminapi/v1/medium/:mediumId',schoolController.updateMedium);
router.delete('/adminapi/v1/medium/:mediumId',schoolController.deleteMedium);
router.patch('/adminapi/v1/medium/status/:mediumId',schoolController.updateMediumStatus);

module.exports = router;