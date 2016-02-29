function Field() {
  EventEmitter.call(this);

  // attribut of a field
  this.level = 0;
  this.nbwaterLeft = conf.game.initial.nbLiterWater;
  this.idInterval = null;
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
    this.stop();
    this.emit('harvestable');
  }
  return this;
};

Field.prototype.setNbWaterLeft = function(water) {
  if(+water < 0) {
    this.stop();
    this.destroyHarvest();
  } else {
    //if(!this.idInterval && !this.maturity) this.start(time);
    this.nbwaterLeft = +water;
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

Field.prototype.start = function(time) {
  if(!this.idInterval && !this.maturity) {
    this.idInterval = setInterval(this.irrigate.bind(this),time);
  }
};

Field.prototype.pause = function() {
  clearInterval(this.idInterval);
  this.idInterval = null;
};

Field.prototype.stop = function() {
  clearInterval(this.idInterval);
  this.idInterval = null;
};

Field.prototype.irrigate = function() {
  this.setNbWaterLeft(this.nbwaterLeft - conf.water.drink);
  // don't grow field if the irrigate stop because of no more water left
  if(this.idInterval && !this.maturity) {
    this.grow();
  }

};

Field.prototype.fillWater = function() {
  this.setNbWaterLeft(this.nbwaterLeft + 1);
};

Field.prototype.harvest = function() {
  // allow only if the field is already mature
  if (this.maturity) {
    this.setLevel(0);
    this.maturity = false;
    this.emit('harvest_field');
    this.emit('not_harvestable');
  }
};

Field.prototype.grow = function() {
  this.setLevel(this.level + conf.field.growSpeed);
};

Field.prototype.destroyHarvest = function() {
  this.setLevel(0);
  this.maturity = false;
  if(this.getNbWaterLeft() === 0) {
    this.emit('field_loose');
  }
};