app.controller('SearchController', ['$rootScope', '$scope', '$filter', '$timeout', 'itemsData', function($rootScope, $scope, $filter, $timeout, itemsData) {
  'use strict';

  $scope.filters = {};

  itemsData.success(function(data) {
    $scope.items = data;
    $scope.itemsSafe = data;
  });

  $scope.colorOptions = [
    {name: '', value: 'null'},
    {name: 'red', value: 'red'},
    {name: 'white', value: 'white'},
    {name: 'black', value: 'black'},
    {name: 'blue', value: 'blue'},
    {name: 'yellow', value: 'yellow'},
    {name: 'green', value: 'green'}
  ];

  $scope.filter = function(filter) {
    //if it's first filter we do it
    if (isFields()) {
      if (Object.getOwnPropertyNames($scope.filters).length === 0) {
      doFilter();
      } else {
        angular.forEach($scope.filters, function(value, key) {
          // if filter object has this filter and it's not filterByColor we disable it and doFilter for all enabled filters
          if (key === filter) {
            if (filter !== 'filterByColor') {
              $scope.filters[key] === true ? $scope.filters[key] = false : $scope.filters[key] = true;
            }
            $scope.items = $scope.itemsSafe;
            return angular.forEach($scope.filters, function(value, key) {
              if (value) {
                doFilter(key);
              }
            });
          }
        });
        doFilter();
      }
    } else {
      //if fields are empty
      if (filter === 'filterByColor') {
        $scope.filters.filterByColor = false;
      }
      $scope.filters = {};
      $scope.items = $scope.itemsSafe;
    }

    function doFilter() {
      switch (filter) {
        case 'filterByDate':
          filterByDate()
          break;
        case 'filterInStock':
          filterInStock()
          break;
        case 'filterByPrice':
          filterByPrice()
          break;
        case 'filterByColor':
          filterByColor()
          break;
      }
    }

    function isFields() {
      if ($scope.dateFrom && $scope.dateTo || $scope.checkbox || typeof($scope.priceFrom) === 'number' && typeof($scope.priceTo) === 'number' || 
        $scope.color !== undefined && $scope.color !== 'null') {
        return true;
      }
      return false;
    }
  }

  function filterByDate() {
    if (typeof($scope.dateFrom) === 'string' && $scope.dateFrom.length === 0 || typeof($scope.dateTo) === 'string' && $scope.dateTo.length === 0) {
      return;
    }
    $scope.items = $filter('dateFilter')($scope.items, Date.parse($scope.dateFrom), Date.parse($scope.dateTo));
    $scope.filters.filterByDate = true;
  }

  function filterInStock() {
    $scope.items = $filter('inStockFilter')($scope.items, $scope.checkbox);
    $scope.filters.filterInStock = true;
  }

  function filterByPrice() {
    $scope.items = $filter('priceFilter')($scope.items, $scope.priceFrom, $scope.priceTo);
    $scope.filters.filterByPrice = true;
  }

  function filterByColor() {
    $scope.items = $filter('colorFilter')($scope.items, $scope.color);
    $scope.filters.filterByColor = true;
  }

  $('#dateFrom, #dateTo').datepicker({
    format: 'MM dd, yyyy'
  });
}]);