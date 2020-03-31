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
    var selectedId = "p2bHtA" // CHANGE THIS LATER

    // load beer list
    d3.csv("assets/data/nc_breweries_beer_list_v2.csv").then(function(beer_list) {
        // filter data
        var filtered = beer_list.filter(bl => bl.brewery_id === selectedId);

        // nest data by beer style
        var beersByType = d3.nest()
            .key(function(d) { return d.master_style; })
            .rollup(function(v) { return v.length; })
            .entries(filtered);

        // get beer styles
        var labels = beersByType.map(beerType => beerType.key);

        // map fill color to each style
        var colors = labels.map(label => {
            switch(label){
                case "Lager":
                    return "rgba(252, 225, 172, 0.6)";
                case "Hefeweizen":
                    return "rgba(252, 209, 95, 0.6)";
                case "IPA":
                    return "rgba(255, 174, 66, 0.6)";
                case "Pale Ale":
                    return "rgba(201, 160, 68, 0.6)";
                case "Ale":
                    return "rgba(224, 162, 0, 0.6)";
                case "Saison":
                    return "rgba(234, 86, 0, 0.6)";
                case "Wheat Beer":
                    return "rgba(170, 89, 66, 0.6)";
                case "Kolsch":
                    return "rgba(138, 37, 40, 0.6)";
                case "Porter":
                    return "rgba(91, 49, 48, 0.6)";
                case "Stout":
                    return "rgba(75, 50, 47, 0.6)";
                case "Other":
                    return "rgba(243, 229, 171, 0.6)";
            }
        });

        // map border color to each style
        var borders = labels.map(label => {
            switch(label){
                case "Lager":
                    return "rgba(252, 225, 172, 1)";
                case "Hefeweizen":
                    return "rgba(252, 209, 95, 1)";
                case "IPA":
                    return "rgba(255, 174, 66, 1)";
                case "Pale Ale":
                    return "rgba(201, 160, 68, 1)";
                case "Ale":
                    return "rgba(224, 162, 0, 1)";
                case "Saison":
                    return "rgba(234, 86, 0, 1)";
                case "Wheat Beer":
                    return "rgba(170, 89, 66, 1)";
                case "Kolsch":
                    return "rgba(138, 37, 40, 1)";
                case "Porter":
                    return "rgba(91, 49, 48, 1)";
                case "Stout":
                    return "rgba(61, 50, 47, 1)";
                case "Other":
                    return "rgba(243, 229, 171, 1)";
            }
        });
        var data = beersByType.map(beerType => beerType.value);

        var ctx = document.getElementById("myChart");
        var myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: "Number of Beers by Style",
                    data: data,
                    backgroundColor: colors,
                    borderColor: borders,
                    borderWidth: 2
                }],
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            min: 0,
                            max: 10
                        }
                    }]
                },
            legend: {
                display: false
                }
            }
        });
        console.log(beer_list);
        console.log(beersByType);
        console.log(labels);
        console.log(colors);
        console.log(data);
    });
})