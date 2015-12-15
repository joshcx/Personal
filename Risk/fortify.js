// turn == p1 or p2
// buttonSign == "+" or "-" button
function fortifyTroops(turn, countryId, buttonSign) {
	//console.log("Arrived to fortifyTroops!");
	if (turn == countries[countryId][1]) {
		if (buttonSign == "plus") { //plusSign
			if (turn == "player1") {
				if (players['player1']['troops'] == 0) {
					alert("You are out of troops!");
					return;
				}
				players['player1']['troops']--;
			}
			else { //player2's turn
				if (players['player2']['troops'] == 0) {
					alert("You are out of troops!");
					return;
				}
				players['player2']['troops']--;
			}
			countries[countryId][2]++;
		}
		else { // minusSign
			if (countries[countryId][2] == 1) {
				alert("You need at least one troop to defend your territory!");
				return;
			}
			if (turn == "player1") {
				players['player1']['troops']++;
			}
			else { //player2's turn
				players['player2']['troops']++;
			}
			countries[countryId][2]--;
		}	
		updateText(countryId);
	}
	else alert("That's not your territory!");
	 $('#country1').text(countries[countryId][0] + " | Owner: " + countries[countryId][1] + " | Troops: " + countries[countryId][2]);
}

function startMovePhase(){
	$('#clicked').removeAttr('d');
    $('#hovering').removeAttr('d');
	$('#country1').text("Click on a country");
	unLightAttackable();
    phase="move";
    $(".troopBtn").show();
    var name = "Player 1";
    if(turn=="player2")
        name = "Player 2";
    $('#roundInfo').text("Move Phase for "+name);
    setMoveListeners();
}
