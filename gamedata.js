class GameData {
	constructor() {
		this.money = 0;
		this.speed = 1;
		this.speedcost = 10;
		this.tickPeriod = 1000;
		this.dogs = 0;
		this.dogcost = 100;
		this.interval;
		//Cost array: 0 for speed, 1 for dogs
		this.costs = [10, 100];
	}
}

class Buttons {
	constructor() {
		this.buttons = [];
		this.buttons.push(document.getElementById("increaseMoney"));
		this.buttons.push(document.getElementById("buySpeed"));
		this.buttons.push(document.getElementById("buyDog"));
	}
}