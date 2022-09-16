var dayAction = 
"	<div id='dayActionDiv' class='w3-display-middle w3-center' style='width:100%'> " +
"		<div class='dayActionDivButton w3-round-xxlarge w3-margin-top' onclick='updateAction('nightTime')'> " +
"			<i class='bi bi-moon w3-xxlarge'></i><br/>入夜 " +
"		</div> " +
"		<div class='dayActionDivButton w3-round-xxlarge w3-margin-top' onclick='updateAction('killOther')'> " +
"			<i class='bi bi-clipboard-data w3-xxlarge'></i><br/>投票 " +
"		</div> " +
"		<div class='dayActionDivButton w3-round-xxlarge w3-margin-top' onclick='updateAction('killSelf')'> " +
"			<i class='bi bi-robot w3-xxlarge'></i><br/>自爆 " +
"		</div> " +
"		<div class='dayActionDivButton w3-round-xxlarge w3-margin-top' onclick='updateAction('checkRule')'> " +
"			<i class='bi bi-fingerprint w3-xxlarge'></i><br/>驗証身份 " +
"		</div> " +
"	</div> ";


function setPlayerSeat(){
	$("#seatingPlan").html("");
	var html="";
	
	if(windowMode == "tableAlign"){
			//show as table
		if(setWidth > 500 || setWidth < 400){
			loopWidth = '25%';
		}else{
			if(totalPlayer < 13){
				loopWidth = '33%';
			}else{
				loopWidth = '25%';
			}
		}
		html += 
			"	<div id=\"for-"+totalPlayer+"-player\" class=\"seatingTable w3-container\" style=\"width:100%;\">" +
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
			"	</div>";
		$("#seatingPlan").css('padding', '40px 0px');
	}else if(windowMode == "lrAlign"){	
			//show only left-right
		var y = totalPlayer;
		var rowCourt = Math.ceil(totalPlayer/2); 
		var setSeatingTableHeight = setHeight - 40;
		var x = 1;
		html += 
			"	<table id=\"for-"+totalPlayer+"-player\" class=\"seatingTable\" style=\"height:"+setSeatingTableHeight+"px\">";
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
				"			<div class=\"wolf-info w3-display-left w3-xlarge\" style=\"transform:translate(-10%,50%) rotate(90deg); margin-top:25px;\" ></div>" + 
							dayAction + 
				"			<div class=\"wolf-info w3-display-right w3-xlarge\" style=\"transform: translate(10%,-50%) rotate(-90deg); margin-bottom:25px;\"></div>" +
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
		setTimeout(function(){ resizeSeatingPlan() }, 500);	
	}
	$("#seatingPlan").html(html);
	$("#loader-background").hide();
}
function resizeSeatingPlan(){
	var currentTableHeight = $(".seatingTable tbody").height(); 
	var setSeatingTableHeight = setHeight - 40;
	var scale = setSeatingTableHeight/currentTableHeight * 100;
	if(currentTableHeight > setSeatingTableHeight){
		$(".wolf-screenseat").css('width', scale + '%');
		$(".wolf-td3 .wolf-screenseat").css('transform', 'translate(' + (100 - scale) + '%, 0%)'); 
	}
}
