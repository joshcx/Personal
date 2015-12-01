
	Number.prototype.toRad = function() {
		// convert an angle (in degrees) to radians
		return this.valueOf()*Math.PI/180;
	}
	
	Number.prototype.prettyPrint = function() {
		// return a string representation of an integer
		// which has commas every three digits
		
		var numString = Math.floor(this.valueOf()).toString();		
		
			if(numString.length <= 3){
				return numString;
			}
			
		if(numString.length > 3){			
			//Amount of numbers before first comma is added; 3 if indx == 0	
			var indx = (numString.length) % 3; 		
			
			// How many commas will be added; Deduct 1 if indx == 0
			var numofCommas = Math.floor(numString.length/3);
		
			if(indx == 0){
				numofCommas -= 1;
				indx = 3;
			}
			//Adds first few digits and comma
			var finalString = numString.slice(0,indx) + ","; 
			
			//Final destination for slice
			var indxFin = indx + 3;
			
			var i = 0;
			while(i < numofCommas){
				if( i == numofCommas - 1){
					finalString = finalString + numString.slice(indx, indxFin);
					i++;
				}
				
				else{
					finalString = finalString + numString.slice(indx, indxFin) + ",";
					indx += 3;
					indxFin = indx + 3;
					i++;
				}
			}
		}
		
		return finalString;		
	}

	distanceFormula = function(first, second){
		//compute the distance in miles between two lat lng points 
		//a point should look like {lat: 0.0, lng: 0.0}
		
		var R = 3963; //mi
		
		if(!first || !second) return 0;
		var dLat = (second.lat-first.lat).toRad();
		var dLng = (second.lng-first.lng).toRad();
		var lat1 = first.lat.toRad();
		var lat2 = second.lat.toRad();
		
		var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.sin(dLng/2) * Math.sin(dLng/2) * Math.cos(lat1) * Math.cos(lat2);
				
		var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
		var d = R * c;

		return d;	
	}