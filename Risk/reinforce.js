// keep calling this function until player runs out of troops
function reinforceTroops (turn, countryId) { 
	//console.log("Arrived to reinforceTroops!");
	//console.log(players['player1']['troops']);
	if(countryId){
		if (turn == countries[countryId][1]) {
			// if troops != 0
			if (turn == "player1") {
				if (players['player1']['troops'] == 0) {
					alert("You're out of troops!")
					return;
				}
				players['player1']['troops']--;
				countries[countryId][2]++;
				console.log("Remaining number of troops: " + players['player1']['troops']);
			}
			else {
				if (players['player2']['troops'] == 0) {
					alert("You're out of troops!")
					return;
				}
				players['player2']['troops']--;
				countries[countryId][2]++;
				console.log("Remaining number of troops: " + players['player2']['troops'])
			}
			updateText(countryId);
		}
		else alert("That's not your territory!");
	}
	else alert("Click on one of your territories to assign troops!");
}

function setMoveListeners(){
  $(".country").each(function(){
    $(this).on({  
      mouseover: function(e){
     
        var countryId = e.target.getAttribute('id');
        var d = $(this).attr('d');
        $('#hovering').attr('d', d);
        $('#hovering').attr('name', countryId);
        $('#country2').text(countries[countryId][0] + " | Owner: " + countries[countryId][1] + " | Troops: " + countries[countryId][2]);
      }
    });
  });

  $('#hovering').click(function(e){
    var countryId = $(this).attr('name'); // get country name
	
    var d = $(this).attr('d');
    $('#clicked').attr('d',d);
    clicked = countryId;
    $('#country1').text(countries[countryId][0] + " | Owner: " + countries[countryId][1] + " | Troops: " + countries[countryId][2]);
  });
}
