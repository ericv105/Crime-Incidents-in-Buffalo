function loadMap(){
  Plotly.setPlotConfig({
    mapboxAccessToken: 'pk.eyJ1IjoiZXJpY3YiLCJhIjoiY2pucDd0MXEwMDNkeTNrb2JvZXlidHM3ZCJ9.HbnWGhJ0qffMHTiyZgQ0bw'
  });

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function(){
    if(this.readyState === 4 && this.status === 200){
      var mapParams = getMapParams(this.response);
      Plotly.newPlot('map', mapParams.data, mapParams.layout);
    }
  };

  xhttp.open("GET", "/tickets");
  xhttp.send();
}

function setupMapData(x){
  var newArray = [];
  var dict = {};
  
  var markerObj = {'size': 5, 'color': 'rgb(255,0,0)'};
  
  var latArray = [];
  var lonArray = [];
  var descriptionArray = [];
  for (var i = 0; i < x.length; i++){
      latArray.push(x[i][0]);
      lonArray.push(x[i][1]);
      descriptionArray.push(x[i][2]);
  }
  
  dict['type'] = 'scattermapbox';
  dict['mode'] = 'markers';
  dict['marker'] = markerObj;
  
  dict['lat'] = latArray;
  dict['lon'] = lonArray;
  dict['text'] = descriptionArray;
  
  newArray.push(dict)
  return newArray;  
}

function findCenter(x){
  var latArray = [];
  var lonArray = [];
  for(var i = 0; i < x.length; i++){
      latArray.push(x[i][0]);
      lonArray.push(x[i][1]);
  }
  
  var minLat = Math.min.apply(null, latArray);
  var maxLat = Math.max.apply(null, latArray);
  var minLon = Math.min.apply(null, lonArray);
  var maxLon = Math.max.apply(null, lonArray);
  
  var centerLat = (minLat + maxLat) / 2;
  var centerLon = (minLon + maxLon) / 2;
  
  return [centerLat, centerLon];
}

function setupMapLayout(x){
  var layout = {
    mapbox: {
      style: 'basic',
      zoom: 11,
      center: {
        lon: -78.849,
        lat: 42.907
      },
    },

    width: 850,
    height: 750,
    hovermode: 'closest',
    margin: { r: 0, t: 0, b: 0, l: 0 }
  };
  return layout;
}

function getMapParams(xjson){
  var obj = JSON.parse(xjson);
  
  var params = {
    data: setupMapData(obj),
    layout: setupMapLayout(obj)
  };
  return params;
}