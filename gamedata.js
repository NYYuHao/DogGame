function UpgradeData(data, cost, costRate, prestigeMin=0) {
	this.data = data;
	this.cost = cost;
	this.costRate = costRate;
	this.prestigeMin = prestigeMin;

	this.copy = function() {
		return new UpgradeData(this.data, this.cost, this.costRate, this.prestigeMin);
	}

	this.visible = function(GameData) {
		return (GameData.money >= this.cost && GameData.prestigeCount >= this.prestigeMin);
	}
}

function GameData() {
	this.money = 0;
	this.prestigeCount = 0;
	this.prestigeCost = 10;
	this.interval;
	this.currentTick = 0;

	//Arrays
	//0 = Speed; 1 = Dogs; 2 = Ticks; 3 = Mama rate
	this.initials = [];
	this.initials.push(new UpgradeData(1, 10, 1.1));
	this.initials.push(new UpgradeData(0, 100, 1.5));
	this.initials.push(new UpgradeData(1000, 1000, 1.5));
	this.initials.push(new UpgradeData(1, 10000, 2, 2));

	this.upgrades = [];
	for (var i = 0; i < this.initials.length; i++) {
		this.upgrades.push(this.initials[i].copy());
	}

	this.prestigeReset = function() {
		this.money = 0;
		for (var i = 0; i < this.initials.length; i++) {
			this.upgrades[i] = this.initials[i].copy();
		}
	}
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
	this.counts.push(document.getElementById("mamaRateCount"));

	this.buttons = [];
	this.buttons.push(document.getElementById("buySpeed"));
	this.buttons.push(document.getElementById("buyDog"));
	this.buttons.push(document.getElementById("buyTicks"));
	this.buttons.push(document.getElementById("buyMamaRate"));

	this.costs = [];
	this.costs.push(document.getElementById("speedCost"));
	this.costs.push(document.getElementById("dogCost"));
	this.costs.push(document.getElementById("tickCost"));
	this.costs.push(document.getElementById("mamaRateCost"));
}