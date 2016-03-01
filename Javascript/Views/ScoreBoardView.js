function ScoreBoardView(model, eltParent) {
  EventEmitter.call(this);
  this.scoreBoard = model;
  this.createHtml(eltParent);
  this.attachEvent();

  this.listen();
}

ScoreBoardView.prototype = Object.create(EventEmitter.prototype);
ScoreBoardView.prototype.constructor = ScoreBoardView;

ScoreBoardView.prototype.createHtml = function(eltParent) {
  var eltBlockName = $('<div class="score-board-block">');

  eltBlockName.append(this.createHtmlInputPlayerName());
  eltBlockName.append(this.createHtmlScoreBoard());

  eltParent.append(eltBlockName);
};

ScoreBoardView.prototype.createHtmlInputPlayerName = function() {
  this.htmlEltBlockPlayerName = $('<div class="score-board-input-block">');

  this.htmlEltInput = $('<input type="text" placeholder="Entrez un nom"/>');
  this.htmlEltBtn = $('<button>Valider</button>');

  this.htmlEltBlockPlayerName.append(this.htmlEltInput, this.htmlEltBtn);

  return this.htmlEltBlockPlayerName;
};

ScoreBoardView.prototype.createHtmlScoreBoard = function() {
  this.htmlEltScoreBoardBlock = $('<table class="score-board-table">');
  var eltLineTop = $('<tr><th>Player</th><th>Nombre de récoltes</th></tr>');
  var eltLinePlayer = $('<tr>');
  this.htmlEltPlayerName = $('<td>');
  var eltScoreName = $('<td>' + this.scoreBoard.getPlayerScore() + '</td>');
  eltLinePlayer.append(this.htmlEltPlayerName, eltScoreName);

  this.htmlEltScoreBoardBlock.append(eltLineTop, eltLinePlayer);

  return this.htmlEltScoreBoardBlock;
};

ScoreBoardView.prototype.attachEvent = function() {
  this.htmlEltBtn.click(function() {
    this.emit('score_player_submit', this.htmlEltInput.val());
  }.bind(this));
};

ScoreBoardView.prototype.listen = function() {
  this.scoreBoard.on('score_player_name_valid', this.submitAction.bind(this));
  this.scoreBoard.on('players_scores_changes', this.scoreAction.bind(this));
};

ScoreBoardView.prototype.submitAction = function() {
  this.htmlEltPlayerName.html(this.scoreBoard.getPlayerName());
  this.htmlEltBlockPlayerName.css('display', 'none');
  this.htmlEltScoreBoardBlock.css('display', 'block');
};

ScoreBoardView.prototype.scoreAction = function(score) {
  var eltLine = ('<tr><td>' + score.name + '</td><td>' + score.score + '</td></tr>');
  this.htmlEltScoreBoardBlock.append(eltLine);
};