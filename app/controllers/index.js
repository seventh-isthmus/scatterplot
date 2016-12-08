
var addr = "https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/cyclist-data.json"

var margins = {
"top": 50,
"left": 30,
"bottom": 20,
"right": 10
}

var height = 700 - margins.top - margins.bottom;
var width = 700 - margins.left - margins.right;


//Set size of svg element
d3.select("svg")
.attr("height", height + margins.top + margins.bottom)
.attr("width", width + margins.left + margins.right)



d3.json(addr, function(data){

var maxRank = d3.max(data, function(d){return d.Place})
var maxTime = d3.max(data, function(d){return d.Seconds})
var minTime = d3.min(data, function(d){return d.Seconds})
var xScale = d3.scaleLinear().domain([maxTime, minTime]).range([0,width])
var yScale = d3.scaleLinear().domain([maxRank, 0]).range([height, 0])
var radius = 5;

//I've not changed the dimensions of 'barchart'

//Append and Adjust Parent Element


d3.select("svg")
.append("g")
.attr("id", "containerG")
.attr("transform", "translate(" + margins.left + "," + margins.top + ")")

var yAxis = d3.axisLeft().scale(yScale).tickSize(0)
d3.select("#containerG").append("g").attr("id", "yAxisG").attr("transform", "translate(0,0)").call(yAxis);//These transforms should be factor of the size

var xAxis = d3.axisBottom().scale(xScale).tickSize(0)
d3.select("#containerG").append("g").attr("id", "xAxisG").attr("transform", "translate(0," + height + ")").call(xAxis);

//Create a container for the points


d3.select("#containerG")
.append("g")
.attr("id", "pointsG")

d3.select("#pointsG")
.selectAll("g")
.data(data)
.enter()
.append("g")
.attr("class","overallG")


var pointsG = d3.selectAll("g.overallG")

pointsG
.append("circle")
.attr("r", radius)
.attr("cx", function(d, i){return xScale(d.Seconds)})
.attr("cy", function(d) {return yScale(d.Place)})
.style("fill", "black")
.style("stroke-width", "3px")
.style("stroke", "#7035BB")
//Code for tooltip
.on("mouseover", function(d){
var rect = d3.select(this);
rect.attr("class", "mouseover")
var name = d.Name;
var year = d.Year;
var nationality = d.Nationality;
var doping = d.Doping;
var url = d.URL;
var place = d.Place;
var raceTime = d.Time;
div.style("opacity", .9)
div.html("<span class='name'>" + name + "</span><br><span class='year'>" + year + "</span><br><span class='nationality'>" + nationality + "</span><br><span class='doping'>" + doping + "</span><br><span class='url'>" + url + "</span>")
.style("left", (d3.event.pageX + 5) + "px")
.style("top", (d3.event.pageY - 50) + "px");

})


})
