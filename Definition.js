var nightActionOrder = ["Guard","Wolf","Witch","Seer"];
var array6 = ["Wolf","Wolf1","Seer","Hunter","Villager","Villager1"]; 
var array7 = ["Wolf","Wolf1","Seer","Witch","Hunter","Villager","Villager1"]; 
var array8 = ["Wolf","Wolf1","WolfKing","Seer","Witch","Knight","Villager","Villager1"]; 
var array9 = ["Wolf","Wolf1","WolfKing","Seer","Witch","Knight","Villager","Villager1","Villager2"]; 
var array10 = ["Wolf","Wolf1","WolfKing","Seer","Witch","Knight","Hunter","Villager","Villager1","Villager2"]; 
var array11 = ["Wolf","WolfKing","SecretWolf","Seer","Witch","Knight","Hunter","Guard","Villager","Villager1","Villager2"]; 
var array12 = ["Wolf","WolfKing","SecretWolf","GhostWolf","Seer","Witch","Knight","Hunter","Guard","Bear","Villager","Villager1"]; 
var allActor = ["Wolf","WolfKing","SecretWolf","GhostWolf","Seer","Witch","Knight","Hunter","Guard","Bear","Idiot","Villager"];
var allGod = ["Seer","Witch","Knight","Hunter","Guard","Bear","Idiot"];
var allVillager = ["Villager"];
var allWolf = ["Wolf","WolfKing","SecretWolf","GhostWolf"];
var allActorRule = {
	"Wolf": "黑夜可以睜眼與隊友見面並討論戰術與選擇殺害對象。",
	"WolfKing": "死亡時可以開槍帶走一名玩家。",
	"SecretWolf": "查驗均不認定其為狼人，但與騎士決鬥則雪狼死亡。",
	"GhostWolf": "具備一次性反傷技能",
	"Seer": "每夜可以查驗一位存活玩家。",
	"Witch": "擁有一瓶解藥和一瓶毒藥。",
	"Knight": "白天發言階段任意時候可以翻牌選擇與一名玩家決鬥。<br/>如對方是狼人則對方即時出局且不能發動技能，並直接進入夜晚；</br>如對方是好人則騎士以死謝罪，繼續白天流程。",
	"Hunter": "淘汰時可以公布角色牌發動技能開槍帶走一位玩家。",
	"Guard": "每晚可以守護一名玩家免受狼人殺害，可以守護自己，但不能連續兩晚守護同一人。",
	"Bear": "每晚，熊左右兩位玩家當中若有至少有一個狼人，則會於隔天早上咆哮。",
	"Idiot": "若白天放逐公投中被投出，可翻開角色牌以免疫該次放逐，但在之後的放逐公投中失去投票權利。狼人無須追刀白痴。",
	"Villager": "沒有特殊技能，黑夜階段全程閉眼。"
};

var testAudio = new Audio('./sound/Pikachu.mp3'); 
var bearGrowling = new Audio('./sound/Pikachu.mp3'); 
var confirmRoles = new Audio("./sound/ConfirmRole.mp3");
var gameOverWin = new Audio("./sound/GameOverWin.mp3");
var gameOverLose = new Audio("./sound/GameOverLose.mp3");
var closeAllEyes = new Audio("./sound/CloseAllEyes.mp3"); 
var openAllEyes = new Audio("./sound/OpenAllEyes.mp3"); 
var wolfOpenEyesAndKill = new Audio("./sound/WolfOpenEyesAndKill.mp3"); 
var wolfCloseEyes = new Audio("./sound/WolfCloseEyes.mp3"); 
var witchOpenEyes = new Audio("./sound/WitchOpenEyes.mp3"); 
var witchOpenEyesAndHelp = new Audio("./sound/WitchOpenEyesAndHelp.mp3"); 
var witchOpenEyesAndDrug = new Audio("./sound/WitchOpenEyesAndDrug.mp3"); 
var witchDrug = new Audio("./sound/WitchDrug.mp3"); 
var witchCloseEyes = new Audio("./sound/WitchCloseEyes.mp3"); 
var seerOpenEyesAndCheck = new Audio("./sound/SeerOpenEyesAndCheck.mp3"); 
var seerCloseEyesAndResult = new Audio("./sound/SeerCloseEyesAndResult.mp3"); 
var guardOpenEyesAndProtect = new Audio("./sound/GuardOpenEyesAndProtect.mp3");
var guardCloseEyes = new Audio("./sound/GuardCloseEyes.mp3");
var silentNight = new Audio("./sound/SilentNight.mp3");

var imagePlayer = "./image/actor/Player.png";
//Wolf
var imageWolf = "./image/actor/Wolf.png";
var imageWolfKing = "./image/actor/WolfKing.png";
var imageSecretWolf = "./image/actor/SecretWolf.png";
var imageGhostWolf = "./image/actor/GhostWolf.png";
var imagePrettyWolf = "./image/actor/PrettyWolf.png";
var imageStoneWolf = "./image/actor/StoneWolf.png";
var imageBloodWolf = "./image/actor/BloodWolf.png";
var imageWhiteWolf = "./image/actor/WhiteWolf.png";
//God
var imageSeer = "./image/actor/Seer.png";
var imageWitch = "./image/actor/Witch.png";
var imageKnight = "./image/actor/Knight.png";
var imageHunter = "./image/actor/Hunter.png";
var imageGuard = "./image/actor/Guard.png";
var imageBear = "./image/actor/Bear.png";
var imageIdiot = "./image/actor/Idiot.png";
var imageVillager = "./image/actor/Villager.png";