var player = [null]; 
var alivePlayer = [null];
var godAlivePlayer = []; 
var villagerAlivePlayer = []; 
var wolfAlivePlayer = []; 
var action;
var noOfNight = 0;
var nightActionNo = 0;
var witchGoodDrug = 1;
var witchBadDrug = 1;
var ghostReverse = 0; //save the night number used the reverse action
var wolfKill = 0;
var witchSave = false;
var witchKill = 0; 
var seerCheck = 0;
var guardProtect = 0;
var bearGrowl = false;

var confirmPlayer = 0;
var versionLog = "";
var log = "";
var wh = 0;
var landscape = false;

$(document).on("click", '.playerButton', function(temp){
	var playerCard = "playerCard";
	var playerButton = "playerButton";
	var tempId = temp.currentTarget.id;
	var selectPlayer = "";
	if(tempId.includes("playerCard")){
		selectPlayer = tempId.substring(playerCard.length);
	}else{
		selectPlayer = tempId.substring(playerButton.length);
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

function getRandom(){
	var randomBuffer = new Uint32Array(1);
	window.crypto.getRandomValues(randomBuffer);
	return randomBuffer[0] / (0xFFFFFFFF + 1);
}
function startNewGame(){ 
	player = [null]; 
	for(var i=submitTotalPlayer; i>0; i--){
		//var no = Math.floor(Math.random() * (i - 0)) + 0; 
		var no = Math.floor(getRandom() * (i - 0)) + 0;
		player.push(totalActorArray[no]); 
		alivePlayer.push(totalActorArray[no]); 
		totalActorArray.splice(no,1); 
	} 
	console.log(player); 
	godAlivePlayer = godArray;
	villagerAlivePlayer = villagerArray;
	wolfAlivePlayer = wolfArray;
	action = "confirmRole"; 
	//confirmRoles.play();
	$("#playConfirmRoles").click();
	$(".info").show();
	$(".info").html("確認身份"+
					"<i onclick=\"updateAction('confirmRole')\" class=\"bi bi-person-bounding-box\" style=\"margin-left:20px;\"></i>");	
	confirmPlayer ++;
	$("#playerImg"+confirmPlayer).addClass("confirming");
	log += "<table class='dayLog w3-pale-blue'>";
} 
function showAllRole(keep){
	closePopUp();
	for (var noOfPlayer = 1; noOfPlayer <= submitTotalPlayer; noOfPlayer++){
		switch(player[noOfPlayer]){ 
			case "Wolf": 
			case "Wolf1": 
			case "Wolf2":
				$("#playerImg"+noOfPlayer).attr("src",imageWolf); 
				break; 
			case "WolfKing": 
				$("#playerImg"+noOfPlayer).attr("src",imageWolfKing); 
				break; 
			case "SecretWolf":
				$("#playerImg"+noOfPlayer).attr("src",imageSecretWolf); 
				break; 
			case "GhostWolf":
				$("#playerImg"+noOfPlayer).attr("src",imageGhostWolf); 
				break; 
			case "Seer": 
				$("#playerImg"+noOfPlayer).attr("src",imageSeer); 
				break; 
			case "Witch": 
				$("#playerImg"+noOfPlayer).attr("src",imageWitch); 
				break; 
			case "Knight": 
				$("#playerImg"+noOfPlayer).attr("src",imageKnight); 
				break; 
			case "Hunter": 
				$("#playerImg"+noOfPlayer).attr("src",imageHunter); 
				break; 
			case "Guard": 
				$("#playerImg"+noOfPlayer).attr("src",imageGuard); 
				break; 
			case "Bear": 
				$("#playerImg"+noOfPlayer).attr("src",imageBear); 
				break; 
			case "Idiot":
				$("#playerImg"+noOfPlayer).attr("src",imageIdiot);
				break;
			case "Villager": 
			case "Villager1": 
			case "Villager2": 
			case "Villager3": 
				$("#playerImg"+noOfPlayer).attr("src",imageVillager); 
				break; 
			default: 
				$("#playerImg"+noOfPlayer).attr("src",imagePlayer); 
				break; 
		} 
	}
	if(!keep){
		setTimeout(function(){ $(".playerImg").attr("src",imagePlayer);  }, 5000);
	}
}
function confirmRole(noOfPlayer){ 
	action = "confirmRoleING";
	if(!landscape)
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
	resetDiv();
} 
function checkNext(){
	$("#playerImg"+confirmPlayer).removeClass("confirming");
	confirmPlayer++;
	$("#playerImg"+confirmPlayer).addClass("confirming");	
	action = "confirmRole";
	if(confirmPlayer > submitTotalPlayer){
		resetDiv();
		$("#dayActionDiv").show();
	}
}
function playSound(x){
	//testAudio.play(); 
	document.getElementById(x).play()
		.then(function(){
			console.log("Play Success - " + x);
		}).catch(function(err){
			console.log("Play Error - " + x);
			alert(err);
		});
}
function checkNextNightAction(){
	resetDiv();
	for(nightActionNo; nightActionNo<=nightActionOrder.length; nightActionNo++){
		var tempNightAction = nightActionOrder[nightActionNo];
		var isExist = false;
		if(tempNightAction == "Wolf"){
			isExist = true;
		}else{
			isExist = player.includes(tempNightAction);
		}
		if(isExist){
			nightActionNo++;
			switch(tempNightAction){
				case "Guard":
					setTimeout(function(){ guardAction() }, 5000);
					break;
				case "Wolf": 
					setTimeout(function(){ wolfAction() }, 5000);
					break;
				case "Witch":
					setTimeout(function(){ witchAction() }, 5000);	
					break;
				case "Seer":
					setTimeout(function(){ seerAction() }, 5000);	
					break;
				default:
					setTimeout(function(){ allOpenEye() }, 5000);	
					break;
			}
			break;
		}
	}
	if(nightActionNo > nightActionOrder.length){
		nightActionNo = 0;
		setTimeout(function(){  allOpenEye() }, 5000); // 1000ms = 1s	 
	}
}
function nightTime(){ 
	closePopUp();
	resetDiv();
	wolfKill = 0;
	witchKill = 0;
	witchSave = false;
	bearGrowl = false;
	$(".alivePlayer").prop("disabled", true); 
	//closeAllEyes.play();
	$("#playCloseAllEyes").click();
	$(".info").html("天黑請閉眼～"); 
	noOfNight++;
	log += "<tr><th colspan=2>第"+translate(noOfNight)+"晚</th><tr>";
	checkNextNightAction();
}
function guardAction(){
	//guardOpenEyesAndProtect.play();
	$("#playGuardOpenEyesAndProtect").click();
	action = "guardAction";
	var index = player.indexOf("Guard");
	$("#playerImg"+index).attr("src",imageGuard); 
	if(godAlivePlayer.includes("Guard")){
		$(".info").html("守衛！保護誰？"); 
		$("#allScreen").append( "<div 	onclick='guardCloseEye(0)'"+
								"		style='transform:rotate(180deg)'"+
								" 		class='nightActionDivButton w3-circle w3-display-topleft w3-center'>"+
								"	<i class='bi bi-shield-fill-x w3-jumbo'></i>"+
								"	<br/>不守"+
								"</div>");	
		$("#allScreen").append( "<div 	onclick='guardCloseEye(0)'"+
								" 		class='nightActionDivButton w3-circle w3-display-bottomright w3-center'>"+
								"	<i class='bi bi-shield-fill-x w3-jumbo'></i>"+
								"	<br/>不守"+
								"</div>");	
		$(".alivePlayer").prop("disabled", false); 
	}else{
		$(".info").html("守衛已死。等一下！"); 
		log += "<tr><td>守衛</td><td>已死</td></tr>";
		setTimeout(function(){ guardCloseEye(0); }, 10000);
	}
}
function guardCloseEye(noOfPlayer){
	if(noOfPlayer == 0){
		guardProtect = noOfPlayer;
		if(godAlivePlayer.includes("Guard"))
			log += "<tr><td>守衛</td><td>不保護任何人</td></tr>";
	}else if(noOfPlayer == guardProtect){
		$(".info").html("守衛<strong style='color:red'>不能</strong>連續兩晚守同一人！");
		$("#allScreen").append( "<div 	onclick='guardCloseEye(0)'"+
								"		style='transform:rotate(180deg)'"+
								" 		class='nightActionDivButton w3-circle w3-display-topleft w3-center'>"+
								"	<i class='bi bi-shield-fill-x w3-jumbo'></i>"+
								"	<br/>不守"+
								"</div>");	
		$("#allScreen").append( "<div 	onclick='guardCloseEye(0)'"+
								" 		class='nightActionDivButton w3-circle w3-display-bottomright w3-center'>"+
								"	<i class='bi bi-shield-fill-x w3-jumbo'></i>"+
								"	<br/>不守"+
								"</div>");	
		return;
	}else{
		guardProtect = noOfPlayer;
		log += "<tr><td>守衛</td><td>選擇保護"+translate(noOfPlayer)+"號玩家["+translate(player[noOfPlayer])+"]</td></tr>";
	}
	$(".nightActionDivButton").hide();
	//guardCloseEyes.play(); 
	$("#playGuardCloseEyes").click();
	$(".alivePlayer").prop("disabled", true); 
	$(".playerImg").attr("src",imagePlayer); 
	$(".info").html("守衛！請閉眼！"); 
	checkNextNightAction();
}
function wolfAction(){ 
	//wolfOpenEyesAndKill.play();  
	$("#playWolfOpenEyesAndKill").click();
	action = "wolfAction";
	if(godAlivePlayer.includes("Idiot") && noOfNight != 1){
		for(var i=1; i<=submitTotalPlayer; i++){
			switch(player[i]){ 
				case "Wolf": 
				case "Wolf1": 
				case "Wolf2":
				case "WolfKing": 
				case "SecretWolf":
				case "GhostWolf":
					$("#playerImg"+i).attr("src",imageWolf); 
					break; 
			}
		} 
	}else{
		for(var i=1; i<=submitTotalPlayer; i++){
			switch(player[i]){ 
				case "Wolf": 
				case "Wolf1": 
				case "Wolf2":
					$("#playerImg"+i).attr("src",imageWolf); 
					break; 
				case "WolfKing": 
					$("#playerImg"+i).attr("src",imageWolfKing); 
					break; 
				case "SecretWolf":
					$("#playerImg"+i).attr("src",imageSecretWolf); 
					break; 
				case "GhostWolf":
					$("#playerImg"+i).attr("src",imageGhostWolf); 
					break; 
			}
		} 
	}
	$(".info").html("狼人！殺誰？"); 
	$(".alivePlayer").prop("disabled", false); 
} 
function wolfCloseEye(noOfPlayer){ 
	if(player[noOfPlayer] == "GhostWolf"){
		$(".info").html("惡靈騎士不能自刀！"); 
		return;
	}
	wolfKill = noOfPlayer;
	log += "<tr><td>狼人</td><td>殺"+translate(noOfPlayer)+"號玩家["+translate(player[noOfPlayer])+"]</td></tr>";
	//wolfCloseEyes.play(); 
	$("#playWolfCloseEyes").click();
	$(".alivePlayer").prop("disabled", true); 
	$(".playerImg").attr("src",imagePlayer); 
	$(".info").html("狼人！請閉眼！"); 
	checkNextNightAction();
} 
function witchAction(){ 
	action = "witchAction";
	var index = player.indexOf("Witch");
	$("#playerImg"+index).attr("src",imageWitch); 
	if(godAlivePlayer.includes("Witch")){
		if(witchGoodDrug > 0){
			//witchOpenEyesAndHelp.play();
			$("#playWitchOpenEyesAndHelp").click();
			$("#killImg"+wolfKill).show();
			$(".info").html("<strong style='color:red'>"+translate(wolfKill)+"號玩家</strong><br/>被殺");
			$("#allScreen").append( "<div 	onclick='witchHelp(false)'"+
									"		style='transform:rotate(180deg)'"+
									" 		class='nightActionDivButton w3-circle w3-display-topleft w3-center'>"+
									"	<i class='bi bi-emoji-dizzy-fill w3-jumbo'></i><br/>"+
									"	不救"+
									"</div>");	
			$("#allScreen").append( "<div 	onclick='witchHelp(true)'"+
									"		style='transform:rotate(180deg)'"+
									" 		class='nightActionDivButton w3-circle w3-display-topright w3-center'>"+
									"	<i class='bi bi-emoji-smile-fill w3-jumbo'></i><br/>"+
									"	救"+
									"</div>");
			$("#allScreen").append( "<div 	onclick='witchHelp(true)'"+
									"		style='transform:rotate(0deg)'"+
									" 		class='nightActionDivButton w3-circle w3-display-bottomleft w3-center'>"+
									"	<i class='bi bi-emoji-smile-fill w3-jumbo'></i><br/>"+
									"	救"+
									"</div>");
			$("#allScreen").append( "<div 	onclick='witchHelp(false)'"+
									"		style='transform:rotate(0deg)'"+
									" 		class='nightActionDivButton w3-circle w3-display-bottomright w3-center'>"+
									"	<i class='bi bi-emoji-dizzy-fill w3-jumbo'></i><br/>"+
									"	不救"+
									"</div>");	
		}else if(witchBadDrug > 0){
			//witchOpenEyesAndDrug.play();
			$("#playWitchOpenEyesAndDrug").click();
			$(".info").html("女巫！用毒藥？");
			$("#allScreen").append( "<div 	onclick='witchCloseEye(0)'"+
									"		style='transform:rotate(180deg)'"+
									" 		class='nightActionDivButton w3-circle w3-display-topleft w3-center'>"+
									"	<i class='bi bi-x-circle-fill w3-jumbo'></i><br/>"+
									"	不用"+
									"</div>");	
			$("#allScreen").append( "<div 	onclick='witchCloseEye(0)'"+
									"		style='transform:rotate(0deg)'"+
									" 		class='nightActionDivButton w3-circle w3-display-bottomright w3-center'>"+
									"	<i class='bi bi-x-circle-fill w3-jumbo'></i><br/>"+
									"	不用"+
									"</div>");	
			$(".alivePlayer").prop("disabled", false); 
		}else{
			//witchOpenEyesAndDrug.play();
			$("#playWitchOpenEyesAndDrug").click();
			$(".info").html("女巫！藥已用完！等一下！");
			log += "<tr><td>女巫</td><td>藥已用完</td><tr>";
			setTimeout(function(){  witchCloseEye(0) }, 10000); // 1000ms = 1s	 
		}
	}else{
		if(witchGoodDrug > 0){
			//witchOpenEyesAndHelp.play();
			$("#playWitchOpenEyesAndHelp").click();
		}else{
			//witchOpenEyesAndDrug.play();
			$("#playWitchOpenEyesAndDrug").click();
		}
		$(".info").html("女巫已死。等一下！");
		log += "<tr><td>女巫</td><td>已死</td><tr>";
		setTimeout(function(){ witchCloseEye(0); }, 10000);
	}
} 
function witchHelp(save){
	$(".nightActionDivButton").hide();
	$(".killImg").hide();
	//witchDrug.play();
	$("#playWitchDrug").click();
	if(save){
		log += "<tr><td>女巫</td><td>救"+translate(wolfKill)+"號玩家["+translate(player[wolfKill])+"]</td><tr>";
		witchSave = save;
		witchGoodDrug--;
		$(".info").html("女巫！請閉眼！"); 
		setTimeout(function(){ witchCloseEye(0); }, 8000);
	}else if(witchBadDrug > 0){
		$(".info").html("女巫！用毒藥？");
		$("#allScreen").append( "<div 	onclick='witchCloseEye(0)'"+
								"		style='transform:rotate(180deg)'"+
								" 		class='nightActionDivButton w3-circle w3-display-topleft w3-center'>"+
								"	<i class='bi bi-x-circle-fill w3-jumbo'></i><br/>"+
								"	不用"+
								"</div>");	
		$("#allScreen").append( "<div 	onclick='witchCloseEye(0)'"+
								"		style='transform:rotate(0deg)'"+
								" 		class='nightActionDivButton w3-circle w3-display-bottomright w3-center'>"+
								"	<i class='bi bi-x-circle-fill w3-jumbo'></i><br/>"+
								"	不用"+
								"</div>");		
		$(".alivePlayer").prop("disabled", false); 
	}
}
function witchCloseEye(noOfPlayer){ 
	$(".nightActionDivButton").hide();
	if(noOfPlayer != 0){
		witchKill = noOfPlayer;
		log += "<tr><td>女巫</td><td>毒殺"+translate(noOfPlayer)+"號玩家["+translate(player[noOfPlayer])+"]</td></tr>";
		witchBadDrug--;
	}
	//witchCloseEyes.play();
	$("#playWitchCloseEyes").click();
	$(".alivePlayer").prop("disabled", true); 
	$(".playerImg").attr("src",imagePlayer); 
	$(".info").html("女巫！請閉眼！"); 
	checkNextNightAction();
} 
function seerAction(){ 
	//seerOpenEyesAndCheck.play();
	$("#playSeerOpenEyesAndCheck").click();
	action = "seerAction";
	var index = player.indexOf("Seer");
	$("#playerImg"+index).attr("src",imageSeer); 
	if(godAlivePlayer.includes("Seer")){
		$(".info").html("預言家！查誰身份？"); 
		$(".alivePlayer").prop("disabled", false);
	}else{
		$(".info").html("預言家已死。等一下！"); 
		setTimeout(function(){ showRoleToSeer(0); }, 10000);
	}
} 
function showRoleToSeer(noOfPlayer){
	$(".alivePlayer").prop("disabled", true); 
	//seerCloseEyesAndResult.play();
	$("#playSeerCloseEyesAndResult").click();
	seerCheck = noOfPlayer;
	if(noOfPlayer != 0){
		var checkPlayerRule = player[noOfPlayer];
		if(checkPlayerRule == "SecretWolf"){
			$("#playerImg"+noOfPlayer).attr("src","./image/Good.jpg"); 
			$(".info").html(translate(noOfPlayer)+"號玩家<br/><strong style='color:blue'>好人</strong>！"); 
			$("#allScreen").append( "<div 	onclick=''"+
									"		style='transform:rotate(180deg);color:blue;'"+
									" 		class='nightActionDivButton w3-circle w3-display-topleft w3-center'>"+
									"	<i class='bi bi-hand-thumbs-up-fill w3-jumbo'></i><br/>"+
									"	<strong style='color:blue'>好人</strong>"+
									"</div>");	
			$("#allScreen").append( "<div 	onclick=''"+
									"		style='transform:rotate(0deg);color:blue;'"+
									" 		class='nightActionDivButton w3-circle w3-display-bottomright w3-center'>"+
									"	<i class='bi bi-hand-thumbs-up-fill w3-jumbo'></i><br/>"+
									"	<strong style='color:blue'>好人</strong>"+
									"</div>");		
		}else if(godArray.includes(checkPlayerRule)){
			$("#playerImg"+noOfPlayer).attr("src","./image/Good.jpg"); 
			$(".info").html(translate(noOfPlayer)+"號玩家<br/><strong style='color:blue'>好人</strong>！"); 
			$("#allScreen").append( "<div 	onclick=''"+
									"		style='transform:rotate(180deg);color:blue;'"+
									" 		class='nightActionDivButton w3-circle w3-display-topleft w3-center'>"+
									"	<i class='bi bi-hand-thumbs-up-fill w3-jumbo'></i><br/>"+
									"	<strong style='color:blue'>好人</strong>"+
									"</div>");	
			$("#allScreen").append( "<div 	onclick=''"+
									"		style='transform:rotate(0deg);color:blue;'"+
									" 		class='nightActionDivButton w3-circle w3-display-bottomright w3-center'>"+
									"	<i class='bi bi-hand-thumbs-up-fill w3-jumbo'></i><br/>"+
									"	<strong style='color:blue'>好人</strong>"+
									"</div>");	
		}else if(villagerArray.includes(checkPlayerRule)){
			$("#playerImg"+noOfPlayer).attr("src","./image/Good.jpg"); 
			$(".info").html(translate(noOfPlayer)+"號玩家<br/><strong style='color:blue'>好人</strong>！"); 
			$("#allScreen").append( "<div 	onclick=''"+
									"		style='transform:rotate(180deg);color:blue;'"+
									" 		class='nightActionDivButton w3-circle w3-display-topleft w3-center'>"+
									"	<i class='bi bi-hand-thumbs-up-fill w3-jumbo'></i><br/>"+
									"	<strong style='color:blue'>好人</strong>"+
									"</div>");	
			$("#allScreen").append( "<div 	onclick=''"+
									"		style='transform:rotate(0deg);color:blue;'"+
									" 		class='nightActionDivButton w3-circle w3-display-bottomright w3-center'>"+
									"	<i class='bi bi-hand-thumbs-up-fill w3-jumbo'></i><br/>"+
									"	<strong style='color:blue'>好人</strong>"+
									"</div>");	
		}else if(wolfArray.includes(checkPlayerRule)){
			$("#playerImg"+noOfPlayer).attr("src","./image/Bad.jpg"); 
			$(".info").html(translate(noOfPlayer)+"號玩家<br/><strong style='color:red'>狼人</strong>！"); 
			$("#allScreen").append( "<div 	onclick=''"+
									"		style='transform:rotate(180deg);color:red;'"+
									" 		class='nightActionDivButton w3-circle w3-display-topleft w3-center'>"+
									"	<i class='bi bi-hand-thumbs-down-fill w3-jumbo'></i><br/>"+
									"	<strong style='color:red'>狼人</strong>"+
									"</div>");	
			$("#allScreen").append( "<div 	onclick=''"+
									"		style='transform:rotate(0deg);color:red;'"+
									" 		class='nightActionDivButton w3-circle w3-display-bottomright w3-center'>"+
									"	<i class='bi bi-hand-thumbs-down-fill w3-jumbo'></i><br/>"+
									"	<strong style='color:red'>狼人</strong>"+
									"</div>");	
		}
		log += "<tr><td>預言家</td><td>查"+translate(noOfPlayer)+"號玩家["+translate(checkPlayerRule)+"]</td></tr>";	
	}else{
		log += "<tr><td>預言家</td><td>已死</td></tr>";
	}
	setTimeout(function(){ seerCloseEye(); }, 5000); // 1000ms = 1s
}
function seerCloseEye(){ 
	$(".nightActionDivButton").hide();
	$(".playerImg").attr("src",imagePlayer); 
	$(".info").html("預言家！請閉眼！"); 
	checkNextNightAction();
} 
function bearAction(){
	if(alivePlayer.includes("Bear")){
		var index = alivePlayer.indexOf("Bear");
		var left = index-1;
		var right = index+1;
		if(left <= 0){
			left = alivePlayer.length-1;
		}
		if(right >= alivePlayer.length){
			right = 1;
		}
		if(wolfArray.includes(alivePlayer[left]) || wolfArray.includes(alivePlayer[right])){
			bearGrowl = true;
		}else{
			bearGrowl = false;
		}
		console.log("Bear left:" + alivePlayer[left] + "||Bear Right:" + alivePlayer[right])
	}else{
		bearGrowl = false;
	}
	console.log("bearGrowl:"+ bearGrowl);
}
function allOpenEye(){ 
	//openAllEyes.play();
	$("#playOpenAllEyes").click();
	$(".info").html("天亮請睜眼～");  
	setTimeout(function(){ checkNightResult(); }, 2000); // 1000ms = 1s
} 
function checkNightResult(){
	var deadPlayer = [];
	var showRole = false;
	var byWitch = false;
	var ghostReverseThisNight = false;
	if(witchSave && (guardProtect == wolfKill)){
		log += "<tr><td colspan=2>女巫守衛同救同守<br/>"+translate(wolfKill)+"號玩家["+translate(player[wolfKill])+"]失救</td></tr>";
	}else if(!witchSave && (guardProtect == wolfKill)){
		log += "<tr><td>守衛</td><td>成功守護"+translate(wolfKill)+"號玩家["+translate(player[wolfKill])+"]</td></tr>";
		wolfKill = 0;
	}else if(witchSave){
		wolfKill = 0;
	}
	if (witchKill > 0){
		byWitch = true;
		if(player.indexOf("GhostWolf") == witchKill && ghostReverse == 0){
			deadPlayer.push(player.indexOf("Witch").toString());
			witchKill = 0;
			ghostReverseThisNight = true;
			log += "<tr><td>惡靈</td><td>反傷"+translate(player.indexOf("Witch"))+"號玩家["+translate("Witch")+"]</td></tr>";
		}else{
			deadPlayer.push(witchKill);
		}
	}
	if (wolfKill > 0){
		if(!deadPlayer.includes(wolfKill)){
			deadPlayer.push(wolfKill);
		}
	}
	if(player.indexOf("GhostWolf") == seerCheck){
		deadPlayer.push(player.indexOf("Seer").toString());
		log += "<tr><td>惡靈</td><td>反傷"+translate(player.indexOf("Seer"))+"號玩家["+translate("Seer")+"]</td></tr>";
		seerCheck = 0;
		ghostReverseThisNight = true;
	}
	if(ghostReverseThisNight){
		ghostReverse = noOfNight;
	}
	if(deadPlayer.length > 0){
		killPlayer(deadPlayer, showRole, byWitch, true);
	}else{
		killPlayer("", showRole, byWitch, true);
	}
}
function killPlayer(noOfPlayer, showRole, byWitch, nightKiller){
	resetDiv();
	var infoMsg = "";
	var msg1 = "";
	var msg2 = "";
	action = "";
	if(noOfPlayer != ""){
		$(".alivePlayer").prop("disabled", true); 
		if(!Array.isArray(noOfPlayer)){
			noOfPlayer = [noOfPlayer];
		}
		for(var loop=0; loop<noOfPlayer.length; loop++){
			tempPlayer=noOfPlayer[loop];
			$("#playerCard"+tempPlayer).removeClass("alivePlayer");
			$("#playerCard"+tempPlayer).addClass("diedPlayer");
			$("#playerButton"+tempPlayer).removeClass("alivePlayer");
			$("#playerButton"+tempPlayer).addClass("diedPlayer");
			alivePlayer.splice(alivePlayer.indexOf(player[tempPlayer]),1);
			if(godArray.includes(player[tempPlayer])){
				godAlivePlayer.splice(godAlivePlayer.indexOf(player[tempPlayer]),1); 
			}else if(villagerArray.includes(player[tempPlayer])){
				villagerAlivePlayer.splice(villagerAlivePlayer.indexOf(player[tempPlayer]),1); 
			}else if(wolfArray.includes(player[tempPlayer])){
				wolfAlivePlayer.splice(wolfAlivePlayer.indexOf(player[tempPlayer]),1); 
			}
			$("#diedImg"+tempPlayer).show();
			$("#killImg"+tempPlayer).show();
			$(".diedPlayer").prop("disabled", true); 
			var rule = player[tempPlayer];
			if(showRole){
				var lastChar = rule.substring(rule.length - 1);
				if(lastChar == 1 || lastChar == 2 || lastChar == 3){
					rule = rule.substring(0, rule.length-1);
				}
				log += "<tr><td>"+translate(rule)+"</td><td>自爆</td><tr>";
				$("#playerImg"+tempPlayer).attr("src","./image/actor/"+rule+".png"); 
				setTimeout(function(){  
					$("#playerImg"+tempPlayer).attr("src",imagePlayer); 
				}, 6000);
			}
			if((rule == "WolfKing" || rule == "Hunter") && !byWitch){
				msg2 = checkResult();
				if(msg2 == "遊戲繼續"){
					msg2 = translate(tempPlayer) + "號玩家<br/>你要帶誰";
					$(".alivePlayer").prop("disabled", false); 
					action = "bringBy" + rule; // bringByWolfKing || bringByHunter
				}
			}
			if(loop == 0){
			  byWitch = false;
			  showRole = false;
			}
		}
		noOfPlayer.sort(function(a, b){return a-b});
		for(var loop = 0; loop < noOfPlayer.length; loop++){
			msg1 += translate(noOfPlayer[loop]) + "號玩家<br/>";
		}
		msg1 += "死了！<br/>----<br/>";
		if(msg2.length == 0){
			msg2 = checkResult();
		}
		setTimeout(function(){  
			$(".killImg").hide(); 
		}, 6000);
	}else{
		msg1 = checkResult();
		if(nightKiller){
			//silentNight.play();
			$("#playSilentNight").click();
		}
		var no = Math.floor(Math.random() * (submitTotalPlayer - 0)) + 0;
		console.log(no);
		while(!alivePlayer.includes(player[no]) || no == 0){
			no++;
			if(no > submitTotalPlayer){
				no = 1;
			}
		}
		msg1 = "<strong style='color:red'>平安夜</strong><br/>"+translate(no)+"號玩家<br/>開始發言";
	}
	infoMsg = msg1 + msg2; 
	showResult(infoMsg, nightKiller);
}
function showResult(infoMsg, nightKiller){ 	
	resetDiv();
	if(action == "bringByWolfKing" || action == "bringByHunter" || action == "gameOver"){
		$("#dayActionDiv").hide();
		$(".dayActionDivButton").hide();
	}else{
		$("#dayActionDiv").show();
		$(".dayActionDivButton").show();
	}
	$(".info").html(infoMsg);
	if(nightKiller && bearGrowl){
		log += 	"<tr><td colspan=2 style='text-align:center'>"+
				"<i class='bi bi-exclamation-diamond-fill'></i>"+
				"熊叫"+
				"<i class='bi bi-volume-up-fill'></i>"+
				"<i class='bi bi-exclamation-diamond-fill'></i>"+
				"</td></tr>";
		//bearGrowling.play();
		$("#playBearGrowling").click();
	}
}
function checkResult(){
	console.log(alivePlayer);
	console.log(godAlivePlayer);
	console.log(villagerAlivePlayer);
	console.log(wolfAlivePlayer);
	bearAction();
	if((godAlivePlayer.length == 0 || villagerAlivePlayer.length == 0 ) && versionMode == "gonly"){
		action="gameOver";
		showAllRole(true);
		log += "<tr><th colspan=2>遊戲結束！<i class='bi bi-emoji-dizzy-fill'></i>狼人獲勝<i class='bi bi-emoji-dizzy-fill'></i></th></tr>";
		//gameOverLose.play();
		$("#playGameOverLose").click();
		$("#log").html(versionLog + log);
		return "遊戲結束<br/><strong style='color:red'>狼人獲勝</strong><br/>"+
				"<i class='bi bi-emoji-dizzy-fill'></i><i class='bi bi-emoji-dizzy-fill'></i><i class='bi bi-emoji-dizzy-fill'></i>";
	}else if(godAlivePlayer.length == 0 && villagerAlivePlayer.length == 0 && versionMode == "gnv"){
		action="gameOver";
		showAllRole(true);
		log += "<tr><th colspan=2>遊戲結束！<i class='bi bi-emoji-dizzy-fill'></i>狼人獲勝<i class='bi bi-emoji-dizzy-fill'></i></th></tr>";
		//gameOverLose.play();
		$("#playGameOverLose").click();
		$("#log").html(versionLog + log);
		return "遊戲結束<br/><strong style='color:red'>狼人獲勝</strong><br/>"+
				"<i class='bi bi-emoji-dizzy-fill'></i><i class='bi bi-emoji-dizzy-fill'></i><i class='bi bi-emoji-dizzy-fill'></i>";
	}else if(wolfAlivePlayer.length == 0){
		action="gameOver";
		showAllRole(true);
		log += "<tr><th colspan=2>遊戲結束！<i class='bi bi-emoji-heart-eyes-fill'></i>好人獲勝<i class='bi bi-emoji-heart-eyes-fill'></i></th></tr>";
		//gameOverWin.play();
		$("#playGameOverWin").click();
		$("#log").html(versionLog + log);
		return 	"遊戲結束<br/><strong style='color:red'>好人獲勝</strong><br/>"+
				"<i class='bi bi-emoji-heart-eyes-fill'></i><i class='bi bi-emoji-heart-eyes-fill'></i><i class='bi bi-emoji-heart-eyes-fill'></i>";
	}else{
		return "遊戲繼續";
	}		
}
function updateAction(update){
	closePopUp();
	if(player.length < 6){
		showLog();
		return;
	}
	switch(update){
		case "showAllRole":
			var confirm = prompt("確認公開所有玩家身份？\n請輸入密碼", "");
			if (confirm.toUpperCase() == "CONFIRM") {
				showAllRole(false);
			} else {
				return;
			}			
			break;
		case "confirmRole":
			var noOfPlayer = prompt("需要確認玩家身份：[1-"+submitTotalPlayer+"]", "0");
			if (noOfPlayer == null || noOfPlayer == "") {
				return;
			} else {
				confirmRole(noOfPlayer);
			}
			break;
		case "nightTime":
			nightTime();
			break;
		case "killOther":
			action = "killOther";
			resetDiv();
			$(".info").html("投票時間"); 
			$(".alivePlayer").prop("disabled", false); 
			break;
		case "killSelf":
			action = "killSelf";
			resetDiv();
			$(".info").html("誰要自爆"); 
			$(".alivePlayer").prop("disabled", false); 
			break;
		case "checkRule":
			action = "checkRole";
			resetDiv();
			$(".info").html("公開<br/>騎士身份"); 
			$(".alivePlayer").prop("disabled", false); 
			break;
		default:
			$("#dayActionDiv").show();
			break;
	}
}
function showKnight(noOfPlayer){
	resetDiv();
	$(".alivePlayer").prop("disabled", true); 
	var rule = player[noOfPlayer];
	if(rule == "Knight"){
		$("#playerImg"+noOfPlayer).attr("src",imageKnight); 
		$(".alivePlayer").prop("disabled", false); 
		$(".info").html("騎士！查誰身份？")
		action = "knightAction";
	}else{
		$(".info").html(translate(noOfPlayer) + "號玩家並<strong style='color:red'>非</strong>騎士無法驗証他人身份"); 
	}
}
function knightAction(checkPlayer){
	resetDiv();
	noOfKnight = player.indexOf("Knight");
	$("#playerImg"+noOfKnight).attr("src", imagePlayer);
	var checkPlayerRule = player[checkPlayer];
	log += "<tr><td>騎士</td><td>查"+translate(checkPlayer)+"號玩家["+translate(checkPlayerRule)+"]查驗";
	if(godArray.includes(checkPlayerRule)){
		$("#playerImg"+checkPlayer).attr("src","./image/Good.jpg"); 
		$(".info").html(translate(checkPlayer)+"號玩家<br/><strong style='color:blue'>好人</strong>"); 
		$("#allScreen").append( "<div 	onclick=''"+
								"		style='transform:rotate(180deg);color:blue'"+
								" 		class='nightActionDivButton w3-circle w3-display-topleft w3-center'>"+
								"	<i class='bi bi-hand-thumbs-up-fill w3-jumbo'></i><br/>"+
								"	<strong style='color:blue'>好人</strong>"+
								"</div>");	
		$("#allScreen").append( "<div 	onclick=''"+
								"		style='transform:rotate(0deg);color:blue'"+
								" 		class='nightActionDivButton w3-circle w3-display-bottomright w3-center'>"+
								"	<i class='bi bi-hand-thumbs-up-fill w3-jumbo'></i><br/>"+
								"	<strong style='color:blue'>好人</strong>"+
								"</div>");	
		log += "<strong>不成功</strong></td></tr>";
		setTimeout(function(){  
			$("#playerImg"+checkPlayer).attr("src", imagePlayer); 
			killPlayer(noOfKnight, false, false, false);
		}, 5000);	
	}else if(villagerArray.includes(checkPlayerRule)){
		$("#playerImg"+checkPlayer).attr("src","./image/Good.jpg"); 
		$(".info").html(translate(checkPlayer)+"號玩家<br/><strong style='color:blue'>好人</strong>"); 
		$("#allScreen").append( "<div 	onclick=''"+
								"		style='transform:rotate(180deg);color:blue'"+
								" 		class='nightActionDivButton w3-circle w3-display-topleft w3-center'>"+
								"	<i class='bi bi-hand-thumbs-up-fill w3-jumbo'></i><br/>"+
								"	<strong style='color:blue'>好人</strong>"+
								"</div>");	
		$("#allScreen").append( "<div 	onclick=''"+
								"		style='transform:rotate(0deg);color:blue'"+
								" 		class='nightActionDivButton w3-circle w3-display-bottomright w3-center'>"+
								"	<i class='bi bi-hand-thumbs-up-fill w3-jumbo'></i><br/>"+
								"	<strong style='color:blue'>好人</strong>"+
								"</div>");					
		log += "<strong>不成功</strong></td></tr>";
		setTimeout(function(){  
			$("#playerImg"+checkPlayer).attr("src", imagePlayer); 
			killPlayer(noOfKnight, false, false, false);
		}, 5000);
	}else if(wolfArray.includes(checkPlayerRule)){
		$("#playerImg"+checkPlayer).attr("src","./image/Bad.jpg"); 
		$(".info").html(translate(checkPlayer)+"號玩家<br/><strong style='color:red'>狼人</strong>"); 
		$("#allScreen").append( "<div 	onclick=''"+
								"		style='transform:rotate(180deg);color:red'"+
								" 		class='nightActionDivButton w3-circle w3-display-topleft w3-center'>"+
								"	<i class='bi bi-hand-thumbs-down-fill w3-jumbo'></i><br/>"+
								"	<strong style='color:red'>狼人</strong>"+
								"</div>");	
		$("#allScreen").append( "<div 	onclick=''"+
								"		style='transform:rotate(0deg);color:red'"+ 	
								" 		class='nightActionDivButton w3-circle w3-display-bottomright w3-center'>"+
								"	<i class='bi bi-hand-thumbs-down-fill w3-jumbo'></i><br/>"+
								"	<strong style='color:red'>狼人</strong>"+
								"</div>");	
		log += "<strong>成功</strong></td></tr>";
		setTimeout(function(){  
			$("#playerImg"+checkPlayer).attr("src", imagePlayer); 
			killPlayer(checkPlayer, false, false, false);
		}, 5000);
	}
}
function killSelfAction(noOfPlayer){
	$(".alivePlayer").prop("disabled", true); 
	if(confirm("確定要自爆？")){
		killPlayer(noOfPlayer, true, false, false);
	}else{
		return;
	}
	/* ONLY WOLF can killself ?
	var rule = player[noOfPlayer];
	if(wolfArray.includes(rule)){
		killPlayer(noOfPlayer, true, false, false)
	}else{
		$(".info").html(translate(noOfPlayer) + "號玩家並<strong>非</strong>狼人無法自爆"); 
	}
	*/
}
function closePopUp(){
	$("#versionSelecter").hide();
	$("#logDiv").hide();
	$("#playerDiv").hide();
	$("#dayActionDiv").hide();
	$("#infoDiv").hide();
	$("#adjustButtonDiv").hide();
}
function versionSelect(){
	closePopUp();
	$("#versionSelecter").show();
}
function showVersion() {
	alignment = $("input:radio[name=alignment]:checked").val();
	$("#versionDiv").html("");
	var noOfVersion;
	$("#versionDiv").append(
		"	<div id=\"for-"+submitTotalPlayer+"-player\" class=\"w3-container\" style=\"width:100%\">" +
		"		<div class=\"w3-row\" style=\"width:100%\"> "
	);
	if(alignment == "tableAlign"){
			//show as table
		$("#versionDiv").css("width", "-webkit-fill-available");
		for(var loop = 1; loop <= submitTotalPlayer; loop++){
			$("#versionDiv").append(
			"			<div class=\"w3-container s4 m3 l2 w3-col w3-center w3-col-middle\" style=\"\"> " +
			"				<div " +
			"					id=\"playerCard"+loop+"\" " +
			"					name=\""+loop+"\"" +
			"					class=\"playerCard playerButton alivePlayer w3-card-4\"> " +
			"					<img id=\"playerImg"+loop+"\" class=\"playerImg\" src=\"./image/actor/Player.png\" style=\"\"> " +
			"					<img id=\"diedImg"+loop+"\" class=\"diedImg\" src=\"./image/Died.png\" style=\"\"> " +
			"					<img id=\"killImg"+loop+"\" class=\"killImg\" src=\"./image/Kill.png\" style=\"\"> " +
			"				</div> " +
			"				<button " +
			"					id=\"playerButton"+loop+"\" " +
			"					name=\""+loop+"\"					" +
			"					class=\"playerButton alivePlayer \"" +
			"					style=\"width:100%;\"> " +
			"					"+translate(loop)+"號玩家" +
			"				</button> " +
			"			</div>" 
			);
		}
	}else if(alignment == "lrAlign"){	
			//show only left-right
		$("#versionDiv").css("width", "80%");
		var y = submitTotalPlayer;
		var x = 1;
		for(var x=1; x<y; x++){
			$("#versionDiv").append(
			"			<div class=\"cardcol w3-container s3 m3 l2 w3-col w3-center w3-col-middle\" style=\"transform:rotate(90deg);padding:0px;\"> " +
			"				<div " +
			"					id=\"playerCard"+x+"\" " +
			"					name=\""+x+"\"" +
			"					class=\"playerCard playerButton alivePlayer w3-card-4\"> " +
			"					<img id=\"playerImg"+x+"\" class=\"playerImg\" src=\"./image/actor/Player.png\" style=\"\"> " +
			"					<img id=\"diedImg"+x+"\" class=\"diedImg\" src=\"./image/Died.png\" style=\"\"> " +
			"					<img id=\"killImg"+x+"\" class=\"killImg\" src=\"./image/Kill.png\" style=\"\"> " +
			"				</div> " +
			"				<button " +
			"					id=\"playerButton"+x+"\" " +
			"					name=\""+x+"\"					" +
			"					class=\"playerButton alivePlayer \"" +
			"					style=\"width:100%;\"> " +
			"					"+translate(x)+"號玩家" +
			"				</button> " +
			"			</div>" +
			"			<div class=\"w3-container s6 m3 l2 w3-col w3-center w3-col-middle\" style=\"transform:rotate(90deg);padding:0px;\"> " +
			"			." +
			"			</div>" +
			"			<div class=\"cardcol w3-container s3 m3 l2 w3-col w3-center w3-col-middle\" style=\"transform:rotate(-90deg);padding:0px;\"> " +
			"				<div " +
			"					id=\"playerCard"+y+"\" " +
			"					name=\""+y+"\"" +
			"					class=\"playerCard playerButton alivePlayer w3-card-4\"> " +
			"					<img id=\"playerImg"+y+"\" class=\"playerImg\" src=\"./image/actor/Player.png\" style=\"\"> " +
			"					<img id=\"diedImg"+y+"\" class=\"diedImg\" src=\"./image/Died.png\" style=\"\"> " +
			"					<img id=\"killImg"+y+"\" class=\"killImg\" src=\"./image/Kill.png\" style=\"\"> " +
			"				</div> " +
			"				<button " +
			"					id=\"playerButton"+y+"\" " +
			"					name=\""+y+"\"					" +
			"					class=\"playerButton alivePlayer \"" +
			"					style=\"width:100%;\"> " +
			"					"+translate(y)+"號玩家" +
			"				</button> " +
			"			</div>" 
			);
			y=y-1;
		}
		if(submitTotalPlayer%2>0){
			$("#versionDiv").append(
			"			<div class=\"cardcol w3-container s3 m3 l2 w3-col w3-center w3-col-middle\" style=\"transform:rotate(90deg);padding:0px;\"> " +
			"				<div " +
			"					id=\"playerCard"+x+"\" " +
			"					name=\""+x+"\"" +
			"					class=\"playerCard playerButton alivePlayer w3-card-4\"> " +
			"					<img id=\"playerImg"+x+"\" class=\"playerImg\" src=\"./image/actor/Player.png\" style=\"\"> " +
			"					<img id=\"diedImg"+x+"\" class=\"diedImg\" src=\"./image/Died.png\" style=\"\"> " +
			"					<img id=\"killImg"+x+"\" class=\"killImg\" src=\"./image/Kill.png\" style=\"\"> " +
			"				</div> " +
			"				<button " +
			"					id=\"playerButton"+x+"\" " +
			"					name=\""+x+"\"					" +
			"					class=\"playerButton alivePlayer \"" +
			"					style=\"width:100%;\"> " +
			"					"+translate(x)+"號玩家" +
			"				</button> " +
			"			</div>" +
			"			<div class=\"w3-container s6 m3 l2 w3-col w3-center w3-col-middle\" style=\"transform:rotate(90deg);padding:0px;\"> " +
			"			." +
			"			</div>" +
			"			<div class=\"cardcol w3-container s3 m3 l2 w3-col w3-center w3-col-middle\" style=\"transform:rotate(-90deg);padding:0px;\"> " +
			"			." +
			"			</div>" 
			);
		}
	}
	$("#versionDiv").append(
		"		</div>" +
		"	</div>"
	);
	if(action == "confirmRole"){
		$(".info").html("確認身份"+
						"<i onclick=\"updateAction('confirmRole')\" class=\"bi bi-person-bounding-box\" style=\"margin-left:20px;\"></i>");	
		$("#playerImg"+confirmPlayer).addClass("confirming");
	}
}
function showLog(){
	closePopUp();
	$("#logDiv").show();
}
function resetDiv(){
	$(".info").show();
	$(".nightActionDivButton").hide();
}
function adjustHeight(m){
	var h = $("#allScreen")[0].scrollHeight;
	if(m=="+"){		
		$("#allScreen").css("height", h+5);
	}else{
		$("#allScreen").css("height", h-5);
	}
}
function showInfo(){
	closePopUp();
	$("#infoDiv").show();
}

