//Player1 plays first for now
function stats(){
	this.totalNumTroops = 0;
}
var p1Stats = new stats();	//object to hold stats for p1
var p2Stats = new stats();	//object to hold stats for p1
var battleSetup = function(){
	$('#nextButton').off();

	$('#player1').css('color', 'blue');
	$('#player2').css('color', 'black');

	$('#plusButton').hide();
	$('#minusButton').hide();

	$('.p1 .troops').each(function(){
		p1Stats.totalNumTroops += parseInt($(this).text());
	});
	$('#player1 span').text(p1Stats.totalNumTroops);

	$('.p2 .troops').each(function(){
		p2Stats.totalNumTroops += parseInt($(this).text());
	});
	$('#player2 span').text(p2Stats.totalNumTroops);
};