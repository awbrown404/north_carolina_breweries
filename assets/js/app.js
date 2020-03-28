// initialize variables to reference DOM elements
var dropdownMenu = d3.select("#selBrewery");

d3.csv("assets/data/nc_breweries_df.csv").then(function(brew_df) {
    // sort breweries
    var breweries = brew_df.map(brewery => brewery.breweries);
    var breweries = breweries.sort();

    // render dropdown menu
    breweries.forEach(brewery => {
        var option = dropdownMenu.append("option");
        option.attr("value", brewery).text(brewery)
    });

    // retrieve first id to filter data on load
    var selectedId = "ichhfQ" // CHANGE THIS LATER

    // load beer list
    d3.csv("assets/data/nc_breweries_beer_list.csv").then(function(beer_list) {
        // filter data
        var filtered = beer_list.filter(bl => bl.brewery_id === selectedId);

        // nest data by beer style
        var beersByType = d3.nest()
            .key(function(d) { return d.beer_style; })
            .rollup(function(v) { return v.length; })
            .entries(filtered);

        // var ctx = document.getElementById("myChart");
        // var myChart = new myChart(ctx, {
        // });
        console.log(filtered);
        console.log(beersByType[0].key);
    });
})