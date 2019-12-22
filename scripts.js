var GD = new GameData();
var BT = new HTMLData();

function initialize() {
	GD.interval = setInterval(gameLoop, GD.data[2]);
	updateCSS();
}

function gameLoop() {
	GD.money += GD.data[0] * GD.data[1];
	updateCSS();
}

function increaseMoney() {
	GD.money += GD.data[0];
	updateCSS();
}

function increaseSpeed() {
	if (GD.money >= GD.costs[0]) {
		GD.money -= GD.costs[0];
		GD.data[0] += 1;
		GD.costs[0] = Math.floor(GD.costs[0]*1.1);
		BT.buttons[0].innerHTML = `Increase money/click for ${GD.costs[0]} monies`;
		updateCSS();
	}
}

function increaseDogs() {
	if (GD.money >= GD.costs[1]) {
		GD.money -= GD.costs[1];
		GD.data[1] += 1;
		GD.costs[1] = Math.floor(GD.costs[1]*1.5);
		BT.buttons[1].innerHTML = `Increase dogs for ${GD.costs[1]} monies`;
		updateCSS();
	}
}

function decreaseInterval() {
	if (GD.money >= GD.costs[2]) {
		GD.money -= GD.costs[2];
		GD.data[2] *= .9;
		GD.costs[2] = Math.floor(GD.costs[2]*1.5);
		BT.buttons[2].innerHTML = `Decrease interval by 10% for ${GD.costs[2]} monies`;

		//Clear and restart interval
		clearInterval(GD.interval);
		GD.interval = setInterval(gameLoop, GD.data[2]);
		updateCSS();
	}
}

function updateCSS() {
	document.getElementById("moneyCount").innerHTML = GD.money;
	document.getElementById("speedCount").innerHTML = GD.data[0];
	document.getElementById("dogCount").innerHTML = GD.data[1];
	document.getElementById("tickCount").innerHTML = GD.data[2].toFixed(0);
	for (var i = 0; i < BT.buttons.length; i++) {
		if (GD.money >= GD.costs[i]) {
			BT.buttons[i].style.opacity = 1.0;
			BT.buttons[i].style.cursor = 'pointer';
			BT.buttons[i].style.display = 'inline-block';
		} else {
			BT.buttons[i].style.opacity = 0.6;
			BT.buttons[i].style.cursor = 'default';
		}
	}
}