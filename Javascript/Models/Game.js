function Game() {
  EventEmitter.call(this);
  this.cash = conf.game.initial.cash;
  this.supplyWater = conf.game.initial.supplyWater;
}

// inheritance of EventEmitter object
Game.prototype = Object.create(EventEmitter.prototype);
Game.prototype.constructor = Game;

Game.prototype.setCash = function(cash) {
  this.cash = cash;
  return this;
};

Game.prototype.getCash = function() {
  return this.cash;
};

Game.prototype.setSupplyWater = function(water) {
  this.supplyWater = water;
  return this;
};

Game.prototype.getSupplyWater = function() {
  return this.supplyWater;
};