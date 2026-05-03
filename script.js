const draggables = document.querySelectorAll(".draggable");
let highestZ = 20;

draggables.forEach(el => {
    dragElement(el);

    el.addEventListener("mousedown", () => {
        highestZ++;
        el.style.zIndex = highestZ;
    });

    el.addEventListener("touchstart", () => {
        highestZ++;
        el.style.zIndex = highestZ;
    });
});

function dragElement(element){
    const bar = element.querySelector(".titlebar");
    let pos1=0,pos2=0,pos3=0,pos4=0;

    bar.onmousedown = dragMouseDown;
    bar.ontouchstart = dragTouchStart;

    function dragMouseDown(e){
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDrag;
        document.onmousemove = elementDrag;
    }

    function elementDrag(e){
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;

        let newTop = element.offsetTop - pos2;
        let newLeft = element.offsetLeft - pos1;

        if(newTop < 0) newTop = 0;
        if(newLeft < 0) newLeft = 0;
        if(newLeft > window.innerWidth - 150) newLeft = window.innerWidth - 150;

        element.style.top = newTop + "px";
        element.style.left = newLeft + "px";
    }

    function dragTouchStart(e){
        pos3 = e.touches[0].clientX;
        pos4 = e.touches[0].clientY;
        document.ontouchend = closeDrag;
        document.ontouchmove = touchDrag;
    }

    function touchDrag(e){
        pos1 = pos3 - e.touches[0].clientX;
        pos2 = pos4 - e.touches[0].clientY;
        pos3 = e.touches[0].clientX;
        pos4 = e.touches[0].clientY;

        let newTop = element.offsetTop - pos2;
        let newLeft = element.offsetLeft - pos1;

        if(newTop < 0) newTop = 0;
        if(newLeft < 0) newLeft = 0;
        if(newLeft > window.innerWidth - 150) newLeft = window.innerWidth - 150;

        element.style.top = newTop + "px";
        element.style.left = newLeft + "px";
    }

    function closeDrag(){
        document.onmouseup = null;
        document.onmousemove = null;
        document.ontouchend = null;
        document.ontouchmove = null;
    }
}

/* IMAGE VIEWER */
function openViewer(src){
    document.getElementById("viewerImg").src = src;

    const viewer = document.getElementById("viewerWindow");
    highestZ++;
    viewer.style.zIndex = highestZ;
}

/* MUSIC PLAYER */
const music = document.getElementById("bgMusic");
const songTitle = document.getElementById("songTitle");

const playlist = [
    {
        src:"body party.m4a",
        title:"Song 01"
    },
    {
        src:"1 of 1.m4a",
        title:"Song 02"
    },
    {
        src:"B.E.D. - Jacquees (320).mp3",
        title:"Song 03"
    }
];

let currentSong = 0;

function loadSong(index){
    music.src = playlist[index].src;
    songTitle.innerText = playlist[index].title;
}

loadSong(currentSong);

function playSong(){
    music.play();
}

function pauseSong(){
    music.pause();
}

function nextSong(){
    currentSong++;
    if(currentSong >= playlist.length){
        currentSong = 0;
    }
    loadSong(currentSong);
    music.play();
}