function drawRect(xPos, yPos, rectWidth, rectHeight, fillStyle, strokeStyle, ineWidth) {

    var canvas = document.getElementById("myCanvas");
    var context = canvas.getContext("2d");

    context.beginPath();
    context.rect(xPos, yPos, rectWidth, rectHeight);
    context.fillStyle = fillStyle;
    context.fill();
    context.fill();
    context.lineWidth = ineWidth;
    context.strokeStyle = strokeStyle;
    context.stroke();


}