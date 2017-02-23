

function createsphere(response, root) {
	
	var scene, sphere, radius;
	var webglviewport;
	var spritearray = new Array();
	var oldlabelpos = new Array();
	//var newlabelpos = new Array();
	
	
function convertlatlonToVec3(lat, lon)
{
   var cosLat = Math.cos(circle.getCenter().lat() * degrees);
   var sinLat = Math.sin(circle.getCenter().lat() * degrees); 

   var xSphere = radiusEquator * cosLat;
   var ySphere = 0;
   var zSphere = radiusPoles * sinLat;
   var rSphere = Math.sqrt(xSphere*xSphere + ySphere*ySphere + zSphere*zSphere);

   var tmp = rSphere * Math.cos(lat * degrees);	  
	
   xSphere = tmp * Math.cos((lon - circle.getCenter().lng()) * degrees);
   ySphere = tmp * Math.sin((lon - circle.getCenter().lng()) * degrees);
   zSphere = rSphere * Math.sin(lat * degrees);

    var x = -ySphere/circle.getRadius();
    var y = (zSphere*cosLat - xSphere*sinLat)/circle.getRadius();
    var z = 0;

    return new THREE.Vector3(x, y, z);
         
}

function labelBox(cardinal, radius, root)
{
	this.labelID = 'MovingLabel'+ cardinal.ID;
	this.position = convertlatlonToVec3(cardinal.lat, cardinal.lon).multiplyScalar(radius);
	
	//create html overlay box and clickable to url.... 
	this.box = document.createElement('div');
	this.box.setAttribute("id", this.labelID);
	this.box.innerHTML = cardinal.name;
	
	//$(a).attr("id", labelID);
	
	$(this.box).data("id", cardinal.ID);
	$(this.box).click(function(){	
		triggermarker = markers[parseInt($(this).data("id")) -1 ];
		google.maps.event.trigger(triggermarker, 'click');
	});
	
	this.box.className = "spritelabel";
	
	this.domElement = root;
	//root.appendChild(this.box);
	this.domElement.appendChild(this.box);
	//this.domElement.appendChild(this.Label);
	
	this.marker = new THREE.Mesh(new THREE.SphereGeometry(0.5, 1, 1));
	this.marker.position.copy(this.position); //copying the marker position to this.position
	//scene.add(this.marker);
}

labelBox.prototype.update = function()
{
 
	camera.updateMatrixWorld();
	this.position.project(camera);
	
	var screenvector = new THREE.Vector3();
	screenvector.copy(this.position);
	oldlabelpos.push(screenvector);
	//this.position.normalize();
	
	this.posx = Math.round((this.position.x + 1)* this.domElement.offsetWidth/2 + webglviewport.left);
	this.posy = Math.round((1 - this.position.y)* this.domElement.offsetHeight/2);
	
	var boundingRect = this.box.getBoundingClientRect();  //getBoundingClientRect() method returns the 
	                                              //size of element (here it is box) and its position relative to viewport
	//update the box overlays position
	this.box.style.left = this.posx + 'px';
	this.box.style.top = this.posy + 'px';
	
	this.occludeLabel(this.box, this.marker);
	
};

labelBox.prototype.LabelUpdateFn = function()
	{
		
		//var labels = document.getElementById('MovingLabel1');//.getElementsByClassName('spritelabel'); 
		//labels = $(root).find(".spritelabel");
		
		
		for(var k=0; k<oldlabelpos.length; k++)
			{
				this.reposition = new THREE.Vector3();
				this.reposition = convertlatlonToVec3(oldlabelpos[k].x, oldlabelpos[k].y).multiplyScalar(radius);
				this.reposition.normalize();
				
				camera.updateMatrixWorld();
				this.reposition.unproject(camera);
				
				this.newposx = Math.round((this.reposition.x + 1)* this.domElement.offsetWidth/2 + webglviewport.left) - this.posx;
				this.newposy = Math.round((1 - this.reposition.y)* this.domElement.offsetHeight/2) - this.posy;
				
				var boundingRect = this.box.getBoundingClientRect();
				
				this.box.style.left = (this.newposx + boundingRect.width) + 'px';
				this.box.style.top = this.newposy + 'px';
				
				//$(this.box).css(left) = 
				
				this.occludeLabel(this.box, this.marker);
				//var updatedpos = {updateposx, updateposy};
				
				//newlabelpos.push(updatedpos);
				
			}    
			
		
	}

labelBox.prototype.occludeLabel = function(box, marker)
{
	var markerposition = marker.getWorldPosition();
	var eye = camera.position.clone().sub(markerposition);
	var dot = eye.clone().normalize().dot(markerposition.normalize()); //dot product of two unit vectors cos0 = 1, cos180 = -1;
	
	var occluded = (dot > 0) ? true : false; //itneray operator
	
	if(occluded) {
		box.style.visibility = "hidden";  //if ocluded = true then visibility is hidden 	                                     
		                                    // that means dot consists of negative value; 
	}
	else {
		box.style.visibility = "visible";
	}
	
};

function startwebgl(response, root) {
	
	//var width = window.innerWidth;
	//var height = window.innerHeight;
	
	var width = $(root).width();
	var height = $(root).height();
	
	webglviewport = $(root).position();  //gives the top-left of WebGl viewport
	
    //renderer = new THREE.WebGLRenderer( {antialias:true} );
	renderer.setSize(width, height);
	
	var mapdata = document.createElement('div');
	
	Locname = document.createElement('div');
	Locname.innerHTML = response.ImgLocation;
	
	b = document.createElement('div');
	b.innerHTML = response.Latitude;
	
	unit_Lat = document.createElement('div');
	unit_Lat.innerHTML = response.CardinalDir_Lat;
	
	c = document.createElement('div');
	c.innerHTML = response.Longitude;
	
	unit_Lng = document.createElement('div');
	unit_Lng.innerHTML = response.CardinalDir_Lng;
	
	mapdata.className = "Webglbox";
	mapdata.appendChild(Locname);
	mapdata.appendChild(b);
	mapdata.appendChild(unit_Lat);
	mapdata.appendChild(c);
	mapdata.appendChild(unit_Lng);
	
	
	//document.body.appendchild();
	root.appendChild(renderer.domElement);
	root.appendChild(mapdata);
	
	//camera = new THREE.PerspectiveCamera(60, width/height, 1, 1000);
	//camera.position.x = 4;
	//camera.position.y = 4;
	camera.position.z = 5;
	
	scene = new THREE.Scene();
	
	radius = 2.5;
	
	
	controls.minPolarAngle = response.Vertlimit_min; //Math.PI/3 ;
	controls.maxPolarAngle = response.Vertlimit_max; //2*Math.PI/3 ;
	
	
	var spheregeometry = new THREE.SphereGeometry(radius, 20, 20, 0, -6.283, 0.9, 1.2);
	var texture = THREE.ImageUtils.loadTexture(response.ImagePath);
	texture.minFilter = THREE.NearestFilter;
	var spherematerial = new THREE.MeshBasicMaterial({map: texture});
	sphere = new THREE.Mesh(spheregeometry, spherematerial);
	//texture.needsUpdate = true;
	
	scene.add(sphere);
	scene.add(camera);
	scene.autoUpdate = true;
	

	$.ajax({
		type: "GET",
		url: "marker.php",
		dataType: "json",
		success: function(spriteResponse)
		    {
				//alert(spriteResponse);
				for(var i=0; i<spriteResponse.length; i++)
				{
					
				var cardinal = {ID: parseInt(spriteResponse[i].ID), lat: parseFloat(spriteResponse[i].lat), lon: parseFloat(spriteResponse[i].lng), name: spriteResponse[i].name};
				var sprite =  new labelBox(cardinal, radius, root);
				//sprite.update();			
			    spritearray.push(sprite);
				}
				
				window.addEventListener('resize', onWindowResize(width, height), false);
				//root.addEventListener('click', mouseclick, false);
				root.addEventListener('mousemove', onMouseMove, false);
				root.addEventListener('wheel', WheelEvent, false);
				animate(spritearray);
				
				function onWindowResize(width, height) 
				{
	
				//camera.aspect = window.innerWidth / window.innerHeight;
				camera.aspect = width/height;
				camera.updateProjectionMatrix();
				//renderer.setSize(window.innerWidth, window.innerHeight);
				renderer.setSize(width, height);	
				} 
				
				
				function GoogleMapsUpdate(camfov)
				{
	
					var newstartpoint = pointGoogleMaps(circle.getRadius() * Math.cos(camfov[0]),
												circle.getRadius() * Math.sin(camfov[0]), circle);

					var  viewdir      = pointGoogleMaps(circle.getRadius() * Math.cos(camfov[1]),
												circle.getRadius() * Math.sin(camfov[1]), circle);
					
					var newendpoint   = pointGoogleMaps(circle.getRadius() * Math.cos(camfov[2]),
												circle.getRadius() * Math.sin(camfov[2]), circle);
												
			
					//Lookdir.setMap(null);		
					line.setMap(null);  //removing the old lines on circle							
					
					line = new google.maps.Polyline({
					path: [newstartpoint, point, newendpoint],
					geodesic: true,  //By setting it to true the distance is cal in meters
					strokeColor: '#0000FF',
					strokeOpacity: 0.8,
					strokeWeight: 2,			
					map: map
					}); 
					
					
				
				}
					

				function onMouseMove(event)
				{
	
					event.preventDefault();
					
					var degrees = Math.PI/180.0;
					var raycaster = new THREE.Raycaster();
					
					var viewingDir = camera.getWorldDirection();
					var Vectors = [0,0,0];
					var Angles = [0,0,0];
					
					for(i=0; i<3; i++)
					{
						Vectors[i] = new THREE.Vector3(i-1, 0, 0.5);
						raycaster.setFromCamera(Vectors[i], camera);
						Vectors[i].sub(camera.position);
						Vectors[i].normalize();
						
						
					}

					for(i=0; i<3; i=i+2)
					{
						var dotp = Vectors[i].x * Vectors[1].x + Vectors[i].y * Vectors[1].y + Vectors[i].z * Vectors[1].z;
						if (dotp >= 1)
							Angles[i] = 0.0;
						else if (dotp <= -1)
							Angles[i] = Math.PI;
						else
							Angles[i] = Math.acos(dotp);
					}

					var factor = 0.5 * radius;
					
					Angles[1] = Math.atan2(viewingDir.x, -viewingDir.z);
					
					Angles[0] = Angles[1] - factor * camera.fov; //x-dir
					Angles[2] = Angles[1] + factor * camera.fov; //y-dir
					
					var camfov = Angles;
					GoogleMapsUpdate(camfov);
					
					for(var i=0; i<spritearray.length; i++){
						
						var posupdate = spritearray[i];
						posupdate.LabelUpdateFn();
					}
				
				}


				 function WheelEvent(event)
				{
					event.preventDefault();
					
					var mX = (event.deltaX/width)* 2 - 1;
					var mY = (event.deltaY/height)* 2 + 1;

					var WebGLZoom = new THREE.Vector3(mX, mY, 0.5);
					var raycaster = new THREE.Raycaster();
					
					raycaster.setFromCamera(WebGLZoom, camera);
					WebGLZoom.sub(camera.position); 
				
					
					var mapzoom = map.getZoom();
					if(WebGLZoom.z > -5 && WebGLZoom.z <=-1) {
						
						map.setZoom(19);
					}
					else if(WebGLZoom.z > -1 && WebGLZoom.z < 0){
						
						map.setZoom(15);
					}
					else 
					{
						
						map.setZoom(14);
					}		              	
					
				} 
	
				function animate(spritearray) {
	
					//sprite.update();
					//spritearray.update();
					
					for(var j=0; j<spritearray.length; j++){
						
						var labelupdate = spritearray[j];
						labelupdate.update();
					}
					requestAnimationFrame(animate); 
					controls.update();

					renderer.render(scene, camera);
					
				}
								
			}

	});   
  
	 
}

startwebgl(response, root);

}

  


	
	
	