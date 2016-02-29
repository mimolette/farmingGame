function Game() {
  EventEmitter.call(this);
  this.cash = conf.game.initial.cash;
  this.supplyWater = conf.game.initial.supplyWater;
  this.running = false;
  this.gameLoose = false;
  this.score = 0;
  this.fields = [];
}

// inheritance of EventEmitter object
Game.prototype = Object.create(EventEmitter.prototype);
Game.prototype.constructor = Game;

Game.prototype.setCash = function(cash) {
  this.cash = cash;
  this.emit('game_cash_change');
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

Game.prototype.getScore = function() {
  return this.score;
};

Game.prototype.setScore = function(score) {
  this.score = score;
  this.emit('game_score_change');
  return this;
};

Game.prototype.addField = function(field) {
  this.fields.push(field);
  return this;
};

Game.prototype.getFields = function() {
  return this.fields();
};

Game.prototype.startAction = function() {
  if (!this.running) {
    this.running = true;
    this.emit('game_status_change');
    this.fields.forEach(function(field) {
      field.start();
    });
  }
};

Game.prototype.pauseAction = function() {
  if (this.running) {
    this.running = false;
    this.emit('game_status_change');
    this.fields.forEach(function(field) {
      field.pause();
    });
  }
};

Game.prototype.fillWater = function(field) {
  var index = this.fields.indexOf(field);
  if(~index && this.running) this.fields[index].fillWater();
};

Game.prototype.harvestField = function(field) {
  var index = this.fields.indexOf(field);
  if(~index && this.running) {
    this.fields[index].harvest();
    this.setCash(this.cash + conf.field.harvestPrice);
    this.setScore(this.score + conf.field.harvestScore);
  }
};