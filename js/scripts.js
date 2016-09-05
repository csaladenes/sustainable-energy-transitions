/*This software is released under the MIT License

Copyright (C) 2015 Denes Csala http://www.csaladen.es

This website accompanies the research paper entitled
A Net Energy-based Target Setting for a Climate-constrained Energy Transition 
by Sgouris Sgouridis, Ugo Bardi & Denes Csala

*/

//set global database path

//var datapath = "https://dl.dropboxusercontent.com/u/531697/datarepo/Set/"
//var datapath = "http://set.csaladen.es/"  //if data on github server
var datapath = "" //for local testing


//function to display content (from hash or menu)
function disp_content(a,hash){
	//hide all
	d3.select("#content").transition().style("opacity", 0);
	d3.select("#description").transition().style("opacity", 0);
	//send backwards
	d3.select("#content").style("z-index", -1);
	d3.select("#description").style("z-index", -1);
	//set title
	var text="Morphology";
	if (a=="#description") {text="Description"};
	d3.select("#titletext").text("Sustainable Energy Transitions "+text);
	//show and bring forward
	d3.select(a).transition().style("opacity", 1);
	d3.select(a).style("z-index", 0);
	window.location.hash=hash;
}

//window.location.hash = "&10&1998&~-World" //set this if you want a predefined destination
var myhash=window.location.hash
var inithash=myhash;


//<!--DYNAMIC SELECTORS-->

d3.select("#chart").style("width", document.getElementById("chart").offsetWidth - sizecorrection);
d3.select("#main").style("width", Math.min(document.getElementById("chart").offsetWidth - 40, document.getElementById("chart").offsetHeight*1.26));
d3.select("#titlebar").style("width", document.getElementById("titlebar").offsetWidth - sizecorrection);
var demands=[667,753,850,961,1086,1227,1386,1566,1770,2000,2210,2442,2698,2982,3295,3641,4023,4446,4912,5428,5998];
var eroeis=[7,8,9,10,11,12,14,16,18,20,22,24,27,30,33,36,40,44,49,54,60];

var source=function(){
	var genders = document.getElementsByName("r1");
	for(var i = 0; i < genders.length; i++) {
	   if(genders[i].checked == true) {
		   selectedGender = genders[i].value;
	   }
	 }
	 return selectedGender;
}
var demand = d3.select("#demand");
var eroei = d3.select("#eroei");
var years = d3.select("#years");
var demand2 = d3.select("#demand2");
var eroei2 = d3.select("#eroei2");
var years2 = d3.select("#years2");
for (var key in demands) {
	demand.append("option").text(demands[key]);
	demand.node().value=2000;
}
for (var key in eroeis) {
	eroei.append("option").text(eroeis[key]);
	eroei.node().value=20;
}
for (var i=2001;i<2101;i++) {
	years.append("option").text(i);
	years.node().value=2100;
}

var dr2=1;

var yearclick=function(){dr2=0;d3.select("#main").attr("src","plots/Surface_Year"+years.node().value+"_"+source()+".png");}
var eroeiclick=function(){dr2=1;d3.select("#main").attr("src","plots/Demand_Sensitivity_"+source()+"_EROEI"+eroei.node().value+".png");}
var demandclick=function(){dr2=2;d3.select("#main").attr("src","plots/EROEI_Sensitivity_"+source()+"_Demand"+demand.node().value+".png");}
var demandplus=function(){
	demand.node().selectedIndex=Math.min(demand.node().length-1,demand.property("selectedIndex")+1);
	demandclick();
}
var demandminus=function(){
	demand.node().selectedIndex=Math.max(0,demand.property("selectedIndex")-1);
	demandclick();
}
var eroeiplus=function(){
	eroei.node().selectedIndex=Math.min(eroei.node().length-1,eroei.property("selectedIndex")+1);
	eroeiclick();
}
var eroeiminus=function(){
	eroei.node().selectedIndex=Math.max(0,eroei.property("selectedIndex")-1);
	eroeiclick();
}
var yearsplus=function(){
	years.node().selectedIndex=Math.min(years.node().length-1,years.property("selectedIndex")+1);
	yearclick();
}
var yearsminus=function(){
	years.node().selectedIndex=Math.max(0,years.property("selectedIndex")-1);
	yearclick();
}

demand.on("click", demandclick);
eroei.on("click", eroeiclick);
years.on("click", yearclick);
demand.on("change", demandclick);
eroei.on("change", eroeiclick);
years.on("change", yearclick);

d3.select("#years_minus").on("click", yearsminus);
d3.select("#years_plus").on("click", yearsplus);
d3.select("#eroei_minus").on("click", eroeiminus);
d3.select("#eroei_plus").on("click", eroeiplus);
d3.select("#demand_minus").on("click", demandminus);
d3.select("#demand_plus").on("click", demandplus);

var scrollscatter=function(a){
		if (a<0) {
			if (dr2==0) yearsplus()
			else if (dr2==1)  eroeiplus()
			else if (dr2==2)  demandplus()
		}
		else {
			if (dr2==0) yearsminus()
			else if (dr2==1)  eroeiminus()
			else if (dr2==2)  demandminus()
		}
	}
	
d3.selectAll(".r1").on("click", function(){
	if (dr2==0) yearclick()
	else if (dr2==1)  eroeiclick()
	else if (dr2==2)  demandclick()
});

document.addEventListener("keydown", function ( event ) {
	if (( event.keyCode == 27 ) || ( event.keyCode >= 33 && event.keyCode <= 34 ) || (event.keyCode >= 37 && event.keyCode <= 40)) {
		switch( event.keyCode ) {
			case 27: // ESC for help
				if (document.getElementById('helppop').style.display=='block') document.getElementById('helppop').style.display='none';
				else document.getElementById('helppop').style.display='block';
				break;
			case 33: // pg up
			case 37: // left
			case 38: // up
					 scrollscatter(1); //scroll if on the scatter page
					 break;
			case 34: // pg down
			case 39: // right
			case 40: // down 
					 scrollscatter(-1);
					 break;
		}
		
		event.preventDefault();
	}
}, false);
