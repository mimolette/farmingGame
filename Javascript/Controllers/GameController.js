function GameController(game, gameView) {
  this.game = game;
  this.view = gameView;
  this.fieldsController = new FieldsController();

  this.listen();
  this.init();
  this.listenFieldViewEvent();
}

GameController.prototype.listen = function() {
  // listen on view envents
  this.view.on('game_start', this.gameStartAction.bind(this));
  this.view.on('game_pause', this.gamePauseAction.bind(this));
  this.view.on('game_no_more_water', this.supplyWaterAction.bind(this, false));
  this.view.on('game_supply_water', this.supplyWaterAction.bind(this, true));
};

GameController.prototype.gameStartAction = function() {
  this.game.setRunning(true);
  this.fieldsController.gameStartAction();
};

GameController.prototype.gamePauseAction = function() {
  this.game.setRunning(false);
  this.fieldsController.gamePauseAction();
};

GameController.prototype.init = function() {

  // create all fields
  for(var ii=0; ii<conf.game.initial.nbFields; ii++) {
    var field = new Field();
    var viewField = new FieldView(field, this.view.htmlEltGameBlock);
    this.fieldsController.addField({field: field, view: viewField});
  }

};

GameController.prototype.listenFieldViewEvent = function() {
  this.fieldsController.getFields().forEach(function(field) {
    field.view.on('fill_water', this.fillWaterAction.bind(this));
  }, this);
};

GameController.prototype.fillWaterAction = function() {
  this.game.setSupplyWater(this.game.getSupplyWater() - 1);
};

GameController.prototype.supplyWaterAction = function(bool) {
  this.fieldsController.setAllowFillWater(bool);
};