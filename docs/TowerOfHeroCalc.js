var MEMBR_RATE = 0.1;
var COST_RATE = 0.02;
var MEMBER_RATE_MAX = 2.5;
var COST_RATE_MAX = 7.5;

var BASE_SCORE3 = 10000;

function recalc2()
{
	var cost = 0;
	var mem = 0;
	var costbk = 0;
	cost += getCellValue(0);
	for(var no = 1; no < 21; no++)
	{
		var cost2 = getCellValue(no);
		if(no < 16 && $('#check'+no).checked)
		{
			mem++;
		}
		cost += cost2;
	}
	
	$('#memCnt').innerHTML = mem;
	$('#costSum').innerHTML = cost;
	
	
	//☆３時スコア
	var score = BASE_SCORE3;
	//編成人数倍率
	var memRate = MEMBER_RATE_MAX - mem * MEMBR_RATE;
	if(memRate < 1) memRate=1;
	$('#memRate2').innerHTML = Math.ceil(memRate*100)/100.0;
	//使用コスト倍率
	var costRate = COST_RATE_MAX - cost * COST_RATE;
	if(costRate < 1) costRate=1;
	$('#costRate2').innerHTML = Math.ceil(costRate*100)/100.0;
	
	$('#score2').innerHTML = Math.ceil(score * memRate * costRate);
}

function getCellValue(no)
{
	var val = $('#member'+no).value;
	return val-0;
}

function initCell()
{
	$('#member0').onblur = recalc2;
	$('#member0').onchange = recalc2;
	for(var no = 1; no < 21; no++)
	{
		$('#member'+no).onblur = recalc2;
		$('#member'+no).onchange = recalc2;
		if(no < 16)
		{
			$('#check'+no).onblur = recalc2;
			$('#check'+no).onchange = recalc2;
			//$('#check'+no).checked=true;
		}
	}
}


function line90000()
{
	var tbl = "<tr><th>編成人数</th><th>使用コスト</th><th>スコア</th><tr>";
	for(var member = 0; member <= 16; member++)
	{
		var score = BASE_SCORE3;
		var memRate = MEMBER_RATE_MAX - member * MEMBR_RATE;
		//if(memRate < 1) continue;
		
		var costRate1 = 90000 / (score * memRate);
		var cost = Math.floor((COST_RATE_MAX - costRate1) / COST_RATE);
		//if(cost < 1) continue;
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
	initCell();

	$('#starPt2').innerHTML = BASE_SCORE3;

	line90000();
	
	recalc2();
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
