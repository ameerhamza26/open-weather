angular.module('WeatherApp.services', [])

.service('WeatherDetails', function($http, $q) {
    this.getWindSpeed = function(params) {
        var def = $q.defer();
        $http.get('assets/wind-speed.json', {}).success(function(res) {
                for (var key in res.en) {
                    if (res.en.hasOwnProperty(key)) {
                        if (params >= res.en[key].speed_interval[0] && params <= res.en[key].speed_interval[1]) {
                            def.resolve(key);
                        }
                    }
                }

            })
            .error(function(err) {
                def.reject(err);
            })
        return def.promise;
    }

    this.getWindDirection = function(params) {
        var def = $q.defer();
        $http.get('assets/wind-direction.json', {}).success(function(res) {
                for (var key in res.en) {
                    if (res.en.hasOwnProperty(key)) {
                        if (params >= res.en[key].deg_interval[0] && params <= res.en[key].deg_interval[1]) {
                            def.resolve(key);
                        }
                    }
                }

            })
            .error(function(err) {
                def.reject(err);
            })
        return def.promise;
    }

    this.getCloudsData = function(params) {
        var def = $q.defer();
        $http.get('assets/clouds-data.json', {}).success(function(res) {
                for (var key in res.en) {
                    if (res.en.hasOwnProperty(key)) {
                        if (params >= res.en[key].min && params <= res.en[key].max) {
                            def.resolve(key);
                        }
                    }
                }

            })
            .error(function(err) {
                def.reject(err);
            })
        return def.promise;
    }
})

.service('LocationService', function($q, $http) {
    var autocompleteService = new google.maps.places.AutocompleteService();
    var detailsService = new google.maps.places.PlacesService(document.createElement("input"));
    return {
        searchAddress: function(input) {
            var deferred = $q.defer();

            if (isNaN(input[0])) {
                autocompleteService.getPlacePredictions({
                    input: input
                }, function(result, status) {
                    if (status == google.maps.places.PlacesServiceStatus.OK) {
                        deferred.resolve(result);
                    } else {
                        deferred.reject(status)
                    }
                });
            } else {
                url = "http://maps.googleapis.com/maps/api/geocode/json?address=" + input + "&sensor=false";
                $http.get(url, {}).success(function(res) {

                        deferred.resolve(res.results);
                    })
                    .error(function(err) {
                        deferred.reject(err);
                    })
            }


            return deferred.promise;
        },
        getDetails: function(placeId) {
            var deferred = $q.defer();
            detailsService.getDetails({ placeId: placeId }, function(result) {
                deferred.resolve(result);
            });
            return deferred.promise;
        }
    };
})



