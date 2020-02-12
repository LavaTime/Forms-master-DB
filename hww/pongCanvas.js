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
    constructor(xPos = 0, yPos = 0, radius = 50, color = "black", startAngle = 0, endAngle = 2*Math.PI, antiClockWise = true) {
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
var spriteList = [];
var player = new Rect(15, 207, 20, 100, 'darkgreen');
var botDirection = true;
// true means up
var bot = new Rect(1200, 207, 20, 100, 'darkgreen');
//var bot = new Rect(1200, 500, 20, 100, 'darkgreen');
var ball = new Circle(640, 360, 20);
window.addEventListener('keydown', this.checkKey, false);
window.addEventListener('mouseenter', this.moveBall, false);
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

function moveBall() {
    bot.y = mouse.
    }

function movePlayer(action) {
    switch (action) {
        case 'down':
            if (player.y < 500) {
                player.y += 7;
                break;
            }
            break;
        case 'up':
            if (player.y > 85) {
                player.y -= 7;
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

function moveBot() {
    if (bot.y < 85 || bot.y > 500)
    {
        botDirection = !botDirection;
    }
    if (botDirection) {
        bot.y -= 3;
    } else {
        bot.y += 3;
    }
}

function updateCanvas() {
    context.fillStyle = 'darkgrey';
    context.fillRect(0, 0, canvasElem.width, canvasElem.height);
    spriteList.forEach(sprite => sprite.blit());
}

window.setInterval(updateCanvas, 16);
window.setInterval(moveBot, 35);
