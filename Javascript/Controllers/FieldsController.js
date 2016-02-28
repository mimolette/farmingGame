function FieldsController() {

  // array of field and views
  this.fields = [];

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
  var index = this.fields.indexOf(field);
  if(~index) {
    this.fields[index].field.fillWater();
  }
};

// function to harvest a field
FieldsController.prototype.harvestAction = function(field) {
  var index = this.fields.indexOf(field);
  if(~index) {
    this.fields[index].field.harvest();
  }
};