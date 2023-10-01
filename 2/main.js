var executed = false;

document.onclick = function(){
    if(!executed){
        executed = true;
        var audio = new Audio('../media/GeometricalDominator.mp3');
        audio.play();
        document.getElementById('text').style.visibility = 'hidden';
        document.getElementById('bg').style.visibility = 'visible';
    }
};

