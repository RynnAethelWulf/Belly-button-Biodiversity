// Select the html tags
let dropdown = d3.select("#selDataset");
let list = d3.select(".sample-metadata");

// console.log(dropdown_selected_value);
function optionChanged(select_value) {
    let value = select_value;
    buildCharts(value);
    buildMetadata(value);

}
// Display metadata
function buildMetadata(value) {
    d3.json("samples.json").then((data) => {
        let metadata = data.metadata;
        let metadat_info = metadata.filter(ele => ele.id == value);
        console.log(metadat_info[0]);


        // remove any children from the list to
        list.html("");

        metadat_info.map(ele => {

            list.append("li").text(`Id_No: ${ele.id}`);
            list.append("li").text(`Age: ${ele.age}`);
            list.append("li").text(`Gender: ${ele.gender}`);
            list.append("li").text(`Ethnicity: ${ele.ethnicity}`);
            list.append("li").text(`Location: ${ele.location}`);
            list.append("li").text(`Ethnicity: ${ele.bbtype}`);
            list.append("li").text(`Location: ${ele.wfreq}`);

            buildGauge(ele.wfreq)
        });



    });
}

// buildCharts
function buildCharts(value) {
    d3.json("samples.json").then((data) => {
        // using selected dropdown value to generate the sample values
        let sample_data = data.samples
        let filtered_samples = sample_data.filter(ele => ele.id == value);
        // console.log(filtered_samples);
        // console.log(filtered_samples[0].sample_values.sort());
        top_10_samples_values = filtered_samples[0].sample_values.sort((a, b) => b - a).slice(0, 10)
            // console.log(top_10_samples_values);
        top_10_samples_ids = filtered_samples[0].otu_ids.slice(0, 10)
            // console.log(top_10_samples_ids);

        // Creating Plotly h-bar Chart
        let h_data = [{
            type: 'bar',
            x: top_10_samples_values.reverse(),
            y: top_10_samples_ids.map(ele => `OTU ${ele}`).reverse(),
            orientation: 'h'
        }];
        let layout_h = {
            title: 'Top 10 OTUs found in the Individual',
            showlegend: false,
            height: 500,
            width: 975
        };

        Plotly.newPlot('bar', h_data, layout_h, { displayModeBar: false });

        // Creating Bubble Charts

        let trace1 = {
            x: filtered_samples[0].otu_ids,
            y: filtered_samples[0].sample_values,
            mode: 'markers',
            marker: {
                size: filtered_samples[0].sample_values,
                color: filtered_samples[0].otu_ids,
                colorscale: "Earth"

            }
        };

        let data_bubble = [trace1];
        // buuble chart layout
        let layout_bubble = {
            title: "Bubble Chart based on OTU's,Sample Values and Size",
            showlegend: false,
            height: 700,
            width: 1200
        };

        Plotly.newPlot('bubble', data_bubble, layout_bubble, { displayModeBar: false });

    });

}



function init() {

    d3.json("samples.json").then((data) => {
        // Select the id from html

        let name_ids = data.names;
        // Appending names to the dropdown
        name_ids.forEach((sample) => {
            dropdown
                .append("option")
                .text(sample)
                .property("value", sample);
        });

        // to initialise first charts
        let first_value = name_ids[0];
        // console.log(first_value);
        buildCharts(first_value);
        buildMetadata(first_value);

    })


}
init();