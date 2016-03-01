function ScoreBoard(score) {
  EventEmitter.call(this);
  this.playerName = null;
  this.playerScore = score;
  this.playersScores = [];
}

ScoreBoard.prototype = Object.create(EventEmitter.prototype);
ScoreBoard.prototype.constructor = ScoreBoard;

ScoreBoard.prototype.getPlayerName = function() {
  return this.playerName;
};

ScoreBoard.prototype.setPlayerName = function(name) {
  // TODO check name regex
  this.playerName = name;
  this.emit('score_player_name_valid');
  this.findPlayersScores();
  this.sendPlayerScore();
  return this;
};

ScoreBoard.prototype.getPlayerScore = function() {
  return this.playerScore;
};

ScoreBoard.prototype.setPlayerScore = function(score) {
  this.playerScore = score;
  return this;
};

ScoreBoard.prototype.addPlayersScores = function(score) {
  this.playersScores.push(score);
  this.emit('players_scores_changes', score);
};

ScoreBoard.prototype.findPlayersScores = function() {
  $.ajax({
    url: "http://127.0.0.1:3000/scores/",
    method: "GET",
    dataType: "json"
  }).done(function(data) {
    data.list.forEach(function(score) {
      this.addPlayersScores(score);
    }, this);
  }.bind(this)).fail(function() {
    console.log('Error lors de la requête');
  });
};

ScoreBoard.prototype.sendPlayerScore = function() {
  $.ajax({
    url: "http://127.0.0.1:3000/scores/",
    method: "POST",
    dataType: "json",
    data: { name : this.playerName, score: this.playerScore }
  });
};