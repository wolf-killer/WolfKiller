var seatingTableCol = 4;
var seatingTableRow = 0;
function setPlayerSeat(manualSetCol){
	$("#seatingPlan").html("");
	var html="";
	
	if(windowMode == "tableAlign"){
			//show as table
		if(manualSetCol != null){
			seatingTableCol = manualSetCol;
			if(Math.ceil(totalPlayer / seatingTableCol) == seatingTableRow){
				seatingTableCol+= 1;
				setPlayerSeat(seatingTableCol);
			}
		}else{
			if(totalPlayer < 13){
				seatingTableCol = 3;
			}
		}
		seatingTableRow = Math.ceil(totalPlayer / seatingTableCol);
		loopWidth = 100/seatingTableCol + "%";
		
		html += 
			"	<div id=\"for-"+totalPlayer+"-player\" class=\"seatingTable\" style=\"width:100%;\">" +
			"		<div class=\"w3-row\" style=\"\"> ";
		for(var loop=1; loop<=totalPlayer; loop++){
			html += 
			"			<div class=\"w3-container w3-col w3-center w3-col-middle\" style=\"padding: 2px; width: "+loopWidth+";\"> " +
			"				<div " +
			"					id=\"playerCard"+loop+"\" " +
			"					name=\""+loop+"\"" +
			"					class=\"playerCard playerButton alivePlayer wolf-screenseat w3-display-container\"> " +
			"					<img id=\"playerImg"+loop+"\" class=\"playerImg\" src=\"./image/actor/Player.png\" style=\"\"> " +
			"					<img id=\"diedImg"+loop+"\" class=\"diedImg\" src=\"./image/Died.png\" style=\"\"> " +
			"					<img id=\"killImg"+loop+"\" class=\"killImg\" src=\"./image/Kill.png\" style=\"\"> " +
			"					<button " +
			"						id=\"playerButton"+loop+"\" " +
			"						name=\""+loop+"\" " +
			"						class=\"playerButton alivePlayer w3-circle w3-black w3-display-topleft w3-large\"" +
			"						style=\"\"> " +
			"						"+ loop +
			"					</button> " +
			"				</div> " +
			"			</div>" ;
		}
		html += 
			"		</div>" +
			"	</div>"+
			"<div class=\"wolf-info wolf-table-info w3-display-bottommiddle w3-xlarge\" style=\"\" >" + 
			"	<span class=\"wolf-info-desc\"></span><br/>" + 
			"	<span class=\"wolf-info-action\"></span>" + 
			"</div>" + 
			"<div class=\"wolf-menu w3-display-bottommiddle w3-small w3-center\" "+
			"		style=\"transform: translate(-50%,0%) rotate(0deg);\"></div>" 
	}else if(windowMode == "lrAlign"){	
			//show only left-right
		var y = totalPlayer;
		var rowCourt = Math.ceil(totalPlayer/2); 
		var x = 1;
		html += 
			"	<table id=\"for-"+totalPlayer+"-player\" class=\"seatingTable\" style=\"height:"+setHeight+"px\">";
		for(var x=1; x<y; x++){
			html += 
			"		<tr> " + 
			"			<td class=\"wolf-td1\" style=\"\"> " +
			"				<div " +
			"					id=\"playerCard"+x+"\" " +
			"					name=\""+x+"\"" +
			"					class=\"playerCard playerButton alivePlayer wolf-screenseat w3-display-container\"> " +
			"					<img id=\"playerImg"+x+"\" class=\"playerImg\" src=\"./image/actor/Player.png\" style=\"transform:rotate(90deg);\"> " +
			"					<img id=\"diedImg"+x+"\" class=\"diedImg\" src=\"./image/Died.png\" style=\"\"> " +
			"					<img id=\"killImg"+x+"\" class=\"killImg\" src=\"./image/Kill.png\" style=\"\"> " +
			"					<button " +
			"						id=\"playerButton"+x+"\" " +
			"						name=\""+x+"\" " +
			"						class=\"playerButton alivePlayer w3-circle w3-black w3-display-right w3-large\"" +
			"						style=\"transform: translate(0%,-50%) rotate(-90deg);\"> " +
			"						"+ x +
			"					</button> " +
			"				</div> " +
			"			</td>" ;
			if(x==1){
				html += 
				"			<td class=\"wolf-td2 w3-display-container\" style=\"\" rowspan="+rowCourt+"> " +
				
				"			</td>" ;
			}
			html += 
			"			<td class=\"wolf-td3\" style=\"\"> " +
			"				<div " +
			"					id=\"playerCard"+y+"\" " +
			"					name=\""+y+"\"" +
			"					class=\"playerCard playerButton alivePlayer wolf-screenseat w3-display-container\"> " +
			"					<img id=\"playerImg"+y+"\" class=\"playerImg\" src=\"./image/actor/Player.png\" style=\"transform:rotate(-90deg);\"> " +
			"					<img id=\"diedImg"+y+"\" class=\"diedImg\" src=\"./image/Died.png\" style=\"\"> " +
			"					<img id=\"killImg"+y+"\" class=\"killImg\" src=\"./image/Kill.png\" style=\"\"> " +
			"					<button " +
			"						id=\"playerButton"+y+"\" " +
			"						name=\""+y+"\" " +
			"						class=\"playerButton alivePlayer w3-circle w3-black w3-display-left w3-large\" " +
			"						style=\"transform: translate(0%,-50%) rotate(90deg);\"> " +
			"						"+ y +
			"					</button> " +
			"				</div> " +
			"			</td>" + 
			"		</tr>";
			y=y-1;
		}
		if(totalPlayer%2>0){
			html += 
			"		<tr> " + 
			"			<td class=\"wolf-td1\" style=\"\"> " +
			"				<div " +
			"					id=\"playerCard"+x+"\" " +
			"					name=\""+x+"\"" +
			"					class=\"playerCard playerButton alivePlayer wolf-screenseat w3-display-container\"> " +
			"					<img id=\"playerImg"+x+"\" class=\"playerImg\" src=\"./image/actor/Player.png\" style=\"transform:rotate(90deg);\"> " +
			"					<img id=\"diedImg"+x+"\" class=\"diedImg\" src=\"./image/Died.png\" style=\"\"> " +
			"					<img id=\"killImg"+x+"\" class=\"killImg\" src=\"./image/Kill.png\" style=\"\"> " +
			"					<button " +
			"						id=\"playerButton"+x+"\" " +
			"						name=\""+x+"\" " +
			"						class=\"playerButton alivePlayer w3-circle w3-black w3-display-right w3-large\"" +
			"						style=\"transform: translate(0%,-50%) rotate(-90deg);\"> " +
			"						"+ x +
			"					</button> " +
			"				</div> " +
			"			</td>" +
			"			<td class=\"wolf-td3\" style=\"\"> " +
			"			</td>" + 
			"		</tr>";
		}
		html += 
			"	</table>";
		$("#FixScreen").append( 
			"			<div class=\"wolf-info w3-display-middle w3-xlarge w3-center\" " + 
			"				style=\"width:" + setHeight + "px; transform: translate(-54%,-50%) rotate(90deg);\">" +
			"				<span class=\"wolf-info-desc\"></span><br/>" + 
			"				<span class=\"wolf-info-action\"></span>" + 
			"			</div>" + 
			"			<div class=\"wolf-info w3-display-middle w3-xlarge w3-center\" " + 
			"				style=\"width:" + setHeight + "px; transform: translate(-46%,-50%) rotate(-90deg);\">" +
			"				<span class=\"wolf-info-desc\"></span><br/>" + 
			"				<span class=\"wolf-info-action\"></span>" + 
			"			</div>" + 
			"			<div class=\"wolf-menu w3-display-topmiddle w3-small w3-center\" " + 
			"				style=\"transform: translate(-50%,0%) rotate(180deg);\"></div>" + 
			"			<div class=\"wolf-menu w3-display-bottommiddle w3-small w3-center\" "+
			"				style=\"transform: translate(-50%,0%) rotate(0deg);\"></div>" 
			);
	}
	setTimeout(function(){ resizeSeatingPlan() }, 50);	
	$("#seatingPlan").html(html);
}
function resizeSeatingPlan(){
	if(windowMode == "tableAlign"){
		var currentTableHeight = $(".seatingTable").height();
		var diff = setHeight-currentTableHeight;
		if(diff<100){ 
			setPlayerSeat(seatingTableCol+1);
			return;
		}
	}else if(windowMode == "lrAlign"){	
		var currentTableHeight = $(".seatingTable tbody").height(); 
		var scale = setHeight/currentTableHeight * 100;
		if(currentTableHeight > setHeight){
			$(".wolf-screenseat").css('width', scale + '%');
			$(".wolf-td3 .wolf-screenseat").css('transform', 'translate(' + (100 - scale) + '%, 0%)'); 
		}
	}
	$("#loader-background").hide();
}
