function FieldsController(game) {

  // array of field and views
  this.views = [];
  this.allowFillWater = true;
  this.game = game;

  this.listen();
}

/**
 * take on object of field and associate view
 * @param fieldObj
 */
FieldsController.prototype.addView = function(view) {
  this.views.push(view);
  this.listenView(view);
};

FieldsController.prototype.listen = function() {
  this.game.on('game_no_more_water', this.supplyWaterAction.bind(this, false));
  this.game.on('game_supply_water', this.supplyWaterAction.bind(this, true));
};

FieldsController.prototype.supplyWaterAction = function(bool) {
  this.setAllowFillWater(bool);
};

FieldsController.prototype.listenView = function(view) {
  // listen the fill_water event
  view.on('fill_water', this.fillWaterAction.bind(this, view.getField()));
  // listen the harvest of the field
  view.on('harvest_field', this.harvestAction.bind(this, view.getField()));
};

// function to fill the water of the field
FieldsController.prototype.fillWaterAction = function(field) {
  if (this.allowFillWater) {
    this.game.fillWater(field);
    this.game.setSupplyWater(this.game.getSupplyWater() - 1);
  }
};

// function to harvest a field
FieldsController.prototype.harvestAction = function(field) {
  this.game.harvestField(field);
};

FieldsController.prototype.getViews = function() {
  return this.views;
};

FieldsController.prototype.getAllowFillWater = function() {
  return this.allowFillWater;
};

FieldsController.prototype.setAllowFillWater = function(bool) {
  if(bool !== this.allowFillWater) this.allowFillWater = bool;
  return this;
};
