function WaterBank() {
  EventEmitter.call(this);
  this.price = conf.water.price.initial;
}

WaterBank.prototype = Object.create(EventEmitter.prototype);
WaterBank.prototype.constructor = WaterBank;

WaterBank.prototype.getPrice = function() {
  return this.price;
};

WaterBank.prototype.setPrice = function(price) {
  this.price = +price;
  return this;
};

WaterBank.prototype.transactionFinished = function() {
  this.emit('water_bank_finish');
};

WaterBank.prototype.transactionError = function() {
  this.emit('water_bank_error');
};