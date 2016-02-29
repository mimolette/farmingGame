function BuyWaterController(game, waterBankView) {
  this.game = game;
  this.view = waterBankView;
  this.listen();
}

BuyWaterController.prototype.listen =function() {
  this.view.on('game_buy_water', this.buyWaterAction.bind(this));
  this.view.on('game_cancel_buy_water', this.cancelBuyWaterAction.bind(this));
  this.view.on('get_more_water', this.getMoreWaterAction.bind(this));
};

BuyWaterController.prototype.buyWaterAction = function() {
  this.game.pauseAction();
};

BuyWaterController.prototype.cancelBuyWaterAction = function() {
  this.game.startAction();
};

BuyWaterController.prototype.getMoreWaterAction = function() {
  var nbWater = this.view.getNbWaterBuyValue();
  this.game.boughtWater(nbWater);
};

