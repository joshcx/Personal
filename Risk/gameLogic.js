function drawContinents(canvas){
    if(canvas.getContext){
        var ctx = canvas.getContext('2d');
        drawNorthAmerica(ctx);
        drawSouthAmerica(ctx);
        drawAfrica(ctx);
        drawAsia(ctx);
        drawAustralia(ctx);
        drawEurope(ctx);
    }
}

function drawNorthAmerica(ctx){
    ctx.fillStyle="gold";
    ctx.fillRect(10, 10, 150, 100);
}

function drawSouthAmerica(ctx){
    ctx.fillStyle="goldenrod";
    ctx.fillRect(10, 150, 100, 100);
}  

function drawEurope(ctx){
    ctx.fillStyle="blue";
    ctx.fillRect(200, 10, 100, 100);
}

function drawAfrica(ctx) {
    ctx.fillStyle="brown";
    ctx.fillRect(200, 150, 100, 150);
}

function drawAsia(ctx){
    ctx.fillStyle="lightgreen";
    ctx.fillRect(300, 10, 200, 100);
}

function drawAustralia(ctx){
    ctx.fillStyle="grey";
    ctx.fillRect(400, 150, 100, 100);
}