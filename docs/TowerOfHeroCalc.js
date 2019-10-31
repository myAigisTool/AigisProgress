var MEMBR_RATE = 0.1;
var COST_RATE = 0.02;
var MEMBER_RATE_MAX = 2.5;
var COST_RATE_MAX = 7.5;

var BASE_SCORE3 = 10000;


function recalc()
{
	//☆３時スコア
	var score = BASE_SCORE3;
	//編成人数倍率
	var memRate = MEMBER_RATE_MAX - $("#member").value * MEMBR_RATE;
	if(memRate < 1) memRate=1;
	$('#memRate').innerHTML = memRate;
	//使用コスト倍率
	var costRate = COST_RATE_MAX - $("#cost").value * COST_RATE;
	if(costRate < 1) costRate=1;
	$('#costRate').innerHTML = costRate;
	
	$('#score').innerHTML = score * memRate * costRate;
	
}

function line90000()
{
	var tbl = "<tr><th>編成人数</th><th>使用コスト</th><th>スコア</th><tr>";
	for(var member = 1; member < 16; member++)
	{
		var score = BASE_SCORE3;
		var memRate = MEMBER_RATE_MAX - member * MEMBR_RATE;
		if(memRate < 1) continue;
		
		var costRate1 = 90000 / (score * memRate);
		var cost = Math.floor((COST_RATE_MAX - costRate1) / COST_RATE);
		if(cost < 1) continue;
		var costRate2 = COST_RATE_MAX - cost * COST_RATE;

		tbl += "<tr><td>" +member + "</td><td>" + cost + "</td><td>"+Math.floor(BASE_SCORE3*memRate*costRate2) + "</td></tr>";
	}
	$('#line90000').innerHTML = tbl;
}

function $(id)
{
	return document.querySelector(id);
}

function init()
{
	$('#member').onblur = recalc;
	$('#member').onchange = recalc;
	$('#cost').onblur = recalc;
	$('#cost').onchange = recalc;

	$('#starPt').innerHTML = BASE_SCORE3;

	line90000();
}

if( window.addEventListener )
{
    window.addEventListener( 'load', init, false );
}
else if( window.attachEvent )
{
    window.attachEvent( 'onload', init );
}
else
{
    window.onload = init;
}
