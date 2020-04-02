// initialize variables to reference DOM elements
var dropdownMenu = d3.select("#selBrewery");

// create global variable
var myChart;

// create table 
function renderTable(dataset) {
    // select the table header, overwrite any existing html
    var thead = d3.select("thead");
    thead.html("");

    // append a new row
    var row = thead.append("tr");

    // use forEach to store the keys in as table headers
    var firstItem = dataset[0];
    Object.keys(firstItem).forEach(key => {
        var cleanKey = key.replace("_", " ");
        var cleanKey = cleanKey.toUpperCase();
        var cell = row.append("th");
        cell.text(cleanKey);
    })

    // select the table body, overwrite any existing html
    var tbody = d3.select("tbody");
    tbody.html("");

    // use forEach to iterate thru data
    dataset.forEach((item) => {
        // append a new row to the table body
        var row = tbody.append("tr");
            
        // use forEach to store each paired value in the sighting to a cell
        Object.entries(item).forEach(([key, value]) => {
            var cell = row.append("td");
            cell.text(value);
        });
    });
};

function updateTable(selection, dataset) {
    // overwrite existing table
    var thead = d3.select("thead");
    thead.html("");
    var tbody = d3.select("tbody");
    tbody.html("");

    // filter dataset on selection
    var tableFilter = dataset.filter(bl => bl.master_style === selection);

    // render table using new dataset
    renderTable(tableFilter);
}

// handle change in dropdown menu
function optionChanged(user_brew) {

    d3.csv("assets/data/brewery_df.csv").then(function(brew_df) {
        // retrieve brewery id using data
        var breweryFilter = brew_df.filter(br => br.breweries === user_brew);
        var selectedId = breweryFilter[0].brewery_id;

        d3.csv("assets/data/beer_list_df.csv").then(function(beer_list) {
            // sort data by master beer style
            beer_list.sort((a, b) => {
                if(a.master_style < b.master_style) {return -1;}
                if(a.master_style > b.master_style) {return 1;}
                return 0;
            })

            // filter data
            var filtered = beer_list.filter(bl => bl.brewery_id === selectedId);

            // render beer list table
            renderTable(filtered);

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
                    case "Ale":
                        // return "rgba(224, 162, 0, 0.6)";
                        return("rgba(250, 250, 110, 0.6)");
                    case "Hefeweizen":
                        // return "rgba(252, 209, 95, 0.6)";
                        return("rgba(251, 235, 95, 0.6)");
                    case "IPA":
                        // return "rgba(255, 174, 66, 0.6)";
                        return("rgba(252, 219, 82, 0.6)");
                    case "Kolsch":
                        // return "rgba(138, 37, 40, 0.6)";
                        return("rgba(252, 203, 71, 0.6)");
                    case "Lager":
                        // return "rgba(252, 225, 172, 0.6)";
                        return("rgba(251, 188, 62, 0.6)");
                    case "Other":
                        // return "rgba(243, 229, 171, 0.6)";
                        return("rgba(250, 172, 56, 0.6)");
                    case "Pale Ale":
                        // return "rgba(201, 160, 68, 0.6)";
                        return("rgba(247, 156, 51, 0.6)");
                    case "Porter":
                        // return "rgba(91, 49, 48, 0.6)";
                        return("rgba(244, 139, 49, 0.6)");
                    case "Saison":
                        // return "rgba(234, 86, 0, 0.6)";
                        return("rgba(240, 123, 48, 0.6)");
                    case "Stout":
                        // return "rgba(75, 50, 47, 0.6)";
                        return("rgba(235, 106, 49, 0.6)");
                    case "Wheat Beer":
                        // return "rgba(170, 89, 66, 0.6)";
                        return("rgba(229, 89, 51, 0.6)");
                }
            });

            // map border color to each style
            var borders = labels.map(label => {
                switch(label){
                    case "Ale":
                        // return "rgba(224, 162, 0, 0.6)";
                        return("rgba(250, 250, 110, 1)");
                    case "Hefeweizen":
                        // return "rgba(252, 209, 95, 0.6)";
                        return("rgba(251, 235, 95, 1)");
                    case "IPA":
                        // return "rgba(255, 174, 66, 0.6)";
                        return("rgba(252, 219, 82, 1)");
                    case "Kolsch":
                        // return "rgba(138, 37, 40, 0.6)";
                        return("rgba(252, 203, 71, 1)");
                    case "Lager":
                        // return "rgba(252, 225, 172, 0.6)";
                        return("rgba(251, 188, 62, 1)");
                    case "Other":
                        // return "rgba(243, 229, 171, 0.6)";
                        return("rgba(250, 172, 56, 1)");
                    case "Pale Ale":
                        // return "rgba(201, 160, 68, 0.6)";
                        return("rgba(247, 156, 51, 1)");
                    case "Porter":
                        // return "rgba(91, 49, 48, 0.6)";
                        return("rgba(244, 139, 49, 1)");
                    case "Saison":
                        // return "rgba(234, 86, 0, 0.6)";
                        return("rgba(240, 123, 48, 1)");
                    case "Stout":
                        // return "rgba(75, 50, 47, 0.6)";
                        return("rgba(235, 106, 49, 1)");
                    case "Wheat Beer":
                        // return "rgba(170, 89, 66, 0.6)";
                        return("rgba(229, 89, 51, 1)");
                }
            });

            var data = beersByType.map(beerType => beerType.value);

            // define y max for chart
            var maxValue = Math.max.apply(Math, data);
            var roundedMax = Math.ceil(maxValue/5) * 5;
            
            myChart.data.labels = labels;
            myChart.data.datasets[0].data = data;
            myChart.data.datasets[0].backgroundColor = colors;
            myChart.data.datasets[0].borderColor = borders;
            myChart.options.scales.yAxes[0].ticks.max = roundedMax;
            myChart.update();

        // make bar chart interactive
        document.getElementById("myChart").onclick = function (evt) {
            var activePoints = myChart.getElementsAtEventForMode(evt, 'point', myChart.options);
            var firstPoint = activePoints[0];
            if (firstPoint == undefined) {
                renderTable(filtered);
                return;
            }
            var selectedBeer = myChart.data.labels[firstPoint._index];
            updateTable(selectedBeer, filtered);
            };      
        })
    });
};


// initial data, plot load
d3.csv("assets/data/brewery_df.csv").then(function(brew_df) {
    // sort breweries
    var breweries = brew_df.map(brewery => brewery.breweries);
    var breweries = breweries.sort();

    // render dropdown menu
    breweries.forEach(brewery => {
        var option = dropdownMenu.append("option");
        option.attr("value", brewery).text(brewery)
    });

    // retrieve first brewery to filter data on load
    selectedBrewery = breweries[0];

    // retrieve brewery id using data
    var breweryFilter = brew_df.filter(br => br.breweries === selectedBrewery);
    var selectedId = breweryFilter[0].brewery_id;

    // load beer list
    d3.csv("assets/data/beer_list_df.csv").then(function(beer_list) {
        // sort data by master beer style
        beer_list.sort((a, b) => {
            if(a.master_style < b.master_style) {return -1;}
            if(a.master_style > b.master_style) {return 1;}
            return 0;
        })

        // filter data
        var filtered = beer_list.filter(bl => bl.brewery_id === selectedId);
        console.log(filtered);

        // render beer list table
        renderTable(filtered);

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
                case "Ale":
                    // return "rgba(224, 162, 0, 0.6)";
                    return("rgba(250, 250, 110, 0.6)");
                case "Hefeweizen":
                    // return "rgba(252, 209, 95, 0.6)";
                    return("rgba(251, 235, 95, 0.6)");
                case "IPA":
                    // return "rgba(255, 174, 66, 0.6)";
                    return("rgba(252, 219, 82, 0.6)");
                case "Kolsch":
                    // return "rgba(138, 37, 40, 0.6)";
                    return("rgba(252, 203, 71, 0.6)");
                case "Lager":
                    // return "rgba(252, 225, 172, 0.6)";
                    return("rgba(251, 188, 62, 0.6)");
                case "Other":
                    // return "rgba(243, 229, 171, 0.6)";
                    return("rgba(250, 172, 56, 0.6)");
                case "Pale Ale":
                    // return "rgba(201, 160, 68, 0.6)";
                    return("rgba(247, 156, 51, 0.6)");
                case "Porter":
                    // return "rgba(91, 49, 48, 0.6)";
                    return("rgba(244, 139, 49, 0.6)");
                case "Saison":
                    // return "rgba(234, 86, 0, 0.6)";
                    return("rgba(240, 123, 48, 0.6)");
                case "Stout":
                    // return "rgba(75, 50, 47, 0.6)";
                    return("rgba(235, 106, 49, 0.6)");
                case "Wheat Beer":
                    // return "rgba(170, 89, 66, 0.6)";
                    return("rgba(229, 89, 51, 0.6)");
            }
        });

        // map border color to each style
        var borders = labels.map(label => {
            switch(label){
                case "Ale":
                    // return "rgba(224, 162, 0, 0.6)";
                    return("rgba(250, 250, 110, 1)");
                case "Hefeweizen":
                    // return "rgba(252, 209, 95, 0.6)";
                    return("rgba(251, 235, 95, 1)");
                case "IPA":
                    // return "rgba(255, 174, 66, 0.6)";
                    return("rgba(252, 219, 82, 1)");
                case "Kolsch":
                    // return "rgba(138, 37, 40, 0.6)";
                    return("rgba(252, 203, 71, 1)");
                case "Lager":
                    // return "rgba(252, 225, 172, 0.6)";
                    return("rgba(251, 188, 62, 1)");
                case "Other":
                    // return "rgba(243, 229, 171, 0.6)";
                    return("rgba(250, 172, 56, 1)");
                case "Pale Ale":
                    // return "rgba(201, 160, 68, 0.6)";
                    return("rgba(247, 156, 51, 1)");
                case "Porter":
                    // return "rgba(91, 49, 48, 0.6)";
                    return("rgba(244, 139, 49, 1)");
                case "Saison":
                    // return "rgba(234, 86, 0, 0.6)";
                    return("rgba(240, 123, 48, 1)");
                case "Stout":
                    // return "rgba(75, 50, 47, 0.6)";
                    return("rgba(235, 106, 49, 1)");
                case "Wheat Beer":
                    // return "rgba(170, 89, 66, 0.6)";
                    return("rgba(229, 89, 51, 1)");
            }
        });

        // define y max for chart
        var data = beersByType.map(beerType => beerType.value);
        var maxValue = Math.max.apply(Math, data);
        var roundedMax = Math.ceil(maxValue/5) * 5;

        var ctx = document.getElementById("myChart");
        myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: "Number of Beers by Style",
                    data: data,
                    backgroundColor: colors,
                    borderColor: borders,
                    borderWidth: 1
                }],
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            min: 0,
                            max: roundedMax
                        }
                    }]
                },
            legend: {
                display: false
                }
            }
        });

    // make bar chart interactive
    document.getElementById("myChart").onclick = function (evt) {
        var activePoints = myChart.getElementsAtEventForMode(evt, 'point', myChart.options);
        var firstPoint = activePoints[0];
        if (firstPoint == undefined) {
            renderTable(filtered);
            return;
        }
        var selectedBeer = myChart.data.labels[firstPoint._index];
        updateTable(selectedBeer, filtered);
    };
    });
})