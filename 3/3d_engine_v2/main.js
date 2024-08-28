var camx = 1;
var camy = 1;

var fps = 150;
var ctx;

var fuguePoint = [0,0];

var slidingValueX = 0;
var slidingValueY = 0;

var keyInputX = 0;
var keyInputY = 0;

var debugView;
var widths = [];
var heights = [];
var depths = [];
var posXs = [];
var posYs = [];
var colors = [];
var listSize = 0;

var initCubePos = [];

//RUN_ON_START
document.addEventListener('DOMContentLoaded', function(){
    c = document.getElementById("screen");
    debugView = document.getElementById("debugCB");
    ctx = c.getContext("2d");
    c.width = window.innerWidth -5;
    c.height = window.innerHeight -5;
    
    initCubePos = [window.innerWidth/2, window.innerHeight / 2];
}, false);

//RUN_ON_LOOP
const interval = setInterval(function(){
    ctx.clearRect(0, 0, c.width, c.height);
    fuguePoint = [window.innerWidth/2, window.innerHeight / 2];

    drawCube(200, 200, 0.5, initCubePos[0]-100, initCubePos[1]-100, '#ff0000');
    
    for(var i = 0; i < listSize; i++){
        drawCube(Number(widths[i]), Number(heights[i]), Number(depths[i]), Number(posXs[i]), Number(posYs[i]), colors[i]);
    }

    if(debugView.checked){
        ctx.fillRect(fuguePoint[0],fuguePoint[1],5,5);
    }

    slidingValueX = slidingValueX + keyInputX;
    slidingValueY = slidingValueY + keyInputY;

    camx = slidingValueX + 1;
    camy = slidingValueY + 1;
}, 1000/fps);

function drawCube(w, h, d, posx, posy, color){
    posx = posx - camx;
    posy = posy + camy;

    var ptl = [posx, posy];
    var ptr = [w + posx, posy];
    var pbl = [posx, h + posy];
    var pbr = [w + posx, h + posy];

    //debug
    if(debugView.checked){
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.strokeStyle = "rgba(150, 150, 150, 0.37)";

        ctx.moveTo(ptl[0], ptl[1]);
        ctx.lineTo(fuguePoint[0], fuguePoint[1]);

        ctx.moveTo(ptr[0], ptr[1]);
        ctx.lineTo(fuguePoint[0], fuguePoint[1]);
        
        ctx.moveTo(pbl[0], pbl[1]);
        ctx.lineTo(fuguePoint[0], fuguePoint[1]);

        ctx.moveTo(pbr[0], pbr[1]);
        ctx.lineTo(fuguePoint[0], fuguePoint[1]);

        ctx.stroke();
    }

    ctx.beginPath();
    ctx.lineWidth = 2;
    if(color){
        ctx.strokeStyle = color;
    }

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

document.addEventListener('keydown', function(event){
    //x
    if(event.keyCode == 37){
        keyInputX = -2;
    }
    if(event.keyCode == 39){
        keyInputX = 2;
    }
    //y
    if(event.keyCode == 40){
        keyInputY = -2;
    }
    if(event.keyCode == 38){
        keyInputY = 2;
    }
});

document.addEventListener('keyup', function(event){
    //x
    if(event.keyCode == 37 || event.keyCode == 39){
        keyInputX = 0;
    }

    //y
    if(event.keyCode == 40 || event.keyCode == 38){
        keyInputY = 0;
    }
});

function addCubesTolist(){
    var widthInput = document.getElementById("width");
    var heightInput = document.getElementById("height");
    var depthInput = document.getElementById("depth");
    var posxInput = document.getElementById("posx");
    var posyInput = document.getElementById("posy");
    var colorInput = document.getElementById("color");

    widths[listSize] = widthInput.value;
    heights[listSize] = heightInput.value;
    depths[listSize] = depthInput.value;
    posXs[listSize] = posxInput.value;
    posYs[listSize] = posyInput.value*-1;
    colors[listSize] = colorInput.value;
    listSize++;

    widthInput.value = null;
    heightInput.value = null;
    depthInput.value = null;
    posxInput.value = null;
    posyInput.value = null;
    colorInput.value = null;
}
