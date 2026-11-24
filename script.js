
const startButton = document.getElementById("start-button");
const jazeiScene = document.getElementById("jazei-scene");
const jazeiVideo = document.getElementById("jazei-video");
const jazeiChoices = document.getElementById("jazei-choices");
const introVideo = document.querySelector(".video-section video");

const tiffyScene = document.getElementById("tiffy-scene");
const tiffyVideo = document.getElementById("tiffy-video");
const tiffyMessage = document.getElementById("tiffy-message");
const tiffyText = document.getElementById("tiffy-text");

// Remember the story path
let jazeiChoice = "";
let tiffyHasLessMoney = false;
let jazeiStage = "intro";

// START JAZEI'S STORY
startButton.addEventListener("click", function() {

    // Pause the intro
    introVideo.pause();

    // Hide choices
    jazeiChoices.style.display = "none";

    // Reset the story
    jazeiChoice = "";
    tiffyHasLessMoney = false;
    jazeiStage = "intro";

    // Show Jazei's video
    jazeiScene.style.display = "block";

    // Play video from beginning
    jazeiVideo.currentTime = 0;
    jazeiVideo.play().catch(function(error) {
        console.error("Video playback failed:", error);
    });

});

// CHECK WHAT PART OF JAZEI'S STORY IS PLAYING
    jazeiVideo.addEventListener("timeupdate", function() {

    if (jazeiVideo.currentTime >= 5 && !jazeiVideo.paused) {
        jazeiVideo.pause();

        if (jazeiStage === "intro") {
            // Show the three choices
            jazeiChoices.style.display = "flex";
        }

        else if (jazeiStage === "outcome") {
        jazeiStage = "finished";
        startTiffy();
}
    }
});

// HANDLE JAZEI'S TWO STORY PATHS

function chooseJazei(choice) {

    jazeiChoice = choice;

    if (choice === "help") {
        console.log("PATH 1: Tiffy pays for Jazei");
        tiffyHasLessMoney = true;
    }

    else if (choice === "leave") {
        console.log("PATH 2: Jazei gives up and leaves");
        tiffyHasLessMoney = false;
    }

    console.log("Tiffy has less money:", tiffyHasLessMoney);

    // Hide the choices
    jazeiChoices.style.display = "none";

    // Play the outcome placeholder
    jazeiStage = "outcome";
    jazeiVideo.currentTime = 0;
    jazeiVideo.play();
}


// START TIFFY'S STORY
function startTiffy() {
    alert("TIFFY'S STORY IS STARTING!");
   

    // Hide Jazei
    jazeiScene.style.display = "none";

    // Show Tiffy
    tiffyScene.style.display = "block";
    tiffyScene.style.backgroundColor = "hotpink";

    // Hide previous messages
    tiffyMessage.style.display = "none";

    // Remember which path Tiffy is on
    if (tiffyHasLessMoney) {
        console.log("TIFFY PATH: Cheaper chocolate");
    } else {
        console.log("TIFFY PATH: Expensive chocolate");
    }

    // Play Tiffy's placeholder video
    tiffyVideo.currentTime = 0;
    tiffyVideo.play();
}

// SHOW TIFFY'S OUTCOME AFTER 5 SECONDS
tiffyVideo.addEventListener("timeupdate", function() {

    if (tiffyVideo.currentTime >= 5 && !tiffyVideo.paused) {

        tiffyVideo.pause();

        if (tiffyHasLessMoney) {
            tiffyText.textContent = "TIFFY HAS LESS MONEY! SHE CAN ONLY BUY CHEAPER CHOCOLATE.";
        } else {
            tiffyText.textContent = "TIFFY HAS ENOUGH MONEY TO BUY HER FAVORITE CHOCOLATE!";
        }

        tiffyMessage.style.display = "flex";
    }
});