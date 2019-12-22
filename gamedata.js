class GameData {
	constructor() {
		this.money = 0;
		this.interval;

		//Arrays: 0 for speed, 1 for dogs, 2 for tick
		this.data = [1, 0, 1000];
		this.costs = [10, 100, 1000];
	}
}

class HTMLData {
	constructor() {
		this.increaseMoney = document.getElementById("increaseMoney");
		this.buttons = [];
		this.buttons.push(document.getElementById("buySpeed"));
		this.buttons.push(document.getElementById("buyDog"));
		this.buttons.push(document.getElementById("buyTicks"));
	}
}