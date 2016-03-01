function ScoreBoardController(view, model) {
  this.scoreBoard = model;
  this.view = view;

  this.listen();
}

ScoreBoardController.prototype.listen = function() {
  this.view.on('score_player_submit', this.submitAction.bind(this));
};

ScoreBoardController.prototype.submitAction = function(name) {
  this.scoreBoard.setPlayerName(name);
};