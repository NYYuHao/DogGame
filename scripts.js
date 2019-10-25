var money = 0;
var speed = 1;
var speedcost = 10;
var tickPeriod = 1000;
var dogs = 0;
var dogcost = 100;

setInterval(gameLoop, tickPeriod);

function increaseMoney() {
	money += speed;
	updateCSS();
}

function increaseSpeed() {
	if (money >= speedcost) {
		money -= speedcost;
		speed += 1;
		speedcost = Math.floor(speedcost*1.1);
		document.getElementById("buySpeed").innerHTML = `Increase money/click for ${speedcost} monies`;
		updateCSS();
	}
}

function increaseDogs() {
	if (money >= dogcost) {
		money -= dogcost;
		dogs += 1;
		dogcost = Math.floor(dogcost*1.5);
		document.getElementById("buyDog").innerHTML = `Increase dogs for ${dogcost} monies`;
		updateCSS();
	}
}

function updateCSS() {
	document.getElementById("moneycount").innerHTML = money;
	document.getElementById("speedCount").innerHTML = speed;
	document.getElementById("dogCount").innerHTML = dogs;
	document.getElementById("tickCount").innerHTML = tickPeriod;
	if (money >= speedcost)
		document.getElementById("buySpeed").style = "opacity:1.0";
	else
		document.getElementById("buySpeed").style = "opacity:0.6";
	if (money >= dogcost)
		document.getElementById("buyDog").style = "opacity:1.0";
	else
		document.getElementById("buyDog").style = "opacity:0.6";
}

function gameLoop() {
	money += speed * dogs;
	updateCSS();
}