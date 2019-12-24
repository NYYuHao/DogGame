//Object for general upgrades
function Upgrade(name, cost, costRate, button, costDisplay, dataDisplay) {
	this.name = name;
	this.amount = 1;
	this.cost = cost;
	this.baseCost = cost;
	this.costRate = costRate;
	this.button = document.getElementById(button);
	this.costDisplay = document.getElementById(costDisplay);
	this.dataDisplay = document.getElementById(dataDisplay);

	//Tries to buy num items, returns remaining money
	this.buy = function(money, num) {
		if (money >= this.cost) {
			money -= this.cost;
			this.increase(num);
			this.cost = Math.floor(this.baseCost * Math.pow(costRate, this.amount));
			costDisplay.innerHTML = this.cost;
			return money;
		}
		return money;
	}

	//Increase amount of upgrade by num
	this.increase = function(num) {
		this.amount += num;
		dataDisplay.innerHTML = this.amount;
	}
}

//Object for DogUpgrade, inherited from Upgrade
function DogUpgrade(name, cost, costRate, button, costDisplay, dataDisplay) {
	Upgrade.call(this, name, cost, costRate, button, costDisplay, dataDisplay);
	this.amount = 0;

	//For dogs, must add to yard
	this.increase = function(num) {
		this.amount += num;
		BT.yard.style.display = "block";
		for (var i = 0; i < num; i++) {
			BT.yard.innerHTML += '<img src="images/dogs/' + 
				Math.floor(Math.random() * Math.floor(50)) + '.png">';
		}
		dataDisplay.innerHTML = this.amount;
	}
}

//Object for TickUpgrade, inherited from Upgrade
function TickUpgrade(name, cost, costRate, button, costDisplay, dataDisplay) {
	Upgrade.call(this, name, cost, costRate, button, costDisplay, dataDisplay);
	this.amount = 0;

	this.baseInterval = 1000;
	this.currentInterval = 1000;

	this.increase = function(num) {
		amount += num;
		this.currentInterval = this.baseInterval * Math.pow(0.9, amount);
		clearInterval(GD.interval);
		GD.interval = setInterval(gameLoop, this.currentInterval);

		dataDisplay.innerHTML = this.currentInterval;
	}
}

function GameData() {
	this.money = 0;
	this.prestigeCount = 0;
	this.prestigeCost = 10;
	this.interval;
	this.currentTick = 0;

	this.upgrades = []
	this.upgrades.push(new Upgrade("speed", 10, 1.1, "buySpeed", "speedCost", "speedCount"));
	this.upgrades.push(new DogUpgrade("dogs", 100, 1.5, "buyDogs", "dogCost", "dogCount"));
	this.upgrades.push(new TickUpgrade("ticks", 1000, 1.5, "buyTicks", "tickCost", "tickCount"));
}

function HTMLData() {
	this.increaseMoney = document.getElementById("increaseMoney");
	this.prestigeButton = document.getElementById("increasePrestige");
	this.prestigeBubble = document.getElementById("prestige");
	this.yard = document.getElementById("yard");

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