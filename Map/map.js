

/*
	hints:
	-implement the line with a google.maps.Polyline
	-let google redraw the polyline (see .getPath()) when a new
	point is added - don't delete the whole thing and add it again 
	-use google.maps.Marker for markers
	-use .setMap(null) do remove/delete either of these from your map
	you're making work for yourself if you do it any other way
*/

var Map = function Map(view) {

	var mapOptions = {
		// feel free to edit map options
		disableDefaultUI: true,
		zoom: 5,
		center: new google.maps.LatLng(39.50, -98.35),
		mapTypeId: google.maps.MapTypeId.ROADMAP
	}

	this.init = function() {
		// render map here
		this.map = new google.maps.Map($('#map_canvas')[0], mapOptions);

	}

	this.points = []; // { lat:0.0, lng:0.0, name: "", time: Date() }
	this.markers = []; // array of markers already on map
	this.path = new google.maps.Polyline(); //create new path 

	this.addPoint = function(point) {
		// adds a point to this.points
		this.points.push(point);
	}
	
	this.renderAllPoints = function () {
		// remove all old map data, *sort* the points
		// and render each point ever 
		// don't render the point if dist(this_pt,prev) === 0		

		/* removeData call */
		this.removeData();

		/* sorts the date */
		this.points.sort(function(a,b){
			var c = new Date(a.time);
			var d = new Date(b.time);
			return c-d;
		});

		/* creates coordinates array & markers array */
		var coordinates = [];
		var curr = 0;
		var distance = 0;

		for(var i = 0; i < this.points.length; i++){
			if(i === 0){
				var ltlng = new google.maps.LatLng(this.points[i].lat, this.points[i].lng);
				coordinates.push(ltlng);
				var marker = new google.maps.Marker({ position: ltlng, map: this.map, title: this.points[i].name});
				this.markers.push(marker);

			}
			else if(distanceFormula(this.points[i], this.points[i-1]) !== 0){
				var ltlng = new google.maps.LatLng(this.points[i].lat, this.points[i].lng);
				coordinates.push(ltlng);
				var marker = new google.maps.Marker({ position: ltlng, map: this.map, title: this.points[i].name});
				this.markers.push(marker);
				distance = distanceFormula(this.points[i], this.points[i-1]);
				//console.log("Distance: "+ distance + " " + curr);
				curr = curr + distance;


			}

		}

		/* set the new miles traveled */
		view.setMiles(curr);

		/* creates new path for the polyline */
		this.path = new google.maps.Polyline({
    		path: coordinates,
    		geodesic: true,
    		strokeColor: '#000000',
    		strokeOpacity: 1.0,
    		strokeWeight: 2
  		});

		/* set the polyline to the map */
		this.path.setMap(this.map);	
	}

	this.removeData = function() {
		// reset distance, clear polypath and markers

		/* clear markers */
		for(var i = 0; i < this.markers.length; i++){
			this.markers[i].setMap(null);
		}
		
		/* clear polypath */
		this.path.setMap(null);					
		
		/* reset distance */
		var dist = 0;
     	view.setMiles(dist);	
	}

	this.renderSinglePoint = function(cb) {
		// render a single point on the map
		// pan the map to the new point
		// make sure to update the polypath
		// consider recursion :)

		/* we didn't need this function*/
	}

	// call the initializer
	this.init();
}