window.Game = (function(Snake, undefined){
  function init(config){
    canvas = config.canvas,
    player = config.player,
    gameId = config.gameId,
    socket = config.socket

    socket.on("render", render)


  };

}(window.Snake));
