// d3.json("/samples.json", function(data) {
//     //use data here
//     console.log(data);
// })

d3.json("samples.json").then((data) => {
    //  Create the Traces
    let result = data.forEach(elements => {
        return (elements.samples.id);
    });
    console.log(result);

    // let bar_chart = [{
    //     type: 'bar',
    //     x: [20, 14, 23],
    //     y: ['giraffes', 'orangutans', 'monkeys'],
    //     orientation: 'h'
    // }];

    // Plotly.newPlot('bar', bar_chart);

});