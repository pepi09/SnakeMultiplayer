var c = document.getElementById("canvas");
var ctx = c.getContext("2d");
var canvasWidth = $("#canvas").width();
var canvasHeight = $("#canvas").height();

function Tile(x, y, size, ctx) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.ctx = ctx;

    this.print = function() {
        ctx.fillStyle = "red";
        ctx.fillRect(this.x * this.size, this.y * this.size, this.size, this.size);
    }
}

var food = (function() {
    this.place = function() {
        var x = Math.floor(Math.random() * canvasWidth + 1);
        var y = Math.floor(Math.random() * canvasHeight + 1);
        this.point = new Tile(100, 273, 10, ctx);
    }
    this.print = function() {
        this.point.print();
    }

    return {
        place: place,
        print: print,
    }
}(ctx))

var snake = (function() {
    var tail = [],
        head = new Tile(4, 0, 10, ctx);

    [1, 2, 3].forEach(function(i) {
        tail.push(new Tile(i, 0, 10, ctx));
    })

    tail.push(head);

    this.print = function() {
        tail.forEach(function(point) {
            point.print();
        })
    }

    this.move = function(dir) {
        var newX = head.x,
            newY = head.y;
        if (dir === "right") {
            newX++;
        }
        if (dir === "left") {
            newX--;
        }
        if (dir === "up") {
            newY--;
        }
        if (dir === "down") {
            newY++;
        }

        // this allows the snake to appear on the other side of the cavnas
        // when it hits border
        newX = (newX + canvasWidth) % (canvasWidth / 10);
        newY = (newY + canvasHeight) % (canvasHeight / 10);

        var new_head = new Tile(newX, newY, 10, ctx);
        tail.push(new_head);
        tail.shift();
        head = new_head;
    }

    return {
        print: print,
        move: move,
    }
}(ctx))

food.place();
food.print();

var direction = "right";
setInterval(function() {

    $(document).keydown(function(event) {
        if (event.keyCode === 39 && direction != "left") {
            direction = "right";
            food.place();
            food.print();
        }

        if (event.keyCode === 37 && direction != "right") {
            direction = "left";
        }

        if (event.keyCode === 38 && direction != "down") {
            direction = "up";
        }

        if (event.keyCode === 40 && direction != "up") {
            direction = "down";
        }
    })

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    snake.move(direction);
    snake.print();
    food.print();



}, 100);
