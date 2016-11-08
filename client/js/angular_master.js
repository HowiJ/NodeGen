let app = angular.module('app', []);

app.factory('GeneratorFactory', function($http) {
    let factory = {};

    factory.makeFiles = function(data, callback) {
        console.log('factory',data);
        $http.post('/server', data).then(function(res) {
            callback(res.data);
        });
    }

    return factory;
})

app.controller('GeneratorController', ['$scope', 'GeneratorFactory', function($scope, gen) {
    $scope.data = {package: {}};
    $scope.makeFiles = function() {
        // console.log($scope.data);
        gen.makeFiles($scope.data, function(data) {
            console.log(data);

            $scope.data = {package: {}};
        })
    }
}])
