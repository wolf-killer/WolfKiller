function setPlayerSeat(){
	$("#seatingPlan").html("");
	var html="";
	
	if(windowMode == "tableAlign"){
			//show as table
		html += 
			"	<div id=\"for-"+totalPlayer+"-player\" class=\"seatingTable w3-container\" style=\"width:100%;\">" +
			"		<div class=\"w3-row\" style=\"\"> ";
		for(var loop=1; loop<=totalPlayer; loop++){
			html += 
			"			<div class=\"w3-container s4 m3 l2 w3-col w3-center w3-col-middle\" style=\"padding: 2px;\"> " +
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
			"						class=\"playerButton alivePlayer w3-circle w3-black w3-display-bottommiddle \"" +
			"						style=\"\"> " +
			"						"+ loop +
			"					</button> " +
			"				</div> " +
			"			</div>" ;
		}
		html += 
			"		</div>" +
			"	</div>";
			$("#loader-background").hide();
	}else if(windowMode == "lrAlign"){	
			//show only left-right
		var y = totalPlayer;
		var x = 1;
		html += 
			"	<table id=\"for-"+totalPlayer+"-player\" class=\"seatingTable\" style=\"\">";
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
			"						class=\"playerButton alivePlayer w3-circle w3-black w3-display-right\"" +
			"						style=\"transform: translate(0%,-50%) rotate(-90deg);\"> " +
			"						"+ x +
			"					</button> " +
			"				</div> " +
			"			</td>" +
			"			<td class=\"wolf-td2\" style=\"\"> " +
			"			</td>" +
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
			"						class=\"playerButton alivePlayer w3-circle w3-black w3-display-left\" " +
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
			"						class=\"playerButton alivePlayer w3-circle w3-black w3-display-right\"" +
			"						style=\"transform: translate(0%,-50%) rotate(-90deg);\"> " +
			"						"+ x +
			"					</button> " +
			"				</div> " +
			"			</td>" +
			"			<td class=\"wolf-td2\" style=\"\"> " +
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
}
function resizeSeatingPlan(){
	var stHeight = $(".seatingTable").height(); 
	var scale = setHeight * 0.9 / stHeight;
	$(".wolf-screenseat").css('width', scale*100+ '%');
	$("#loader-background").hide();
}