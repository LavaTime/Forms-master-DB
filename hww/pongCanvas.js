var startGame = false;
function startGameFunc(event) {
    if (event.keyCode == 32) {
        startGame = true;
        document.removeEventListener("keypress", startGameFunc, false);
        window.clearInterval(startScreenTimer);
        Round();
    }
}
document.addEventListener("keypress", startGameFunc, false);

function startScreen() {
    var canvasElem = document.getElementById('pongCanvas');
    var context = canvasElem.getContext('2d');
    context.fillStyle = "grey";
    context.fillRect(0, 0, 1280, 720);
    context.font = "30px Comic Sans MS";
    context.fillStyle = "black";
    context.textAlign = "center";
    context.fillText("Please press SPACE (' ') to start the game", canvasElem.width / 2, canvasElem.height / 2);
}

var startScreenTimer = window.setInterval(startScreen, 16);
function Round() {
    var score = [0, 0];
    class Rect {
        constructor(xPos, yPos, width, height, color) {
            this.x = xPos;
            this.y = yPos;
            this.width = width;
            this.height = height;
            this.color = color;
            spriteList.push(this);
        }
        blit() {
            context.fillStyle = this.color;
            context.fillRect(this.x, this.y, this.width, this.height);
        }
    }

    class Circle {
        constructor(xPos = 0, yPos = 0, radius = 50, color = "black", startAngle = 0, endAngle = 2 * Math.PI, antiClockWise = true) {
            this.x = xPos;
            this.y = yPos;
            this.radius = radius;
            this.startAngle = startAngle;
            this.endAngle = endAngle;
            this.antiClockWise = antiClockWise;
            spriteList.push(this);
        }
        blit() {
            context.fillStyle = this.color;
            context.beginPath();
            context.arc(this.x, this.y, this.radius, this.startAngle, this.endAngle, this.antiClockWise);
            context.fill();
        }
    }

    var canvasElem = document.getElementById('pongCanvas');
    var context = canvasElem.getContext('2d');
    var mouseX;
    var mouseY;
    var ballVectorX = -1;
    var ballVectorY = -2;
    var spriteList = [];
    var player = new Rect(15, 207, 20, 100, 'darkgreen');
    var botDirection = true;
    // true means up
    var bot = new Rect(1200, 207, 20, 100, 'darkgreen');
    //var bot = new Rect(1200, 500, 20, 100, 'darkgreen');
    var ball = new Circle(640, 360, 20);
    window.addEventListener('keydown', checkKey, false);
    window.addEventListener('keydown', checkKey2, false);

    function checkKey(key) {
        var keyCode = key.keyCode;
        //alert(keyCode);
        switch (keyCode) {
            case 38:
                // arrow up
                //alert('up arrow');
                movePlayer('up');
                break;
            case 40:
                // arrow down
                //alert("down Arrow");
                movePlayer('down');
                break;
            default:
                updateCanvas();
                break;
        }
    }

    function checkKey2(key) {
        var keyCode = key.keyCode;
        //alert(keyCode);
        switch (keyCode) {
            case 87:
                // arrow up
                //alert('up arrow');
                movePlayer2('up');
                break;
            case 83:
                // arrow down
                //alert("down Arrow");
                movePlayer2('down');
                break;
            default:
                updateCanvas();
                break;
        }
    }

    function moveBall() {
        //var ball = new Circle(640, 360, 20);
        //    var player = new Rect(15, 207, 20, 100, 'darkgreen');
        //var botDirection = true;
        // true means up
        //var bot = new Rect(1200, 207, 20, 100, 'darkgreen');
        if ((((ball.x - 5) >= player.x && (ball.x + 5) <= (player.x + player.width)) && ((ball.y - 5) >= player.y && (ball.y + 5) <= player.y + player.height)) || (((ball.x + 5) >= bot.x && (ball.x - 5) <= (bot.x + bot.width)) && ((ball.y + 5) >= bot.y && (ball.y - 5) <= bot.y + bot.height))) {
            ballVectorX *= (-1);
            var randomVector;
            do {
                randomVector = Math.random();
                if (Math.random() >= 0.5)
                    randomVector *= (-1);
            } while (randomVector <= 0.25 && randomVector >= 0.75 && !(ballVectorX + randomVector != 0));
            ballVectorX += randomVector;
        }
        ball.x += ballVectorX;
        if (ball.y == 720 || ball.y == 0) {
            ballVectorY = (-1) * (ballVectorY);
        }
        ball.y += ballVectorY;

        if (ball.x <= 0) {
            score[1]++;
            ball.x = 640;
            ball.y = 360;
            player.x = 15;
            player.y = 207;
            bot.x = 1200;
            bot.y = 207;
        }
        if (ball.x >= 1280) {
            score[0]++;
            ball.x = 640;
            ball.y = 360;
            player.x = 15;
            player.y = 207;
            bot.x = 1200;
            bot.y = 207;
        }
        if (score[0] >= 5) {
            window.alert("Player 1 won!");
            score[0] = 0;
            window.location.replace('Home.aspx');
        }
        if (score[1] >= 5) {
            window.alert("Player 2 won!");
            score[1] = 0;
            window.location.replace('Home.aspx');
        }
    }

    function movePlayer(action) {
        switch (action) {
            case 'down':
                if (player.y < (720 - player.height)) {
                    player.y += 14;
                    break;
                }
                break;
            case 'up':
                if (player.y > 0) {
                    player.y -= 14;
                    break;
                }
                break;
            default:
                //alert("default");
                break;
        }
        //context.fillStyle = 'darkgreen';
        //context.fillRect(player.x, player.y, 20, 100);
    }

    function movePlayer2(action) {
        switch (action) {
            case 'down':
                if (bot.y < (720 - bot.height)) {
                    bot.y += 14;
                    break;
                }
                break;
            case 'up':
                if (bot.y > 0) {
                    bot.y -= 14;
                    break;
                }
                break;
            default:
                //alert("default");
                break;
        }
        //context.fillStyle = 'darkgreen';
        //context.fillRect(player.x, player.y, 20, 100);
    }

    /*function moveBot() {
        if (bot.y < 85 || bot.y > 500)
        {
            botDirection = !botDirection;
        }
        if (botDirection) {
            bot.y -= 3;
        } else {
            bot.y += 3;
        }
    } */

    function updateCanvas() {
        context.fillStyle = 'darkgrey';
        context.fillRect(0, 0, canvasElem.width, canvasElem.height);
        context.font = "20px Comic Sans MS";
        context.fillStyle = "black";
        context.textAlign = "center";
        context.fillText(score[0], canvasElem.width / 2 - 20, 30);
        context.fillText(score[1], canvasElem.width / 2 + 20, 30);
        spriteList.forEach(sprite => sprite.blit());
    }

    window.setInterval(updateCanvas, 1);
    window.setInterval(moveBall, 3);
}