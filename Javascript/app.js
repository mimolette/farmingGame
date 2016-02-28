$(function() {

  // init variables
  var mainElt = $('#main-content');

  var game = new Game();
  var gameView = new GameView(game, mainElt);

});