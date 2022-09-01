var totalActorArray = GetUrlParameter('totalActorArray')? GetUrlParameter('totalActorArray').split(","): [];
var godArray = GetUrlParameter('godArray')? GetUrlParameter('godArray').split(","): [];
var godChinArray = GetUrlParameter('godChinArray')? GetUrlParameter('godChinArray').split(","): [];
var villagerArray = GetUrlParameter('villagerArray')? GetUrlParameter('villagerArray').split(","): [];
var villagerChinArray = GetUrlParameter('villagerChinArray')? GetUrlParameter('villagerChinArray').split(","): [];
var wolfArray = GetUrlParameter('wolfArray')? GetUrlParameter('wolfArray').split(","): [];
var wolfChinArray = GetUrlParameter('wolfChinArray')? GetUrlParameter('wolfChinArray').split(","): [];
var versionMode = GetUrlParameter('versionMode')? GetUrlParameter('versionMode'): null;
var windowMode = GetUrlParameter('windowMode')? GetUrlParameter('windowMode'): null;

var totalPlayer = 0;
var player = [null]; 
var alivePlayer = [null];
var godAlivePlayer = []; 
var villagerAlivePlayer = []; 
var wolfAlivePlayer = []; 
var action;
var log;

var confirmPlayer = 0;

$(window).on("load", function(){
	$("#loader-background").show();
	if(totalActorArray.length < 6){
		ShowAlert("alert", "錯誤", "重啟遊戲");
		GoPage("VersionSelecter", {});
		return;
	}
	SetWindow();
	gameInit();
}); 
$(document).on("click", '.playerButton', function(temp){
	var playerCard = "playerCard";
	var playerButton = "playerButton";
	var tempId = temp.currentTarget.id;
	var selectPlayer = "";
	if(tempId.includes("playerCard")){
		selectPlayer = tempId.substring(playerCard.length);
	}else{
		selectPlayer = tempId.substring(playerButton.length);
		return;
	}
	if(temp.currentTarget.classList.contains("diedPlayer")){
		return;
	}else if(action == "confirmRole"){ 
		if(selectPlayer == confirmPlayer)
			confirmRole(selectPlayer); 
	}else if(action == "wolfAction"){
		wolfCloseEye(selectPlayer);
	}else if (action == "witchAction"){
		witchCloseEye(selectPlayer);
	}else if(action == "seerAction"){
		showRoleToSeer(selectPlayer);
	}else if(action == "knightAction"){
		knightAction(selectPlayer);
	}else if(action == "guardAction"){
		guardCloseEye(selectPlayer);
	}else if(action == "bringByHunter"){
		if(player[selectPlayer] == "GhostWolf"){
			if(ghostReverse == 0 || ghostReverse == noOfNight){
				ghostReverse = noOfNight;
				log += "<tr><td>"+translate("Hunter")+"</td><td>帶"+translate(selectPlayer)+"號玩家["+translate(player[selectPlayer])+"]失敗<br/>惡靈騎士不能死於夜晚</td></tr>";
				$(".info").html( "遊戲繼續" );	
				action = "";
				return;
			}else{
				log += "<tr><td>"+translate("Hunter")+"</td><td>帶"+translate(selectPlayer)+"號玩家["+translate(player[selectPlayer])+"]<br/>惡靈騎士已於第"+translate(ghostReverse)+"晚使用反傷技能</td></tr>";
				killPlayer(selectPlayer, false, false, false)
			}
		}else{
			log += "<tr><td>"+translate("Hunter")+"</td><td>帶"+translate(selectPlayer)+"號玩家["+translate(player[selectPlayer])+"]</td></tr>";
			killPlayer(selectPlayer, false, false, false);
		}
	}else if(action == "bringByWolfKing"){
		if(player[selectPlayer] == "GhostWolf"){
			if(ghostReverse == 0 || ghostReverse == noOfNight){
				ghostReverse = noOfNight;
				log += "<tr><td>"+translate("WolfKing")+"</td><td>帶"+translate(selectPlayer)+"號玩家["+translate(player[selectPlayer])+"]失敗<br/>惡靈騎士不能死於夜晚</td></tr>";
				$(".info").html( "遊戲繼續" );	
				action = "";
				return;
			}else{
				log += "<tr><td>"+translate("WolfKing")+"</td><td>帶"+translate(selectPlayer)+"號玩家["+translate(player[selectPlayer])+"]<br/>惡靈騎士已於第"+translate(ghostReverse)+"晚使用反傷技能</td></tr>";
				killPlayer(selectPlayer, false, false, false)
			}
		}else{
			log += "<tr><td>"+translate("WolfKing")+"</td><td>帶"+translate(selectPlayer)+"號玩家["+translate(player[selectPlayer])+"]</td></tr>";
			killPlayer(selectPlayer, false, false, false);
		}
	}else if(action == "killOther"){
		log += "<tr><td>公投</td><td>"+translate(selectPlayer)+"號玩家["+translate(player[selectPlayer])+"]</td></tr>";
		killPlayer(selectPlayer, false, false, false);
	}else if(action == "killSelf"){
		killSelfAction(selectPlayer);
	}else if(action == "checkRole"){
		showKnight(selectPlayer);
	}else if(action == "confirmRoleING"){
		hiddenRole(selectPlayer);
	}else{
		alert("Wrong Action");
	}
});
function gameInit(){
	console.log(totalActorArray);
	totalPlayer = totalActorArray.length;
	player = [null]; 
	
	for(var i=totalPlayer; i>0; i--){
		//var no = Math.floor(Math.random() * (i - 0)) + 0; 
		var no = Math.floor(GetRandom() * (i - 0)) + 0;
		player.push(totalActorArray[no]); 
		alivePlayer.push(totalActorArray[no]); 
		totalActorArray.splice(no,1); 
	} 
	console.log(player); 
	godAlivePlayer = godArray;
	villagerAlivePlayer = villagerArray;
	wolfAlivePlayer = wolfArray;
	setPlayerSeat();
		
	action = "confirmRole"; 
	
	confirmPlayer ++;
	$("#playerImg"+confirmPlayer).addClass("confirming");
	ShowInfo();
	$(".wolf-info").html("確認身份"+
					"<i onclick=\"updateAction('confirmRole')\" class=\"bi bi-person-bounding-box\" style=\"margin-left:20px;\"></i>");	
	log += "<table class='dayLog w3-pale-blue'>";
}


function confirmRole(noOfPlayer){ 
	action = "confirmRoleING";
	if(setWidth < 500)
		$("#playerDiv").show();
	switch(player[noOfPlayer]){ 
		case "Wolf":	
		case "Wolf1": 
		case "Wolf2": 
			$("#playerImg"+noOfPlayer).attr("src",imageWolf); 
			$("#confirmingPlayerImg").attr("src",imageWolf); 
			$("#confirmingPlayerNo").html(translate(noOfPlayer)+"號玩家");
			$("#confirmingPlayerRule").html(translate(player[noOfPlayer]));
			break; 
		case "WolfKing": 
			$("#playerImg"+noOfPlayer).attr("src",imageWolfKing); 
			$("#confirmingPlayerImg").attr("src",imageWolfKing); 
			$("#confirmingPlayerNo").html(translate(noOfPlayer)+"號玩家");
			$("#confirmingPlayerRule").html(translate(player[noOfPlayer]));
			break; 
		case "SecretWolf":
			$("#playerImg"+noOfPlayer).attr("src",imageSecretWolf); 
			$("#confirmingPlayerImg").attr("src",imageSecretWolf); 
			$("#confirmingPlayerNo").html(translate(noOfPlayer)+"號玩家");
			$("#confirmingPlayerRule").html(translate(player[noOfPlayer]));
			break; 
		case "GhostWolf":
			$("#playerImg"+noOfPlayer).attr("src",imageGhostWolf); 
			$("#confirmingPlayerImg").attr("src",imageGhostWolf); 
			$("#confirmingPlayerNo").html(translate(noOfPlayer)+"號玩家");
			$("#confirmingPlayerRule").html(translate(player[noOfPlayer]));
			break; 
		case "Seer": 
			$("#playerImg"+noOfPlayer).attr("src",imageSeer); 		
			$("#confirmingPlayerImg").attr("src",imageSeer); 
			$("#confirmingPlayerNo").html(translate(noOfPlayer)+"號玩家");
			$("#confirmingPlayerRule").html(translate(player[noOfPlayer]));
			break; 
		case "Witch": 
			$("#playerImg"+noOfPlayer).attr("src",imageWitch); 
			$("#confirmingPlayerImg").attr("src",imageWitch); 
			$("#confirmingPlayerNo").html(translate(noOfPlayer)+"號玩家");
			$("#confirmingPlayerRule").html(translate(player[noOfPlayer]));
			break; 
		case "Knight": 
			$("#playerImg"+noOfPlayer).attr("src",imageKnight); 
			$("#confirmingPlayerImg").attr("src",imageKnight); 
			$("#confirmingPlayerNo").html(translate(noOfPlayer)+"號玩家");
			$("#confirmingPlayerRule").html(translate(player[noOfPlayer]));
			break; 
		case "Hunter": 
			$("#playerImg"+noOfPlayer).attr("src",imageHunter); 
			$("#confirmingPlayerImg").attr("src",imageHunter); 
			$("#confirmingPlayerNo").html(translate(noOfPlayer)+"號玩家");
			$("#confirmingPlayerRule").html(translate(player[noOfPlayer]));
			break; 
		case "Guard": 
			$("#playerImg"+noOfPlayer).attr("src",imageGuard); 
			$("#confirmingPlayerImg").attr("src",imageGuard); 
			$("#confirmingPlayerNo").html(translate(noOfPlayer)+"號玩家");
			$("#confirmingPlayerRule").html(translate(player[noOfPlayer]));
			break; 
		case "Bear":
			$("#playerImg"+noOfPlayer).attr("src",imageBear);
			$("#confirmingPlayerImg").attr("src",imageBear); 
			$("#confirmingPlayerNo").html(translate(noOfPlayer)+"號玩家");
			$("#confirmingPlayerRule").html(translate(player[noOfPlayer]));
			break;
		case "Idiot":
			$("#playerImg"+noOfPlayer).attr("src",imageIdiot);
			$("#confirmingPlayerImg").attr("src",imageIdiot); 
			$("#confirmingPlayerNo").html(translate(noOfPlayer)+"號玩家");
			$("#confirmingPlayerRule").html(translate(player[noOfPlayer]));
			break;
		case "Villager": 
		case "Villager1": 
		case "Villager2": 
		case "Villager3": 
			$("#playerImg"+noOfPlayer).attr("src",imageVillager); 
			$("#confirmingPlayerImg").attr("src",imageVillager); 
			$("#confirmingPlayerNo").html(translate(noOfPlayer)+"號玩家");
			$("#confirmingPlayerRule").html(translate(player[noOfPlayer]));
			break; 
		default: 
			$("#playerImg"+noOfPlayer).attr("src",imagePlayer); 
			$("#confirmingPlayerImg").attr("src",imagePlayer); 
			$("#confirmingPlayerNo").html(translate(noOfPlayer)+"號玩家");
			$("#confirmingPlayerRule").html(translate(player[noOfPlayer]));
			break; 
	} 
	setTimeout(function(){  hiddenRole(noOfPlayer); checkNext(); }, 1500); // 1000ms = 1s	 
} 
function hiddenRole(noOfPlayer){ 
	$("#playerImg"+noOfPlayer).attr("src",imagePlayer);
	$("#playerDiv").hide();
	ShowInfo();
	//resetDiv();
} 
function checkNext(){
	$("#playerImg"+confirmPlayer).removeClass("confirming");
	confirmPlayer++;
	$("#playerImg"+confirmPlayer).addClass("confirming");	
	action = "confirmRole";
	/*
	if(confirmPlayer > submitTotalPlayer){
		resetDiv();
		$("#dayActionDiv").show();
	}
	*/
}
