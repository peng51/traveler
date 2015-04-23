// Canvas for displaying the poem
//var canvas, context;

// ThreeJS variables
var scene, camera, render, canvas, context, texture, sprite;

//Varibles holding the quadrants
var firstQuadrantData,secondQuadrantData,thirdQuadrantData,fourthQuadrantData, centreData;

var firstQuadrant,secondQuadrant,thirdQuadrant,fourthQuadrant, centre;

// D3 variables for projecting the maps
var projection, path, group;

//variables for storing paths for different countries
var data_US,data_CHN,data_RUS,data_ARA,data_IND;

//Variables for country color code
var color_US  = '#1E90FF';
var color_CHN = '#FF0000';
var color_RUS = '#800000';
var color_ARA = '#990066';
var color_IND = '#FFA500';
var color_L1, color_L2, color_L3, color_L4, color_L5;

//Variables for storing color information related to languages
var message1 = 'Veryfiy pick_phrases';
var message2 = 'Veryfiy pick_phrases';
var message3 = 'Veryfiy pick_phrases';

var color1;
var color2;
var color3;

//Variable to help morph between source and Destination country
var currentSource,currentDest;

//Maps involved in the projection
var data1,data2;

//Object for storing poems
var poems;

//Source Language
var srcLang = window.center;

//List of Projections we will use
var projections= ['mercator','cylindricalEqualArea','homolosine','stereographic'];


//The current Projection Type
var cur_projection='mercator';

//Poem Number
var poemnumber=0;
var max_poems = 50;
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
//canvas = document.getElementById('myCanvas');
//context = canvas.getContext('2d');

//Mouse Event Listener
document.addEventListener( 'mousemove', onDocumentMouseMove, false );

// Periodically change the poems
window.setInterval(getnewpoem, 3000);

// Periodically change the projection
window.setInterval(changeprojection, 5000);


//Here is where all the heavy lifting happens
loadMaps();
//initcolors();
loadPoems();
setQuadrants(srcLang);
getnewpoem();
initD3();
initThreeJS();
animate();


function changeprojection()
{
  proj_index = Math.floor(Math.random() * (3 - 0 + 1)) + 0; 
  cur_projection = projections[proj_index]; 
}
// init threeJS
function initThreeJS(){
	// scene
	scene = new THREE.Scene();
	// camera
	var width = window.innerWidth, height = window.innerHeight;
	var angle = 45, aspect = width / height, near = 0.1, far = 20000;
	camera = new THREE.PerspectiveCamera(angle, aspect, near, far);
	scene.add(camera);
	camera.position.set(0, 150, 400);
	camera.lookAt(scene.position);	
	// renderer
	if ( Detector.webgl )
		renderer = new THREE.WebGLRenderer({antialias:true});
	else
		renderer = new THREE.CanvasRenderer(); 
	renderer.setSize(width, height);
	// set the ThreeJS scene in the same papge as the D3
	var container = document.getElementById('canvas-container');
      	container.appendChild( renderer.domElement );
	// canvas, context, texture, sprite 	 	
	canvas = document.createElement('canvas');
      	context = canvas.getContext('2d');
	texture = new THREE.Texture(canvas);
	texture.needsUpdate = true;
	var spriteMaterial = new 
		THREE.SpriteMaterial({map:texture, useScreenCoordinates:true, alignment:THREE.SpriteAlignment.topLeft});	
	sprite = new THREE.Sprite(spriteMaterial);
	sprite.scale.set(200,100,2.0);
      	sprite.position.set(50, 50, 0 ); 
	scene.add(sprite);		
}

// animate function using ThreeJS to render new interface
function animate()
{
	requestAnimationFrame(animate);
  	renderer.render(scene, camera);
}	

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
d3.json("maps/"+srcLang+".geo.json", function(data)
{
  group = svg.append("g").attr("id","group");
  group.selectAll("path").data(data.features).enter().append("path").attr("d",path);

});
}


function initcolors() {
  color_L1 ="blue";
  color_L2 = "red";
  color_L3 = "maroon";
  color_L4 = "green";
  color_L5 = "orange";
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
    firstQuadrant = "CHN";
    secondQuadrant = "RUS";
    thirdQuadrant = "ARA";
    fourthQuadrant = "IND";
    centre = "US"
    firstQuadrantData = data_CHN;
    secondQuadrantData=data_RUS;
    thirdQuadrantData = data_ARA;
    fourthQuadrantData = data_IND;
    centreData = data_US;
    color_L1 = color_US;
    color_L2 = color_CHN;
    color_L3 = color_RUS;
    color_L4 = color_ARA;
    color_L5 = color_IND;
    break;
    case "CHN":
    firstQuadrant = "RUS";
    secondQuadrant = "ARA";
    thirdQuadrant = "IND";
    fourthQuadrant = "US";
    centre = "CHN"
    firstQuadrantData = data_RUS;
    secondQuadrantData=data_ARA;
    thirdQuadrantData = data_IND;
    fourthQuadrantData = data_US;
    centreData = data_CHN;
    color_L1 = color_CHN;
    color_L2 = color_RUS;
    color_L3 = color_ARA;
    color_L4 = color_IND;
    color_L5 = color_US;
    break;
    case "RUS":
    firstQuadrant = "ARA";
    secondQuadrant = "IND";
    thirdQuadrant = "US";
    fourthQuadrant = "CHN";
    centre = "RUS"
    firstQuadrantData = data_ARA;
    secondQuadrantData=data_IND;
    thirdQuadrantData = data_US;
    fourthQuadrantData = data_CHN;
    centreData = data_RUS;
    color_L1 = color_RUS;
    color_L2 = color_ARA;
    color_L3 = color_IND;
    color_L4 = color_US;
    color_L5 = color_CHN;
    break;
    case "ARA":
    firstQuadrant = "IND";
    secondQuadrant = "US";
    thirdQuadrant = "CHN";
    fourthQuadrant = "RUS";
    centre = "ARA"
    firstQuadrantData = data_IND;
    secondQuadrantData=data_US;
    thirdQuadrantData = data_CHN;
    fourthQuadrantData = data_RUS;
    centreData = data_ARA;
    color_L1 = color_ARA;
    color_L2 = color_IND;
    color_L3 = color_US;
    color_L4 = color_CHN;
    color_L5 = color_RUS;
    break;
    case "IND":
    firstQuadrant = "US";
    secondQuadrant = "CHN";
    thirdQuadrant = "RUS";
    fourthQuadrant = "ARA";
    centre = "IND"
    firstQuadrantData = data_US;
    secondQuadrantData=data_CHN;
    thirdQuadrantData = data_RUS;
    fourthQuadrantData = data_ARA;
    centreData = data_IND;
    color_L1 = color_IND;
    color_L2 = color_US;
    color_L3 = color_CHN;
    color_L4 = color_RUS;
    color_L5 = color_ARA;
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
function display_poem(context,mouse,x,y,width,height,radius,m1,m2,m3,c1,c2,c3){
 //context.beginPath();
  //context.moveTo(x,y+radius);
  //context.lineTo(x,y+height-radius);
 // context.quadraticCurveTo(x,y+height,x+radius,y+height);
 // context.lineTo(x+width-radius,y+height);
 // context.quadraticCurveTo(x+width,y+height,x+width,y+height-radius);
 // context.lineTo(x+width,y+radius);
 // context.quadraticCurveTo(x+width,y,x+width-radius,y);
 // context.lineTo(x+radius,y);
 // context.quadraticCurveTo(x,y,x,y+radius);
 // context.strokeStyle = "rgba(255, 255, 255, 0.0)";
 // context.stroke();
 // context.fillStyle = "rgba(255, 255, 255, 0.0)";
 // context.fill();

/*// Create gradient
var gradient = context.createLinearGradient(0, 0, canvas.width, 0);
gradient.addColorStop("0", 'red');
gradient.addColorStop("0.5", 'red');
gradient.addColorStop("1.0", 'red');*/

canvas.width = width;
//canvas.height = height;
// Fill with gradient
context.font="30px Georgia"
context.fillStyle = c1;
context.fillText(m1, 10, 25);

 var metrics1 = context.measureText(m1);
 var width1 = metrics1.width;

context.fillStyle = c2;
context.fillText(m2, width1+20, 25);

var metrics2 = context.measureText(m1+m2);
var width2 = metrics2.width;

context.fillStyle = c3;
context.fillText(m3, width2+30, 25);

//con.fillText(m3, 4,20 );
texture.needsUpdate = true;
// update the textbox position
ww = window.innerWidth;
console.log("window width " + ww);
console.log("mouse.x " + mouse.x);
console.log("text width " + width);
if (mouse.x + width / 2 + 10 < ww)
	sprite.position.set(mouse.x, mouse.y, 0 );
else{
	//console.log(ww - width / 3);
	//console.log(mouse.x - width / 3);	
	sprite.position.set(ww - width / 2 - 10, mouse.y, 0);
    }
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


function getData2(x,y)
{
  //First Quadrant
    if(x>=0 && x<=1 && y>=0 && y<=1)
    {
      if(x>=0 && x <=0.5 && y>=0 && y<=0.5)
      {
        data2 = centreData;
        currentDest = centre;
      }

      else if((y/x)<=1)
      {
        data2 = firstQuadrantData;
        currentDest = firstQuadrant;
      }
      else if((y/x)>1)
      {
        data2 = secondQuadrantData;
        currentDest = secondQuadrant;
      }
    }

    //Second Quadrant
    else if(x<=0 && x>=-1 && y>=0 && y<=1)
    {
      if(x<0 && x >=-0.5 && y>=0 && y<=0.5)
      {
        data2 = centreData;
        currentDest = centre;
      }

      else if((y/x)>=-1)
      {
        data2 = thirdQuadrantData;
        currentDest = thirdQuadrant;
      }
      else if((y/x)<-1)
      {
        data2 = secondQuadrantData;
        currentDest = secondQuadrant;
      }
    }


    //Third Quadrant
    else if(x<=0 && x>=-1 && y<=0 && y>=-1)
    {
      if(x<0 && x >=-0.5 && y<=0 && y>=-0.5)
      {
        data2 = centreData;
        currentDest = centre;
      }
      else if((y/x)<=1)
      {
       data2 = thirdQuadrantData;
       currentDest = thirdQuadrant;
      }
      else if((y/x)>1)
      {
        data2 = fourthQuadrantData;
        currentDest = fourthQuadrant;
      }
    }

    //Fourth Quadrant
    else if(x>0 && x<=1 && y<=0 && y>=-1)
    {
      if(x>=0 && x <=0.5 && y<=0 && y>=-0.5)
      {
        data2 = centreData;
        currentDest = centre;
      }

      else if((y/x)<=-1)
      {
        data2 = fourthQuadrantData;
        currentDest = fourthQuadrant;
      }
      else if((y/x)>-1)
      {
        data2 = firstQuadrantData;
        currentDest = firstQuadrant;
      }
    }
}

function getData1(currentDest)
{
  switch(currentDest)
  {
    case "US":
    data1 = data_RUS;
    break;
    case "CHN":
    data1 = data_RUS;
    break;
    case "RUS":
    data1 = data_ARA;
    break;
    case "ARA":
    data1 = data_RUS;
    break;
    case "IND":
    data1 = data_ARA;
    break;
  }
}

function pick_maps(x,y)
{
    getData2(x,y);
    //Get Data1 based on Data2
    getData1(currentDest);
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


    if(x>-0.3 && x<0.3 && y>-0.3 && y<0.3) {
      message1 = L1[0];
      message2 = L1[1];
      message3 = L1[2];
      color1 = color_L1;
      color2 = color_L1;
      color3 = color_L1;
    } else if(x>0.6 && y>-0.6 && y <0.6){
      message1 = L2[0];
      message2 = L2[1];
      message3 = L2[2];
      color1 = color_L2;
      color2 = color_L2;
      color3 = color_L2;
    } else if(x<0.6 && x>-0.6 && y >0.6){
      message1 = L3[0];
      message2 = L3[1];
      message3 = L3[2];
      color1 = color_L3;
      color2 = color_L3;
      color3 = color_L3;
    } else if(x<-0.6 && y>-0.6 && y <0.6){
      message1 = L4[0];
      message2 = L4[1];
      message3 = L4[2];
      color1 = color_L4;
      color2 = color_L4;
      color3 = color_L4;
    } else if(x>-0.6 && x<0.6 && y < -0.6) {
      message1 = L5[0];
      message2 = L5[1];
      message3 = L5[2];
      color1 = color_L5;
      color2 = color_L5;
      color3 = color_L5;
    } else if(x>-0.3 && x<0.3 && y>0.3 && y<0.6){
      message1 = L13[0];
      message2 = L13[1];
      message3 = L13[2];
      color1 = color_L1;
      color2 = color_L3;
      color3 = color_L1;
    } else if(x>0.3 && x<0.6 && y>-0.3 && y<0.3){
      message1 = L12[0];
      message2 = L12[1];
      message3 = L12[2];
      color1 = color_L1;
      color2 = color_L2;
      color3 = color_L1;
    } else if(x>-0.3 && x<0.3 && y<-0.3 && y>-0.6){
      message1 = L15[0];
      message2 = L15[1];
      message3 = L15[2];
      color1 = color_L1;
      color2 = color_L5;
      color3 = color_L1;
    } else if(x<-0.3 && x >-0.6 && y>-0.3 && y<0.3) {
      message1 = L14[0];
      message2 = L14[1];
      message3 = L14[2];
      color1 = color_L1;
      color2 = color_L4;
      color3 = color_L1;
    } else if(x >0.6 && y>0.6) {
      message1 = L23[0];
      message2 = L23[1];
      message3 = L23[2];
      color1 = color_L2;
      color2 = color_L3;
      color3 = color_L1;
    } else if(x >0.6 && y<-0.6) {
      message1 = L25[0];
      message2 = L25[1];
      message3 = L25[2];
      color1 = color_L2;
      color2 = color_L5;
      color3 = color_L1;
    } else if(x< -0.6 && y>0.6) {
      message1 = L34[0];
      message2 = L34[1];
      message3 = L34[2];
      color1 = color_L3;
      color2 = color_L4;
      color3 = color_L1;
    } else if(x<-0.6 &&  y< 0.6) {
      message1 = L45[0];
      message2 = L45[1];
      message3 = L45[2];
      color1 = color_L4;
      color2 = color_L5;
      color3 = color_L4;
    } else if(x<0.6 && x > 0.3&& y<0.6 && y>0.3) {
      message1 = L123[0];
      message2 = L123[1];
      message3 = L123[2];
      color1 = color_L1;
      color2 = color_L2;
      color3 = color_L3;
    } else if(x< 0.6&& x >0.3 && y<-0.3 && y>-0.6) {
      message1 = L125[0];
      message2 = L125[1];
      message3 = L125[2];
      color1 = color_L1;
      color2 = color_L2;
      color3 = color_L5;
    } else if(x<-0.3 && x >-0.6 && y<0.6 && y>0.3) {
      message1 = L134[0];
      message2 = L134[1];
      message3 = L134[2];
      color1 = color_L1;
      color2 = color_L3;
      color3 = color_L4;
    } else if(x<-0.3 && x > -0.6 && y<-0.3 && y>-0.6) {
      message1 = L145[0];
      message2 = L145[1];
      message3 = L145[2];
      color1 = color_L1;
      color2 = color_L4;
      color3 = color_L5;
    }
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
  pick_phrases(x,y);
  //Clear the textbox
  context.clearRect(0,0,800,800);
  var metrics1 = context.measureText(message1+message2+message3);
  var width1 = metrics1.width;

  //Draw the textbox
  display_poem(context,mouse,x,y,width1 + 20,20+10,15,message1,message2,message3,color1,color2,color3);

}
