const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"



function init() {
  // Grab a reference to the dropdown select element
  let selector = d3.select("#selDataset");
  // Use the list of sample names to populate the select options
  d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data) => {
    let sampleNames = data.names;
    for (let i = 0; i < sampleNames.length; i++){
      selector
        .append("option")
        .text(sampleNames[i])
        .property("value", sampleNames[i]);
    };
  
  });
}





  function optionChanged(sampleid) {

    infotable(sampleid)
    plots(sampleid)


  }



  

  function infotable(sampleid) {

    let tablemenue = d3.select("#sample-metadata");
    // Assign the value of the dropdown menu option to a variable


    d3.json(url).then(function(data) {
 
       let metainfo = data.metadata
       let newArray = metainfo.filter(number => number.id == sampleid)[0];
     
        tablemenue.html("")
        
       Object.entries(newArray).forEach(entry => {
        const [key, value] = entry;
        console.log(key, value);
        tablemenue.append("h5").text(`${key}: ${value}`)
      });




      });


  }


  function plots(sampleid) {


    d3.json(url).then(function(data) {
 
        let sampleinfo= data.samples
        let newArray = sampleinfo.filter(number => number.id == sampleid)[0];
      
        sample_values = newArray.sample_values

        otu_ids  = newArray.otu_ids

        otu_labels = newArray.otu_labels

        var bar_data = [{
            x:sample_values.slice(0,10).reverse(),
            y:otu_ids.slice(0,10).map(x => `otu ${x}`).reverse() ,
            text:otu_labels.slice(0,10).reverse(),
            name: '',
            orientation: 'h',
            marker: {
              color: 'rgba(55,128,191,0.6)',
              width: 1
            },
            type: 'bar'
          }];
          
          
          
        var bar_layout = {
        title: 'Colored Bar Chart',
        
         };
          
        Plotly.newPlot('bar', bar_data, bar_layout);
         
         var bubble_data = [{
            x:otu_ids,
            y:sample_values ,
            mode: 'markers',
            marker: {
            color: otu_ids,
           // 'rgba(55,128,191,0.6)'
              size: sample_values
            }
          }];
          
          
        var bubble_layout = {
            title: 'Marker Size and Color',
            
          };
          
          Plotly.newPlot('bubble', bubble_data, bubble_layout);
 
 
 
 
       });


  }
  
  init();


  