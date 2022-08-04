var chinese = {
	"0":"[_]", "1":"一", "2":"二", "3":"三", "4":"四", "5":"五", "6":"六", "7":"七", "8":"八", "9":"九", "10":"十", 
	"11":"十一", "12":"十二", "13":"十三", "14":"十四", "15":"十五", "16":"十六", "17":"十七", "18":"十八","19":"十九","20":"二十", 
	"gonly":"神或民","gnv":"神和民",
	"Villager":"平民", "Villager1":"平民[一]", "Villager2":"平民[二]", "Villager3":"平民[三]",
	"Wolf":"狼人", "Wolf1":"狼人[一]", "Wolf2":"狼人[二]", 
	"WolfKing":"狼王", 
	"SecretWolf":"雪狼",
	"PrettyWolf":"狼美人",
	"GhostWolf":"惡靈騎士",
	"StoneWolf":"石像鬼",
	"BloodWolf":"血月使者",
	"WhiteWolf":"白狼王",
	"Seer":"預言家", 
	"Witch":"女巫", 
	"Knight":"騎士", 
	"Hunter":"獵人",
	"Guard":"守衛",
	"Bear":"熊",
	"DemonHunter":"猎魔人",
	"TombGuard":"守墓人",
	"Idiot":"白痴"
};
function translate(input){
	return chinese[input]?chinese[input]:input;
}
