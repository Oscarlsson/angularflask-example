var app = angular.module('myApp', ['ngRoute']);
'use strict'; // See note about 'use strict'; below

app.config(function($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "static/timeseries.html",
            controller: 'timeseriesCtrl'
        }) // add templates and controllers here
        .otherwise({
            redirectTo: '/'
        });

});

app.controller('timeseriesCtrl', function($scope, $http) {
    var vm = this;
    vm.data = '';

    vm.browsers = [];
    vm.selectedBrowser = 'internet_explorer_6.0';

    vm.timeperiods = [];
    vm.selectedTimeperiod = 'Date' // Date, Month, Year

    /*
     * Get all the options available in the timeseries
     *
     */
    vm.getBrowsers = function() {

        var path = "getBrowsers/"
        $http.get(path)
            .then(function successCallback(response) {
                vm.browsers = response.data;
            }, function errorCallback(response) {
                console.log("Unable to perform get request");
            });
    }


    vm.getTimeperiods = function() {

        var path = "getTimeperiods/"
        $http.get(path)
            .then(function successCallback(response) {
                vm.timeperiods = response.data;
            }, function errorCallback(response) {
                console.log("Unable to perform get request");
            });
    }

    vm.makeSearch = function(browser, timeperiod) {
        var path = "get" + timeperiod + "Timeseries/"
        if (browser != undefined) {
            path = path + browser
        }

        console.log('Making search for ' + browser);

        $http.get(path)
            .then(function successCallback(response) {
                vm.data = JSON.parse(response.data);
                output = []
                angular.forEach(vm.data, function(value, key) {
                    row = {}
                    row['x'] = new Date(value.x)
                    row['y'] = value.y
                    output.push(row)
                });
                vm.data = output;
                vm.renderGraph(vm.data);

            }, function errorCallback(response) {
                console.log("Unable to perform get request");
            });
    };

    vm.renderGraph = function(data) {
        var chart = new CanvasJS.Chart("chartContainer", {
            zoomEnabled: true,
            axisX: {
                title: "timeline",
                gridThickness: 2
            },
            data: [{
                type: "line",
                dataPoints: data
            }]
        });
        chart.render();

    }

    vm.getBrowsers();
    vm.getTimeperiods();
    vm.makeSearch(vm.selectedBrowser, vm.selectedTimeperiod);

});
