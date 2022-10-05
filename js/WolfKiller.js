var totalActorArray = GetUrlParameter('totalActorArray')? GetUrlParameter('totalActorArray').split(","): [];
var godArray = GetUrlParameter('godArray')? GetUrlParameter('godArray').split(","): [];
var godChinArray = GetUrlParameter('godChinArray')? GetUrlParameter('godChinArray').split(","): [];
var villagerArray = GetUrlParameter('villagerArray')? GetUrlParameter('villagerArray').split(","): [];
var villagerChinArray = GetUrlParameter('villagerChinArray')? GetUrlParameter('villagerChinArray').split(","): [];
var wolfArray = GetUrlParameter('wolfArray')? GetUrlParameter('wolfArray').split(","): [];
var wolfChinArray = GetUrlParameter('wolfChinArray')? GetUrlParameter('wolfChinArray').split(","): [];
var versionMode = GetUrlParameter('versionMode')? GetUrlParameter('versionMode'): null;
var windowMode = GetUrlParameter('windowMode')? GetUrlParameter('windowMode'): null;
var witchCanSaveHimself = GetUrlParameter('witchCanSaveHimself')? GetUrlParameter('witchCanSaveHimself'): true;

var totalPlayer = 0;
var player = [null]; 
var alivePlayer = [null];
var godAlivePlayer = []; 
var villagerAlivePlayer = []; 
var wolfAlivePlayer = []; 

var versionLog = "";
var dayLog = "<table class='dayLog w3-pale-blue'>";
//day time action
var confirmPlayer = 0;

//night time action
var nextAction;
var noOfNight = 0;
var nightActionNo = 0;
var noOfPlayerDied = [];
//	wolf action
var wolfKill = 0;
var ghostReverse = 0; //save the night number used the reverse action <-- 1= used; 0= not yet
//	witch action
var witchGoodDrug = 1;
var witchBadDrug = 1;
var witchSave = false;
var witchKill = 0; 
//	seer action
var seerCheck = 0;
//guard action 
var guardProtect = 0;

$(window).on("DOMContentLoaded", function(){
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
	}else if(nextAction == "confirmRole"){ 
		if(selectPlayer == confirmPlayer)
			confirmRole(selectPlayer); 
	}else if(nextAction == "wolfAction"){
		wolfCloseEye(selectPlayer);
	}else if (nextAction == "witchAction"){
		witchCloseEye(selectPlayer);
	}else if(nextAction == "seerAction"){
		showRoleToSeer(selectPlayer);
	}else if(nextAction == "knightAction"){
		knightAction(selectPlayer);
	}else if(nextAction == "guardAction"){
		guardCloseEye(selectPlayer);
	}else if(nextAction == "bringByHunter"){
		if(player[selectPlayer] == "GhostWolf"){
			if(ghostReverse == 0 || ghostReverse == noOfNight){
				ghostReverse = noOfNight;
				dayLog += "<tr><td>"+translate("Hunter")+"</td><td>帶"+translate(selectPlayer)+"號玩家["+translate(player[selectPlayer])+"]失敗<br/>惡靈騎士不能死於夜晚</td></tr>";
				$(".wolf-info-desc").html("遊戲繼續～"); 
				$(".wolf-info-action").html("");
				action = "";
				return;
			}else{
				dayLog += "<tr><td>"+translate("Hunter")+"</td><td>帶"+translate(selectPlayer)+"號玩家["+translate(player[selectPlayer])+"]<br/>惡靈騎士已於第"+translate(ghostReverse)+"晚使用反傷技能</td></tr>";
				checkDayResult(selectPlayer, "byHunter");
			}
		}else{
			dayLog += "<tr><td>"+translate("Hunter")+"</td><td>帶"+translate(selectPlayer)+"號玩家["+translate(player[selectPlayer])+"]</td></tr>";
			checkDayResult(selectPlayer, "byHunter");
		}
	}else if(nextAction == "bringByWolfKing"){
		if(player[selectPlayer] == "GhostWolf"){
			if(ghostReverse == 0 || ghostReverse == noOfNight){
				ghostReverse = noOfNight;
				dayLog += "<tr><td>"+translate("WolfKing")+"</td><td>帶"+translate(selectPlayer)+"號玩家["+translate(player[selectPlayer])+"]失敗<br/>惡靈騎士不能死於夜晚</td></tr>";
				$(".wolf-info-desc").html("遊戲繼續～"); 
				$(".wolf-info-action").html("");
				nextAction = "";
				return;
			}else{
				dayLog += "<tr><td>"+translate("WolfKing")+"</td><td>帶"+translate(selectPlayer)+"號玩家["+translate(player[selectPlayer])+"]<br/>惡靈騎士已於第"+translate(ghostReverse)+"晚使用反傷技能</td></tr>";
				checkDayResult(selectPlayer, "byWolfKing");
			}
		}else{
			dayLog += "<tr><td>"+translate("WolfKing")+"</td><td>帶"+translate(selectPlayer)+"號玩家["+translate(player[selectPlayer])+"]</td></tr>";
			checkDayResult(selectPlayer, "byWolfKing");
		}
	}else if(nextAction == "killOther"){
		dayLog += "<tr><td>公投</td><td>"+translate(selectPlayer)+"號玩家["+translate(player[selectPlayer])+"]</td></tr>";
		checkDayResult(selectPlayer, false, false, false);
	}else if(nextAction == "killSelf"){
		killSelfAction(selectPlayer);
	}else if(nextAction == "checkRole"){
		showKnight(selectPlayer);
	}else if(nextAction == "confirmRoleING"){
		hiddenRole(selectPlayer);
	}else{
		alert("Wrong Action");
	}
});
function gameInit(){
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
	writeVersionLog();
	setPlayerSeat();
	ShowLog("startConfirmRole()");
}
function writeVersionLog(){
	versionLog += "版本：<br/>玩家："+translate(totalPlayer)+"人<br/>勝利條件："+translate(versionMode)+"<br/>角色分佈：";
	versionLog += "<table class='w3-topbar w3-bottombar w3-border-blue w3-pale-blue' style='width:100%'>";
	versionLog += "<tr><td style='width:40px;'>神職</td><td>"+godChinArray.toString()+"</td></tr>";
	versionLog += "<tr><td>平民</td><td>"+villagerChinArray.toString()+"</td></tr>";
	versionLog += "<tr><td>狼人</td><td>"+wolfChinArray.toString()+"</td></tr>";
	versionLog += "</table><br/>";
	$("#versionLog").html(versionLog);
}
function writeDayLog(){
	
}
function checkAction(action){
	switch(action){
		case "confirmRole":
			var inputObject = [{
				id: 'reConfirmNumber',
				type: 'number',
				desc: '玩家號碼',
				defaultValue: '',
				prop: {
					max: totalPlayer,
					min: 1
					}
			}];
			ShowAlert(	"question", 
						"確認身份", 
						"請輸入需重新確認身份號碼<br/>", 
						"confirmRole($(\'#reConfirmNumber\').val())", 
						inputObject);
			break;
		case "showAllRole":
			var inputObject = [{
				id: 'confirm',
				type: 'password',
				desc: '確認密碼',
				defaultValue: '',
				prop: {
					}
			}];
			ShowAlert( 	"question",
						"確認身份",
						"請輸入密碼以公開所有玩家身份<br/>",
						"showAllRole($(\'#confirm\').val(), false)",
						inputObject);
			break;
		default:
			break;
	}
}
function startConfirmRole(){
	confirmRoles.play();
	nextAction = "confirmRole"; 
	confirmPlayer ++;
	$("#playerImg"+confirmPlayer).addClass("confirming");
	$(".wolf-info-desc").html("確認身份" + 
							"<i onclick=\"checkAction('confirmRole')\" class=\"bi bi-person-bounding-box\" style=\"margin-left:10px;\"></i>");
	$(".wolf-info-action").html(/*CreateButton("checkAction(\"confirmRole\")", "bi-person-bounding-box")*/);
	$(".wolf-menu").append(
					CreateButton("GoPage(\"VersionSelecter\", {})", "bi-recycle", null, "重啟遊戲") +
					CreateButton("ShowLog()", "bi-clipboard-data", null, "顯示遊戲資料") + 
					CreateButton("checkAction(\"showAllRole\")", "bi-eye-fill", null, "公開所有身份")
					);
}
function confirmRole(noOfPlayer){ 
	if(noOfPlayer > totalPlayer || noOfPlayer < 1){
		ShowAlert("alert", "錯誤", "身份號碼錯誤");
		return;
	}
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
			ShowAlert("alert", "錯誤", "身份號碼錯誤");
			break; 
	} 
	setTimeout(function(){  hiddenRole(noOfPlayer); checkNext(); }, 1500); // 1000ms = 1s	 
} 
function hiddenRole(noOfPlayer){ 
	$("#playerImg"+noOfPlayer).attr("src",imagePlayer);
	$("#playerDiv").hide();
}
function checkNext(){
	$("#playerImg"+confirmPlayer).removeClass("confirming");
	confirmPlayer++;
	$("#playerImg"+confirmPlayer).addClass("confirming");	
	action = "confirmRole";
	/*if(confirmPlayer > totalPlayer){*/
	if(confirmPlayer > 1){
		$(".wolf-info-desc").html("準備入夜");
		$(".wolf-info-action").html(
			CreateButton("checkAction(\"confirmRole\")", "bi-person-bounding-box", "重新確認") + 
			CreateButton("startNightTime()", "bi-moon", "天黑請閉眼")
		);
		if($(".wolf-menu").find(".bi-person-bounding-box").length < 1)
			$(".wolf-menu").append(
				CreateButton("checkAction(\"confirmRole\")", "bi-person-bounding-box", null, "重新確認身份")
			);	
		if($(".wolf-menu").find(".bi-moon").length < 1)		
			$(".wolf-menu").append(			
				CreateButton("startNightTime()", "bi-moon", null, "進入黑夜")
				);
		
	}
}
function showAllRole(pw, keep){
	if (pw.toUpperCase() != "CONFIRM") {
		ShowAlert("alert", "錯誤", "密碼錯誤");
		return;
	}	
	for (var noOfPlayer = 1; noOfPlayer <= totalPlayer; noOfPlayer++){
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
function startNightTime(){
	$(".playerImg").removeClass("confirming");
	closeAllEyes.play();
	//set default
	wolfKill = 0;
	witchKill = 0;
	witchSave = false;
	seerCheck = 0;
	$(".alivePlayer").prop("disabled", true); 
	$(".wolf-info-desc").html("天黑請閉眼～");
	$(".wolf-info-action").html("");
	$(".wolf-menu").hide();
	noOfNight++;
	dayLog += "<tr><th colspan=2>第"+translate(noOfNight)+"晚</th><tr>";
	checkNextNightAction();
}
function checkNextNightAction(){
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
					setTimeout(function(){ endNightTime() }, 5000);	
					break;
			}
			break;
		}
	}
	if(nightActionNo > nightActionOrder.length){
		nightActionNo = 0;
		setTimeout(function(){  endNightTime() }, 5000); // 1000ms = 1s	 
	}
}
//	wolf action
function wolfAction(){
	wolfOpenEyesAndKill.play();  
	nextAction = "wolfAction";
	if(noOfNight != 1){
		for(var i=1; i<=totalPlayer; i++){
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
		$(".wolf-info-desc").html("狼人！你今晚要殺誰？");
	}else{
		for(var i=1; i<=totalPlayer; i++){
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
		$(".wolf-info-desc").html("狼人！請確認身份。你今晚要殺誰？");
	}
	$(".wolf-info-action").html("直接揀選號碼 或 " + 
								CreateButton("wolfCloseEye(0)", "bi-person-x-fill", "不殺人")
							);
	$(".wolf-info").append("<div class=\"wolf-btn-temp w3-display-right\">" + 
							CreateButton("wolfCloseEye(0)", "bi-person-x-fill", null, null, "xxlarge") + 
							"</div>") ;
	$(".alivePlayer").prop("disabled", false); 
}
function wolfCloseEye(noOfPlayer){
	if(player[noOfPlayer] == "GhostWolf"){
		$(".wolf-info-desc").html("惡靈騎士不能自刀！"); 
		return;
	}
	if(noOfPlayer == 0){
		dayLog += "<tr><td>狼人</td><td>沒有殺人</td></tr>";
	}else{
		wolfKill = noOfPlayer;
		dayLog += "<tr><td>狼人</td><td>殺"+translate(noOfPlayer)+"號玩家["+translate(player[noOfPlayer])+"]</td></tr>";
	}
	wolfCloseEyes.play(); 
	$(".alivePlayer").prop("disabled", true); 
	$(".playerImg").attr("src",imagePlayer); 
	$(".wolf-btn-temp").remove();
	$(".wolf-info-desc").html("狼人！請閉眼！"); 
	$(".wolf-info-action").html("");
	checkNextNightAction();
}
//	witch action
function witchAction(){ 
	witchOpenEyesAndHelp.play();
	nextAction = "witchAction";
	var index = player.indexOf("Witch");
	$("#playerImg"+index).attr("src",imageWitch); 
	if(godAlivePlayer.includes("Witch")){
		if(witchGoodDrug > 0){
			if(wolfKill == 0){
				$(".wolf-info-desc").html("女巫！今晚沒有人被殺！"); 
				$(".wolf-info-action").html("請等一下！");
				setTimeout(function(){  witchHelp(false) }, 8000);
			}else if(wolfKill == index && !witchCanSaveHimself){
				$("#killImg"+wolfKill).show();
				$(".wolf-info-desc").html("女巫！今晚<strong style='color:red'>"+translate(wolfKill)+"號玩家</strong>被殺！"); 
				$(".wolf-info-action").html("請等一下！");
				setTimeout(function(){  witchHelp(false) }, 8000);
			}else{
				$("#killImg"+wolfKill).show();
				$(".wolf-info-desc").html("女巫！今晚<strong style='color:red'>"+translate(wolfKill)+"號玩家</strong>被殺！"); 
				$(".wolf-info-action").html(
									CreateButton("witchHelp(false)", "bi-emoji-dizzy-fill", "不救人") + 
									CreateButton("witchHelp(true)", "bi-emoji-smile-fill", "救人") 
									);
				$(".wolf-info").append("<div class=\"wolf-btn-temp w3-display-right\">" + 
									CreateButton("witchHelp(false)", "bi-emoji-dizzy-fill", null, null, "xxlarge") + 
									CreateButton("witchHelp(true)", "bi-emoji-smile-fill", null, null, "xxlarge") +
									"</div>") ;
			}
		}else{
			$(".wolf-info-desc").html("女巫！救藥已用！"); 
			$(".wolf-info-action").html("請等一下！");
			setTimeout(function(){  witchHelp(false) }, 8000);
		}
	}else{
		$(".wolf-info-desc").html("女巫已死。"); 
		$(".wolf-info-action").html("請等一下！");
		dayLog += "<tr><td>女巫</td><td>已死</td><tr>";
		setTimeout(function(){ witchHelp(false) }, 8000);
	}
} 
function witchHelp(save){
	$(".killImg").hide();
	$(".wolf-btn-temp").remove();
	witchDrug.play();
	if(save){
		dayLog += "<tr><td>女巫</td><td>救"+translate(wolfKill)+"號玩家["+translate(player[wolfKill])+"]</td><tr>";
		witchSave = save;
		witchGoodDrug--;
		$(".wolf-info-desc").html("救藥已用！一晚不能同時使用救藥和毒藥。"); 
		$(".wolf-info-action").html("請等一下！");
		setTimeout(function(){ witchCloseEye(0); }, 8000);
	}else{
		if(witchBadDrug > 0){
			$(".wolf-info-desc").html("女巫！你今晚要毒誰？"); 
			$(".wolf-info-action").html("直接揀選號碼 或 " + 
										CreateButton("witchCloseEye(0)", "bi-x-circle-fill", "不毒")
									);
			$(".wolf-info").append("<div class=\"wolf-btn-temp w3-display-right\">" + 
									CreateButton("witchCloseEye(0)", "bi-x-circle-fill", null, null, "xxlarge") + 
									"</div>") ;						
			$(".alivePlayer").prop("disabled", false); 
		}else{
			$(".wolf-info-desc").html("毒藥已用！。"); 
			$(".wolf-info-action").html("請等一下！");
			setTimeout(function(){ witchCloseEye(0); }, 8000);
		}
	}
	
}
function witchCloseEye(noOfPlayer){ 
	if(noOfPlayer != 0){
		witchKill = noOfPlayer;
		dayLog += "<tr><td>女巫</td><td>毒殺"+translate(noOfPlayer)+"號玩家["+translate(player[noOfPlayer])+"]</td></tr>";
		witchBadDrug--;
	}
	witchCloseEyes.play();
	$(".alivePlayer").prop("disabled", true); 
	$(".playerImg").attr("src",imagePlayer); 
	$(".wolf-btn-temp").remove();
	$(".wolf-info-desc").html("女巫！請閉眼！"); 
	$(".wolf-info-action").html("");
	checkNextNightAction();
} 
//	seer action
function seerAction(){ 
	seerOpenEyesAndCheck.play();
	nextAction = "seerAction";
	var index = player.indexOf("Seer");
	$("#playerImg"+index).attr("src",imageSeer); 
	if(godAlivePlayer.includes("Seer")){
		$(".wolf-info-desc").html("預言家！你今晚要查誰的身份？");
		$(".wolf-info-action").html("直接揀選號碼");
		$(".alivePlayer").prop("disabled", false);
	}else{
		$(".wolf-info-desc").html("預言家已死。");
		$(".wolf-info-action").html("請等一下！");
		setTimeout(function(){ showRoleToSeer(0); }, 10000);
	}
} 
function showRoleToSeer(noOfPlayer){
	$(".alivePlayer").prop("disabled", true); 
	seerCloseEyesAndResult.play();
	if(noOfPlayer != 0){
		seerCheck = noOfPlayer;
		var checkPlayerRule = player[noOfPlayer];
		if(checkPlayerRule == "SecretWolf"){
			$("#playerImg"+noOfPlayer).attr("src","./image/Good.jpg"); 
			$(".wolf-info-desc").html(translate(noOfPlayer)+"號玩家身份是<strong style='color:blue'>好人</strong><i class='bi bi-hand-thumbs-up-fill w3-xxlarge w3-text-blue'></i>！"); 
			$(".wolf-info-action").html("");
		}else if(godArray.includes(checkPlayerRule)){
			$("#playerImg"+noOfPlayer).attr("src","./image/Good.jpg"); 
			$(".wolf-info-desc").html(translate(noOfPlayer)+"號玩家身份是<strong style='color:blue'>好人</strong><i class='bi bi-hand-thumbs-up-fill w3-xxlarge w3-text-blue'></i>！"); 
			$(".wolf-info-action").html("");
		}else if(villagerArray.includes(checkPlayerRule)){
			$("#playerImg"+noOfPlayer).attr("src","./image/Good.jpg"); 
			$(".wolf-info-desc").html(translate(noOfPlayer)+"號玩家身份是<strong style='color:blue'>好人</strong><i class='bi bi-hand-thumbs-up-fill w3-xxlarge w3-text-blue'></i>！"); 
			$(".wolf-info-action").html("");
		}else if(wolfArray.includes(checkPlayerRule)){
			$("#playerImg"+noOfPlayer).attr("src","./image/Bad.jpg"); 
			$(".wolf-info-desc").html(translate(noOfPlayer)+"號玩家身份是<strong style='color:red'>狼人</strong><i class='bi bi-hand-thumbs-down-fill w3-xxlarge w3-text-red'></i>！"); 
			$(".wolf-info-action").html("");
		}
		dayLog += "<tr><td>預言家</td><td>查"+translate(noOfPlayer)+"號玩家["+translate(checkPlayerRule)+"]</td></tr>";	
	}
	setTimeout(function(){ seerCloseEye(); }, 5000); // 1000ms = 1s
}
function seerCloseEye(){ 
	$(".playerImg").attr("src",imagePlayer); 
	$(".wolf-info-desc").html("預言家！請閉眼！"); 
	$(".wolf-info-action").html("");
	checkNextNightAction();
} 
// end night 
function endNightTime(){ 
	openAllEyes.play();
	$(".wolf-info-desc").html("天亮請睜眼～"); 
	$(".wolf-info-action").html("");
	// ........add button for day action
	setTimeout(function(){ checkNightResult(); }, 2000); // 1000ms = 1s
} 
function checkNightResult(){
	noOfPlayerDied = [];
	var wolfKillSuccess = checkWolfKill();
	var witchKillSuccess = checkWitchKill();
	if(wolfKillSuccess || witchKillSuccess){
	}else{
		nextAction = "silentNight";
	}
	showResult();
}
function checkWolfKill(){
	if(witchSave && (guardProtect == wolfKill)){
		dayLog += "<tr><td colspan=2>女巫守衛同救同守<br/>"+translate(wolfKill)+"號玩家["+translate(player[wolfKill])+"]失救</td></tr>";
	}else if(!witchSave && (guardProtect == wolfKill)){
		dayLog += "<tr><td>守衛</td><td>成功守護"+translate(wolfKill)+"號玩家["+translate(player[wolfKill])+"]</td></tr>";
		wolfKill = 0;
	}else if(witchSave){
		wolfKill = 0;
	}
	if(wolfKill > 0){
		return killPlayer(wolfKill, "byWolf");
	}else{
		return false;
	}
}
function checkWitchKill(){
	if(player.indexOf("GhostWolf") == witchKill && ghostReverse == 0){
		ghostReverse++;
		witchKill = player.indexOf("Witch");
		dayLog += "<tr><td>惡靈</td><td>反傷"+translate(witchKill)+"號玩家["+translate("Witch")+"]</td></tr>";
	}
	if(witchKill > 0){
		return killPlayer(witchKill, "byWitch");
	}else{
		return false;
	}
}
function checkDayResult(noOfPlayer, killMethod){
	noOfPlayerDied = [];
	nextAction = "";
	var success = killPlayer(noOfPlayer, killMethod);
	if(success){
		showResult();
	}
}
function killPlayer(noOfPlayer, killMethod){
	//update display
	$("#playerCard"+noOfPlayer).removeClass("alivePlayer");
	$("#playerCard"+noOfPlayer).addClass("diedPlayer");
	$("#playerButton"+noOfPlayer).removeClass("alivePlayer");
	$("#playerButton"+noOfPlayer).addClass("diedPlayer");
	$("#diedImg"+noOfPlayer).show();
	$("#killImg"+noOfPlayer).show();
	$(".wolf-btn-temp").remove();
	$(".diedPlayer").prop("disabled", true); 
	//update alivePlayerList
	var diedPlayerRule = player[noOfPlayer]
	alivePlayer.splice(alivePlayer.indexOf(diedPlayerRule),1);
	if(godArray.includes(diedPlayerRule)){
		godAlivePlayer.splice(godAlivePlayer.indexOf(diedPlayerRule),1); 
	}else if(villagerArray.includes(diedPlayerRule)){
		villagerAlivePlayer.splice(villagerAlivePlayer.indexOf(diedPlayerRule),1); 
	}else if(wolfArray.includes(diedPlayerRule)){
		wolfAlivePlayer.splice(wolfAlivePlayer.indexOf(diedPlayerRule),1); 
	}
	//check died player rule
	if((diedPlayerRule == "WolfKing" || diedPlayerRule == "Hunter") && (killMethod != "byWitch")){
		nextAction = "bringBy" + diedPlayerRule; // bringByWolfKing || bringByHunter
	}
	noOfPlayerDied.push(noOfPlayer);
	return true;
}
function showResult(){
	setTimeout(function(){ $(".killImg").hide(); }, 6000);
	noOfPlayerDied.sort(function(a, b){return a-b});
	if(nextAction == "silentNight"){
		//get random number
		var no = Math.floor(Math.random() * (totalPlayer - 0)) + 0;
		while(!alivePlayer.includes(player[no]) || no == 0){
			no++;
			if(no > totalPlayer){
				no = 1;
			}
		}
		$(".wolf-info-desc").html("昨晚是平安夜～"); 
		$(".wolf-info-action").html(translate(no) + "號玩家開始發言");
		$(".wolf-menu").show();
	}else{
		var desc = "昨晚 ";
		for(let i=0; i<noOfPlayerDied.length; i++){
			desc += "[" + translate(noOfPlayerDied[i]) + "號玩家] "
		}
		desc += "死了～"
		$(".wolf-info-desc").html(desc); 
		if(nextAction == "bringByWolfKing"){
			$(".wolf-info-action").html("[" + translate(player.indexOf("WolfKing")) + "號玩家] 啟動技能！你要帶走誰？");
			$(".wolf-info").append("<div class=\"wolf-btn-temp w3-display-right\">" + 
									CreateButton("skipAction()", "bi-x-circle-fill", null, "不帶", "xxlarge") + 
									"</div>") ;						
			$(".alivePlayer").prop("disabled", false); 
		}else if(nextAction == "bringByHunter"){
			$(".wolf-info-action").html("[" + translate(player.indexOf("Hunter")) + "號玩家] 啟動技能！你要帶走誰？");
			$(".wolf-info").append("<div class=\"wolf-btn-temp w3-display-right\">" + 
									CreateButton("skipAction()", "bi-x-circle-fill", null, "不帶", "xxlarge") + 
									"</div>") ;						
			$(".alivePlayer").prop("disabled", false); 
		}else{
			$(".wolf-info-action").html("下一位玩家開始發言");
			$(".wolf-btn-temp").remove();
			$(".wolf-menu").show();
		}
	}
}
function skipAction(){
	nextAction = "";
	$(".wolf-info-desc").html("遊戲繼續～"); 
	$(".wolf-info-action").html("下一位玩家開始發言");
	$(".wolf-btn-temp").remove();
}
