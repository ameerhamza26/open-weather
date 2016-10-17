describe('service tests', function() {
    var mockHttp, mockQ, mockWeatherDetails;
    beforeEach(function() {
        module(function($provide) {
            $provide.service('$http', [function() {
                this.get = jasmine.createSpy('get');
            }]);
            $provide.service('$q', [function() {
                this.defer = jasmine.createSpy('defer');
            }]);
        })
        module('WeatherApp.services')
    })
    beforeEach(inject(function($http, $q, WeatherDetails) {
        mockHttp = $http;
        mockQ = $q;
        mockWeatherDetails = WeatherDetails;
    }));

    it('should show Light Breez when 1.66 is not passed into getWindSpeed', function() {
        var params = 1.66;
        mockWeatherDetails.getWindSpeed(params);

        expect(mockHttp.get).toHaveBeenCalledWith(param);
    });
});
