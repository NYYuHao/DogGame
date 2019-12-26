function UpgradeData(data, cost, costRate) {
	this.data = data;
	this.cost = cost;
	this.costRate = costRate;

	this.copy = function() {
		return new UpgradeData(this.data, this.cost, this.costRate);
	}
}

function GameData() {
	this.money = 0;
	this.prestigeCount = 0;
	this.prestigeCost = 10;
	this.interval;
	this.currentTick = 0;

	this.speedInitial = new UpgradeData(1, 10, 1.1);
	this.dogInitial = new UpgradeData(0, 100, 1.5);
	this.tickInitial = new UpgradeData(1000, 1000, 1.5);

	//Arrays: 0 = speed, 1 = dogs, 2 = tick
	this.upgrades = [];
	this.upgrades.push(this.speedInitial.copy());
	this.upgrades.push(this.dogInitial.copy());
	this.upgrades.push(this.tickInitial.copy());
}

function HTMLData() {
	this.moneyCount = document.getElementById("moneyCount");
	this.mps = document.getElementById("mps");
	this.increaseMoney = document.getElementById("increaseMoney");

	this.prestigeButton = document.getElementById("increasePrestige");
	this.prestigeBubble = document.getElementById("prestige");
	this.prestigeCount = document.getElementById("prestigeCount");
	this.prestigeCost = document.getElementById("prestigeCost");

	this.yard = document.getElementById("yard");
	this.mamas = document.getElementById("mamas");

	this.counts = [];
	this.counts.push(document.getElementById("speedCount"));
	this.counts.push(document.getElementById("dogCount"));
	this.counts.push(document.getElementById("tickCount"));

	this.buttons = [];
	this.buttons.push(document.getElementById("buySpeed"));
	this.buttons.push(document.getElementById("buyDog"));
	this.buttons.push(document.getElementById("buyTicks"));

	this.costs = [];
	this.costs.push(document.getElementById("speedCost"));
	this.costs.push(document.getElementById("dogCost"));
	this.costs.push(document.getElementById("tickCost"));
}