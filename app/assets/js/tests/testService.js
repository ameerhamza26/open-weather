describe('service tests', function() {
    var mockHttp, mockQ, mockWeatherDetails;
    beforeEach(function() {
        module(function($provide) {
            $provide.service('$http', [function() {
                this.alert = jasmine.createSpy('alert');
            }]);
            $provide.service('$q', [function() {
                this.alert = jasmince.createSpy('alert');
            }]);
        })
        module('WeatherApp.services')
    })
    beforeEach(inject(function($http, $q, WeatherDetails) {
        mockHttp = $http;
        mockQ = $q;
        mockWeatherDetails = WeatherDetails;
    }));

    it('should show alert when params is not passed into getWindSpeed', function() {
        var params = {};
        mockWeatherDetails.getWindSpeed(params);

        expect(mockHttp.alert).toHaveBeenCalled();
        expect(mockHttp.alert).toHaveBeenCalledWith(message);
        expect(mockWeatherDetails.getWindSpeed).not.toHaveBeenCalled();
    });
});
