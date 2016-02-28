function FieldsController() {

  // array of field and views
  this.fields = [];
  this.allowFillWater = true;

}

/**
 * take on object of field and associate view
 * @param fieldObj
 */
FieldsController.prototype.addField = function(fieldObj) {
  this.fields.push(fieldObj);
  this.listen(fieldObj);
};

FieldsController.prototype.listen = function(field) {
  // listen the fill_water event
  field.view.on('fill_water', this.fillWaterAction.bind(this, field));
  // listen the harvest of the field
  field.view.on('harvest_field', this.harvestAction.bind(this, field));
};

// function to fill the water of the field
FieldsController.prototype.fillWaterAction = function(field) {
  if (this.allowFillWater) {
    var index = this.fields.indexOf(field);
    if(~index) {
      this.fields[index].field.fillWater();
    }
  }
};

// function to harvest a field
FieldsController.prototype.harvestAction = function(field) {
  var index = this.fields.indexOf(field);
  if(~index) {
    this.fields[index].field.harvest();
  }
};

FieldsController.prototype.gameStartAction = function() {
  this.fields.forEach(function(field) {
    field.field.start();
  });
};

FieldsController.prototype.gamePauseAction = function() {
  this.fields.forEach(function(field) {
    field.field.pause();
  });
};

FieldsController.prototype.getFields = function() {
  return this.fields;
};

FieldsController.prototype.getAllowFillWater = function() {
  return this.allowFillWater;
};

FieldsController.prototype.setAllowFillWater = function(bool) {
  if(bool !== this.allowFillWater) this.allowFillWater = bool;
  return this;
};
