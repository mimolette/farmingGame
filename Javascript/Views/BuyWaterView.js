function BuyWaterView(model, eltParent) {
  this.waterBank = model;
  EventEmitter.call(this);

  this.createHtml(eltParent);
  this.attachEvent();
  this.listen();
}

BuyWaterView.prototype = Object.create(EventEmitter.prototype);
BuyWaterView.prototype.constructor = BuyWaterView;

BuyWaterView.prototype.createHtml = function(eltParent) {
  this.htmlEltBtnBuyWater = $('<button class="game-btn">Acheter de l\'eau</button>');
  this.htmlEltPopIn = this.createHtmlPopIn();

  eltParent.append(this.htmlEltBtnBuyWater, this.htmlEltPopIn);
};

BuyWaterView.prototype.createHtmlPopIn = function() {
  var eltBlock = $('<div class="buy-water-block">');

  var eltHeader = $('<header class="buy-water-header">');
  var eltTitle = $('<h2>Acheter de l\'eau</h2>');

  var eltMain = $('<main class="buy-water-main">');
  var eltBlockPrice = $('<div class="buy-water-main-price">');
  var eltPriceLabel = $('<span class="price-water-label">le prix de l\'eau est de </span>');
  this.htmlEltWaterCurrentPrice = $('<span class="price-water-value">' + this.waterBank.getPrice() + '</span>');
  var eltPriceDevice = $('<span class="price-water-device">€ par litre</span>');

  var eltBlockBank = $('<div class="buy-water-main-bank">');
  this.htmlEltInputWater = $('<input type="text" />');
  this.htmlEltBtnBuy = $('<button class="buy-water-btn">Acheter</button>');
  this.htmlEltBtnCancel = $('<button class="buy-water-btn">Annuler</button>');
  this.htmlEltLabelError = $('<div class="water-block-error">Vous n\'avez pas assez d\'argent !</div>');

  eltBlock.append(eltHeader, eltMain);
  eltHeader.append(eltTitle);
  eltMain.append(eltBlockPrice, eltBlockBank);
  eltBlockPrice.append(eltPriceLabel, this.htmlEltWaterCurrentPrice, eltPriceDevice);
  eltBlockBank.append(this.htmlEltInputWater, this.htmlEltBtnBuy, this.htmlEltBtnCancel, this.htmlEltLabelError);

  return eltBlock;

};

BuyWaterView.prototype.attachEvent = function() {
  this.htmlEltBtnBuyWater.click(function() {
    this.displayWaterBlock();
    this.emit('game_buy_water');
  }.bind(this));
  this.htmlEltBtnCancel.click(function() {
    this.hiddenWaterBlock();
    this.emit('game_cancel_buy_water');
  }.bind(this));
  // click on buy button
  this.htmlEltBtnBuy.click(this.emit.bind(this, 'get_more_water'));
};

BuyWaterView.prototype.displayWaterBlock = function() {
  this.htmlEltPopIn.css('display', 'block');
  this.htmlEltInputWater.val('').focus();
};

BuyWaterView.prototype.hiddenWaterBlock = function() {
  this.htmlEltPopIn.css('display', 'none');
  this.emit('game_cancel_buy_water');
};

BuyWaterView.prototype.getNbWaterBuyValue = function() {
  return (+this.htmlEltInputWater.val());
};

BuyWaterView.prototype.listen = function() {
  this.waterBank.on('water_bank_finish',this.hiddenWaterBlock.bind(this));
  this.waterBank.on('water_bank_error',this.transactionError.bind(this));
};

BuyWaterView.prototype.transactionError = function() {
  this.htmlEltLabelError.animate({ opacity: 1.0 }, 500, function() {
    setTimeout(function() {
      $(this).animate({ opacity: 0.0 }, 2000);
    }.bind(this), 2000);
  });
};