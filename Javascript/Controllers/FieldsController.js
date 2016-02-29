function FieldsController(game) {

  // array of field and views
  this.views = [];
  this.game = game;

}

/**
 * take on object of field and associate view
 * @param fieldObj
 */
FieldsController.prototype.addView = function(view) {
  this.views.push(view);
  this.listenView(view);
};

FieldsController.prototype.listenView = function(view) {
  // listen the fill_water event
  view.on('fill_water', this.fillWaterAction.bind(this, view.getField()));
  // listen the harvest of the field
  view.on('harvest_field', this.harvestAction.bind(this, view.getField()));
};

// function to fill the water of the field
FieldsController.prototype.fillWaterAction = function(field) {
  this.game.fillWater(field);
};

// function to harvest a field
FieldsController.prototype.harvestAction = function(field) {
  this.game.harvestField(field);
};

FieldsController.prototype.getViews = function() {
  return this.views;
};
