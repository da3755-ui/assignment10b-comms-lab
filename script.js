
const startButton = document.getElementById("start-button");
const jazeiScene = document.getElementById("jazei-scene");
const jazeiVideo = document.getElementById("jazei-video");
const jazeiChoices = document.getElementById("jazei-choices");
const introVideo = document.querySelector(".video-section video");

// START JAZEI'S STORY
startButton.addEventListener("click", function() {

    // Pause the intro
    introVideo.pause();

    // Hide choices
    jazeiChoices.style.display = "none";

    // Show Jazei's video
    jazeiScene.style.display = "block";

    // Play video from beginning
    jazeiVideo.currentTime = 0;
    jazeiVideo.play().catch(function(error) {
        console.error("Video playback failed:", error);
    });

});

// SHOW CHOICES AFTER 5 SECONDS
jazeiVideo.addEventListener("timeupdate", function() {
    if (jazeiVideo.currentTime >= 5 && jazeiChoices.style.display !== "flex") {
        jazeiVideo.pause();
        jazeiChoices.style.display = "flex";
    }
});

// HANDLE THE CHOICES
function chooseJazei(choice) {
    console.log("Jazei chose:", choice);
    jazeiChoices.style.display = "none";
}
