var GD = new GameData();
var BT = new HTMLData();

function initialize() {
	GD.interval = setInterval(gameLoop, GD.upgrades[2].currentInterval);
	updateCSS();
}

function gameLoop() {
	GD.money += GD.upgrades[0].amount * GD.upgrades[1].amount;
	if (GD.currentTick % 10 == 0 && GD.prestigeCount > 0) {
		increaseDogs(GD.prestigeCount);
		GD.currentTick = 0;
	}
	GD.currentTick += 1;
	updateCSS();
}

//Try to purchase an upgrade, subtract from money if possible and increase cost
//item: 0 = speed, 1 = dogs, 2 = tick
//num: Amount to buy
function tryBuy(item, num) {
	GD.money = GD.upgrades[item].buy(GD.money, num);
	updateCSS();
}

function increaseMoney(num) {
	GD.money += num;
	updateCSS();
}

function increasePrestige() {
	if (GD.data[1] >= GD.prestigeCost) {
		//Increase prestige
		GD.prestigeCount += 1;
		GD.prestigeCost *= 10;

		//Reset data to starting
		GD.money = 0;
		GD.data = [1, 0, 1000];
		GD.costs = [10, 100, 1000];
		
		//Update HTML to starting point
		document.getElementById("prestigeCount").innerHTML = GD.prestigeCount;
		document.getElementById("prestigeCost").innerHTML = GD.prestigeCost;
		BT.costs[0].innerHTML = GD.costs[0];
		BT.costs[1].innerHTML = GD.costs[1];
		BT.costs[2].innerHTML = GD.costs[2];

		BT.yard.style.display = "none";
		BT.yard.innerHTML = "";
		
		//Restart interval to 1000ms
		clearInterval(GD.interval);
		GD.interval = setInterval(gameLoop, GD.data[2]);
		updateCSS();
	}
}

function updateCSS() {
	document.getElementById("moneyCount").innerHTML = GD.money;
	document.getElementById("MPS").innerHTML = (((GD.upgrades[0].amount * GD.upgrades[1].amount) / GD.upgrades[2].currentInterval) * 1000).toFixed(2);

	for (var i = 0; i < BT.buttons.length; i++) {
		//Update data
		BT.counts[i].innerHTML = GD.upgrades[i].amount.toFixed(0);

		//Update buttons
		if (GD.money >= GD.upgrades[i].cost) {
			BT.buttons[i].style.display = 'inline-block';
			BT.buttons[i].disabled = false;
		} else {
			BT.buttons[i].disabled = true;
		}
	}

	//Update prestige button
	if (GD.upgrades[1].amount >= GD.prestigeCost) {		
		BT.prestigeBubble.style.display = 'block';
		BT.prestigeButton.style.opacity = 1.0;
		BT.prestigeButton.style.cursor = 'pointer';
	} else {
		BT.prestigeButton.style.opacity = 0.6;
		BT.prestigeButton.style.cursor = 'default';
	}
}