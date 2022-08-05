var setWidth = 	document.documentElement.scrollWidth;
var setHeight = document.documentElement.scrollHeight;
var wh = 0;
var landscape = false;

var GetUrlParameter = function GetUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;
    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
    return false;
};
function GoPage(pageName, param){
	path = 	"./" + pageName +".html?";
	Object.entries(param).forEach(entry => {
		const [key, value] = entry;
		path += ""+ key + "=" + value + "&";	
	});
	window.location.href = path;
}
function SetWindow(){	
	setWidth = 	GetUrlParameter('setWidth')?
				GetUrlParameter('setWidth'):
				document.documentElement.scrollWidth;
	setHeight = GetUrlParameter('setHeight')?
				GetUrlParameter('setHeight'):
				document.documentElement.scrollHeight;
	console.log("Available width/height: " + setWidth + "*" + screen.availHeight + " || w/h: " + setWidth / setHeight);
	$("#FixScreen").css("height", setHeight);
	$("#FixScreen").css("width", setWidth);
	$("#seatingPlan").css("height", setHeight);
	$("#seatingPlan").css("width", setWidth);
	
	$(".PopupInfo").css("max-height", setHeight-10);
	$(".HiddenPopupInfo").css("max-height", setHeight-40);
	wh = setWidth / setHeight;
}
function AdjustX(input){
	if(input=="-"){
		setWidth = setWidth - 10;
	}else{
		setWidth = setWidth + 10;
	}
	$("#FixScreen").css("width", setWidth);
}
function AdjustY(input){
	if(input=="-"){
		setHeight = setHeight - 10;
	}else{
		setHeight = setHeight + 10;
	}
	$("#FixScreen").css("height", setHeight);
}
function CloseHiddenPopupInfo(){
	$(".HiddenPopupInfo").css("display","none");
}
function ExtandSection(icon, sectionName){
	if($("#"+sectionName).hasClass('w3-show')){
		$(icon).removeClass('bi-caret-up-fill');
		$(icon).addClass('bi-caret-down-fill');
		$("#"+sectionName).removeClass('w3-show');
		$("#"+sectionName).addClass('w3-hide');
	}else{
		$(icon).removeClass('bi-caret-down-fill');
		$(icon).addClass('bi-caret-up-fill');
		$("#"+sectionName).removeClass('w3-hide');
		$("#"+sectionName).addClass('w3-show');
	}
}
function UpdateBtn(mode, version){
	$("."+mode).removeClass('wolf-btn-selected');
	$("#"+version).addClass('wolf-btn-selected');
	if(mode == 'versionMode'){
		versionMode = version;
	}else if(mode == 'windowMode'){
		windowMode = version;
	}
}
function ShowAlert(type, title, content){
	var icon, color;
	if(type == "alert"){
		icon = "bi-exclamation-diamond-fill";
		color = "red";
		$("#alertDiv").addClass("alertMode");
		
	}else if(type == "question"){
		icon = "bi-question-diamond-fill";
		color = "yellow";
		$("#alertDiv").addClass("questionMode");
	}else{
		icon = "bi-bookmark-star-fill"; 
		color = "blue";
		$("#alertDiv").addClass("remarkMode");
	}
	$("#alertTitle").html(	"<div class='w3-display-container w3-center w3-col-middle w3-pale-" + color + " w3-leftbar w3-rightbar w3-border-" + color + " w3-large'>" + 
							"	<i class='bi " + icon + " w3-text-" + color + "'></i>" + title + 
							"</div>");
	$("#alertContent").html(content);
	if(type == "question"){
		$("#alertAction").html(	"<button class='wolf-btn w3-btn w3-round-large w3-pale-" + color + " w3-border-" + color + " wolf-margin-x' onclick='CloseHiddenPopupInfo()'>" + 
									"確認" + 
								"</button>" + 
								"<button class='wolf-btn w3-btn w3-round-large w3-pale-" + color + " w3-border-" + color + " wolf-margin-x' onclick='CloseHiddenPopupInfo()'>" + 
									"取消" + 
								"</button>");
	}else{
		$("#alertAction").html(	"<button class='wolf-btn w3-btn w3-round-large w3-pale-" + color + " w3-border-" + color + " wolf-margin-x' onclick='CloseHiddenPopupInfo()'>" + 
									"關閉" + 
								"</button>");
	}
	$("#alertDiv").css("display","block");
}
function GetRandom(){
	var randomBuffer = new Uint32Array(1);
	window.crypto.getRandomValues(randomBuffer);
	return randomBuffer[0] / (0xFFFFFFFF + 1);
}
