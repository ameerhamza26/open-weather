angular.module('WeatherApp.Controllers', [])

.controller('HomeCtrl', function($scope, $http, LocationService, WeatherService, $q, WeatherDetails) {

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(handlePosition);
    }

    function handlePosition(pos, isOther) {
        var params = {};

        if (isOther) {
          params.lat = pos.geometry.location.lat();
          params.lon = pos.geometry.location.lng();
        }
        else {
          params.lat = pos.coords.latitude;
          params.lon = pos.coords.longitude;          
        }

        var map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: params.lat, lng: params.lon},
          zoom: 10
        });

        var marker = new google.maps.Marker({
          position: {lat: params.lat, lng: params.lon},
          map: map,
          title: ''
        });
        var d = new Date();
        $scope.date = d.toDateString();
        console.log($scope.date);

        WeatherService.getByLatLong(params).success(function(res) {
          console.log(res)
                $scope.weather = res;
                $scope.icon = "http://openweathermap.org/img/w/" + res.weather[0].icon + ".png";
                WeatherDetails.getWindSpeed(res.wind.speed).then(function(res) {
                    $scope.windspeed = res;
                })

                WeatherDetails.getWindDirection(res.wind.deg).then(function(res) {
                    $scope.winddirection = res;
                })

                WeatherDetails.getCloudsData(res.clouds.all).then(function(res) {
                    $scope.clouddata = res;
                })
            })
            .error(function(err) {
                console.log(err);
            })

    }

    $scope.ctrl = {};

    $scope.ctrl.simulateQuery = true;
    $scope.ctrl.isDisabled = false;
    $scope.ctrl.querySearch = querySearch;
    $scope.ctrl.selectedItemChange = selectedItemChange;
    $scope.ctrl.searchTextChange = searchTextChange;
    $scope.ctrl.searchText = "";

    function querySearch(query) {
        var def = $q.defer();
        if (query != "") {
            LocationService.searchAddress(query).then(function(result) {
                def.resolve(result);
            }, function(status) {
                def.reject(status);
            });
        } else {
            def.resolve({})
        }
        return def.promise;
    }

    function searchTextChange(text) {
    }

    function selectedItemChange(place) {
        if (typeof place != "undefined") {
            LocationService.getDetails(place.place_id).then(function(location) {
                handlePosition(location, true);
            });
        }
    }


})

