var money = 0;
var speed = 1;
var speedcost = 100;

function increaseMoney() {
	money += speed;
	document.getElementById("moneycount").innerHTML = money;
}

function increaseSpeed() {
	if (money >= speedcost) {
		money -= speedcost;
		speed += 1;
		speedcost = Math.floor(speedcost*1.1);
		document.getElementById("moneycount").innerHTML = money;
		document.getElementById("speedCount").innerHTML = speed;
		document.getElementById("buySpeed").innerHTML = `Increase money/click for ${speedcost} moneys`;
	}
}