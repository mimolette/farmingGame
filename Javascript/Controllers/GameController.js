function GameController(game, gameView) {
  this.game = game;
  this.view = gameView;

  this.listen();
  this.init();
}

GameController.prototype.listen = function() {
  // listen on view envents
  this.view.on('game_start', this.gameStartAction.bind(this));
  this.view.on('game_pause', this.gamePauseAction.bind(this));
  this.view.on('LOOSE', this.looseAction.bind(this));
};

GameController.prototype.gameStartAction = function() {
  this.game.startAction();
};

GameController.prototype.gamePauseAction = function() {
  this.game.pauseAction();
};

GameController.prototype.init = function() {

  // instance of waterBank, view and controller
  this.game.setWaterBank(new WaterBank());
  var buyWaterView = new BuyWaterView(this.game.getWaterBank(), this.view.htmlEltMoreTools);
  var buyWaterController = new BuyWaterController(this.game, buyWaterView);

  var fieldsController = new FieldsController(this.game);

  // create all fields
  for(var ii=0; ii<conf.game.initial.nbFields; ii++) {
    var field = new Field();
    var viewField = new FieldView(field, this.view.htmlEltGameBlock);
    // add view to fieldsController
    fieldsController.addView(viewField);
    // add field to gameModel
    this.game.addField(field);
  }

};

GameController.prototype.fillWaterAction = function() {
  this.game.setSupplyWater(this.game.getSupplyWater() - 1);
};

GameController.prototype.looseAction = function(score) {
  // create a scoreBoard instance
  var scoreBoard = new ScoreBoard(score);
  var scoreBoardView = new ScoreBoardView(scoreBoard, this.view.htmlEltLooseBlock);
  var scoreBoardController = new ScoreBoardController(scoreBoardView, scoreBoard);
};