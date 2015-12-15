var countries = new Array();

var players = {};
var victoryCount = 10;//game ends when one player only holds 10 territories
var numPlayers = 2; 
var startingTroops = 42; //Must be at least 42 for randomization and even for fairness.
var firstCountry = null; //for clicked countries
var secondCountry = null;
var turn;
var count;
var clicked;
var phase="start";

function init()
{
	// startingTroops/2 allows for each player to have exactly 21 of the territories
	// must remain this way for current pickPlayers() to distribute them evenly
	// more troops added later for first round
	players = {'player1': {'troops': startingTroops/2, 'countriesHeld':0}, 'player2':{'troops': startingTroops/2, 'countriesHeld':0}};
	turn = "player1"; 
	count = 0; // remove later: testing purposes
	
	clicked1 = null;
	clicked2 = null;


  $(".country").each(function(){
    var countryId = this.getAttribute('id');
    countries[countryId] = new Array();
    countries[countryId][0] = countryId; // country name
    countries[countryId][1] = "None"; // owner of country
    countries[countryId][2] = 1; // num of troops
  });

  setMoveListeners();
  
  $(".sea").each(function(){
  	$(this).on({  
        mouseover: function(e){
  		  $('#hovering').removeAttr('d');
  		  $('#attack').removeAttr('d');
  	  }
	  });
    $(this).click(function(){
    //$('.country').removeAttr('fill');
    //$('.country').removeAttr('stroke');
    //$('.country').removeAttr('stroke-width');
    //$('.country').removeClass('attackable');
	unLightAttackable(true);
	
      $('#clicked').removeAttr('d');
      $('#hovering').removeAttr('d');
      $('#country1').text("Click on a country");
	  clicked = null;
    });
  });
 
  $('#attack').click(function(e){
	var countryId = $(this).attr('name');
	if(countryId != firstCountry){
		var d = $(this).attr('d');
		secondCountry = countryId;
		$('#attack').removeAttr('d');
		$('#clicked2').attr('d', d);
	}
  });
  
  //  addText for all countries
    var paths = document.querySelectorAll(".country");
	var tcount = 0;
    for (var p in paths) {
		var player = pickPlayer();
		if(paths[p].id){ //player troops need to reach 0 for pickPlayer() to distribute them evenly
			countries[paths[p].id][1] = player;
			players[player]['countriesHeld']++;
			players[player]['troops']--;
			addText(paths[p], 1);
			tcount++;
		}	
    }
	//players should both have 0 troops now, with evenly distributed territories
	//give them each more troops here for first reinforce phase
	players['player1']['troops'] = 10;//startingTroops/2;
	players['player2']['troops'] = 10;//startingTroops/2;
	

  function addText(p, count) {
    var t = document.createElementNS("http://www.w3.org/2000/svg", "text");
    var b = p.getBBox();
    t.setAttribute("transform", "translate(" + (b.x + b.width/2) + " " + (b.y + b.height/2) + ")");
    t.textContent = countries[p.id][2];
    if (countries[p.id][1] == "player1") {
    	t.setAttribute("stroke", "blue");
    }
    else {
    	t.setAttribute("stroke", "red");
    }
    t.setAttribute("font-size", "20");
    t.setAttribute("id", p.getAttribute("id")+"text");
    p.parentNode.insertBefore(t, p.nextSibling);
  }
  
  function pickPlayer(){
	//picks player1 or player2 at random unless out of troops
	var num = Math.floor(Math.random() * 2) + 1;
	if(num == 1 && players['player1']['troops'] > 0)
		return 'player1';
	else if(num == 2 && players['player2']['troops'] > 0)
		return 'player2';
	else if(num == 1)
		return 'player2';
	else
		return 'player1';
  }
} // init



// increment only
  function updateText(countryId) {
  	var c = countries[countryId]; // get country object: name, owner, num of troops
    document.getElementById(countryId+"text").textContent=c[2]; // update troops number count display on map
  }
