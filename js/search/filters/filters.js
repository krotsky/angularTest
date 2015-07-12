app.filter('dateFilter', function() {
  return function(items, dateFrom, dateTo) {
    var dateFrom = new Date(dateFrom);
    var dateTo = new Date(dateTo);
    var result = [];        
    for (var i=0; i<items.length; i++){
        var issueDate = new Date(items[i].issueDate);
        if (issueDate >= dateFrom && issueDate <= dateTo)  {
            result.push(items[i]);
        }
    }            
    return result;
  };
});

app.filter('inStockFilter', function() {
  return function(items, checkbox) {
    var result = [];
    if (checkbox) {
      items.forEach(function(item) {
        if(item.inStock === checkbox) {
          result.push(item);
        }
      });
    } else {
      result = items;
    }
    return result;
  }
});

app.filter('priceFilter', function() {
  return function(items, priceFrom, priceTo) {
    var result = [];
    items.forEach(function(item) {
      if(item.price >= priceFrom && item.price <= priceTo) {
        result.push(item);
      }
    });
    return result;
  }
});

app.filter('colorFilter', function() {
  return function(items, color) {
    var result = [];
    if (color !== 'null') {
      items.forEach(function(item) {
        if (item.color === color) {
          result.push(item);
        }
      });
    } else {
      result = items;
    }
    return result;
  }
});