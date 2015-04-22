// Canvas for displaying the poem
var canvas, context;

//Varibles holding the quadrants
var firstQuadrantData,secondQuadrantData,thirdQuadrantData,fourthQuadrantData, centreData;

// D3 variables for projecting the maps
var projection, path, group;

//variables for storing paths for different countries
var data_US,data_CHN,data_RUS,data_ARA,data_IND;

//Maps involved in the projection
var data1,data2;

//Object for storing poems
var poems;

//Source Language
var srcLang = "NA";

//List of Projections we will use
var projections= ['mercator','','','',''];


//The current Projection Type
var cur_projection='mercator';

//Poem Number
var poemnumber=0;
var max_poems = 1;
var min_poems = 0;

//Language Phrases
var L1 = '';
var L2 = '';
var L3 = '';
var L4 = '';
var L5 = '';
var L12 = '';
var L13 = '';
var L14 = '';
var L15 = '';
var L23 = '';
var L34 = '';
var L45 = '';
var L25 = '';
var L123 = '';
var L134 = '';
var L145 = '';
var L125 = '';

//Layout stuff for D3
canvas = document.getElementById('myCanvas');
context = canvas.getContext('2d');


//Mouse Event Listener
document.addEventListener( 'mousemove', onDocumentMouseMove, false );

// Periodically change the poems
window.setInterval(getnewpoem, 5000);

// Periodically change the projection
//window.setInterval(changeprojection, 5000);


//Here is where all the heavy lifting happens
loadMaps();
loadPoems();
setQuadrants(srcLang);
getnewpoem();
initD3();


// init D3
function initD3(){
  var width = window.innerWidth, height = window.innerHeight;
  var color = d3.scale.category10();
// create a svg graphic to show the maps of countries
var svg = d3.select("body").append("svg").attr("width",width).attr("height",height);
// add a projection function to move certain map to the center of the html page
projection = d3.geo.mercator().scale(width / 6).translate([width / 2, height / 2]);
// the path function translates GEOJson objects into svg path data
path = d3.geo.path().projection(projection);
// tranform the GEOJson object into svg path data and display it into html
d3.json("maps/NA.geo.json", function(data)
{
  group = svg.append("g").attr("id","group");
  group.selectAll("path").data(data.features).enter().append("path").attr("d",path);

});
}

function loadMaps() {
  jQuery.ajax({
    url:    'maps/NA.geo.json',
    success: function(data){
      data_US = data;

    },
    async:   false
  });

  jQuery.ajax({
    url:    'maps/CHN.geo.json',
    success: function(data){
      data_CHN = data;

    },
    async:   false
  });
  jQuery.ajax({
    url:    'maps/RUS.geo.json',
    success: function(data){
      data_RUS = data;

    },
    async:   false
  });
  jQuery.ajax({
    url:    'maps/ARA.geo.json',
    success: function(data){
      data_ARA = data;

    },
    async:   false
  });
  jQuery.ajax({
    url:    'maps/IND.geo.json',
    success: function(data){
      data_IND = data;

    },
    async:   false
  });

}


function loadPoems() {
    jQuery.ajax({
         url:    'data/'+srcLang+'.json',
         success: function(data){
            poems = data;
          },
         async:   false
    });
}

function getnewpoem() {
  poemnumber = Math.floor(Math.random() * (max_poems - min_poems + 1)) + min_poems;
  L1 = (poems[poemnumber][0]['L1']);
  L2 = (poems[poemnumber][0]['L2']);
  L3 = (poems[poemnumber][0]['L3']);
  L4 = (poems[poemnumber][0]['L4']);
  L5 = (poems[poemnumber][0]['L5']);
  L12 = (poems[poemnumber][0]['L12']);
  L13 = (poems[poemnumber][0]['L13']);
  L14 = (poems[poemnumber][0]['L14']);
  L15 = (poems[poemnumber][0]['L15']);
  L23 = (poems[poemnumber][0]['L23']);
  L34 = (poems[poemnumber][0]['L34']);
  L45 = (poems[poemnumber][0]['L45']);
  L25 = (poems[poemnumber][0]['L25']);
  L123 = (poems[poemnumber][0]['L123']);
  L134 = (poems[poemnumber][0]['L134']);
  L145 = (poems[poemnumber][0]['L145']);
  L125 = (poems[poemnumber][0]['L125']);

  }


function setQuadrants(srclang)
{
  switch(srclang)
  {
    case "NA":
    firstQuadrantData = data_CHN;
    secondQuadrantData=data_RUS;
    thirdQuadrantData = data_ARA;
    fourthQuadrantData = data_IND;
    centreData = data_US;
    break;
    case "CHN":
    firstQuadrantData = data_RUS;
    secondQuadrantData=data_US;
    thirdQuadrantData = data_ARA;
    fourthQuadrantData = data_IND;
    centreData = data_CHN;
    break;
    case "RUS":
    firstQuadrantData = data_CHN;
    secondQuadrantData=data_US;
    thirdQuadrantData = data_ARA;
    fourthQuadrantData = data_IND;
    centreData = data_RUS;
    break;
    case "ARA":
    firstQuadrantData = data_CHN;
    secondQuadrantData=data_RUS;
    thirdQuadrantData = data_US;
    fourthQuadrantData = data_IND;
    centreData = data_ARA;
    break;
    case "IND":
    firstQuadrantData = data_CHN;
    secondQuadrantData=data_RUS;
    thirdQuadrantData = data_US;
    fourthQuadrantData = data_ARA;
    centreData = data_IND;
    break;
  }


}

// set the center map of D3
function d3MorphMap(data1,data2,coefficient,project){

  var width = window.innerWidth;
  var height = 400;



  var pathSource, pathDest;
  var dataSource,dataDest, loadDataFrom;

  if(coefficient<=0.5)
  {
    loadDataFrom = data1;
  }
  else
  {
    loadDataFrom = data2;
  }

      // add a projection function to move certain map to the center of the html page
      projection = eval("d3.geo."+project+"();").scale(width / 6).translate([width / 2, height / 2]);
      // the path function translates GEOJson objects into svg path data
      path = d3.geo.path().projection(projection);

      // create a first guess for the projection
      var center = d3.geo.centroid(loadDataFrom);
      var scale  = 150;
      var offset = [width/2, height/2];

      projection = eval("d3.geo."+project+"();").scale(scale).center(center).translate(offset);
      path = d3.geo.path().projection(projection);

            // using the path determine the bounds of the current map and use
            // these to determine better values for the scale and translation
            var bounds  = path.bounds(loadDataFrom);
            var hscale  = scale*width  / (bounds[1][0] - bounds[0][0]);
            var vscale  = scale*height / (bounds[1][1] - bounds[0][1]);
            var scale   = (hscale < vscale) ? hscale : vscale;
            var offset  = [width - (bounds[0][0] + bounds[1][0])/2,
            height - (bounds[0][1] + bounds[1][1])/2];

            projection = eval("d3.geo."+project+"();")
            .center(center).scale(scale).translate(offset);
            path = path.projection(projection);

            pathSource = path(data1.features[0].geometry);
            pathDest = path(data2.features[0].geometry);

          var int = d3.interpolateString(pathSource, pathDest);

var t = coefficient;

group.selectAll("path").attr("d",path);
group.selectAll("path").attr("d",int(t));

}

// A utility function to draw a rectangle with rounded corners.
function display_poem(context,x,y,width,height,radius,text1){
  context.beginPath();
  context.moveTo(x,y+radius);
  context.lineTo(x,y+height-radius);
  context.quadraticCurveTo(x,y+height,x+radius,y+height);
  context.lineTo(x+width-radius,y+height);
  context.quadraticCurveTo(x+width,y+height,x+width,y+height-radius);
  context.lineTo(x+width,y+radius);
  context.quadraticCurveTo(x+width,y,x+width-radius,y);
  context.lineTo(x+radius,y);
  context.quadraticCurveTo(x,y,x,y+radius);
  context.strokeStyle = "rgba(255, 255, 255, 0.0)";
  context.stroke();
  context.fillStyle = "rgba(255, 255, 255, 0.0)";
  context.fill();

// Create gradient
var gradient = context.createLinearGradient(0, 0, canvas.width, 0);
gradient.addColorStop("0", 'red');
gradient.addColorStop("0.5", 'red');
gradient.addColorStop("1.0", 'red');

// Fill with gradient
context.font="30px Georgia"
context.fillStyle = gradient;
context.fillText(text1, 10, 25);

}

// capture mouse movement and update the ThreeJS scene
function onDocumentMouseMove(event)
{
// update the mouse variable
var mouse = {x:0, y:0};
mouse.x = event.clientX;
mouse.y = event.clientY;
//console.log('mouse position captured: x = '  + mouse.x + ', y = ' + mouse.y);
update(mouse);
}


function pick_maps(x,y)
{
    //First Quadrant
    if(x>=0 && x<=1 && y>=0 && y<=1)
    {
      if(x>=0 && x <=0.5 && y>=0 && y<=0.5)
      {
        data1 = data_RUS;
        data2 = data_US;
      }
      /*else if(x>0.5 && x<=1 && y>=0 && y<=0.5)
      {
        data1 = data_US;
        data2 = data_CHN;
      }
      else if(x>0.5 && x<=1 && y>0.5 && y<=1)
      {
        data1 = data_RUS;
        data2 = data_CHN;
      }
      else if(x>=0 && x<=0.5 && y>0.5 && y<=1)
      {
        data1 = data_US;
        data2 = data_RUS;
      }*/
      else if((y/x)<=1)
      {
        data1 = data_RUS;
        data2 = data_CHN;
      }
      else if((y/x)>1)
      {
        data1 = data_US;
        data2 = data_RUS;
      }
    }

    //Second Quadrant
    else if(x<=0 && x>=-1 && y>=0 && y<=1)
    {
      if(x<0 && x >=-0.5 && y>=0 && y<=0.5)
      {
        data1 = data_RUS;
        data2 = data_US;
      }
      
      else if((y/x)>=-1)
      {
        data1 = data_RUS;
        data2 = data_ARA;
      }
      else if((y/x)<-1)
      {
        data1 = data_US;
        data2 = data_RUS;
      }    
    }
    

    //Third Quadrant
    else if(x<=0 && x>=-1 && y<=0 && y>=-1)
    {
      if(x<0 && x >=-0.5 && y<=0 && y>=0.5)
      {
        data1 = data_RUS;
        data2 = data_US;
      }
      
      else if((y/x)<=1)
      {
        data1 = data_RUS;
        data2 = data_ARA;
      }
      else if((y/x)>1)
      {
        data1 = data_CHN;
        data2 = data_IND;
      }
    }

    //Fourth Quadrant
    else if(x>=0 && x<=1 && y<=0 && y>=-1)
    {
      if(x>=0 && x <=0.5 && y<=0 && y>=0.5)
      {
        data1 = data_RUS;
        data2 = data_US;
      }
      
      else if((y/x)<=-1)
      {
        data1 = data_RUS;
        data2 = data_CHN;
      }
      else if((y/x)>-1)
      {
        data1 = data_CHN;
        data2 = data_IND;
      }
    }
    
}


function find_morph_coefficient(x,y){
  var bigCoordinate,morphingCoefficient;
  var absX,absY;

  absX = Math.abs(x);
  absY = Math.abs(y);
  if(absX>absY)
  bigCoordinate = absX;
  else
  bigCoordinate = absY;
  
  if(bigCoordinate>0.5)
    morphingCoefficient = bigCoordinate;
  else
    morphingCoefficient = 1-bigCoordinate;

  if(absX>=0.7 && absY>=0.7)
  {
  if(absX>=absY)
    morphingCoefficient = (1-absX)+0.5;
  else
    morphingCoefficient = (1-absY)+0.5;
  }

  return morphingCoefficient;
}


function pick_phrases(x,y){
  var message = 'Veryfiy pick_phrases';
    if(x>-0.3 && x<0.3 && y>-0.3 && y<0.3) {
      message = L1;
    } else if(x>0.6 && y>-0.6 && y <0.6){
      message = L2;
    } else if(x<0.6 && x>-0.6 && y >0.6){
      message = L3;
    } else if(x<-0.6 && y>-0.6 && y <0.6){
      message = L4;
    } else if(x>-0.6 && x<0.6 && y < -0.6) {
      message = L5;
    } else if(x>-0.3 && x<0.3 && y>0.3 && y<0.6){
      message = L13;
    } else if(x>0.3 && x<0.6 && y>-0.6 && y<-0.3){
      message = L12;
    } else if(x>-0.3 && x<0.3 && y<-0.3 && y>-0.6){
      message = L15;
    } else if(x<-0.3 && x >-0.6 && y>-0.3 && y<0.3) {
      message = L14;
    } else if(x >0.6 && y>0.6) {
      message = L23;
    } else if(x >0.6 && y<-0.6) {
      message = L25;
    } else if(x< -0.6 && y>0.6) {
      message = L34;
    } else if(x<-0.6 &&  y< 0.6) {
      message = L45;
    } else if(x<0.6 && x > 0.3&& y<0.6 && y>0.3) {
      message = L123;
    } else if(x< 0.6&& x >0.3 && y<-0.3 && y>-0.6) {
      message = L125;
    } else if(x<-0.3 && x >-0.6 && y<0.6 && y>0.3) {
      message = L134;
    } else if(x<-0.3 && x > -0.6 && y<-0.3 && y>-0.6) {
      message = L145;
    }
    return message;
}
// update the text to show at the mouse position
function update(mouse){

  // x and y used for testing different languages
  var x = (mouse.x / window.innerWidth) * 2 - 1;
  var y = -(mouse.y / window.innerHeight) * 2 + 1;
  var coefficient;
  var Phrase;
  //data1 = data_US;
  //data2 = data_RUS;

  //Do the Map Stuff Here
  pick_maps(x,y);
  coefficient = find_morph_coefficient(x,y);
  d3MorphMap(data1,data2,coefficient,cur_projection);

  //Do the Poem Stuff Here
  Phrase = pick_phrases(x,y);
  //Clear the textbox
  context.clearRect(0,0,640,600);
  var metrics1 = context.measureText(Phrase);
  var width1 = metrics1.width;

  //Draw the textbox
  display_poem(context,x,y,width1 + 20,20+10,15,Phrase);

}
