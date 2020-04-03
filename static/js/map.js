// Creating map object
var myMap = L.map("map", {
    center: [35.78, -78.64],
    zoom: 11,
    layers: [lightmap, breweryLocation]
  });

 // Adding tile layer to the map
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
  }).addTo(myMap);

var baseMaps = {
  "Light Map" : lightmap
};

// var overlayMaps = {
//   "Breweries" : breweryLocation
// };

var dataFile ="/data/nc_breweries_df.csv"

function csvJSON(geoData){

    var lines=dataFile.split("\n");
  
    var geoData = [];
  
    var headers=lines[0].split(",");
  
    for(var i=1;i<lines.length;i++){
  
        var obj = {};
        var currentline=lines[i].split(",");
  
        for(var j=0;j<headers.length;j++){
            obj[headers[j]] = currentline[j];
        }
  
        geoData.push(obj);
  
    }
  
    //return result; //JavaScript object
    return JSON.stringify(geoData); //JSON
  }

function createMarkers(response) {
  var breweries = response.geoData.breweries;
  var breweryLoc = [];
  for (var index = 0; index < breweries.length; index ++) {
    var breweryLoc = L.marker([breweries.lat, breweries.lon])
    breweryLoc.push(breweryLoc);
  }
  createMap(L.layerGroup(breweryLoc));
}

d3.json(geoData, createMarkers);

  


