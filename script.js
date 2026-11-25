
// ==========================================
// VIDEO FILES
// ==========================================

const VIDEO_FILES = {
    jazeiProblem: "assets/JazeiProblem.mp4",
    tiffyHelps: "assets/TiffyHelps.mp4",
    jazeiGiveUp: "assets/JazeiGiveUp.mp4",
    tiffyCheap: "assets/TiffyCheap.mp4",
    tiffyExpensive: "assets/TiffyExpensive.mp4",
    dinaCard: "assets/DinaCard.mp4",
    dinaJazei: "assets/DinaJazei.mp4"
};


// ==========================================
// GET HTML ELEMENTS
// ==========================================
const expensiveButton = document.getElementById("expensive-button");
const startButton = document.getElementById("start-button");
const introVideo = document.querySelector(".video-section video");

const jazeiScene = document.getElementById("jazei-scene");
const jazeiVideo = document.getElementById("jazei-video");
const jazeiChoices = document.getElementById("jazei-choices");

const tiffyScene = document.getElementById("tiffy-scene");
const tiffyVideo = document.getElementById("tiffy-video");
const tiffyMessage = document.getElementById("tiffy-message");

const dinaScene = document.getElementById("dina-scene");
const dinaVideo = document.getElementById("dina-video");
const dinaChoices = document.getElementById("dina-choices");


// ==========================================
// REMEMBER THE AUDIENCE'S DECISIONS
// ==========================================

let jazeiChoice = "";
let tiffyChoice = "";
let dinaChoice = "";

let currentVideo = null;


// ==========================================
// PLAY A VIDEO
// ==========================================

function playClip(videoElement, filename, onFinished) {

    // Stop any previous playback
    videoElement.pause();

    // Remove the previous video
    videoElement.removeAttribute("src");
    videoElement.load();

    // Assign the new video
    videoElement.src = filename;

    // Wait until the entire clip finishes
    videoElement.onended = function() {

        if (onFinished) {
            onFinished();
        }

    };

    // Report missing files or playback errors
    videoElement.onerror = function() {
        console.error("Could not load video:", filename);
    };

    // Start playback
    videoElement.load();

    videoElement.play().catch(function(error) {
        console.error("Video playback failed:", error);
    });

    currentVideo = videoElement;
}


// ==========================================
// RESET THE FILM
// ==========================================

function resetStory() {

    jazeiChoice = "";
    tiffyChoice = "";
    dinaChoice = "";

    [jazeiVideo, tiffyVideo, dinaVideo].forEach(function(video) {
        video.pause();
        video.onended = null;
    });

    jazeiChoices.style.display = "none";
    tiffyMessage.style.display = "none";
    dinaChoices.style.display = "none";

    jazeiScene.style.display = "none";
    tiffyScene.style.display = "none";
    dinaScene.style.display = "none";
}


// ==========================================
// START THE FILM
// ==========================================

startButton.addEventListener("click", function() {

    // Stop the introductory video
    introVideo.pause();

    // Reset previous choices and scenes
    resetStory();

    // Show Jazei's scene
    jazeiScene.style.display = "block";

    // Play clip 1
    playClip(
        jazeiVideo,
        VIDEO_FILES.jazeiProblem,
        function() {

            // Clip 1 finished: show the first decision
            jazeiChoices.style.display = "flex";

        }
    );

});


// ==========================================
// FIRST DECISION: JAZEI
// ==========================================

function chooseJazei(choice) {

    jazeiChoice = choice;

    // Hide the decision buttons
    jazeiChoices.style.display = "none";

    if (choice === "tryAgain") {

        console.log("Jazei tries again.");

        // Go to clip 2
        // Tiffy helps Jazei and observes the cookies

        playClip(
            jazeiVideo,
            VIDEO_FILES.tiffyHelps,
            function() {

                // Clip 2 finished: show Tiffy's decision
                showTiffyChoices();

            }
        );

    }

    else if (choice === "giveUp") {

        console.log("Jazei gives up and leaves.");

        // Go to clip 3
        // Jazei leaves and Tiffy approaches the machine

        playClip(
            jazeiVideo,
            VIDEO_FILES.jazeiGiveUp,
            function() {

                // Clip 3 finished: show Tiffy's decision
                showTiffyChoices();

            }
        );

    }

}


// ==========================================
// SECOND DECISION: TIFFY
// ==========================================

function showTiffyChoices() {

    // Switch to Tiffy's scene
    jazeiScene.style.display = "none";
    tiffyScene.style.display = "block";

    //check if tiffy helped jazei
    if (jazeiChoice==="tryAgain"){
        //tiffy wont be able to buy expensive cookie
        expensiveButton.style.display ="none";
    } else{
        //tiffy can see both choices
        expensiveButton.style.display ="block";
    }

    // Show the choices
    tiffyMessage.style.display = "flex";

}


function chooseTiffy(choice) {

    tiffyChoice = choice;

    // Hide the decision buttons
    tiffyMessage.style.display = "none";

    if (choice === "expensive") {

        console.log("Tiffy buys the expensive cookie.");

        // Go to clip 5
        // Tiffy buys the expensive cookie.
        // Dina arrives and her 50 AED bill fails.

        playClip(
            tiffyVideo,
            VIDEO_FILES.tiffyExpensive,
            function() {

                // Clip 5 finished: show Dina's decision
                showDinaChoices();

            }
        );

    }

    else if (choice === "cheap") {

        console.log("Tiffy buys the cheap cookie.");

        // Go to clip 4
        // Tiffy buys the cheap cookie.
        // Dina arrives and her 50 AED bill fails.

        playClip(
            tiffyVideo,
            VIDEO_FILES.tiffyCheap,
            function() {

                // Clip 4 finished: show Dina's decision
                showDinaChoices();

            }
        );

    }

}


// ==========================================
// THIRD DECISION: DINA
// ==========================================

function showDinaChoices() {

    // Switch to Dina's scene
    tiffyScene.style.display = "none";
    dinaScene.style.display = "block";

    // Show the choices
    dinaChoices.style.display = "flex";

}


function chooseDina(choice) {

    dinaChoice = choice;

    // Hide the decision buttons
    dinaChoices.style.display = "none";

    if (choice === "card") {

        console.log("Dina uses her card.");

        // Go to clip 6
        // Dina buys chocolate milk using her card.

        playClip(
            dinaVideo,
            VIDEO_FILES.dinaCard,
            function() {

                finishFilm();

            }
        );

    }

    else if (choice === "tryAgain") {

        console.log("Dina tries the bill again. Jazei helps her.");

        // Go to clip 7
        // Jazei helps Dina and buys herself chips.

        playClip(
            dinaVideo,
            VIDEO_FILES.dinaJazei,
            function() {

                finishFilm();

            }
        );

    }

}


// ==========================================
// END OF THE FILM
// ==========================================

function finishFilm() {

    console.log("The film has finished.");

    // Keep the final frame visible
    if (currentVideo) {
        currentVideo.pause();
    }

}
