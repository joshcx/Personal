var Facebook = function(map, view, callback) {

	this.login = function() {
		// login a user and call callback() if successfull
		// be sure to provide appropriate {scopes: "scopes,go,here"}

		var that = this;

		console.log("Accessed login function!");
		FB.login(function(response) { // this "function" is the callback function. Assume that callback is within definition of FB.login
  			if (response.status === 'connected') {
    		// Logged into your app and Facebook.
    			console.log("Login success.");
				callback();	// for typeahead		
			
				// make API call to photos
    			// object returned from api call will be passed to this.passToMap
    			// warning: No callback passed to the APIclient if you use this.passToMap
				//FB.api("/me/photos?fields=place.fields(location,name)&limit=1000", that.passToMap);
				FB.api("me?fields=statuses.limit(1000), photos.limit(1000)", that.passToMap);
				// make API call to status
				// warning: No callback passed to the APIclient if you use this.passToMap
				//FB.api("/me/statuses?fields=place.fields(location,name)&limit=1000", that.passToMap); // check if scope is correct
				
				// callback in parameter means passed as argument
				// callback() means the result of callback() is returned
				//this.getFriends(callback); NOT SURE WHAT THIS SHOULD BE 

				
    			
  			} else if (response.status === 'not_authorized') {
  				console.log("Logged into Facebook but not app.");
    		// The person is logged into Facebook, but not your app.
    			
    			
  			} else {
    		// The person is not logged into Facebook, so we're not sure if
    		// they are logged into this app or not.
    			console.log("Login failure.");
  			}
		}, {scope: 'public_profile,email,user_photos,user_location,user_status,user_tagged_places,user_friends'});


		// get "photos" and "statuses" with places attached
		// pass the data to the map with map.passToMap({...})
		// after *all* two API calls have returned, call map.renderAllPoints()
		// yay! async :) 

		// be sure your scopes are right during login
		// example: FB.api(id+"/photos?fields=place.fields(location,name)&limit=1000", this.passToMap);
		// use developers.facebook.com/tools/explorer to test!

		// hint, what should the user see while they wait?

	}

	this.logout = function() {
		// log the user out, remember the buttons!
		FB.logout(function(response) { // incomplete! Have to use this.showLogin here too. Try view.showLogin()
        	// Person is now logged out
        	view.showLogin(); 
        	map.removeData();
    	});
	}

	this.getFriends = function(cb) {
		// return a list of the user and user's friends as 
		// an argument to cb, be sure to add the logged 
		// in fb user too! 
		// returns somethin like cb([{name:"",picture_url:""},...]);
		var that = this;
		var list = [];
		view.showSpinner(); // UNSURE ABOUT THIS
		// get info about current user's friends
		FB.api('/me/taggable_friends', {fields: "name, picture"}, function(response) {
    		for (var i = 0; i < response.data.length; ++i) {
    			list.push({name: response.data[i].name, picture: response.data[i].picture.data.url});
    		}
    		// get info about current user
			FB.api('/me', {fields: "name, picture"}, function(response) {
				list.push({name: response.name, picture: response.picture.data.url});
				view.hideSpinner(); // UNSURE ABOUT THIS
				cb(list);
			});
    	});		
	}

	var count = 0;
	this.passToMap = function(response) {
		// helper function for the search
		// pulls out anything with a place
		// call map.addPoint(point)
		// be sure to make the time: new Date("time_string")
		//check if it is a status

		for(var i = 0; i < response.statuses.data.length; i++){
			//console.log("reached my FOR LOOOP");
			if(typeof(response.statuses.data[i].place) === 'undefined'){
				//console.log("point is undefined");
			}
			else{

				var myPoint = {lat: response.statuses.data[i].place.location.latitude, lng: response.statuses.data[i].place.location.longitude, name: response.statuses.data[i].place.name, time: Date(response.statuses.data[i].updated_time) };
				//console.log("the latitude : "+response.statuses.data[i].place.location.latitude+" the longitude : "+response.statuses.data[i].place.location.longitude+" name : "+response.statuses.data[i].place.name+" date : "+ Date(response.statuses.data[i].updated_time));
				map.addPoint(myPoint);
			}
		}

		for(var i = 0; i < response.photos.data.length; i++){

			if(typeof(response.photos.data[i].place) === 'undefined'){
				//console.log("point is undefined");
			}
			else{

				var myPoint = {lat: response.photos.data[i].place.location.latitude, lng: response.photos.data[i].place.location.longitude, name: response.photos.data[i].place.name, time: Date(response.photos.data[i].created_time) };
				map.addPoint(myPoint);
			}
		}
		
		map.renderAllPoints();
	}

	this.init = function() {

		/* provided FB init code, don't need to touch much at all*/

		var that = this; // note this usefull trick!
		window.fbAsyncInit = function() {
	
			// init the FB JS SDK
			FB.init({
				appId      : '1477713762494879',	// App ID from the app dashboard
				channelUrl : '/channel.html', 	// Channel file for x-domain comms
				status     : true,
				xfbml      : true,
				version    : 'v2.0',
				cookie     : true,
				oauth      : true
			});

			//"this" refers to the "FB" object, not the "Facebook" object
			//that's why at the beginning of the this.init function, we assign that = this
			FB.getLoginStatus(function(response) {
				console.log("testing 1");
				if (response.status === 'connected') { // this will run when page refreshes
					// the user is logged in and has authenticated
					callback(); // we'll give you this one
					FB.api("me?fields=statuses.limit(1000), photos.limit(1000)", that.passToMap);
				} else if (response.status === 'not_authorized') {
					// the user is logged in to Facebook, 
					// but has not authenticated your app
					console.log("testing 3");
					that.login(); // INCOMPLETE
				} else { // this will run during first login
					// the user isn't logged in to Facebook.
					console.log("testing 4");
					//that.login(); // uncomment this line if you want to prompt for login upon arriving at webpage
				}
			});
		};

		// Load the SDK asynchronously - ignore this Magic!
		(function(d, s, id){
			var js, fjs = d.getElementsByTagName(s)[0];
			if (d.getElementById(id)) {return;}
			js = d.createElement(s); js.id = id;
			js.src = "https://connect.facebook.net/en_US/all.js";
			fjs.parentNode.insertBefore(js, fjs);
		}(document, 'script', 'facebook-jssdk'));
	}	

	this.init();
}


