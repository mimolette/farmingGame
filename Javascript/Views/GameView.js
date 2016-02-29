function GameView(model, eltParent) {
  this.game = model;
  EventEmitter.call(this);

  this.createHtml(eltParent);
  this.listen();
}

GameView.prototype = Object.create(EventEmitter.prototype);
GameView.prototype.constructor = GameView;

GameView.prototype.createHtml = function(eltParent) {
  this.htmlEltHeaderGameBlock = this.createHtmlHeader();

  this.htmlEltGameBlock = $('<div class="game-block">');

  this.htmlEltMoreTools = $('<div class="game-more-tools">');

  // add the entire game bock to eltParent
  eltParent.append(this.htmlEltHeaderGameBlock, this.htmlEltGameBlock, this.htmlEltMoreTools);
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

  var eltScoreBlock = $('<div class="game-score-block">');
  var eltLabelScore = $('<span class="game-score-label">Nombre de récolte :</span>');
  this.htmlEltScore = $('<span class="game-score-value">' + this.game.getScore() + '</span>');

  var eltSpeedBlock = this.createHtmlSpeedBlock();

  var eltBtnBlock = this.createHtmlBtnMenu();

  // add elt to parent
  eltCashBlock.append(eltLabelCash, this.htmlEltCash, eltLabelDevice);
  eltSupplyBlock.append(eltLabelSupply, this.htmlEltWater, eltLabelUnity);
  eltScoreBlock.append(eltLabelScore, this.htmlEltScore);
  return $('<div class="game-header-block">')
      .append(eltCashBlock, eltSupplyBlock, eltScoreBlock, eltBtnBlock, eltSpeedBlock);

};

GameView.prototype.createHtmlSpeedBlock = function() {
  var htmlEltSpeedBlock = $('<div class="field-speed-container">');
  var htmlEltIcone = $('<i class="fa fa-line-chart"></i>');
  this.htmlEltSpeedNb = $('<span class="field-speed-nb">' + this.game.getSpeedHuman() + '</span>');
  var hmtlEltUnit = $('<span class="field-water-unit">L/s</span>');

  htmlEltSpeedBlock.append(htmlEltIcone, this.htmlEltSpeedNb, hmtlEltUnit);
  return htmlEltSpeedBlock;
};

GameView.prototype.createHtmlBtnMenu = function() {
  this.htmlEltBtnStart = $('<button class="game-btn">Start</button>');
  this.htmlEltBtnPause = $('<button class="game-btn btn-hidden">Pause</button>');

  this.attachEvent();

  return $('<div class="game-btn-block">').append(this.htmlEltBtnStart, this.htmlEltBtnPause);

};

GameView.prototype.attachEvent = function() {
  this.htmlEltBtnStart.click(this.emit.bind(this, 'game_start'));
  this.htmlEltBtnPause.click(this.emit.bind(this, 'game_pause'));
};

GameView.prototype.listen = function() {
  //listen game events
  this.game.on('game_status_change', this.toggleBtnClass.bind(this));
  this.game.on('supply_water_change', this.displayWaterSupplyAction.bind(this));
  this.game.on('game_no_more_water', this.emit.bind(this, 'game_no_more_water'));
  this.game.on('game_supply_water', this.emit.bind(this, 'game_supply_water'));
  this.game.on('game_cash_change', this.displayCashAction.bind(this));
  this.game.on('game_score_change', this.displayScoreAction.bind(this));
  this.game.on('game_speed_change', this.speedValueAction.bind(this));
};

GameView.prototype.toggleBtnClass = function() {
  this.htmlEltBtnStart.toggleClass('btn-hidden');
  this.htmlEltBtnPause.toggleClass('btn-hidden');
};

GameView.prototype.displayWaterSupplyAction = function() {
  this.htmlEltWater.html(this.game.getSupplyWater());
};

GameView.prototype.displayCashAction = function() {
  this.htmlEltCash.html(this.game.getCash());
};

GameView.prototype.displayScoreAction = function() {
  this.htmlEltScore.html(this.game.getScore());
};

GameView.prototype.speedValueAction = function() {
  this.htmlEltSpeedNb.html(this.game.getSpeedHuman());
};




