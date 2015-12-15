var borders = {
	'East Africa': [ 'South Africa' , 'Congo' , 'North Africa' , 'Egypt' , 'Middle East' , 'Madagascar' ], 
	'Egypt': [ 'East Africa' , 'North Africa' , 'Southern Europe' , 'Middle East' ],
	'North Africa': [ 'Egypt' , 'East Africa' , 'Congo' , 'Western Europe' , 'Southern Europe' , 'Brazil' ],
	'Congo': ['South Africa' , 'East Africa' , 'North Africa'  ],
	'South Africa': [ 'Congo' , 'East Africa' , 'Madagascar' ],
	'Madagascar': ['East Africa' , 'South Africa' ],
	'Argentina': ['Peru' , 'Brazil' ],
	'Brazil': ['Venezuela' , 'Peru' , 'Argentina' , 'North Africa' ],
	'Peru': ['Argentina' , 'Brazil' , 'Venezuela' ],
	'Venezuela': ['Peru' , 'Brazil' , 'Central America' ],
	'Central America': ['Venezuela' , 'Western United States' , 'Eastern United States' ],
	'Western United States': ['Central America' , 'Eastern United States' , 'Ontario' , 'Alberta' ],
	'Eastern United States': ['Central America' , 'Western United States' , 'Ontario' , 'Quebec' ],
	'Quebec': ['Eastern United States' , 'Ontario' , 'Greenland' ],
	'Ontario': ['Western United States' , 'Eastern United States' , 'Quebec' , 'Alberta' , 'Northwest Territory' , 'Greenland' ],
	'Alberta': ['Western United States' , 'Ontario' , 'Northwest Territory' , 'Alaska' ],
	'Alaska': ['Alberta' , 'Northwest Territory' , 'Kamchatka' ],
	'Northwest Territory': ['Alaska' , 'Alberta' , 'Ontario' , 'Greenland' ],
	'Greenland': ['Northwest Territory' , 'Ontario' , 'Quebec' , 'Iceland' ],
	'Iceland': ['Greenland' , 'Scandinavia' , 'Great Britain' ],
	'Scandinavia': ['Iceland' , 'Great Britain' , 'Northern Europe' , 'Ukraine' ],
	'Ukraine': ['Scandinavia' , 'Northern Europe' , 'Afghanistan' , 'Ural' , 'Middle East', 'Southern Europe' ],
	'Ural': ['Ukraine' , 'Afghanistan' , 'China' , 'Siberia' ],
	'Siberia': ['Ural' , 'China' , 'Mongolia' , 'Irkutsk' , 'Yakutsk' ],
	'Yakutsk': ['Siberia' , 'Irkutsk' , 'Kamchatka' ],
	'Irkutsk': ['Yakutsk' , 'Siberia' , 'Mongolia' , 'Kamchatka' ],
	'Kamchatka': ['Yakutsk' , 'Irkutsk' , 'Mongolia' , 'Japan' , 'Alaska' ],
	'Japan': ['Kamchatka' , 'Mongolia' ],
	'Mongolia': ['Japan' , 'Kamchatka' , 'Irkutsk' , 'Siberia' , 'China' ],
	'China': ['Mongolia' , 'Siberia' , 'Ural' , 'Afghanistan' , 'India' , 'Siam' ],
	'Afghanistan': ['Ural' , 'Ukraine' , 'Middle East' , 'India' , 'China' ],
	'Middle East': ['Ukraine' , 'Southern Europe' , 'Egypt' , 'East Africa' , 'India' , 'Afghanistan' ],
	'India': ['Siam' , 'China' , 'Afghanistan' , 'Middle East' ],
	'Siam': ['China' , 'india' , 'Indonesia' ],
	'Indonesia': ['Siam' , 'Western Austrailia' , 'New Guniea' ],
	'New Guniea': ['Indonesia' , 'Western Austrailia' , 'Eastern Austrailia' ],
	'Eastern Austrailia': ['New Guniea' , 'Western Austrailia' ],
	'Western Austrailia': ['Eastern Austrailia' , 'New Guniea' , 'Indonesia' ],
	'Great Britain': ['Iceland' , 'Scandinavia' , 'Northern Europe' , 'Western Europe' ],
	'Western Europe': ['Great Britain' , 'North Africa' , 'Southern Europe' , 'Northern Europe' ],
	'Northern Europe': ['Scandinavia' , 'Western Europe' , 'Southern Europe' , 'Ukraine' ],
	'Southern Europe': ['Northern Europe' , 'Western Europe' , 'North Africa' , 'Egypt' , 'Middle East' , 'Ukraine' ]
};

var clicked1;
var clicked2;

function startAttackPhase(){
	unLightAttackable(true);
    phase="attack";
	$('#clicked').removeAttr('d');
    $('#hovering').removeAttr('d');
	$('#country1').text("Click on a country");
    $(".troopBtn").hide();
	var text;
	var color;
	if(turn == 'player1'){
		text = "Attack Phase for Player1";
		color = 'blue';
	}
	else{
		text = "Attack Phase for Player2";
		color = 'red';
	}
    $("#roundInfo").html(text);
	$('#roundInfo').css('color',color);
	$('#hovering').off('click');
	
	$('#hovering').click(function(e){
		e.preventDefault();
		if(phase == 'attack'){
			var d = $(this).attr('d');
			tempId = $(this).attr('name');
			if(clicked1 && canAttack(clicked1, tempId)){
				clicked2 = tempId;
				attack(clicked1, clicked2);
			}
			else if(clicked1 && !sameOwner(clicked1, tempId))
				alert("Too far away to attack");
			else if (countries[tempId][1] == turn){ 
				clicked1 = tempId;
				$('#clicked').attr('d', d);
				$('#country1').text(countries[clicked1][0] + " | Owner: " + countries[clicked1][1] + " | Troops: " + countries[clicked1][2]);
				lightAttackable(clicked1, countries[clicked1][1]);
			}
			else{
				alert("You must click a territory that you own!");
			}
		}
	});
}

function lightAttackable(country, owner){
	// var attackable = new Array();
	
	unLightAttackable(false);
	
	for(i = 0; i < borders[country].length; ++i){	
		var select = "[id='"+ borders[country][i] +"'";
		var borderId = borders[country][i];
		if(owner != countries[borderId][1]){
			$(select).attr('fill','red');
			$(select).attr('opacity','0.5');
			$(select).attr('stroke','black');
			$(select).attr('stroke-width','8');
			$(select).addClass("attackable");
			// attackable.push(borderId);	
		}
		else{
			$(select).attr('fill','white');
			$(select).attr('stroke','black');
			$(select).attr('opacity','0.5');
			$(select).attr('stroke-width','8');	
		}
	}
}

function unLightAttackable(sea){
	if(clicked2 && !clicked1){
		clicked2 = null;
	}
	if((clicked1 && clicked2) || (clicked1 && countries[clicked1][1] == turn)){
		$('.country').removeAttr('fill');
		$('.country').removeAttr('stroke');
		$('.country').removeAttr('opacity');
		$('.country').removeAttr('stroke-width');
		$('.country').removeClass('attackable');
		clicked2 = null;
	}
		if(sea){
		$('.country').removeAttr('fill');
		$('.country').removeAttr('stroke');
		$('.country').removeAttr('opacity');
		$('.country').removeAttr('stroke-width');
		$('.country').removeClass('attackable');
		clicked1 = null;
		clicked2 = null;
	}
}

function canAttack(attacker, defender){
	if (haveBorder(attacker, defender)){
		if (!sameOwner(attacker, defender)){
			return true;
		}
	}
	return false;
}

function haveBorder(cid1, cid2){
	for(i = 0; i < borders[cid1].length; ++i){
		if(borders[cid1][i] == cid2)
			return true;
	}
	return false;
}

function sameOwner(cid1, cid2){
	if(countries[cid1][1] == countries[cid2][1])
		return true;
	return false;	
}
	
function attack(attacker, defender){
//currently attacks until either the territory is taken
// or all but one attacking troop is destroyed
	if(canAttack(attacker, defender) && countries[attacker][2] > 1){
		console.log(attacker + " is attacking " + defender );
		while(countries[attacker][2] > 1 && countries[defender][2] > 0){
			var attackerDice = [];
			var defenderDice = [];
			var attCount = countries[attacker][2];
			var defCount = countries[defender][2];
			if(attCount >= 4)
				attCount = 3;
			if(defCount >= 2)
				defCount = 2;
			for( i = 3; i > 0; i-- ){
				if(attCount > 0){
					attackerDice.push(rollDice());
					attCount--;
				}
				if(defCount > 0){
					defenderDice.push(rollDice());
					defCount--;
				}
			}

			//gets rid of extra dice after rolling in preparation for comparison
			attackerDice.sort(function(a, b){return b-a});
			defenderDice.sort(function(a, b){return b-a});
			while(attackerDice.length > defenderDice.length){
				attackerDice.pop();
			}
			while(defenderDice.length > attackerDice.length){
				defenderDice.pop();
			}
			console.log("attacker rolls: " + attackerDice + " defender rolls: " + defenderDice);
		
			for ( i = 0; i < attackerDice.length; ++i ){
				if(defenderDice.length > 0){
					if(attackerDice[i] > defenderDice[0]){
						countries[defender][2]--;
					}
					else{
						countries[attacker][2]--;
					}
					defenderDice.shift();//just pop_front()
				}
				else{
					countries[defender][2]--;
				}
			}
		}
			
		if(countries[defender][2] <= 0){//handles change of ownership
			//this moves all but 1 surviving attacking troop to the conquered territory
			countries[defender][1] = countries[attacker][1];
			countries[defender][2] = countries[attacker][2] - 1;
			countries[attacker][2] = 1;
				
			if(turn == 'player1'){
				players['player2']['countriesHeld']--;
				players['player1']['countriesHeld']++;
				document.getElementById(defender+"text").setAttribute("stroke", "blue");
				if(players['player2']['countriesHeld'] <= victoryCount){//victory condition
					alert(turn + " wins the game!");
					window.location.reload();
				}
			}
			else{
				players['player1']['countriesHeld']--;
				players['player2']['countriesHeld']++;
				document.getElementById(defender+"text").setAttribute("stroke", "red");
				if(players['player1']['countriesHeld'] <= victoryCount){//victory condition
					alert(turn + " wins the game!");
					window.location.reload();
				}
			}
			
			lightAttackable(attacker, turn);
		}
		updateText(attacker);
		updateText(defender);
		$('#country1').text(countries[clicked1][0] + " | Owner: " + countries[clicked1][1] + " | Troops: " + countries[clicked1][2]);
	}
	else{
		alert("You must leave 1 set of troops behind to defend!")
	}
}

function rollDice(){
	return Math.floor(Math.random() * 6) + 1;
}
