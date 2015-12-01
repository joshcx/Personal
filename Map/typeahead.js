
var Typeahead = function Typeahead() {
	this.list = []; // list of objects like: { name:"", picture_url:"" }
	this.setDataList = function(data) {
		// set the list to a list of name,id pairs
		// then sort it by fullname A-Z 
		this.list = data;
		//console.log(this.list[0].name);
		//console.log(this.list[1].name);
		//console.log(this.list[2].name);
		this.list.sort(function(a, b) {
	        if(a.name < b.name) {
	        	//console.log("Returning -1");
	        	return -1;
	        } 
    	    if(a.name > b.name) {
    	    	//console.log("Returning 1");
    	    	return 1;
    	    }
    	    //console.log("Returning 0");
    	    //a and b must be equal
    	    return 0;
	    });
	    /*
		for (var i = 0; i < this.list.length; ++i) {
			console.log(this.list[i].name);
			console.log(this.list[i].picture);
		}
		*/
	}

	this.search = function(key, cb) {
		// given a key, make it lowercase, seperate it into an 
		// array of distinct words by spaces and compare it to the 
		// lowercase version of each name, if all sub-keys are
		// present as the prefixes in the name add the pair to the 
		// subset returned to the callback
		// ex: key: "oT S" -> keys: ["ot","s"]
		// matches	{name:"Otto Sipe", id: "12345"}
		
		// array that will be populated with substring matches
		var matches = [];
		var lowercase_key = key.toLowerCase(); // make key lowercase
		var name_key = lowercase_key.match(/\S+/g); // split into subkeys w/o whitespace. Returns an array
	
		for (var i = 0, num_of_names = this.list.length; i < num_of_names; ++i) { // for array of all friends in facebook
		
			var lowercase_name = this.list[i].name.toLowerCase(); // make first name and last name lower case
			var full_name = lowercase_name.match(/\S+/g); // split into first and last name w/o whitespace. Returns an array
			var flag = true;

			for (var j = 0, count = 0; j < name_key.length; ++j) { // each key
				var subcount = 0;
				var checklist = "";
				
				for (var k = 0; k < full_name.length; ++k) { // each name
					
					if (full_name[k].indexOf(name_key[j]) === 0) {
						if (checklist.indexOf(name_key[j]) === -1) { // if name not already included in subcount
							subcount++;
							checklist += full_name[k] + " ";
						} 
						
						//subcount++;
					}
				}
				if (subcount === 0) // if key matches none of the names 
					flag = false;
				count += subcount;
				
			}
			if (count < name_key.length)
					flag = false;
			if (flag === true)
					matches.push({ name: this.list[i].name, picture: this.list[i].picture});
		}
		cb(matches);
	}
}
