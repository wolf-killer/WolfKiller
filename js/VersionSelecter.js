var submitTotalPlayer = 0;
var totalActorArray = [];
var godArray = []; 
var godChinArray = [];
var villagerArray = []; 
var villagerChinArray = [];
var wolfArray = []; 
var wolfChinArray = []; 
var versionMode = 'gonly';
var windowMode = 'lrAlign';
var alignment;
var pressTimer;//

$(document).ready(function(){
	SetWindow();
	getActorList();
}); 

$(document).on("click", '.actorImg', function(temp){
	var controlActor = temp.currentTarget.name;
	var controlActorCount = parseInt($("#actor"+controlActor+"Count").text());
	if (controlActorCount == 0){
		submitTotalPlayer++;
		$("#actor"+controlActor+"Count").text(controlActorCount+1);
		$("#actor"+controlActor+"Count").addClass("w3-pale-red");
		$("#actor"+controlActor).addClass("w3-border-red");
	}else if (controlActorCount == 1){
		if(controlActor == "Villager" || controlActor == "Wolf"){
			submitTotalPlayer++;
			$("#actor"+controlActor+"Count").text(controlActorCount+1);
			$("#actor"+controlActor+"Count").addClass("w3-pale-red");
		}else{
			submitTotalPlayer--;
			$("#actor"+controlActor+"Count").text(controlActorCount-1);
			$("#actor"+controlActor+"Count").removeClass("w3-pale-red");
			$("#actor"+controlActor).removeClass("w3-border-red");
		}
	}else if (controlActorCount == 2){
		if(controlActor == "Villager" || controlActor == "Wolf"){
			submitTotalPlayer++;
			$("#actor"+controlActor+"Count").text(controlActorCount+1);
		}
	}else if (controlActorCount == 3){
		if(controlActor == "Villager"){
			submitTotalPlayer++;
			$("#actor"+controlActor+"Count").text(controlActorCount+1);
		}else if (controlActor == "Wolf"){
			submitTotalPlayer = submitTotalPlayer-controlActorCount;
			$("#actor"+controlActor+"Count").text(0);
			$("#actor"+controlActor).removeClass("w3-border-red");
			$("#actor"+controlActor+"Count").removeClass("w3-pale-red");
		}
	}else if (controlActorCount > 3){
		if(controlActor == "Villager"){
			submitTotalPlayer = submitTotalPlayer-controlActorCount;
			$("#actor"+controlActor+"Count").text(0);
			$("#actor"+controlActor).removeClass("w3-border-red");
			$("#actor"+controlActor+"Count").removeClass("w3-pale-red");
		}
	}
	$("#submitTotalPlayer").text(translate(submitTotalPlayer));
	if(submitTotalPlayer > 12){
		UpdateBtn('windowMode', 'tableAlign');
	}
	if(submitTotalPlayer > 17){
		ShowAlert(	"alert", 
					"人數錯誤",
					"暫未支援多於" + translate(submitTotalPlayer-1) + "人局");
		selectVersion(0);
	}
});
$(document).on("taphold", '.actorImg', function(temp){
	showActorRuleInfo(temp.currentTarget.name);
});
$(document).on("taphold", '.extandSectionTitle', function(temp){
	var section = temp.currentTarget.id;
	section = section.slice(0, section.length - 5) + "Section";
	ExtandSection($(this).find('i'), section);
});
//data-long-press-delay="500" /*1000 = 1s*/
$(document).on("long-press", '.actorImg', function(temp){
	showActorRuleInfo(temp.currentTarget.name);
});
$(document).on("long-press", '.extandSectionTitle', function(temp){
	var section = temp.currentTarget.id;
	section = section.slice(0, section.length - 5) + "Section";
	ExtandSection($(this).find('i'), section);
});

function manualAdjust(){
	if($("#versionSelecter").is(":visible")){
		$(".HiddenPopupInfo").hide();
		$("#versionSelecter").hide();
		$("#windowAdjuster").show();
	}else{
		var inputObject = [{
			id: "manualX",
			type: "number",
			desc: "闊度",
			defaultValue: setWidth
		},{
			id: "manualY",
			type: "number",
			desc: "高度",
			defaultValue: setHeight
		}];
		var content = "現時闊度：" + setWidth + "<br/>現時高度：" + setHeight + "<br/>";
		ShowAlert(	"question", 
					"手動調整畫面大小", 
					content, 
					"ManualAdjustXY();$(\"#windowAdjuster\").show();", 
					inputObject);
	}
}
function displayVersionSelecter(){
	$("#windowAdjuster").hide();
	$("#versionSelecter").show();
}
function getActorList(){
	$("#VillagerActorSection").html("");
	$("#GodActorSection").html("");
	$("#WolfActorSection").html("");
	for(var i=0; i<allVillager.length; i++){
		$("#VillagerActorSection").append( 	"<div class='actorCard w3-container s3 m2 l1 w3-col w3-center w3-col-middle' style='padding: 0px;' data-long-press-delay='500'>" + 
											"	<img id='actor"+ allVillager[i] +"' class='actorImg' src='./image/actor/"+ allVillager[i] +".png' name='"+ allVillager[i] +"'> " +
											"	<p id='actor"+ allVillager[i] +"Count' name='actor"+ allVillager[i] +"Count' class='actorCount w3-border w3-round-xxlarge'>0</p>" +
											"</div>");	
	}
	for(var i=0; i<allGod.length; i++){
		$("#GodActorSection").append( 	"<div class='actorCard w3-container s3 m2 l1 w3-col w3-center w3-col-middle' style='padding: 0px;' data-long-press-delay='500'>" + 
											"	<img id='actor"+ allGod[i] +"' class='actorImg' src='./image/actor/"+ allGod[i] +".png' name='"+ allGod[i] +"'> " +
											"	<p id='actor"+ allGod[i] +"Count' name='actor"+ allGod[i] +"Count' class='actorCount w3-border w3-round-xxlarge'>0</p>" +
											"</div>");	
	}
	for(var i=0; i<allWolf.length; i++){
		$("#WolfActorSection").append( 	"<div class='actorCard w3-container s3 m2 l1 w3-col w3-center w3-col-middle' style='padding: 0px;' data-long-press-delay='500'>" + 
											"	<img id='actor"+ allWolf[i] +"' class='actorImg' src='./image/actor/"+ allWolf[i] +".png' name='"+ allWolf[i] +"'> " +
											"	<p id='actor"+ allWolf[i] +"Count' name='actor"+ allWolf[i] +"Count' class='actorCount w3-border w3-round-xxlarge'>0</p>" +
											"</div>");	
	}
}
function selectVersion(noOfPlayer){
	resetVersion();
	$("#submitTotalPlayer").text(translate(noOfPlayer));
	if(noOfPlayer == 0){
		return;
	}
	var tempArray;
	submitTotalPlayer = noOfPlayer;
	switch(noOfPlayer){
		case 6:
			UpdateBtn('versionMode', 'gnv');
			tempArray = array6;
			break;
		case 7:
			UpdateBtn('versionMode', 'gonly');
			tempArray = array7;
			break;
		case 8:
			UpdateBtn('versionMode', 'gonly');
			tempArray = array8;
			break;
		case 9:
			UpdateBtn('versionMode', 'gonly');
			tempArray = array9;
			break;
		case 10: 
			UpdateBtn('versionMode', 'gonly');
			tempArray = array10;
			break;
		case 11: 
			UpdateBtn('versionMode', 'gonly');
			tempArray = array11;
			break;
		case 12: 
			UpdateBtn('versionMode', 'gonly');
			tempArray = array12;
			break;
		default:
			console.log(noOfPlayer);
			break;
	}
	for(var i=0; i<tempArray.length; i++){
		var controlActor = tempArray[i];
		var lastChar = controlActor.substring(controlActor.length - 1);
		if(lastChar == 1 || lastChar == 2 || lastChar == 3){
			controlActor = controlActor.substring(0, controlActor.length-1);
		}
		var controlActorCount = parseInt($("#actor"+controlActor+"Count").text());
		$("#actor"+controlActor+"Count").text(controlActorCount+1);
		$("#actor"+controlActor+"Count").addClass("w3-pale-red");
		$("#actor"+controlActor).addClass("w3-border-red");
	}
}
function submitVersion(){
	var prefix = "actor";
	var postfix = "Count";
	for(var i=0; i<$(".actorCount").length; i++){
		var tempActor = $(".actorCount")[i].id;
		var tempActorCount = $(".actorCount")[i].innerText;
		var prefixPosition = tempActor.indexOf(prefix);
		var postfixPosition = tempActor.indexOf(postfix);
		tempActor = tempActor.slice(prefixPosition+prefix.length, postfixPosition);
		if(tempActor.length > 0 && tempActorCount > 0){
			if(allGod.includes(tempActor)){
				for(var j=0; j<tempActorCount; j++){
					totalActorArray.push(tempActor+(j>0?j:"")); 
					godArray.push(tempActor+(j>0?j:"")); 
					godChinArray.push(translate(tempActor)+(j>0?"["+translate(j)+"]":""));
				}	
			}else if(allVillager.includes(tempActor)){
				for(var j=0; j<tempActorCount; j++){
					totalActorArray.push(tempActor+(j>0?j:"")); 
					villagerArray.push(tempActor+(j>0?j:""));
					villagerChinArray.push(translate(tempActor)+(j>0?"["+translate(j)+"]":""));
				}					
			}else if(allWolf.includes(tempActor)){
				for(var j=0; j<tempActorCount; j++){
					totalActorArray.push(tempActor+(j>0?j:"")); 
					wolfArray.push(tempActor+(j>0?j:"")); 
					wolfChinArray.push(translate(tempActor)+(j>0?"["+translate(j)+"]":"")); 
				}
			}
		}
	}
	if(!(wolfArray.length > 0 && villagerArray.length > 0 && godArray.length > 0) || totalActorArray.length < 6){
		ShowAlert('alert', '人數錯誤','最少六名玩家<br/>並且每個陣營最少要有一名玩家');
		selectVersion(0);
		return;
	}	
	if(totalActorArray.length > 16){
		ShowAlert('alert', '人數錯誤','暫未支援多於' + translate(totalActorArray.length-1) + '人局');
		selectVersion(0);
		return;
	}	
	
	var passParam = {
		setWidth: setWidth,
		setHeight: setHeight,
		totalActorArray: totalActorArray,
		godArray: godArray,
		godChinArray: godChinArray,
		villagerArray: villagerArray,
		villagerChinArray: villagerChinArray,
		wolfArray: wolfArray,
		wolfChinArray: wolfChinArray,
		versionMode: versionMode,
		windowMode: windowMode
	};
	GoPage("WolfKiller", passParam);
}
function resetVersion(){
	submitTotalPlayer = 0;
	$(".actorCount").text("0");
	$(".actorImg").removeClass("w3-border-red");
	$(".actorCount").removeClass("w3-pale-red");
	totalActorArray = [];
	godArray = [];
	villagerArray = [];
	wolfArray = [];
	UpdateBtn('versionMode','gonly');
}
function showActorRuleInfo(input){
	$("#actorRuleInfo").html("");
	var tempActorList = [];
	if(input == "God"){
		tempActorList = allGod;
	}else if(input == "Wolf"){
		tempActorList = allWolf;
	}else{
		tempActorList.push(input);
	}
	
	for(var i=0; i<tempActorList.length; i++){
		$("#actorRuleInfo").append( 	"<tr> " +
										"	<td class='w3-col s2 m2 l1' style='float: none; vertical-align: middle; padding: 2px;'>" +
										"		<img class='actorImg' src='./image/actor/"+ tempActorList[i] +".png'/> " +
										"	</td>" +
										"	<td class='w3-col s3 m2 l2' style='float: none; vertical-align: middle; padding: 2px;'>" + 
										"		<span class='actorName' class=''>"+ translate(tempActorList[i])+"</span>" + 
										"	</td>" + 
										"	<td class='w3-col s7 m8 l9' style='float: none; vertical-align: middle; padding: 2px;'>" + 
										"		<span class='actorRule' class=''>"+allActorRule[tempActorList[i]] +"</span>" + 
										"	</td>" +
										"</tr>");	
	}
	$("#actorRuleDiv").css("display","block");
}
