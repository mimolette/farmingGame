function Game() {
  EventEmitter.call(this);
  this.cash = conf.game.initial.cash;
  this.supplyWater = conf.game.initial.supplyWater;
  this.running = false;
  this.score = 0;
  this.fields = [];
  this.waterBank = null;
  this.timeRewrite = conf.game.time.max / (conf.water.speed.initial - conf.water.speed.max);
  this.fieldsDrinkingTime = conf.water.speed.initial;
  this.setSpeedHuman(this.fieldsDrinkingTime);
  this.idInterval = null;
  this.fieldsLost = [];
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
    } else {
      this.supplyWater = +water;
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
  return this.fields;
};

Game.prototype.startAction = function() {
  if (!this.running) {
    this.running = true;
    this.startDrinkCalculAction();
    this.emit('game_status_change');
    this.fields.forEach(function(field) {
      field.start(this.fieldsDrinkingTime);
    }, this);
  }
};

Game.prototype.pauseAction = function() {
  if (this.running) {
    this.running = false;
    this.pauseDrinkCalculAction();
    this.emit('game_status_change');
    this.fields.forEach(function(field) {
      field.pause();
    });
  }
};

Game.prototype.fillWater = function(field) {
  if(this.getSupplyWater()) {
    if(this.running) {
      this.removeFieldLost(field);
      field.fillWater();
      field.start(this.fieldsDrinkingTime);
      this.setSupplyWater(this.supplyWater - 1);
    }
  }
};

Game.prototype.harvestField = function(field) {
  if(this.running) {
    field.harvest();
    field.start(this.fieldsDrinkingTime);
    this.setCash(this.cash + conf.field.harvestPrice);
    this.setScore(this.score + conf.field.harvestScore);
  }
};

Game.prototype.setWaterBank = function(waterBank) {
  this.waterBank = waterBank;
  return this;
};

Game.prototype.getWaterBank = function() {
  return this.waterBank;
};

Game.prototype.boughtWater = function(nbWater) {
  var totalPrice = +nbWater * this.waterBank.getPrice();
  if (this.cash >= totalPrice) {
    // enough money to pay the water
    // increase the number of water in tank
    this.addSupplyWater(+nbWater);
    this.setCash(this.cash - totalPrice);
    this.waterBank.transactionFinished();
  } else {
    // not enough money
    this.waterBank.transactionError();
  }
};

Game.prototype.addSupplyWater = function(nbWater) {
  this.supplyWater += +nbWater;
  this.emit('supply_water_change');
  this.emit('game_supply_water');
};

Game.prototype.setFieldsDrinkingTime = function(time) {
  if (time <= conf.water.speed.max) {
    this.pauseDrinkCalculAction();
  }
  this.fieldsDrinkingTime = time;
  this.setSpeedHuman(time);
  return this;
};

Game.prototype.getFieldsDrinkingTime = function() {
  return this.fieldsDrinkingTime;
};

Game.prototype.startDrinkCalculAction = function() {
  if (!this.idInterval && this.fieldsDrinkingTime > conf.water.speed.max) {
    // define the rule to calculate the new field'speed of drinking water over the time
    this.idInterval = setInterval(function() {
      this.setFieldsDrinkingTime(this.fieldsDrinkingTime - 1);
    }.bind(this), this.timeRewrite);
  }
};

Game.prototype.pauseDrinkCalculAction = function() {
  clearInterval(this.idInterval);
  this.idInterval = null;
};

Game.prototype.getSpeedHuman = function() {
  return this.speedHuman;
};

Game.prototype.setSpeedHuman = function(time) {
  this.speedHuman =  Math.round((1000 / +time)*100) / 100;
  this.emit('game_speed_change');
};

Game.prototype.checkDefeat = function(field) {
  this.addFieldLost(field);
  if(this.getFieldsLost().length >= conf.game.defeat.nbField) {
    this.emit('LOOSE', this.getScore());
    this.gameLooseAction();
  }
};

Game.prototype.addFieldLost = function(field) {
  var index = this.fieldsLost.indexOf(field);
  if (!~index) {
    this.fieldsLost.push(field);
  }
};

Game.prototype.removeFieldLost = function(field) {
  var index = this.fieldsLost.indexOf(field);
  if (~index) {
    this.fieldsLost.splice(index, 1);
  }
};

Game.prototype.getFieldsLost = function() {
  return this.fieldsLost;
};

Game.prototype.gameLooseAction = function() {
  this.pauseDrinkCalculAction();
};