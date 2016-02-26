function Field() {
  EventEmitter.call(this);

  // attribut of a field
  this.level = 0;
  this.nbwaterLeft = conf.water.init;
  this.idInterval = null;
  this.start();
  this.maturity = false;
}

// make inheritance of EventEmitter
Field.prototype = Object.create(EventEmitter.prototype);
Field.prototype.constructor = Field;

Field.prototype.setLevel = function(lvl) {
  this.level = +lvl;
  this.emit('level_change');
  if(this.level >= 100) {
    this.maturity = true;
    this.level = 100;
  }
  return this;
};

Field.prototype.setNbWaterLeft = function(water) {
  if(+water < 0) {
    this.stop();
    this.destroyHarvest();
  } else {
    this.nbwaterLeft = +water;
    this.grow();
    this.emit('water_change');
  }
  return this;
};

Field.prototype.getLevel = function() {
  return this.level;
};

Field.prototype.getNbWaterLeft = function() {
  return this.nbwaterLeft;
};

Field.prototype.start = function() {
  if(!this.idInterval) {
    this.idInterval = setInterval(this.irrigate.bind(this),conf.water.speed);
  }
};

Field.prototype.stop = function() {
  clearInterval(this.idInterval);
  this.idInterval = null;
};

Field.prototype.irrigate = function() {
  this.setNbWaterLeft(this.nbwaterLeft - conf.water.drink);
};

Field.prototype.fillWater = function() {
  if(!this.maturity) this.setNbWaterLeft(this.nbwaterLeft + 1);
};

Field.prototype.grow = function() {
  this.setLevel(this.level + conf.field.growSpeed);
};

Field.prototype.destroyHarvest = function() {
  this.setLevel(0);
  this.maturity = false;
};