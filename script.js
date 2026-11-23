const jazeiVideo = document.getElementById("jazei-video");
const jazeiChoices = document.getElementById("jazei-choices");

function startFilm() {
    document.getElementById("jazei-scene").style.display = "block";

    jazeiVideo.currentTime = 0;
    jazeiVideo.play();
}

jazeiVideo.addEventListener("ended", function() {
    jazeiChoices.style.display = "flex";
});

function chooseJazei(choice) {
    console.log("Jazei chose:", choice);
    jazeiChoices.style.display = "none";
}