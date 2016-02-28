function Game() {
  EventEmitter.call(this);
  this.cash = conf.game.initial.cash;
  this.supplyWater = conf.game.initial.supplyWater;
  this.running = false;
  this.gameLoose = false;
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
  if (this.running) {
    // check if always water supply
    if(+water <= 0) {
      this.supplyWater = 0;
      this.emit('game_no_more_water');
    } else {
      this.supplyWater = +water;
      this.emit('game_supply_water');
    }
    this.emit('supply_water_change');
  }
  return this;
};

Game.prototype.getSupplyWater = function() {
  return this.supplyWater;
};

Game.prototype.setRunning = function(bool) {
  if(bool !== this.running) {
    this.running = bool;
    this.emit('game_status_change');
  }
  return this;
};

Game.prototype.getRunning = function() {
  return this.running;
};