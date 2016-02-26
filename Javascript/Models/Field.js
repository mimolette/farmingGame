function Field() {
  EventEmitter.call(this);

  // attribut of a field
  this.level = 0;
  this.nbwaterLeft = conf.water.init;
  this.idInterval = null;
  this.start();
}

// make inheritance of EventEmitter
Field.prototype = Object.create(EventEmitter.prototype);
Field.prototype.constructor = Field;

Field.prototype.setLevel = function(lvl) {
  this.level = +lvl;
  return this;
};

Field.prototype.setNbWaterLeft = function(water) {
  if(+water < 0) {
    this.stop();
  } else {
    this.nbwaterLeft = +water;
    this.emit('water_use');
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