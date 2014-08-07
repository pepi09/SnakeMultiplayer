$(function() {
        console.log("I AM READY");
        var
            socket = new io("http://localhost:3000"),
            socketId = null,
            gameId = null,
            player = null;

        window.socket = socket;

        socket.on("connect", function(data) {
            socketId = socket.io.engine.id;
            runAfterSocketHasConnected();
        });

        socket.on("start", function(data) {
            console.log("game has started");
            console.log(data);
        });

        socket.on("render", function(data) {
            console.log("Should render now");
            //console.log(data);
        });

        function runAfterSocketHasConnected() {
            $("#createGame").on("click", function() {
                $.ajax({
                    url: "http://localhost:3000/createGame",
                    type: "POST",
                    contentType: "application/json",
                    data: JSON.stringify({
                        playerName: $("#playerName").val(),
                        socketId: socketId
                    })
                }).done(function(result) {
                    gameId = result.gameId;
                    player = "host"
                    console.log("Game is created with id: ", gameId);
                });
            });

            $("#joinGame").on("click", function() {
                gameId = $("#joinGameId").val();
                $.ajax({
                    url: "http://localhost:3000/joinGame",
                    type: "POST",
                    contentType: "application/json",
                    data: JSON.stringify({
                        playerName: $("#playerName").val(),
                        socketId: socketId,
                        gameId: gameId
                    })
                }).done(function(result) {
                    player = "joined"
                    console.log(result);
                });
            });

        }
    });

function startGame(isHost, socket){
  Game.init({
    canvas : canvas,
    player: player,
    gameId : gameId,
    socket : socket
  })

  Game.start();
}
