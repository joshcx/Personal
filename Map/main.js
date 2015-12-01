
$(document).ready(function () {

	/* 
	Notes: 

	all jQuery $("selector") calls should be in this file,
	*don't* add them elsewhere. this will probably be the only
	file making a new Obj() too. if you're confused please
	ask a GSI - but be sure to read the docs first!!!

	show and hide the spinner when anything is loading.
	only show login or logout buttons - not both
	make sure the clear map function stops the current search
	don't let glitchy UI slide - you'll lose points!
	think in terms of callbacks! it will help you fix async problems

	sometimes jquery and bootstrap dont get along, if .hide() and .show()
	don't work right use: addClass("hide") or removeClass("hide")

	Lastly: We will grade everything on the latest version of Chrome,
	so dev with Chrome for gosh sake! Use the dev tools too they're
	amazing!
	*/

	var map = new Map(this);
	var typeahead = new Typeahead();;
	var that = this;
	var fb = new Facebook(map, this, function() { // "function" here is the callback function
		// called on successful login
		// set typeahead data and show/hide buttons
		//console.log("Login successful...hiding login.");
		fb.getFriends(function(list) {
			console.log("Checkpoint!");
			typeahead.setDataList(list);
		});
		that.showLogout();
	});

	// create dat spinner
	this.spinner = new Spinner({radius: 30, length: 30}).spin($("#spinner")[0]);
		
	this.setMiles = function(miles) {
		// update #miles_traveled div
		$("#miles_traveled").text(miles.prettyPrint());
	}

	this.setPic = function(user_id) {
		// set the src of the #user_img
		// check out http://graph.facebook.com/ottosipe/picture?type=large
		$("#user_img").attr("src", user_id);
	}
	// this is working
	this.showLogin = function() {
		// show and hide the right buttons
		//console.log("Accessed showLogin!");
		$(".logout").addClass("hide");
		$(".login").removeClass("hide"); 
	}
	// this is working
	this.showLogout = function() {
		//console.log("Accessed showLogout!");
		$(".login").addClass("hide");
		$(".logout").removeClass("hide"); 
	}

	// this is working
	this.showSpinner = function() {
		//console.log("Accessed showSpinner!");
		$("#spinner").removeClass("hide");
	}
	// this is working
	this.hideSpinner = function() {
		//console.log("Accessed hideSpinner!");
		$("#spinner").addClass("hide");
	}

	/* 
	attach all of the buttons and key press events below here
	- .login(click)
	- .logout(click)
	- #user(keyup): use typeahead.search(key, callback)
	- the call back should render the .drop_items with IDs and Names
		- attach a .drop_item(click)
	 		- start the fb search, call fb.search(id)
	 		- reset and clear #search_dropdown
	- .clear(click): remove data and reset miles/image, other UI
	*/

	$(".login").click(function() {
  		fb.login();
	});

	$(".logout").click(function() {
  		fb.logout();
	});

	$("#user").keyup(function() {
  		$("#search_dropdown").removeClass("hide");
  		// get the search query
  		typeahead.search($("#user").val(), function(list) {
  			// render the .drop_items with names
  			/*
  			console.log("Listing out people that match...");
  			for (var j = 0; j < list.length; ++j) {
  				console.log(list[j].name);
  			}
  			*/
  			$("#search_dropdown").empty();
  			
  			for (var i in list) {
  				var item = $("#search_dropdown").append("<div class=\"drop_item\" data-id=\""+list[i].picture+"\">"+list[i].name+"</div>");
  				$(".drop_item").click(function() {
					that.setPic($(this).attr("data-id"));
					$("#search_dropdown").addClass("hide"); 
					$("#search_dropdown").empty(); 
					$("#user").val($(this).text()); // fill search bar with selected name
				}); 
				

			}
  			//
  		});
	});

	// remember to reset miles/image
	$(".clear").click(function(){
		// remove pic
		$("#user_img").attr("src", ""); // I think this is buggy
		$("#search_dropdown").empty();
		map.removeData();
	});
});

