function GameView(model, eltParent) {
  this.game = model;
  EventEmitter.call(this);

  this.createHtml(eltParent);
  // init the game componenent
  this.init();
}

GameView.prototype = Object.create(EventEmitter.prototype);
GameView.prototype.constructor = GameView;

GameView.prototype.createHtml = function(eltParent) {
  this.htmlEltHeaderGameBlock = this.createHtmlHeader();

  this.htmlEltGameBlock = $('<div class="game-block">');

  // add the entire game bock to eltParent
  eltParent.append(this.htmlEltHeaderGameBlock, this.htmlEltGameBlock);
};

GameView.prototype.createHtmlHeader = function() {
  var eltCashBlock = $('<div class="game-cash-block">');
  var eltLabelCash = $('<span class="game-cash-label">Argent :</span>');
  this.htmlEltCash = $('<span class="game-cash-value">' + this.game.getCash() + '</span>');
  var eltLabelDevice = $('<span class="game-cash-device">€</span>');

  var eltSupplyBlock = $('<div class="game-supply-block">');
  var eltLabelSupply = $('<span class="game-supply-label">Reserve d\'eau :</span>');
  this.htmlEltWater = $('<span class="game-supply-value">' + this.game.getSupplyWater() + '</span>');
  var eltLabelUnity = $('<span class="game-supply-unity">L</span>');

  // add elt to parent
  eltCashBlock.append(eltLabelCash, this.htmlEltCash, eltLabelDevice);
  eltSupplyBlock.append(eltLabelSupply, this.htmlEltWater, eltLabelUnity);
  return $('<div class="game-header-block">').append(eltCashBlock, eltSupplyBlock);

};

GameView.prototype.init = function() {

  // create a fieldController
  var fieldController = new FieldsController();
  // create all fields
  for(var ii=0; ii<conf.game.initial.nbFields; ii++) {
    var field = new Field();
    var viewField = new FieldView(field, this.htmlEltGameBlock);
    fieldController.addField({field: field, view: viewField});
  }

};



