/*
################ FORMATS ##################
-------------------------------------------
*/


var 	formatAsPercentage = d3.format("%"),
		formatAsPercentage1Dec = d3.format(".1%"),
		formatAsInteger = d3.format(","),
		fsec = d3.time.format("%S s"),
		fmin = d3.time.format("%M m"),
		fhou = d3.time.format("%H h"),
		fwee = d3.time.format("%a"),
		fdat = d3.time.format("%d d"),
		fmon = d3.time.format("%b")
		;

/*
############# PIE CHART ###################
-------------------------------------------
*/



function dsPieChart(){

	var dataset = [
			{category: "Maharashta", measure: 0.30},
	      {category: "UP", measure: 0.25},
	      {category: "MP", measure: 0.15},
	      {category: "Rajasthan", measure: 0.05},
	      {category: "Punjab", measure: 0.18},
	      {category: "Karnataka", measure:0.04},
	      {category: "Punjab", measure: 0.03}
	      ]
	      ;

	var 	width = 400,
		   height = 400,
		   outerRadius = Math.min(width, height) / 2,
		   innerRadius = outerRadius * .999,   
		   // for animation
		   innerRadiusFinal = outerRadius * .5,
		   innerRadiusFinal3 = outerRadius* .45,
		   color = d3.scale.category20()    //builtin range of colors
		   ;
	    
	var vis = d3.select("#pieChart")
	     .append("svg:svg")              //create the SVG element inside the <body>
	     .data([dataset])                   //associate our data with the document
	         .attr("width", width)           //set the width and height of our visualization (these will be attributes of the <svg> tag
	         .attr("height", height)
	     		.append("svg:g")                //make a groPunjab to hold our pie chart
	         .attr("transform", "translate(" + outerRadius + "," + outerRadius + ")")    //move the center of the pie chart from 0, 0 to radius, radius
				;
				
   var arc = d3.svg.arc()              //this will create <path> elements for us using arc data
        	.outerRadius(outerRadius).innerRadius(innerRadius);
   
   // for animation
   var arcFinal = d3.svg.arc().innerRadius(innerRadiusFinal).outerRadius(outerRadius);
	var arcFinal3 = d3.svg.arc().innerRadius(innerRadiusFinal3).outerRadius(outerRadius);

   var pie = d3.layout.pie()           //this will create arc data for us given a list of values
        .value(function(d) { return d.measure; });    //we must tell it out to access the value of each element in our data array

   var arcs = vis.selectAll("g.slice")     //this selects all <g> elements with class slice (there aren't any yet)
        .data(pie)                          //associate the generated pie data (an array of arcs, each having startAngle, endAngle and value properties) 
        .enter()                            //this will create <g> elements for every "extra" data element that should be associated with a selection. The result is creating a <g> for every object in the data array
            .append("svg:g")                //create a groPunjab to hold each slice (we will have a <path> and a <text> element associated with each slice)
               .attr("class", "slice")    //allow us to style things in the slices (like text)
               .on("mouseover", mouseover)
    				.on("mouseout", mouseout)
    				.on("click", Punjab)
    				;
    				
        arcs.append("svg:path")
               .attr("fill", function(d, i) { return color(i); } ) //set the color for each slice to be chosen from the color function defined above
               .attr("d", arc)     //this creates the actual SVG path using the associated data (pie) with the arc drawing function
					.append("svg:title") //mouseover title showing the figures
				   .text(function(d) { return d.data.category + ": " + formatAsPercentage(d.data.measure); });			

        d3.selectAll("g.slice").selectAll("path").transition()
			    .duration(750)
			    .delay(10)
			    .attr("d", arcFinal )
			    ;
	
	  // Add a label to the larger arcs, translated to the arc centroid and rotated.
	  // source: http://bl.ocks.org/1305337#index.html
	  arcs.filter(function(d) { return d.endAngle - d.startAngle > .2; })
	  		.append("svg:text")
	      .attr("dy", ".35em")
	      .attr("text-anchor", "middle")
	      .attr("transform", function(d) { return "translate(" + arcFinal.centroid(d) + ")rotate(" + angle(d) + ")"; })
	      //.text(function(d) { return formatAsPercentage(d.value); })
	      .text(function(d) { return d.data.category; })
	      ;
	   
	   // Computes the label angle of an arc, converting from radians to degrees.
		function angle(d) {
		    var a = (d.startAngle + d.endAngle) * 90 / Math.PI - 90;
		    return a > 90 ? a - 180 : a;
		}
		    
		
		// Pie chart title			
		vis.append("svg:text")
	     	.attr("dy", ".35em")
	      .attr("text-anchor", "middle")
	      .text("Revenue Share 2012")
	      .attr("class","title")
	      ;		    


		
	function mouseover() {
	  d3.select(this).select("path").transition()
	      .duration(750)
	        		//.attr("stroke","red")
	        		//.attr("stroke-width", 1.5)
	        		.attr("d", arcFinal3)
	        		;
	}
	
	function mouseout() {
	  d3.select(this).select("path").transition()
	      .duration(750)
	        		//.attr("stroke","blue")
	        		//.attr("stroke-width", 1.5)
	        		.attr("d", arcFinal)
	        		;
	}
	
	function Punjab(d, i) {
	
				/* Punjabdate bar chart when user selects piece of the pie chart */
				//PunjabdateBarChart(dataset[i].category);
				PunjabdateBarChart(d.data.category, color(i));
				PunjabdateLineChart(d.data.category, color(i));
			 
	}
}

dsPieChart();

/*
############# BAR CHART ###################
-------------------------------------------
*/



var datasetBarChart = [
{ groPunjab: "All", category: "Oranges", measure: 63850.4963 }, 
{ groPunjab: "All", category: "Apples", measure: 78258.0845 }, 
{ groPunjab: "All", category: "Grapes", measure: 60610.2355 }, 
{ groPunjab: "All", category: "Figs", measure: 30493.1686 }, 
{ groPunjab: "All", category: "Mangos", measure: 56097.0151 }, 
{ groPunjab: "Maharashta", category: "Oranges", measure: 19441.5648 }, 
{ groPunjab: "Maharashta", category: "Apples", measure: 25922.0864 }, 
{ groPunjab: "Maharashta", category: "Grapes", measure: 9720.7824 }, 
{ groPunjab: "Maharashta", category: "Figs", measure: 6480.5216 }, 
{ groPunjab: "Maharashta", category: "Mangos", measure: 19441.5648 }, 
{ groPunjab: "UP", category: "Oranges", measure: 22913.2728 }, 
{ groPunjab: "UP", category: "Apples", measure: 7637.7576 }, 
{ groPunjab: "UP", category: "Grapes", measure: 23549.7526 }, 
{ groPunjab: "UP", category: "Figs", measure: 1909.4394 }, 
{ groPunjab: "UP", category: "Mangos", measure: 7637.7576 }, 
{ groPunjab: "MP", category: "Oranges", measure: 1041.5124 }, 
{ groPunjab: "MP", category: "Apples", measure: 2430.1956 }, 
{ groPunjab: "MP", category: "Grapes", measure: 15275.5152 }, 
{ groPunjab: "MP", category: "Figs", measure: 4166.0496 }, 
{ groPunjab: "MP", category: "Mangos", measure: 11803.8072 }, 
{ groPunjab: "Rajasthan", category: "Oranges", measure: 7406.3104 }, 
{ groPunjab: "Rajasthan", category: "Apples", measure: 2545.9192 }, 
{ groPunjab: "Rajasthan", category: "Grapes", measure: 1620.1304 }, 
{ groPunjab: "Rajasthan", category: "Figs", measure: 8563.5464 }, 
{ groPunjab: "Rajasthan", category: "Mangos", measure: 3008.8136 }, 
{ groPunjab: "Punjab", category: "Oranges", measure: 7637.7576 }, 
{ groPunjab: "Punjab", category: "Apples", measure: 35411.4216 }, 
{ groPunjab: "Punjab", category: "Grapes", measure: 8332.0992 }, 
{ groPunjab: "Punjab", category: "Figs", measure: 6249.0744 }, 
{ groPunjab: "Punjab", category: "Mangos", measure: 11803.8072 }, 
{ groPunjab: "Karnataka", category: "Oranges", measure: 3182.399 }, 
{ groPunjab: "Karnataka", category: "Apples", measure: 867.927 }, 
{ groPunjab: "Karnataka", category: "Grapes", measure: 1808.18125 }, 
{ groPunjab: "Karnataka", category: "Figs", measure: 795.59975 }, 
{ groPunjab: "Karnataka", category: "Mangos", measure: 578.618 }, 
{ groPunjab: "Punjab", category: "Oranges", measure: 2227.6793 }, 
{ groPunjab: "Punjab", category: "Apples", measure: 3442.7771 }, 
{ groPunjab: "Punjab", category: "Grapes", measure: 303.77445 }, 
{ groPunjab: "Punjab", category: "Figs", measure: 2328.93745 }, 
{ groPunjab: "Punjab", category: "Mangos", measure: 1822.6467 }, 
]
;

// set initial groPunjab value
var groPunjab = "All";

function datasetBarChosen(groPunjab) {
	var ds = [];
	for (x in datasetBarChart) {
		 if(datasetBarChart[x].groPunjab==groPunjab){
		 	ds.push(datasetBarChart[x]);
		 } 
		}
	return ds;
}


function dsBarChartBasics() {

		var margin = {top: 30, right: 5, bottom: 20, left: 50},
		width = 500 - margin.left - margin.right,
	   height = 250 - margin.top - margin.bottom,
		colorBar = d3.scale.category20(),
		barPadding = 1
		;
		
		return {
			margin : margin, 
			width : width, 
			height : height, 
			colorBar : colorBar, 
			barPadding : barPadding
		}			
		;
}

function dsBarChart() {

	var firstDatasetBarChart = datasetBarChosen(groPunjab);         	
	
	var basics = dsBarChartBasics();
	
	var margin = basics.margin,
		width = basics.width,
	   height = basics.height,
		colorBar = basics.colorBar,
		barPadding = basics.barPadding
		;
					
	var 	xScale = d3.scale.linear()
						.domain([0, firstDatasetBarChart.length])
						.range([0, width])
						;
						
	// Create linear y scale 
	// Purpose: No matter what the data is, the bar should fit into the svg area; bars should not
	// get higher than the svg height. Hence incoming data needs to be scaled to fit into the svg area.  
	var yScale = d3.scale.linear()
			// use the max funtion to derive end point of the domain (max value of the dataset)
			// do not use the min value of the dataset as min of the domain as otherwise you will not see the first bar
		   .domain([0, d3.max(firstDatasetBarChart, function(d) { return d.measure; })])
		   // As coordinates are always defined from the top left corner, the y position of the bar
		   // is the svg height minus the data value. So you basically draw the bar starting from the top. 
		   // To have the y position calculated by the range function
		   .range([height, 0])
		   ;
	
	//Create SVG element
	
	var svg = d3.select("#barChart")
			.append("svg")
		    .attr("width", width + margin.left + margin.right)
		    .attr("height", height + margin.top + margin.bottom)
		    .attr("id","barChartPlot")
		    ;
	
	var plot = svg
		    .append("g")
		    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
		    ;
	            
	plot.selectAll("rect")
		   .data(firstDatasetBarChart)
		   .enter()
		   .append("rect")
			.attr("x", function(d, i) {
			    return xScale(i);
			})
		   .attr("width", width / firstDatasetBarChart.length - barPadding)   
			.attr("y", function(d) {
			    return yScale(d.measure);
			})  
			.attr("height", function(d) {
			    return height-yScale(d.measure);
			})
			.attr("fill", "lightgrey")
			;
	
		
	// Add y labels to plot	
	
	plot.selectAll("text")
	.data(firstDatasetBarChart)
	.enter()
	.append("text")
	.text(function(d) {
			return formatAsInteger(d3.round(d.measure));
	})
	.attr("text-anchor", "middle")
	// Set x position to the left edge of each bar plus half the bar width
	.attr("x", function(d, i) {
			return (i * (width / firstDatasetBarChart.length)) + ((width / firstDatasetBarChart.length - barPadding) / 2);
	})
	.attr("y", function(d) {
			return yScale(d.measure) + 14;
	})
	.attr("class", "yAxis")
	/* moved to CSS			   
	.attr("font-family", "sans-serif")
	.attr("font-size", "11px")
	.attr("fill", "white")
	*/
	;
	
	// Add x labels to chart	
	
	var xLabels = svg
		    .append("g")
		    .attr("transform", "translate(" + margin.left + "," + (margin.top + height)  + ")")
		    ;
	
	xLabels.selectAll("text.xAxis")
		  .data(firstDatasetBarChart)
		  .enter()
		  .append("text")
		  .text(function(d) { return d.category;})
		  .attr("text-anchor", "middle")
			// Set x position to the left edge of each bar plus half the bar width
						   .attr("x", function(d, i) {
						   		return (i * (width / firstDatasetBarChart.length)) + ((width / firstDatasetBarChart.length - barPadding) / 2);
						   })
		  .attr("y", 15)
		  .attr("class", "xAxis")
		  //.attr("style", "font-size: 12; font-family: Helvetica, sans-serif")
		  ;			
	 
	// Title
	
	svg.append("text")
		.attr("x", (width + margin.left + margin.right)/2)
		.attr("y", 15)
		.attr("class","title")				
		.attr("text-anchor", "middle")
		.text("Overall Sales Breakdown 2012")
		;
}

dsBarChart();

 /* ** PunjabDATE CHART ** */
 
/* Punjabdates bar chart on request */

function PunjabdateBarChart(groPunjab, colorChosen) {
	
		var currentDatasetBarChart = datasetBarChosen(groPunjab);
		
		var basics = dsBarChartBasics();
	
		var margin = basics.margin,
			width = basics.width,
		   height = basics.height,
			colorBar = basics.colorBar,
			barPadding = basics.barPadding
			;
		
		var 	xScale = d3.scale.linear()
			.domain([0, currentDatasetBarChart.length])
			.range([0, width])
			;
		
			
		var yScale = d3.scale.linear()
	      .domain([0, d3.max(currentDatasetBarChart, function(d) { return d.measure; })])
	      .range([height,0])
	      ;
	      
	   var svg = d3.select("#barChart svg");
	      
	   var plot = d3.select("#barChartPlot")
	   	.datum(currentDatasetBarChart)
		   ;
	
	  		/* Note that here we only have to select the elements - no more appending! */
	  	plot.selectAll("rect")
	      .data(currentDatasetBarChart)
	      .transition()
			.duration(750)
			.attr("x", function(d, i) {
			    return xScale(i);
			})
		   .attr("width", width / currentDatasetBarChart.length - barPadding)   
			.attr("y", function(d) {
			    return yScale(d.measure);
			})  
			.attr("height", function(d) {
			    return height-yScale(d.measure);
			})
			.attr("fill", colorChosen)
			;
		
		plot.selectAll("text.yAxis") // target the text element(s) which has a yAxis class defined
			.data(currentDatasetBarChart)
			.transition()
			.duration(750)
		   .attr("text-anchor", "middle")
		   .attr("x", function(d, i) {
		   		return (i * (width / currentDatasetBarChart.length)) + ((width / currentDatasetBarChart.length - barPadding) / 2);
		   })
		   .attr("y", function(d) {
		   		return yScale(d.measure) + 14;
		   })
		   .text(function(d) {
				return formatAsInteger(d3.round(d.measure));
		   })
		   .attr("class", "yAxis")					 
		;
		

		svg.selectAll("text.title") // target the text element(s) which has a title class defined
			.attr("x", (width + margin.left + margin.right)/2)
			.attr("y", 15)
			.attr("class","title")				
			.attr("text-anchor", "middle")
			.text(groPunjab + "'s Sales Breakdown 2012")
		;
}


/*
############# LINE CHART ##################
-------------------------------------------
*/

var datasetLineChart = [
{ groPunjab: "All", category: 2008, measure: 289309 }, 
{ groPunjab: "All", category: 2009, measure: 234998 }, 
{ groPunjab: "All", category: 2010, measure: 310900 }, 
{ groPunjab: "All", category: 2011, measure: 223900 }, 
{ groPunjab: "All", category: 2012, measure: 234500 }, 
{ groPunjab: "Maharashta", category: 2008, measure: 81006.52 }, 
{ groPunjab: "Maharashta", category: 2009, measure: 70499.4 }, 
{ groPunjab: "Maharashta", category: 2010, measure: 96379 }, 
{ groPunjab: "Maharashta", category: 2011, measure: 64931 }, 
{ groPunjab: "Maharashta", category: 2012, measure: 70350 }, 
{ groPunjab: "UP", category: 2008, measure: 63647.98 }, 
{ groPunjab: "UP", category: 2009, measure: 61099.48 }, 
{ groPunjab: "UP", category: 2010, measure: 87052 }, 
{ groPunjab: "UP", category: 2011, measure: 58214 }, 
{ groPunjab: "UP", category: 2012, measure: 58625 }, 
{ groPunjab: "Rajasthan", category: 2008, measure: 23144.72 }, 
{ groPunjab: "Rajasthan", category: 2009, measure: 14099.88 }, 
{ groPunjab: "Rajasthan", category: 2010, measure: 15545 }, 
{ groPunjab: "Rajasthan", category: 2011, measure: 11195 }, 
{ groPunjab: "Rajasthan", category: 2012, measure: 11725 }, 
{ groPunjab: "MP", category: 2008, measure: 34717.08 }, 
{ groPunjab: "MP", category: 2009, measure: 30549.74 }, 
{ groPunjab: "MP", category: 2010, measure: 34199 }, 
{ groPunjab: "MP", category: 2011, measure: 33585 }, 
{ groPunjab: "MP", category: 2012, measure: 35175 }, 
{ groPunjab: "Punjab", category: 2008, measure: 69434.16 }, 
{ groPunjab: "Punjab", category: 2009, measure: 46999.6 }, 
{ groPunjab: "Punjab", category: 2010, measure: 62180 }, 
{ groPunjab: "Punjab", category: 2011, measure: 40302 }, 
{ groPunjab: "Punjab", category: 2012, measure: 42210 }, 
{ groPunjab: "Karnataka", category: 2008, measure: 7232.725 }, 
{ groPunjab: "Karnataka", category: 2009, measure: 4699.96 }, 
{ groPunjab: "Karnataka", category: 2010, measure: 6218 }, 
{ groPunjab: "Karnataka", category: 2011, measure: 8956 }, 
{ groPunjab: "Karnataka", category: 2012, measure: 9380 }, 
{ groPunjab: "Punjab", category: 2008, measure: 10125.815 }, 
{ groPunjab: "Punjab", category: 2009, measure: 7049.94 }, 
{ groPunjab: "Punjab", category: 2010, measure: 9327 }, 
{ groPunjab: "Punjab", category: 2011, measure: 6717 }, 
{ groPunjab: "Punjab", category: 2012, measure: 7035 }
]
;

// set initial category value
var groPunjab = "All";

function datasetLineChartChosen(groPunjab) {
	var ds = [];
	for (x in datasetLineChart) {
		 if(datasetLineChart[x].groPunjab==groPunjab){
		 	ds.push(datasetLineChart[x]);
		 } 
		}
	return ds;
}

function dsLineChartBasics() {

	var margin = {top: 20, right: 10, bottom: 0, left: 50},
	    width = 500 - margin.left - margin.right,
	    height = 150 - margin.top - margin.bottom
	    ;
		
		return {
			margin : margin, 
			width : width, 
			height : height
		}			
		;
}


function dsLineChart() {

	var firstDatasetLineChart = datasetLineChartChosen(groPunjab);    
	
	var basics = dsLineChartBasics();
	
	var margin = basics.margin,
		width = basics.width,
	   height = basics.height
		;

	var xScale = d3.scale.linear()
	    .domain([0, firstDatasetLineChart.length-1])
	    .range([0, width])
	    ;

	var yScale = d3.scale.linear()
	    .domain([0, d3.max(firstDatasetLineChart, function(d) { return d.measure; })])
	    .range([height, 0])
	    ;
	
	var line = d3.svg.line()
	    //.x(function(d) { return xScale(d.category); })
	    .x(function(d, i) { return xScale(i); })
	    .y(function(d) { return yScale(d.measure); })
	    ;
	
	var svg = d3.select("#lineChart").append("svg")
	    .datum(firstDatasetLineChart)
	    .attr("width", width + margin.left + margin.right)
	    .attr("height", height + margin.top + margin.bottom)
	    // create groPunjab and move it so that margins are respected (space for axis and title)
	    
	var plot = svg
	    .append("g")
	    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
	    .attr("id", "lineChartPlot")
	    ;

		/* descriptive titles as part of plot -- start */
	var dsLength=firstDatasetLineChart.length;

	plot.append("text")
		.text(firstDatasetLineChart[dsLength-1].measure)
		.attr("id","lineChartTitle2")
		.attr("x",width/2)
		.attr("y",height/2)	
		;
	/* descriptive titles -- end */
	    
	plot.append("path")
	    .attr("class", "line")
	    .attr("d", line)	
	    // add color
		.attr("stroke", "lightgrey")
	    ;
	  
	plot.selectAll(".dot")
	    .data(firstDatasetLineChart)
	  	 .enter().append("circle")
	    .attr("class", "dot")
	    //.attr("stroke", function (d) { return d.measure==datasetMeasureMin ? "red" : (d.measure==datasetMeasureMax ? "green" : "steelblue") } )
	    .attr("fill", function (d) { return d.measure==d3.min(firstDatasetLineChart, function(d) { return d.measure; }) ? "red" : (d.measure==d3.max(firstDatasetLineChart, function(d) { return d.measure; }) ? "green" : "white") } )
	    //.attr("stroke-width", function (d) { return d.measure==datasetMeasureMin || d.measure==datasetMeasureMax ? "3px" : "1.5px"} )
	    .attr("cx", line.x())
	    .attr("cy", line.y())
	    .attr("r", 3.5)
	    .attr("stroke", "lightgrey")
	    .append("title")
	    .text(function(d) { return d.category + ": " + formatAsInteger(d.measure); })
	    ;

	svg.append("text")
		.text("Performance 2012")
		.attr("id","lineChartTitle1")	
		.attr("x",margin.left + ((width + margin.right)/2))
		.attr("y", 10)
		;

}

dsLineChart();


 /* ** PunjabDATE CHART ** */
 
/* Punjabdates bar chart on request */
function PunjabdateLineChart(groPunjab, colorChosen) {

	var currentDatasetLineChart = datasetLineChartChosen(groPunjab);   

	var basics = dsLineChartBasics();
	
	var margin = basics.margin,
		width = basics.width,
	   height = basics.height
		;

	var xScale = d3.scale.linear()
	    .domain([0, currentDatasetLineChart.length-1])
	    .range([0, width])
	    ;

	var yScale = d3.scale.linear()
	    .domain([0, d3.max(currentDatasetLineChart, function(d) { return d.measure; })])
	    .range([height, 0])
	    ;
	
	var line = d3.svg.line()
    .x(function(d, i) { return xScale(i); })
    .y(function(d) { return yScale(d.measure); })
    ;

   var plot = d3.select("#lineChartPlot")
   	.datum(currentDatasetLineChart)
	   ;
	   
	/* descriptive titles as part of plot -- start */
	var dsLength=currentDatasetLineChart.length;
	
	plot.select("text")
		.text(currentDatasetLineChart[dsLength-1].measure)
		;
	/* descriptive titles -- end */
	   
	plot
	.select("path")
		.transition()
		.duration(750)			    
	   .attr("class", "line")
	   .attr("d", line)	
	   // add color
		.attr("stroke", colorChosen)
	   ;
	   
	var path = plot
		.selectAll(".dot")
	   .data(currentDatasetLineChart)
	   .transition()
		.duration(750)
	   .attr("class", "dot")
	   .attr("fill", function (d) { return d.measure==d3.min(currentDatasetLineChart, function(d) { return d.measure; }) ? "red" : (d.measure==d3.max(currentDatasetLineChart, function(d) { return d.measure; }) ? "green" : "white") } )
	   .attr("cx", line.x())
	   .attr("cy", line.y())
	   .attr("r", 3.5)
	   // add color
		.attr("stroke", colorChosen)
	   ;
	   
	   path
	   .selectAll("title")
	   .text(function(d) { return d.category + ": " + formatAsInteger(d.measure); })	 
	   ;  

}