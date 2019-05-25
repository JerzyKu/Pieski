var imgs = [];
var gameImgs = [];
var selectedImgs = [];
var score = 0;
var ruchy = 0;

generateImgs();
generateTable();
updateScore();
setTimeout(HideImgs, 2000);



function HideImgs() {
	var imgsToHide = document.getElementsByClassName('scored');
	if (imgsToHide.length > 0) {
		var len = imgsToHide.length;
		for (var i = 0; i < len; i++) {
			imgsToHide[0].className = "hidden";
		}
	}
}

function HideImgsThatNotScored() {
	var imgsToHide = document.getElementsByClassName('selected');
	if (imgsToHide.length > 0) {
		var len = imgsToHide.length;
		for (var i = 0; i < len; i++) {
			imgsToHide[0].className = "hidden";
		}
	}
}

function poka(){
    
    var imgsToHide = document.getElementsByClassName('selected');
	if (imgsToHide.length > 0) {
		var len = imgsToHide.length;
		for (var i = 0; i < len; i++) {
			imgsToHide[0].className = "scored";
		}
	}
    
    var imgsToHide2 = document.getElementsByClassName('hidden');
	if (imgsToHide2.length > 0) {
		var len2 = imgsToHide2.length;
		for (var i = 0; i < len2; i++) {
			imgsToHide2[0].className = "scored";
		}
	}
    
}

function updateScore() {
	document.getElementById('score')
	.innerHTML = "<p ><pre><br>Punkty: " + score + "                       Ruchy: " + ruchy + "</pre></p>";
    
    if(score == 8){
        document.getElementById("newgame").innerHTML="<input id='guzik' type='button' value='Nowa Gra' onClick='location.reload();' />";
        alert("WYGRANA");
    }
    if(ruchy >= 50){
        
        poka();
        
        document.getElementById("newgame").innerHTML="<input id='guzik' type='button' value='Nowa Gra' onClick='location.reload();' />";
        alert("Przegrana");
    }
}

function generateImgs() {
	imgs = [
	   'https://www.zooplus.pl/magazyn/CACHE_IMAGES/768/content/uploads/2018/07/szcz%C4%99%C5%9Bliwy-pies.jpg',	'https://royalcanin.pl/blog/wp-content/uploads/2016/12/231W-2-950x680.jpeg',
        'https://royalcanin.pl/blog/wp-content/uploads/2017/10/AdobeStock_124673062-950x680.jpeg',
		'https://www.psy.pl/wp-content/uploads/2017/05/szczesliwy-pies.jpg',
		'https://i.wpimg.pl/O/529x660/d.wpimg.pl/982032601-1148645422/pies.jpg',
		'https://gfx.chillizet.pl/var/chillizet/storage/images/styl-zycia/horoskop/sennik-pies-interpretacja-pies-na-smyczy-szczeniak-10244/592520-1-pol-PL/Snil-Ci-sie-pies-Koniecznie-sprawdz-co-to-oznacza_article.jpg',
		'http://iamkrewki.pl/repozytorium/700x400_dlaczego-moj-pies-mnie-nie-slucha-kirc.jpg',
		'https://www.swiatidei.pl/wp-content/uploads/2016/06/Pies.jpg'
	];
	
	imgs = shuffle(imgs);
	
	for (var i = 0; i < 8; i++){
        gameImgs.push(imgs[i]);
        gameImgs.push(imgs[i]);
	}
	
	gameImgs = shuffle(gameImgs);
}

function generateTable() {
	var table = document
	.getElementById('game_table');
	var k = 0;
	
	for (var i = 0; i < 4; i++)
	{
		var row = table.insertRow(i);
		for (var j = 0; j < 4; j++)
		{
			var cell = row.insertCell(j);
			var img = document.createElement('img');
			img.id = i.toString() + j.toString();
			img.src = gameImgs[k];
			img.className = "scored";
			img.addEventListener('click',function (obj) {selectImg(obj.currentTarget)}, false);
			cell.appendChild(img);
			k++;
		}
	}
}

function selectImg(img) {
    
	if (img.className == "hidden") 
	{
		img.className = "selected";
		selectedImgs.push(img);
        if (selectedImgs.length == 1){
            nextRound();
        }
		if (selectedImgs.length == 2){
            nextRound();
			if (areTheSame(selectedImgs[0], selectedImgs[1])){
				setScored(selectedImgs[0],selectedImgs[1]);
			}
			else {
               // setTimeout(function(){selectedImgs[0].className = "hidden"; selectedImgs[1].className = "hidden";selectedImgs = [];},2000);  
               // selectedImgs = [];
			}
            
		}
        if (selectedImgs.length > 2){
            
            HideImgsThatNotScored();
            selectedImgs = [];
            
        }
	}
}

function setScored(img1, img2) {
	img1.className = "scored";
	img2.className = "scored";
	score++;
	updateScore();
	selectedImgs = [];
}

function nextRound(){
    ruchy++;
    updateScore();
}

function areTheSame(img1, img2) {
	return img1.src == img2.src;
}

function shuffle(array) {
	return array.sort(() => Math.random() - 0.5);
}
