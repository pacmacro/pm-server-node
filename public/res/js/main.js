const PACMAN_INFO = document.querySelector(".pacman-info p");
const GHOST_INFO = document.querySelectorAll(".ghost-info p");

let req = new XMLHttpRequest();
    req.addEventListener("load", update);
    req.open("GET", "http://localhost:3000/player/details");
    req.send();

function update() {
    if(this.readyState == 4 && this.status == 200) {
        let obj = JSON.parse(this.responseText);

        for (let i=0; i < obj.length; i++) {
            if (i == 0) {
                PACMAN_INFO.innerHTML = "Lat: " + obj[i].location.latitude + "</br> Long: " + obj[i].location.longitude;
            }else {
                GHOST_INFO[i-1].innerHTML = "Lat: " + obj[i].location.latitude + "</br> Long: " + obj[i].location.longitude;
            }
        }
    }
}

var request = setInterval(() => {
    var req = new XMLHttpRequest();
    req.addEventListener("load", update);
    req.open("GET", "http://localhost:3000/player/details");
    req.send();
}, 7000)

//Make table flexible (responsive), implement get request for score, pacdot
//Server side would probably not limit rate or something for this occasion

