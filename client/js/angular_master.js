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
    //Dynamic Form creation. For Arrays, insert init with a [0] or anything inside.
    $scope.details = {
        package: [
            { field:'name',         type: 'String'      },
            { field:'version',      type: 'Number'      },
            { field:'description',  type: 'String'      },
            { field:'author',       type: 'String'      },
            { field:'license',      type: 'String'      }
        ],
        server: [
            { field: 'tester',      type: 'Array',      init: []    },
            { field: 'port',        type: 'Number'      }
        ],
        database: [
            { field: 'use',         type: 'Checkbox'    },
            { field: 'name',        type: 'String'      },
            { field: 'testin',      type: 'Array',      init: [0]   },
            { field: 'hello ',      type: 'Array',      init: [0]   }
        ],
        model: [
            { field: 'name',        type: 'Model',      init: [[0]]   }
        ]
    }
    $scope.data = {package: {}};
    $scope.download = '';
    $scope.testing = () => { console.log($scope.models) }
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

    //Adds fields to the array typed inputs
    $scope.addField = function(str) {
        const current = str.split('_');
        for (let i = 0; i < $scope.details[current[0]].length; i++) {
            if ($scope.details[current[0]][i].init) {
                $scope.details[current[0]][i].init.push(0);
                break;
            }
        }
    }
    $scope.addModel = function() {
        $scope.details.model[0].init.push([0]);
    }
    $scope.addAttr = function (model) {
        console.log(model);
        const model_num = model.split('@')[1];
        console.log($scope.details);
        console.log($scope.details.model);
        console.log($scope.details.model.init);
        $scope.details.model[0].init[model_num].push(0);
    }
}])
