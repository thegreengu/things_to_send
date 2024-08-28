var camx = 1;
var camy = 1;
var ctx;

var fuguePoint = [0,0];

//RUN_ON_LOOP
const interval = setInterval(function(){
    ctx.clearRect(0, 0, c.width, c.height);
    fuguePoint = [window.innerWidth/2, window.innerHeight / 2];

    drawCube(100, 100, 0.2, 800, 400, '#ff0000');
    drawCube(120, 90, 6, 1500, 450, 'aqua');
    drawCube(120, 90, 0.7, 2000, 550, 'green');

    camx += 0.5;
    camy -= 0.1;
}, 1);

//RUN_ON_START
document.addEventListener('DOMContentLoaded', function(){
    c = document.getElementById("screen");
    ctx = c.getContext("2d");
    c.width = window.innerWidth -5;
    c.height = window.innerHeight -5;
}, false);

function drawCube(w, h, d, posx, posy, color){
    posx = posx - camx;
    posy = posy + camy;

    var ptl = [posx, posy];
    var ptr = [w + posx, posy];
    var pbl = [posx, h + posy];
    var pbr = [w + posx, h + posy];

    ctx.beginPath();
    if(color){
        ctx.strokeStyle = color;
    }
    ctx.lineWidth = 2;

    ctx.moveTo(ptr[0], ptr[1]);
    //top
    ctx.lineTo(ptl[0], ptl[1]);
    //left
    ctx.lineTo(pbl[0], pbl[1]);
    //bottom
    ctx.lineTo(pbr[0], pbr[1]);
    //right
    ctx.lineTo(ptr[0], ptr[1]);

    //3d
    //tr
    var betweenPtrFuguePoint = vectorEquation(d*-1, ptr, fuguePoint);
    ctx.moveTo(ptr[0], ptr[1]);
    ctx.lineTo(betweenPtrFuguePoint[0], betweenPtrFuguePoint[1]);

    //tl
    var betweenPtlFuguePoint = vectorEquation(d*-1, ptl, fuguePoint);
    ctx.moveTo(ptl[0], ptl[1]);
    ctx.lineTo(betweenPtlFuguePoint[0], betweenPtlFuguePoint[1]);

    //bl
    var betweenPblFuguePoint = vectorEquation(d*-1, pbl, fuguePoint);
    ctx.moveTo(pbl[0], pbl[1]);
    ctx.lineTo(betweenPblFuguePoint[0], betweenPblFuguePoint[1]);

    //br
    var betweenPbrFuguePoint = vectorEquation(d*-1, pbr, fuguePoint);
    ctx.moveTo(pbr[0], pbr[1]);
    ctx.lineTo(betweenPbrFuguePoint[0], betweenPbrFuguePoint[1]);

    //back
    ctx.moveTo(betweenPtrFuguePoint[0], betweenPtrFuguePoint[1]);
    //top
    ctx.lineTo(betweenPtlFuguePoint[0], betweenPtlFuguePoint[1]);
    //left
    ctx.lineTo(betweenPblFuguePoint[0], betweenPblFuguePoint[1]);
    //bottom
    ctx.lineTo(betweenPbrFuguePoint[0], betweenPbrFuguePoint[1]);
    //right
    ctx.lineTo(betweenPtrFuguePoint[0], betweenPtrFuguePoint[1]);

    ctx.stroke();
}

function vectorEquation(t, rStart, rEnd){
    //r(t) = rStart + t * v
    var v = [rEnd[0] - rStart[0], rEnd[1] - rStart[1]];
    var tTimesV = [t*v[0], t*v[1]];
    var pointOut = [rStart[0] + tTimesV[0], rStart[1] + tTimesV[1]];
    return pointOut;
}
