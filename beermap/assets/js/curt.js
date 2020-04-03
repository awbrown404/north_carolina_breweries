var map = L.map('map', {
    center: [35.78, -78.64],
    zoom: 18
});

L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(map);

L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>'
}); 

L.tileLayer('https://stamen-tiles.a.ssl.fastly.net/terrain/{z}/{x}/{y}.png', {
    attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.'
});

var customLayer = L.geoJson(null, {
    onEachFeature: function(feature, layer) {
      layer.bindPopup("<h3>" + feature.properties.breweries + "<h3><h3>Type of Brewery: " + feature.properties.brewery_type + "<h3>Website:  " + feature.properties.website + "</h3>");
      }
});


var points = omnivore.csv('data/nc_breweries_df.csv', null, customLayer);
//points.addTo(map);

var markers = L.markerClusterGroup({
  showCoverageOnHover: false
});

map.addLayer(markers);

points.on('ready', function () {
    map.fitBounds(points.getBounds())
  console.log(points.getLayers().length)
  markers.addLayer(points);
});
