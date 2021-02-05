// d3.json('samples.json', function(error, data) {

//     function tabulate(data, columns) {
//         var table = d3.select('body').append('table')
//         var thead = table.append('thead')
//         var tbody = table.append('tbody');

//         // append the header row
//         thead.append('tr')
//             .selectAll('th')
//             .data(columns).enter()
//             .append('th')
//             .text(function(column) { return column; });

//         // create a row for each object in the data
//         var rows = tbody.selectAll('tr')
//             .data(data)
//             .enter()
//             .append('tr');

//         // create a cell in each row for each column
//         var cells = rows.selectAll('td')
//             .data(function(row) {
//                 return columns.map(function(column) {
//                     return { column: column, value: row[column] };
//                 });
//             })
//             .enter()
//             .append('td')
//             .text(function(d) { return d.value; });

//         return table;
//     }

//     // render the table(s)
//     tabulate(data, ['date', 'close']); // 2 column table

// });


// console.log(importedData);
function init() {

    d3.json("samples.json").then((data) => {
        let selector = d3.select("#selDataset");
        let sampleNames = data.names;

        sampleNames.forEach((sample) => {
            selector
                .append("option")
                .text(sample)
                .property("value", sample);
        });

        // Use the first sample from the list to build the initial plots
        var firstSample = sampleNames[0];
        buildCharts(firstSample);
        buildMetadata(firstSample);
    });






}







// // Sort the data array using the greekSearchResults value
// data.sort(function(a, b) {
//     return parseFloat(b.greekSearchResults) - parseFloat(a.greekSearchResults);
// });

init();