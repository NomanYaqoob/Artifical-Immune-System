// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'highcharts-ng'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.controller("HomeCtrl", function($scope) {

  var tempX = 0,
    tempY = 0,
    tempRandom, sumFitnesses = 0;
  $scope.bestFitnesses = [];
  $scope.averageFitnesses = [];

  function make2DecimalPlace(val) {
    return +(val.toFixed(4));
  }

  function getRandomArbitrary(min, max) {
    var x = +((Math.random() * (max - min) + min).toFixed(4));
    return x < 0 ? x * -1 : x;
  }


  $scope.calculate = function() {
    $scope.bestFitnesses = [];
    $scope.averageFitnesses = [];
    for (var i = 0; i < 20; i++) {

      $scope.particles = [];
      $scope.clonedParticles = [];

      for (var j = 0; j < 10; j++) {
        tempX = getRandomArbitrary(-2, 2)
        tempY = getRandomArbitrary(-5, 5)
        $scope.particles.push({
          x: tempX,
          y: tempY,
          fitness: make2DecimalPlace(Math.pow(tempX, 2) + Math.pow(tempY, 2))
        })
      }
      $scope.particles.sort(function(a, b) {
        return a.fitness > b.fitness ? -1 : 1
      })

      for (var x = 0; x < 5; x++) {
        tempRandom = getRandomArbitrary(-0.05, 0.05) * (1 / $scope.particles[x].fitness);
        if ((tempRandom + $scope.particles[x].x) > 2) {
          tempX = 2
        } else if ((tempRandom + $scope.particles[x].x) < -2) {
          tempX = -2;
        } else {
          tempX = tempRandom + $scope.particles[x].x;
        }

        if ((tempRandom + $scope.particles[x].y) > 5) {
          tempY = 5;
        } else if ((tempRandom + $scope.particles[x].y) < -5) {
          tempY = -5;
        } else {
          tempY = tempRandom + $scope.particles[x].y;
        }
        $scope.particles.push({
          x: tempX,
          y: tempY,
          fitness: make2DecimalPlace(Math.pow(tempX, 2) + Math.pow(tempY, 2))
        })
      }

      for (var j = 0; j < 3; j++) {
        tempX = getRandomArbitrary(-2, 2)
        tempY = getRandomArbitrary(-5, 5)
        $scope.particles.push({
          x: tempX,
          y: tempY,
          fitness: make2DecimalPlace(Math.pow(tempX, 2) + Math.pow(tempY, 2))
        })
      }
      $scope.particles.sort(function(a, b) {
        return a.fitness > b.fitness ? -1 : 1
      })

      $scope.bestFitnesses.push($scope.particles[0].fitness);
      for (var k = 0; k < 10; k++) {
        sumFitnesses += $scope.particles[k].fitness
      }
      $scope.averageFitnesses.push(sumFitnesses / 10);
      sumFitnesses = 0;
    }
    console.log("$scope.bestFitnesses", $scope.bestFitnesses);
    console.log("$scope.averageFitnesses", $scope.averageFitnesses);
    $scope.chart.series[0].data = $scope.bestFitnesses;
    $scope.chart.series[1].data = $scope.averageFitnesses;
  }

  $scope.chart = {
    options: {
      chart: {
        type: 'line'
      },
      legend: {
        enabled: false
      }
    },
    title: {
      text: "Artificial Immune System"
    },
    yAxis: {
      title: "Global Maxima",
      min: 0,
      max: 50,
      tickPixelInterval: 50,
      tickLength: 2
    },
    xAxis: {
      type: 'linear',
      min: 0,
      max: 20,
      // tickLength: 1,
      tickPixelInterval: 100
    },
    series: [{
      name: "AIS Best",
      data: []
    }, {
      name: "AIS Average",
      data: []
    }]
  };
})
