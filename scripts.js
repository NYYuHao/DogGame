var GD = new GameData();
var BT = new HTMLData();

function initialize() {
	GD.interval = setInterval(gameLoop, GD.upgrades[2].data);
	updateCSS();
}

function gameLoop() {
	GD.money += GD.upgrades[0].data * GD.upgrades[1].data;
	if (GD.currentTick % 10 == 0 && GD.prestigeCount > 0) {
		increaseDogs(GD.prestigeCount);
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
	for (var i = 0; i < num; i++)
		BT.yard.innerHTML += `<img src="images/dogs/${Math.floor(Math.random() * Math.floor(50))}.png">`;
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

		//Reset data to starting
		GD.money = 0;
		GD.upgrades[0] = GD.speedInitial.copy();
		GD.upgrades[1] = GD.dogInitial.copy();
		GD.upgrades[2] = GD.tickInitial.copy();
		
		
		//Update HTML to starting point
		document.getElementById("prestigeCount").innerHTML = GD.prestigeCount;
		document.getElementById("prestigeCost").innerHTML = GD.prestigeCost;
		BT.costs[0].innerHTML = GD.upgrades[0].cost;
		BT.costs[1].innerHTML = GD.upgrades[1].cost;
		BT.costs[2].innerHTML = GD.upgrades[2].cost;

		BT.yard.style.display = 'none';
		BT.yard.innerHTML = '';

		BT.mamas.style.display = 'block';
		BT.mamas.innerHTML += `<img src="images/dogs/${Math.floor(Math.random() * Math.floor(50))}.png">`;
		
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
		if (GD.money >= GD.upgrades[i].cost) {
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