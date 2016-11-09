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
    $scope.details = {
        package: [
            {field:'name', type:'String'},
            {field: 'version', type: 'Number'},
            {field:'description', type:'String'},
            // {field:'scripts', type:'Array'},
            {field:'author', type:'String'},
            {field:'license', type:'String'},
            {field:'dependencies', type:'Array', init: [0]}
        ],
        server: [
            {field: 'tester', type: 'Array', init: []},
            {field: 'port', type: 'Number'}
        ]
    }
    $scope.data = {package: {}};
    $scope.download = '';

    $scope.makeFiles = function() {
        // console.log($scope.data);
        gen.makeFiles($scope.data, function(data) {
            console.log(data);

            var anchor = angular.element('<a/>');
            console.log(encodeURI(data));
            location.href = data;
            // window.open(encodeURI(data, "_self"));
            var datum = new Blob([data]);

            $scope.data = {package: {}};
        })
    }
    $scope.addField = function(str) {
        console.log(str);
        const current = str.split('_');
        console.log(current[0]);
        console.log($scope.details[current[0]]);
        var tmp;
        for (let i = 0; i < $scope.details[current[0]].length; i++) {
            if ($scope.details[current[0]][i].init) {
                tmp = $scope.details[current[0]][i];
                break;
            }
        }
        tmp.init.push(0);
    }
}])
