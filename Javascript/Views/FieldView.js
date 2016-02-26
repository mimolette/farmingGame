function FieldView(field, eltParent) {
  EventEmitter.call(this);

  this.field = field;

  this.createHTML(eltParent);
  this.listen();
}

// make inheritance of EventEmitter
FieldView.prototype = Object.create(EventEmitter.prototype);
FieldView.prototype.constructor = FieldView;

FieldView.prototype.createHTML = function(eltParent) {
  this.htmlEltFieldBlock = $('<div class="field-container">');

  // the top block contain water and button
  var eltBlockTop = $('<div class="field-top-block">');
  eltBlockTop.append(this.createHtmlWaterBlock());
  eltBlockTop.append(this.createHtmlBtnBlock());

  // the bottom block contain the progress bar
  var eltBlockBot = $('<div class="field-bot-block">');
  eltBlockBot.append(this.createHtmlProgressBlock());

  this.htmlEltFieldBlock.append(eltBlockTop, eltBlockBot);

  // add the entire field block to the eltParent
  eltParent.append(this.htmlEltFieldBlock);
};

FieldView.prototype.createHtmlBtnBlock = function() {
  var htmlEltBtnBlock = $('<div class="field-btn-container">');
  this.htmlEltBtnAddWater = $('<button class="field-btn-water-add">Irriguer</button>');
  this.htmlEltBtnHarvest = $('<button class="field-btn-harvest">Récolter</button>');

  htmlEltBtnBlock.append(this.htmlEltBtnAddWater, this.htmlEltBtnHarvest);
  return htmlEltBtnBlock;
};

FieldView.prototype.createHtmlWaterBlock = function() {
  var htmlEltWaterBlock = $('<div class="field-water-container">');
  var htmlEltIcone = $('<i class="fa fa-tint"></i>');
  this.htmlEltWaterNb = $('<span class="field-water-nb">' + this.field.getNbWaterLeft() + '</span>');
  var hmtlEltUnit = $('<span class="field-water-unit">');

  htmlEltWaterBlock.append(htmlEltIcone, this.htmlEltWaterNb, hmtlEltUnit);
  return htmlEltWaterBlock;
};

FieldView.prototype.createHtmlProgressBlock = function() {
  var htmlEltProgressBlock = $('<div class="field-progress-container">');
  this.htmlEltLevel = $('<progress value="0" max="100"></progress>');
  this.hmtlEltTextValue = $('<span class="field-progress-value">');

  htmlEltProgressBlock.append(this.htmlEltLevel, this.hmtlEltTextValue);
  return htmlEltProgressBlock;
};

FieldView.prototype.listen = function() {
  // water using by field
  this.field.on('water_use', this.waterValueAction.bind(this));
};

FieldView.prototype.waterValueAction = function() {
  this.htmlEltWaterNb.html(this.field.getNbWaterLeft());
};