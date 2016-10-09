Array.prototype.toURL = function() {
    return this.join('/');
};

var toQueryString = function(obj) {
    var out = new Array();
    for (key in obj) {
        out.push(key + '=' + encodeURIComponent(obj[key]));
    }
    return out.join('&');
};

angular.module('CoreApi', ['CoreApiUtilities'])

.constant('lagConfig', {
    appName: 'WeatherApp',
    apiUrl: "http://api.openweathermap.org/data/2.5/",
    appKey : '45ea1435fd9b38078dcb7f6440ef635b'
})

.factory('httpService', ['$http', 'lagConfig', 'Utils', function($http, lagConfig, Utils) {
    return {
        $http: $http,
        lagConfig: lagConfig,
        Utils: Utils
    }
}])

.service('WeatherService', ['httpService', function(httpService) {
    this.getByLatLong = function(urlParams) {
        urlParams.appid = httpService.lagConfig.appKey;
        var url = httpService.Utils.buildUrl(new Array('weather'), urlParams);
        return httpService.$http.get(url, {appid: httpService.lagConfig.appKey });
    }
}])

angular.module('CoreApiUtilities', [])

.factory('Utils', ['lagConfig', function(lagConfig) {

    var buildUrl = function(urlSet, queryStringSet) {
        queryStringSet = queryStringSet || false;

        var url = lagConfig.apiUrl;

        if (Object.prototype.toString.call(urlSet) === '[object Array]') {
            url += urlSet.toURL();
        }

        if (queryStringSet !== false) {
            url += '?' + toQueryString(queryStringSet);
        }
        return url;
    }

    return {
        buildUrl: buildUrl
    };
}])