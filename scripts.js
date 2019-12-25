var GD = new GameData();
var BT = new HTMLData();

function initialize() {
	GD.interval = setInterval(gameLoop, GD.data[2]);
	updateCSS();
}

function gameLoop() {
	GD.money += GD.data[0] * GD.data[1];
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
	if (GD.money >= GD.costs[item]) {
		GD.money -= GD.costs[item];
		GD.costs[item] = Math.floor(GD.costs[item]*GD.costRate[item]);
		BT.costs[item].innerHTML = GD.costs[item];
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
	GD.data[0] += num;
	updateCSS();
}

function increaseDogs(num) {
	GD.data[1] += num;
	BT.yard.style.display = "block";
	for (var i = 0; i < num; i++)
		BT.yard.innerHTML += '<img src="images/dogs/' + 
			Math.floor(Math.random() * Math.floor(50)) + '.png">';
	updateCSS();
}

function decreaseInterval(num) {
	GD.data[2] *= Math.pow(.9, num);

	//Clear and restart interval
	clearInterval(GD.interval);
	GD.interval = setInterval(gameLoop, GD.data[2]);
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
	document.getElementById("MPS").innerHTML = (((GD.data[0] * GD.data[1]) / GD.data[2]) * 1000).toFixed(2);

	for (var i = 0; i < BT.buttons.length; i++) {
		//Update data
		BT.counts[i].innerHTML = GD.data[i].toFixed(0);

		//Update buttons
		if (GD.money >= GD.costs[i]) {
			BT.buttons[i].style.display = 'inline-block';
			BT.buttons[i].disabled = false;
		} else {
			BT.buttons[i].disabled = true;
		}
	}

	//Update prestige button
	if (GD.data[1] >= GD.prestigeCost) {		
		BT.prestigeBubble.style.display = 'block';
		BT.prestigeButton.style.opacity = 1.0;
		BT.prestigeButton.style.cursor = 'pointer';
	} else {
		BT.prestigeButton.style.opacity = 0.6;
		BT.prestigeButton.style.cursor = 'default';
	}
}