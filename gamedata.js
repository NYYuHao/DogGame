class GameData {
	constructor() {
		this.money = 0;
		this.prestigeCount = 0;
		this.prestigeCost = 10;
		this.interval;
		this.currentTick = 0;

		//Arrays: 0 = speed, 1 = dogs, 2 = tick
		this.data = [1, 0, 1000];
		this.costs = [10, 100, 1000];
		this.costRate = [1.1, 1.5, 1.5];
	}
}

class HTMLData {
	constructor() {
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
}