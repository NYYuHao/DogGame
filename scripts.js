var GD = new GameData();
var BT = new Buttons();

function initialize() {
	GD.interval = setInterval(gameLoop, GD.tickPeriod);
	updateCSS();
}

function gameLoop() {
	GD.money += GD.speed * GD.dogs;
	updateCSS();
}

function increaseMoney() {
	GD.money += GD.speed;
	updateCSS();
}

function increaseSpeed() {
	if (GD.money >= GD.costs[0]) {
		GD.money -= GD.costs[0];
		GD.speed += 1;
		GD.costs[0] = Math.floor(GD.costs[0]*1.1);
		document.getElementById("buySpeed").innerHTML = `Increase money/click for ${GD.costs[0]} monies`;
		updateCSS();
	}
}

function increaseDogs() {
	if (GD.money >= GD.costs[1]) {
		GD.money -= GD.costs[1];
		GD.dogs += 1;
		GD.costs[1] = Math.floor(GD.costs[1]*1.5);
		document.getElementById("buyDog").innerHTML = `Increase dogs for ${GD.costs[1]} monies`;
		updateCSS();
	}
}

function decreaseInterval() {
	clearInterval(GD.interval);
	GD.interval = setInterval(gameLoop, 500);
}

function updateCSS() {
	document.getElementById("moneycount").innerHTML = GD.money;
	document.getElementById("speedCount").innerHTML = GD.speed;
	document.getElementById("dogCount").innerHTML = GD.dogs;
	document.getElementById("tickCount").innerHTML = GD.tickPeriod;
	if (GD.money >= GD.costs[0])
		document.getElementById("buySpeed").style = "opacity:1.0;cursor:pointer;";
	else
		document.getElementById("buySpeed").style = "opacity:0.6;cursor:default;";
	if (GD.money >= GD.costs[1])
		document.getElementById("buyDog").style = "opacity:1.0;cursor:pointer;";
	else
		document.getElementById("buyDog").style = "opacity:0.6;cursor:default;";
}