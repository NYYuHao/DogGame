var GD = new GameData();
var BT = new HTMLData();

function initialize() {
	GD.interval = setInterval(gameLoop, GD.upgrades[2].data);
	load();
}

function gameLoop() {
	GD.money += GD.upgrades[0].data * GD.upgrades[1].data;
	if (GD.currentTick % 10 == 0 && GD.prestigeCount > 0) {
		increaseDogs(GD.prestigeCount * GD.upgrades[3].data);
		GD.currentTick = 0;
	}
	GD.currentTick += 1;
	updateCSS();
}

//Try to purchase an upgrade, subtract from money if possible and increase cost
//item: 0 = speed, 1 = dogs, 2 = tick
//func: Corresponding increase function
//num: Amount to buy
function tryBuy(item, func, num) {
	if (GD.money >= GD.upgrades[item].cost) {
		GD.money -= GD.upgrades[item].cost;
		GD.upgrades[item].cost = Math.floor(GD.upgrades[item].cost*GD.upgrades[item].costRate);
		BT.costs[item].innerHTML = GD.upgrades[item].cost;
		func(num);
	}
}

function increaseMoney(num) {
	GD.money += num;
	updateCSS();
}

//TODO: A lot of the math is screwed up when num > 1 for the following 3 functions
//Figure that out sometime soon

function increaseSpeed(num) {
	GD.upgrades[0].data += num;
	updateCSS();
}

function increaseDogs(num) {
	GD.upgrades[1].data += num;
	BT.yard.style.display = 'block';

	//***********************************************
	//***** This loop makes the game very slow ******
	//***********************************************
	for (var i = 0; i < num && GD.upgrades[1].data < 50; i++)
		BT.yard.innerHTML += `<img src="images/dogs/(${Math.floor(Math.random() * 35) + 1}).png">`;
	//***********************************************
	//******** We'll find something better **********
	//***********************************************
	
	updateCSS();
}

function increaseMamaRate(num) {
	GD.upgrades[3].data += num;
	updateCSS();
}

function decreaseInterval(num) {
	GD.upgrades[2].data *= Math.pow(.9, num);

	//Clear and restart interval
	clearInterval(GD.interval);
	GD.interval = setInterval(gameLoop, GD.upgrades[2].data);
	updateCSS();
}

function increasePrestige() {
	if (GD.upgrades[1].data >= GD.prestigeCost) {
		//Increase prestige
		GD.prestigeCount += 1;
		GD.prestigeCost *= 10;
		GD.upgrades[3].data += 1;

		//Reset data to starting
		GD.prestigeReset();
		BT.prestigeReset();

		//Reset yard and show mamas
		BT.yard.style.display = 'none';
		BT.yard.innerHTML = '';

		BT.mamas.style.display = 'block';
		BT.mamas.innerHTML += `<img src="images/dogs/(${Math.floor(Math.random() * 35) + 1}).png">`;
		
		//Restart interval to 1000ms
		clearInterval(GD.interval);
		GD.interval = setInterval(gameLoop, GD.upgrades[2].data);
		updateCSS();
	}
}

function updateCSS() {
	BT.moneyCount.innerHTML = GD.money;
	BT.mps.innerHTML = (((GD.upgrades[0].data * GD.upgrades[1].data) 
		/ GD.upgrades[2].data) * 1000).toFixed(2);

	for (var i = 0; i < BT.buttons.length; i++) {
		//Update data
		BT.counts[i].innerHTML = GD.upgrades[i].data.toFixed(0);

		//Update buttons
		if (GD.upgrades[i].visible(GD)) {
			BT.buttons[i].style.display = 'inline-block';
			BT.buttons[i].disabled = false;
		} else {
			BT.buttons[i].disabled = true;
		}
	}

	//Update prestige button
	if (GD.upgrades[1].data >= GD.prestigeCost) {		
		BT.prestigeBubble.style.display = 'block';
		BT.prestigeButton.disabled = false;
	} else {
		BT.prestigeButton.disabled = true;
	}
}

function save() {
	localStorage.setItem("save", JSON.stringify(GD));
	localStorage.setItem("upgrade0", JSON.stringify(GD.upgrades[0]));
	localStorage.setItem("upgrade1", JSON.stringify(GD.upgrades[1]));
	localStorage.setItem("upgrade2", JSON.stringify(GD.upgrades[2]));
	localStorage.setItem("upgrade3", JSON.stringify(GD.upgrades[3]));
}

//TODO: Load needs to properly load dog images as well

function load() {
	var temp = JSON.parse(localStorage.getItem("save"));
	GD.money = temp.money;
	GD.prestigeCost = temp.prestigeCost;
	GD.prestigeCount = temp.prestigeCount;
	for (var i = 0; i < GD.initials.length; i++) {
		GD.upgrades[i].data = temp.upgrades[i].data;
		GD.upgrades[i].cost = temp.upgrades[i].cost;
	}
	updateCSS();
}

function hardReset() {
	GD = new GameData();
	save();
	load();
}