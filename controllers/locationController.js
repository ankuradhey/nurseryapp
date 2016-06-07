/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var location = require('../models/location.js'),
        response = {'error': true, 'success': false, 'code': 501, 'message': 'Oops! some error occurred', errors: []},
validate = require('validate.js'),
        responseClass = function () {
            return {
                error: true,
                success: false,
                code: 501,
                message: 'Oops! Some error occurred',
                errors: []
            }
        }
;


module.exports = {
    getCountries: function (req, res) {
        location.getCountries(function (err, rows) {
            response = {'error': true, 'success': false, 'code': 501, 'message': 'Oops! some error occurred', errors: []};
            if (err)
                response.errors = err;
            else {
                response.countries = rows;
                response.success = true;
                response.error = false;
                response.message = 'success';
            }
            res.send(response);
        });
    },
    getCountry: function (req, res) {
        location.getCountry(req.params.countryId, function (err, rows) {
            response = {'error': true, 'success': false, 'code': 501, 'message': 'Oops! some error occurred', errors: []};
            if (err)
                response.errors = err;
            else {
                response.country = rows[0];
                response.success = true;
                response.error = false;
                response.message = 'success';
            }
            res.send(response);
        });
    },
    addCountry: function (req, res) {

        location.getCountryByName(req.body.country_name, function (err, rows) {
            response = {'error': true, 'success': false, 'code': 501, 'message': 'Oops! some error occurred', errors: []};
            if (err) {
                response.errors = err;
                res.send(response);
            } else {
                if (rows && rows.length) {
                    response.error = 'Country already exist';
                    res.send(response);
                } else {
                    location.addCountry(req.body, function (err, rows) {

                        if (err)
                            response.errors = err;
                        else {
                            response.success = true;
                            response.error = false;
                            response.message = 'success';
                        }
                        res.send(response);
                    });
                }
            }

        })

    },
    updateCountry: function (req, res) {
        location.getCountryByName(req.body.country_name, req.params.countryId, function (err, rows) {
            response = new responseClass;
            if (err) {
                response.errors = err;
                res.send(response);
            } else {
                if (rows && Object.keys(rows).length) {
                    response.message = 'Country name already exist';
                    res.send(response);
                } else {
                    location.updateCountry(req.body, req.params.countryId, function (err, rows) {
                        response = {'error': true, 'success': false, 'code': 501, 'message': 'Oops! some error occurred', errors: []};
                        if (err)
                            response.errors = err;
                        else {
                            response.success = true;
                            response.error = false;
                            response.message = 'success';
                        }
                        res.send(response);
                    });
                }
            }
        });
    },
    updateCountryStatus: function (req, res) {
        location.updateCountryStatus(req.body.country_status, req.params.countryId, function (err, rows) {
            response = {'error': true, 'success': false, 'code': 501, 'message': 'Oops! some error occurred', errors: []};
            if (err)
                response.errors = err;
            else {
                response.success = true;
                response.error = false;
                response.message = 'success';
            }
            res.send(response);
        });
    },
    deleteCountry: function (req, res) {
        location.deleteCountry(req.params.countryId, function (err, rows) {
            response = {'error': true, 'success': false, 'code': 501, 'message': 'Oops! some error occurred', errors: []};
            if (err)
                response.errors = err;
            else {
                response.success = true;
                response.error = false;
                response.message = 'success';
            }
            res.send(response);
        });
    },
    getStates: function (req, res) {
        var countryId = 0;

        if (req.params.hasOwnProperty('countryId'))
            countryId = req.params.countryId;

        if (countryId) {
            location.getStatesByCountry(countryId, function (err, rows) {
                response = {'error': true, 'success': false, 'code': 501, 'message': 'Oops! some error occurred', errors: []};
                if (err)
                    response.errors = err;
                else {
                    response.states = rows;
                    response.success = true;
                    response.error = false;
                    response.message = 'success';
                }
                res.send(response);
            })
        } else {
            location.getStates(function (err, rows) {
                response = {'error': true, 'success': false, 'code': 501, 'message': 'Oops! some error occurred', errors: []};
                if (err)
                    response.errors = err;
                else {
                    response.states = rows;
                    response.success = true;
                    response.error = false;
                    response.message = 'success';
                }
                res.send(response);
            })
        }
    },
    getState: function (req, res) {
        var stateId = req.params.stateId;
        location.getState(stateId, function (err, rows) {
            response = {'error': true, 'success': false, 'code': 501, 'message': 'Oops! some error occurred', errors: []};
            if (err)
                response.errors = err;
            else {
                response.state = rows[0];
                response.success = true;
                response.error = false;
                response.message = 'success';
            }
            res.send(response);
        })
    },
    updateState: function (req, res) {
        var stateId = req.params.stateId;
        location.getStateByName(req.body, function (err, rows) {
            response = new responseClass;
            if (err) {
                response.errors = err;
                res.send(response);
            }
            else if (rows && Object.keys(rows).length) {
                response.message = 'Record already exists';
                res.send(response)
            } else {
                location.updateState(req.body, stateId, function (err, rows) {
                    response = {'error': true, 'success': false, 'code': 501, 'message': 'Oops! some error occurred', errors: []};
                    if (err)
                        response.errors = err;
                    else {
                        response.success = true;
                        response.error = false;
                        response.message = 'success';
                    }
                    res.send(response);
                })
            }
        }, stateId);
    },
    updateStateStatus: function (req, res) {
        var stateId = req.params.stateId;
        location.updateStateStatus(req.body.state_status, stateId, function (err, rows) {
            response = {'error': true, 'success': false, 'code': 501, 'message': 'Oops! some error occurred', errors: []};
            if (err)
                response.errors = err;
            else {
                response.success = true;
                response.error = false;
                response.message = 'success';
            }
            res.send(response);
        })
    },
    addState: function (req, res) {
        location.getStateByName(req.body, function (err, rows) {
            response = new responseClass;
            if (err) {
                response.errors = err;
                res.send(response);
            }
            else if (rows && rows.length) {
                response.message = 'Record already exists';
                res.send(response)
            } else {
                location.addState(req.body, function (err, rows) {
                    if (err) {
                        response.errors = err;
                        res.send(response);
                    }
                    else {
                        response.success = true;
                        response.error = false;
                        response.message = 'success';
                    }
                    res.send(response);
                })
            }
        })

    },
    deleteState: function (req, res) {
        location.deleteState(req.params.stateId, function (err, rows) {
            if (err) {
                response.errors = err;
                res.send(response);
            }
            else {
                response.success = true;
                response.error = false;
                response.message = 'success';
            }
            res.send(response);
        })

    },
    addCity: function (req, res) {
        location.getCityByName(req.body, function (err, rows) {
            response = new responseClass;
            if (err) {
                response.errors = err;
                res.send(response);
            }
            else if (rows && rows.length) {
                response.message = 'Record already exists';
                res.send(response)
            } else {
                location.addCity(req.body, function (err, rows) {
                    if (err) {
                        response.errors = err;
                    }
                    else {
                        response.success = true;
                        response.error = false;
                        response.message = 'success';
                    }
                    res.send(response);

                })
            }
        })

    },
    addArea: function (req, res) {
        location.getAreaByName(req.body, function (err, rows) {
            response = new responseClass;
            if (err) {
                response.errors = err;
                res.send(response);
            }
            else if (rows && rows.length) {
                response.message = 'Record already exists';
                res.send(response)
            } else {
                location.addArea(req.body, function (err, rows) {
                    if (err) {
                        response.errors = err;
                        res.send(response);
                    }
                    else {
                        response.success = true;
                        response.error = false;
                        response.message = 'success';
                    }
                    res.send(response);
                })
            }
        })

    },
    addZone: function (req, res) {
        location.getZoneByName(req.body, function (err, rows) {
            response = new responseClass;
            if (err) {
                response.errors = err;
                res.send(response);
            }
            else if (rows && Object.keys(rows).length) {
                response.message = 'Record already exists';
                res.send(response)
            } else {
                location.addZone(req.body, function (err, rows) {
                    if (err) {
                        response.errors = err;
                        res.send(response);
                    }
                    else {
                        response.success = true;
                        response.error = false;
                        response.message = 'success';
                    }
                    res.send(response);
                })
            }
        })

    },
    updateCity: function (req, res) {
        location.getCityByName(req.body, function (err, rows) {
            response = new responseClass;
            if (err) {
                response.errors = err;
                res.send(response);
            }
            else if (rows && Object.keys(rows).length) {
                response.message = 'Record already exists';
                res.send(response)
            } else {
                location.updateCity(req.body, req.params.cityId, function (err, rows) {
                    if (err) {
                        response.errors = err;
                    }
                    else {
                        response.success = true;
                        response.error = false;
                        response.message = 'success';
                    }
                    res.send(response);
                })
            }
        }, req.params.cityId)

    },
    deleteCity: function (req, res) {
                location.deleteCity(req.params.cityId, function (err, rows) {
                    response = new responseClass;
                    if (err) {
                        response.errors = err;
                    }
                    else {
                        response.success = true;
                        response.error = false;
                        response.message = 'success';
                    }
                    res.send(response);
                })
    },
    updateCityStatus: function (req, res) {
        location.updateCityStatus(req.body.city_status, req.params.cityId, function (err, rows) {
            if (err) {
                response.errors = err;
            }
            else {
                response.success = true;
                response.error = false;
                response.message = 'success';
            }
            res.send(response);
        })
    },
    updateArea: function (req, res) {
        location.getAreaByName(req.body.area_name, function (err, rows) {
            response = new responseClass;
            if (err) {
                response.errors = err;
                res.send(response);
            }
            else if (rows && rows.length) {
                response.message = 'Record already exists';
                res.send(response)
            } else {
                location.updateArea(req.body, req.params.areaId, function (err, rows) {
                    if (err) {
                        response.errors = err;
                        res.send(response);
                    }
                    else {
                        response.success = true;
                        response.error = false;
                        response.message = 'success';
                    }
                    res.send(response);
                })
            }
        }, req.params.cityId)

    },
    updateZone: function (req, res) {
        location.getZoneByName(req.body.zone_name, function (err, rows) {
            response = new responseClass;
            if (err) {
                response.errors = err;
                res.send(response);
            }
            else if (rows && rows.length) {
                response.message = 'Record already exists';
                res.send(response)
            } else {
                location.updateZone(req.body, req.params.zoneId, function (err, rows) {
                    if (err) {
                        response.errors = err;
                        res.send(response);
                    }
                    else if (rows.affectedRows) {
                        response.success = true;
                        response.error = false;
                        response.message = 'success';
                    } else {
                        response.message = 'Oops! Some unexpected error occurred';
                    }
                    res.send(response);
                })
            }
        }, req.params.cityId)

    },
    getCities: function (req, res) {
        var stateId = 0;

        if (req.params.hasOwnProperty('stateId'))
            stateId = req.params.stateId;

        if (stateId) {
            location.getCitiesByState(stateId, function (err, rows) {
                response = {'error': true, 'success': false, 'code': 501, 'message': 'Oops! some error occurred', errors: []};
                if (err)
                    response.errors = err;
                else {
                    response.cities = rows;
                    response.success = true;
                    response.error = false;
                    response.message = 'success';
                }
                res.send(response);
            })
        } else {
            location.getCities(function (err, rows) {
                response = {'error': true, 'success': false, 'code': 501, 'message': 'Oops! some error occurred', errors: []};
                if (err)
                    response.errors = err;
                else {
                    response.cities = rows;
                    response.success = true;
                    response.error = false;
                    response.message = 'success';
                }
                res.send(response);
            })
        }
    },
    getCity: function (req, res) {

        location.getCity(req.params.cityId, function (err, rows) {
            response = new responseClass;
            if (err)
                response.errors = err;
            else {
                response.city = rows[0];
                response.success = true;
                response.error = false;
                response.message = 'success';
            }
            res.send(response);
        })
    },
    getAreas: function (req, res) {
        var cityId = 0;

        if (req.params.hasOwnProperty('cityId'))
            cityId = req.params.cityId;

        if (cityId) {
            location.getAreaByCity(cityId, function (err, rows) {
                response = {'error': true, 'success': false, 'code': 501, 'message': 'Oops! some error occurred', errors: []};
                if (err)
                    response.errors = err;
                else {
                    response.areas = rows;
                    response.success = true;
                    response.error = false;
                    response.message = 'success';
                }
                res.send(response);
            })
        } else {
            location.getAreas(function (err, rows) {
                response = {'error': true, 'success': false, 'code': 501, 'message': 'Oops! some error occurred', errors: []};
                if (err)
                    response.errors = err;
                else {
                    response.areas = rows;
                    response.success = true;
                    response.error = false;
                    response.message = 'success';
                }
                res.send(response);
            })
        }
    },
    getArea: function (req, res) {
        location.getArea(req.params.areaId, function (err, rows) {
            response = {'error': true, 'success': false, 'code': 501, 'message': 'Oops! some error occurred', errors: []};
            if (err)
                response.errors = err;
            else {
                response.area = rows[0];
                response.success = true;
                response.error = false;
                response.message = 'success';
            }
            res.send(response);
        })
    },
    getZones: function (req, res) {
        var areaId = 0;

        if (req.params.hasOwnProperty('areaId'))
            areaId = req.params.areaId;

        if (areaId) {
            location.getZonesByArea(areaId, function (err, rows) {
                response = {'error': true, 'success': false, 'code': 501, 'message': 'Oops! some error occurred', errors: []};
                if (err)
                    response.errors = err;
                else {
                    response.zones = rows;
                    response.success = true;
                    response.error = false;
                    response.message = 'success';
                }
                res.send(response);
            })
        } else {
            location.getZones(function (err, rows) {
                response = {'error': true, 'success': false, 'code': 501, 'message': 'Oops! some error occurred', errors: []};
                if (err)
                    response.errors = err;
                else {
                    response.zones = rows;
                    response.success = true;
                    response.error = false;
                    response.message = 'success';
                }
                res.send(response);
            })
        }
    },
    getZone: function (req, res) {
        location.getZone(req.params.zoneId, function (err, rows) {
            response = {'error': true, 'success': false, 'code': 501, 'message': 'Oops! some error occurred', errors: []};
            if (err)
                response.errors = err;
            else {
                response.zone = rows[0];
                response.success = true;
                response.error = false;
                response.message = 'success';
            }
            res.send(response);
        })
    }
};