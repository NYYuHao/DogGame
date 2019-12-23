class GameData {
	constructor() {
		this.money = 0;
		this.prestigeCount = 0;
		this.prestigeCost = 10;
		this.interval;

		//Arrays: 0 = speed, 1 = dogs, 2 = tick
		this.data = [1, 0, 1000];
		this.costs = [10, 100, 1000];
	}
}

class HTMLData {
	constructor() {
		this.increaseMoney = document.getElementById("increaseMoney");
		this.prestigeButton = document.getElementById("increasePrestige");
		this.prestigeBubble = document.getElementById("prestige");

		this.counts = [];
		this.counts.push(document.getElementById("speedCount"));
		this.counts.push(document.getElementById("dogCount"));
		this.counts.push(document.getElementById("tickCount"));

		this.buttons = [];
		this.buttons.push(document.getElementById("buySpeed"));
		this.buttons.push(document.getElementById("buyDog"));
		this.buttons.push(document.getElementById("buyTicks"));
	}
}