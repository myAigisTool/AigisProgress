
var mapData;
var targetList;
var storage = localStorage;

var tableMap;
var tableTarget;


var BAR_MAX_WIDTH = 1000;

function itemChange1()
{
	storage.setItem(this.id, this.value);
}
function itemChangeCheck()
{
	storage.setItem(this.id, this.checked);
}

function exportData()
{
	var obj = new Object();
	obj.dateFrom = storage.getItem('dateFrom');
	obj.dateTo = storage.getItem('dateTo');
	var mapData = JSON.parse(storage.getItem('mapData'));
	
	for(var i = mapData.length-1 ; i >= 0; i--)
	{
		if(mapData[i][0] == null)
		{
			mapData.pop();
		}
	}
	obj.mapData = mapData;
	var targetList = JSON.parse(storage.getItem('rewardGrid'));
	for(var i = targetList.length-1 ; i >= 0; i--)
	{
		if(targetList[i][0] == null)
		{
			targetList.pop();
		}
	}
	obj.targetList = targetList;
	document.querySelector('#exportArea').innerHTML = JSON.stringify(obj);
	showExportPopup();
	
}
function closePopup()
{
	document.querySelector('#bgArea').style.display="none";
	document.querySelector('#exportPopup').style.display="none";
	document.querySelector('#inputInitArea').style.display="none";

}
function showExportPopup()
{
	document.querySelector('#exportPopup').style.display="block";
	document.querySelector('#bgArea').style.display="block";
}
function clearData()
{
	storage.removeItem('dateFrom');
	storage.removeItem('dateTo');
	storage.removeItem('mapData');
	storage.removeItem('rewardGrid');
	init();
}
function mapClear()
{
	storage.removeItem('mapData');
	storage.removeItem('rewardGrid');
}
function setMissionList()
{
	
	var parentElm = document.querySelector('#missionList');
	for(let i = 0; i < preData.length; i++)
	{
		var elm = document.createElement("option");
		elm.setAttribute("value", i);
		elm.innerHTML = preData[i].title;
		parentElm.appendChild(elm);
	}
}
function applyMissionData()
{
	var val = document.querySelector('#missionList').value;
	var data = JSON.parse(preData[val].data);
	
	storage.setItem('dateFrom', data.dateFrom);
	storage.setItem('dateTo', data.dateTo);
	storage.setItem('mapData', JSON.stringify(data.mapData));
	storage.setItem('rewardGrid', JSON.stringify(data.targetList));
	
	init();
}
function copyClipboad()
{
	var temp = document.querySelector('#exportArea');
	temp.selectionStart = 0;
	temp.selectionEnd = temp.innerHTML.length;
	temp.focus();
	document.execCommand('copy');
}
function helpClose()
{
	var parent = this.parentNode;
	parent.style.display = 'none';
}
function helpOpen()
{
	document.querySelector('#help').style.display = 'block';
}
function inputInitOpen()
{
	document.querySelector('#inputInitArea').style.display="block";
	document.querySelector('#bgArea').style.display="block";
}

function loadInit()
{
	mapData = storage.getItem('mapData');
	if(mapData == null || mapData.length == 0)
	{
		inputInitOpen();
	}
	init();
}
function init()
{
	setMissionList();
	
	var grid = document.querySelector('#grid');
	grid.innerHTML = "";
	var targetListElm = document.querySelector('#rewardGrid');
	targetListElm.innerHTML = "";


	document.querySelector('#dateFrom').onblur = itemChange1;
	document.querySelector('#dateTo').onblur = itemChange1;
	document.querySelector('#exportBtn').onclick = exportData;
	document.querySelector('#clearData').onclick = clearData;
	document.querySelector('#missionApply').onclick = applyMissionData;
	document.querySelector('#bgArea').onclick = closePopup;
	document.querySelector('#copyClipboad').onclick = copyClipboad;
	document.querySelector('#helpClose').onclick = helpClose;
	document.querySelector('#helpOpen').onclick = helpOpen;
	

	document.querySelector('#dateFrom').value = storage.getItem('dateFrom');
	document.querySelector('#dateTo').value = storage.getItem('dateTo');

	mapData = storage.getItem('mapData');
	if(mapData == null || mapData.length == 0)
	{
		inputInitOpen();
		mapData = [
			[,,,,,,,,,]
		];
	}
	else
	{
		mapData = JSON.parse(mapData);
	}
	
	targetList= storage.getItem('rewardGrid');
	if(targetList == null || targetList.length == 0)
	{
		targetList = [
			[,]
		];
	}
	else
	{
		targetList = JSON.parse(targetList);
	}

	tableMap = new Handsontable(grid, {
		data: mapData,
		columns : mapColumns,
		colHeaders: mapHeaders,
		readOnly:false,
		cells: function(row, col, prop) {
			storage.setItem('mapData', JSON.stringify(mapData));
			
		    var cellProperties = {};
		    return cellProperties;
		}
	});
	
	tableTarget = new Handsontable(targetListElm,{
		data: targetList,
		columns : tarColumns,
		colHeaders: tarHeaders,
		readOnly:false,
		cells: function(row, col, prop) {
			
		    var cellProperties = {};
		    return cellProperties;
		}
		,afterChange: function(change, source)
		{
			if(source != 'edit') return;
			storage.setItem('rewardGrid', JSON.stringify(targetList));
		}
	});
}

var mapColumns = [
	{type:'text'},
	{type:'autocomplete', source:['初級','中級','上級','極級','神級']},
	{type:'numeric'},
	{type:'numeric'},
	{type:'numeric'},
	{type:'text'},
	{type:'text'},
	{type:'text'},
	{type:'text'},
];

var tarColumns = [
	{type:'numeric'},
	{type:'text'},
];

var mapHeaders = ['MAP','難易度','カリスマ','スタミナ','期待値','ドロップ１','ドロップ２','ドロップ３','ドロップ４'];
var tarHeaders = ['目標個数','説明'];


if( window.addEventListener )
{
    window.addEventListener( 'load', loadInit, false );
}
else if( window.attachEvent )
{
    window.attachEvent( 'onload', loadInit );
}
else
{
    window.onload = loadInit;
}
