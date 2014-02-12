$(document).ready(function() {
	
	//Function for slicing an array, see http://stackoverflow.com/questions/8495687/split-array-into-chunks
	Array.prototype.chunk = function(chunkSize) {
		var array=this;
		return [].concat.apply([],
			array.map(function(elem,i) {
				return i%chunkSize ? [] : [array.slice(i,i+chunkSize)];
			})
		);
	};

	// set up the svg 	
	var w = 600;
	var h = 180;
	var svg = d3.select("#visualization");
	svg.attr("width", w).attr("height", h);

	//setting variables for drawing
	var BW = 5; //Bar width
	var BTW = BW + 1; //Bar Total Width
	var CR = 6; //Circle Radius
	var CRB = 20; //Circle Radius (big)
	var OL = 50; //Offset Left

/* 	
	This data reflects the unemployment rate (%) in the US from 2003-2012. It's just a flat array to make it easier for you to create a simple visualization. If you wish, you may re-structure the data (e.g. splitting it by year, etc).
*/
	
	dataset = [101,125,90,98,117,113,122,107,100,108,122,80,85,78,82,109,119,113,119,103,125,101,108,107,76,104,82,82,117,90,110,105,104,119,88,102,121,112,81,110,119,108,110,95,80,107,107,90,92,85,101,101,101,81,106,102,120,96,123,99,83,124,88,121,124,111,84,96,93,100,115,113,87,77,93,84,84,78,84,112,88,96,102,85];
	
	//The dataset split up by years
	datasetByAnno = dataset.chunk(12);
	datasetByAnnoMedian = [];
	for (var u = 0; u < datasetByAnno.length; u++){
		datasetByAnnoMedian[u] = d3.mean(datasetByAnno[u]);
	}
	
	//Setting the scales for the graph
	var yScale = d3.scale.linear()
		.domain([0, 130])
		.range([0, h-30]);
	var yAxisScale = d3.scale.linear()
		.domain([0, 130])
		.range([h-30, 0]);
	
	//Creating the y-axis
	var yAxis = d3.svg.axis()
        .scale(yAxisScale)
        .orient("left")
		.ticks(5);
	svg.append("g")
		.attr("class", "axis")
		.attr("transform", "translate(40," + 10 + ")")
		.call(yAxis);
	
	//Drawing the bars of the graph
	svg.selectAll("rect")
		.data(dataset)
		.enter()
		.append("rect")
		.attr({
			"width": BW,
			"height": function(d, i) {
			    return yScale(d);
			},
			"x": function(d, i) {
				return OL + i*BTW;
			},
			"y": function(d, i) {
				return h - 20 - yScale(d);
			},
			"desc": function(d, i) {
				return d;
			},
			"fill" : function(d, i){
				if(i<12){return "#a5c9e5";}
				else if(i<24){return "#95bcdd";}
				else if(i<36){return "#85afd6";}
				else if(i<48){return "#6d9dcb";}
				else if(i<60){return "#5a8ec3";}
				else if(i<72){return "#447cb8";}
				else if(i<84){return "#2262a8";}
				else {return "#004799";}; //Setting the colors (blue gradient)
			},
			"class" : "bar"
	    });
	
	//Drawing the line for the median values	
	var line = d3.svg.line()
		.x(function(d,i) { 
			return OL + (BTW*5) + i*(BTW*12) + CR / 2; 
		})
		.y(function(d) { 
			return h - 20 - yScale(d) + CR / 2;
		});
	svg.append("svg:path").attr("d", line(datasetByAnnoMedian))
		.attr({
			"fill": "none",
			"stroke": "white",
			"stroke-width": 2
		});
		
	//Defining the data for the circles
    var elem = svg.selectAll("g myCircleText")
        .data(datasetByAnnoMedian);
		
	//Create and place the "blocks" containing the circle and the text  
    var elemEnter = elem.enter()
        .append("g")
        .attr({
			"transform": function (d, i) {
				var x = OL + (BTW*5) + i*(BTW*12) + CR / 2;
				var y = h - 20 - yScale(d) + CR / 2;
				return "translate(" + x + "," + y + ")"; 
			},
			"class" : "avgCircle"
		});
	
	//Drawing the rects in the bottom, this is used as x-axis	
	elem.enter()
		.append("rect")
		.attr({
			"x": function (d, i ){
				return OL + i*12*BTW;
			},
			"y": function(d, i) {
				return h -40;
			},
			"width": function (d, i){
				if(i==7){return 40;}
				else{return BTW * 12 - 1;};
			},
			"height":20,
			"fill" : function (d, i) {
				if(i<1){return "#a5c9e5";}
				else if(i<2){return "#95bcdd";}
				else if(i<3){return "#85afd6";}
				else if(i<4){return "#6d9dcb";}
				else if(i<5){return "#5a8ec3";}
				else if(i<6){return "#447cb8";}
				else if(i<7){return "#2262a8";}
				else {return "#004799";};
			}
		});
		
	//Adding text to the x-axis rects
	elem.enter()
		.append("text")
		.attr({
			"x" : function (d , i) {
				if(i==7){return OL + i*12*BTW;}
				else{return OL + i*12*BTW + 15;};
			},
			"y" : function (d, i) {
				return h -25;
			},
			"font-family" : "monospace",
			"fill" : "white",
			"font-size" : "14px",
			"font-weight" : "bold"
		})
		.text(function (d, i){
			if(i<1){return "05.02";}
			else if(i<2){return "06.02";}
			else if(i<3){return "07.02";}
			else if(i<4){return "08.02";}
			else if(i<6){return "09.02";}
			else if(i<7){return "10.02";}
			else {return "today";};
		});

    //Create the circles for the graph
    elemEnter.append("circle")
        .attr("r", function(d){return CR;} )
        .attr("fill", "white");

    //Create the text for each circle
    elemEnter.append("text")
        .attr({
			"x" : function (d , i) {
				return - 13;
			},
			"y" : function (d, i) {
				return + 5;
			},
			"font-family" : "monospace",
			"opacity" : "0",
			"fill" : "#1987c3",
			"font-size" : "14px",
			"font-weight" : "bold"
		})
        .text(function (d, i){
			var txt = d.toString().split(".")[0];
			if(txt.length==2){txt = "0" + txt};
			return txt;
		});
	
	//Animating the rects of the diagrams on hover
	$(".bar").hover(
		function() {
			var y = parseFloat($(this).attr("y")) + 0;
			$(this).css("opacity", "0.6").attr("y", y);
			
			//Setting the info-text
			var txt = $(this).attr("desc");
			var left = $(this).position().left - 25;
			var top = h + 70;
			$(".info").text(txt).css({"left" : left, "top" : top}).show();
		}, 
		function() {
			var y = parseFloat($(this).attr("y")) - 0;
			$(this).css("opacity", "1").attr("y", y);
			$(".info").hide();
		}
	);
	
	//Animating the circles on hover
	svg.selectAll(".avgCircle")
        .on("mouseover", function(){
			d3.select(this.children[0]) //the circle
				.transition()
					.duration(300)    
					.attr("r", CRB);
			d3.select(this.children[1]) //the text
				.transition()
					.duration(300)    
					.attr("opacity", "1");
		})
        .on("mouseout", function(){
			d3.select(this.children[0]) //the circle
				.transition()
					.duration(300)    
					.attr("r", CR);
			d3.select(this.children[1]) //the text
				.transition()
					.duration(300)    
					.attr("opacity", "0");
		});
});