var firstTurn = true;

function startReinforcePhase(){
	$('#clicked').removeAttr('d');
    $('#hovering').removeAttr('d');
	$('#country1').text("Click on a country");
    var name = "Player 1";
	var color = 'blue';
    if(turn=="player2"){
        name = "Player 2";
		color ='red';
	}
    $('#roundInfo').text("Reinforce Phase for "+name);
	$('#roundInfo').css('color',color);
    $("#troopInfo").html("Troops remaining: <span id='numTroops'>"+ players[turn]["troops"] + "</span>");
}

$('#playButton').click(function(evt){
	$('#playButton').hide();
    $('#statButton').show();
    $('#gameInterface').show();
	$(".pText").show();
	$(".icon").show();
	init();
    turn = "player1";

    $('#topBtn').click(function(evt){
        fortifyTroops(turn, clicked, "plus");
        $('#numTroops').html(players[turn]["troops"]);
    });

    $('#botBtn').click(function(evt){
       fortifyTroops(turn, clicked, "minus"); 
        $('#numTroops').html(players[turn]["troops"]);
    });
    $('#statButton').click(function(){
        var p1Territories = 0;
          var p2Territories = 0;
          var p1Troops = 0;
          var p2Troops = 0; 
          $('.country').each(function(){
            var countryId = this.getAttribute('id');
            if(countries[countryId][1] == "player1"){
              p1Territories++;
              p1Troops += countries[countryId][2];
            }
            else{
              p2Territories++;
              p2Troops += countries[countryId][2];
            }
          });
          // console.log($('.test')[0]);
          $($('.p1stat')[0]).text(p1Territories);
          $($('.p1stat')[1]).text(p1Troops);
          $($('.p2stat')[0]).text(p2Territories);
          $($('.p2stat')[1]).text(p2Troops);
          
    });


    startReinforcePhase();    
});

$('#nextBtn').click(function(evt){
    var name = "Player 1";
    if(turn=="player2")
        name = "Player 2";

    if(phase=="start"){
        if(players[turn]["troops"]>0)
            alert('Must place all troops first');
        else if(turn=="player2"){
            turn="player1";
            startAttackPhase();
        }
        else{
            turn="player2";
            $('#numTroops').html(players[turn]["troops"]);
            $('#roundInfo').html("Reinforce Phase for Player 2");
			$('#roundInfo').css('color','red');
        }
    }
    else if(phase=="reinforce"){
        if(players[turn]["troops"]>0)
            alert('Must place all troops first');
        else{
            startAttackPhase();
        }
        
    }
    else if(phase=="attack"){
        startMovePhase();
    }
    else if(phase=="move"){

        if(players[turn]["troops"] > 0)
            alert("You have troops waiting to be moved");
        else{
            if(turn=="player1")
                turn="player2"
            else
                turn="player1"
        
            //stops player 2 from getting extra troops on first round
            if(!firstTurn){
                players[turn]["troops"] = calcReinforcements(turn);
                phase="reinforce";
                startReinforcePhase();
            }
            else{
                startAttackPhase();
                firstTurn = false;
            }
        }

        
    }
});

function calcReinforcements(player){
	// based on risk rules without cards or continents
	var temp = Math.floor(players[player]['countriesHeld'] / 3);
	if(temp < 3)
		temp = 3;
	return temp;
}