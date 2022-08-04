var getUrlParameter = function getUrlParameter(sParam) {
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
function closeHiddenPopupInfo(){
	$(".HiddenPopupInfo").css("display","none");
}
function extandSection(icon, sectionName){
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
function updateBtn(mode, version){
	$("."+mode).removeClass('wolf-btn-selected');
	$("#"+version).addClass('wolf-btn-selected');
	if(mode == 'versionMode'){
		versionMode = version;
	}else if(mode == 'windowMode'){
		windowMode = version;
	}
}
function showAlert(type, title, content){
	var icon;
	if(type == "alert"){
		icon = "bi-exclamation-diamond-fill";
	}else if(type == "question"){
		icon = "bi-question-diamond-fill";
	}else{
		icon = "bi-bookmark-star-fill"; 
	}
	$("#alertTitle").html("<i class='bi " + icon + " w3-text-red'></i>" + title);
	$("#alertContent").html(content);
	$("#alertDiv").css("display","block");
}
