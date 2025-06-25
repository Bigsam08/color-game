/**
 * function
 */

const menuPage = document.getElementById("menu-page");

/** ------------- MENU BUTTONS ------------------- */
const ruleBtn = document.getElementById("rules");
const soundBtn = document.getElementById("sound");
const reset = document.getElementById("reset");
const highScore = document.getElementById("high-score");
const start = document.getElementById("start");


/** FUNCTION To HANDLE RULE PAGE */
const rulePage = document.getElementById("rules-page");
const rulePageExit = document.getElementById("rule-page-exit");


ruleBtn.addEventListener("click", () => {
    rulePage.style.display = "block";
})

rulePageExit.addEventListener("click", () => {
    rulePage.style.display = "none";
});


/** -------- FUNCTIONS FOR SOUND PAGE ---------------- */
const soundPage = document.getElementById("sound-page");
const soundPageExit = document.getElementById("sound-page-exit");
const soundOn = document.getElementById("on");
const soundOff = document.getElementById("off");
const music = new Audio("/assets/music.mp3");

soundBtn.addEventListener("click", () => {
    soundPage.style.display = "block";
});

soundPageExit.addEventListener("click", () => {
    soundPage.style.display = "none";
});

soundOn.addEventListener("change", () => {
    music.play();
});

soundOff.addEventListener("change", () => {
    music.pause();
    music.currentTime = 0;
});


/** ----------------- HIGHEST SCORE ------------- */


const highScorePage = document.getElementById("high-score-page");
const scoreExit = document.getElementById("score-page-exit");
const highScoreNumber = document.getElementById("high-score-number");

// get the highscore from the local storage
const highestscore = localStorage.getItem("highestscore");
if (highestscore === null) {
    localStorage.setItem("highestscore", 0);
    highScoreNumber.textContent = 0;

} else {
    highScoreNumber.textContent = highestscore;
}

highScore.addEventListener("click", () => {
    highScorePage.style.display = "flex";
})
scoreExit.addEventListener("click", () => {
    highScorePage.style.display = "none";
})


/** RESET HIGH SCORE NUMBER -----------------------*/

reset.addEventListener("click", () => {
    localStorage.setItem("highestscore", 0);
    highScoreNumber.textContent = 0;

});

/** ---------------- START GAME -------------------------------- */

const gamePage = document.getElementById("game-page");
const time = document.getElementById("time");
const hintColorBox = document.getElementById("hint-box");
const score = document.getElementById("score-board");
const userColors = document.querySelectorAll(".box")
const timer = document.getElementById("timer");
const hintBtn = document.getElementById("hint-button");
const startGameBtn = document.getElementById("start-game-btn");
const exitGame = document.getElementById("exit-game-btn");



start.addEventListener("click", () => {
    gamePage.style.display = "block";
});

exitGame.addEventListener("click", () => {
    gamePage.style.display = "none";
});


// CLOCK

setInterval(() => {
    const currentTime = new Date();
    let hr = String(currentTime.getHours()).padStart("2", "0");
    let min = String(currentTime.getMinutes()).padStart("2", "0");
    const clock = hr + ":" + min;
    time.textContent = clock;
}, 1000); // 

// >>>>>>>>>>>>>>>>>>>>>  start the game >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
let userStartGame = false;
let showHint = false;
let countdown = 20; // 20 secs
let colorIntervalId;
let countdownId;
let currentColor;
let currentScore = 0;

score.textContent = currentScore;

const colorTypes = ["blue", "red", "orange", "yellow", "green", "black"];

// hint bbutton toggle
hintBtn.addEventListener("click", () => {
    showHint = !showHint;
})

// random color function

const startRandomColor = () => {
    colorIntervalId = setInterval(() => {
        const colorIndex = Math.floor(Math.random() * colorTypes.length);
        const randomColor = colorTypes[colorIndex];
        currentColor = randomColor;

        if (showHint) {
            hintColorBox.style.background = randomColor;
        } else {
            hintColorBox.style.background = "transparent";
        }
    }, 1500);
};



startGameBtn.addEventListener("click", () => {
    if (userStartGame) return;

    currentScore = 0;
    score.textContent = currentScore;

    userStartGame = true;
    startGameBtn.textContent = "END";
    timer.textContent = countdown;

    startRandomColor();

    countdownId = setInterval(() => {
        countdown--;
        timer.textContent = countdown;

        if (countdown <= 9) {
            timer.style.color = "red";
        }

        if (countdown < 0) {
            clearInterval(countdownId); // end timer
            clearInterval(colorIntervalId); // stop color changer

            timer.textContent = "TIME UP!!";
            hintColorBox.style.background = "transparent"; // reset color
            userStartGame = false;
            countdown = 20;
            setTimeout(() => {
                score.textContent = 0;
                timer.textContent = "";
            }, 5000) // reset after 5 seconds
            startGameBtn.textContent = "START"
            // store in the storage is there is a new high score
            if (currentScore > highestscore) {
                localStorage.setItem("highestscore", currentScore);
                highScoreNumber.textContent = currentScore;
            }
        }
    }, 1000);

})

/** NOTIFY FUNCTION  */
function showNotification(message, type) {
    const notify = document.getElementById("notify");
    notify.textContent = message;
    notify.className = `notify show ${type}`;

    setTimeout(() => {
        notify.className = "notify"; // hide 
    }, 1000);
}



/** HANDLE USER FEEDBACK */
userColors.forEach(btn => {
    btn.addEventListener("click", () => {
        const selectedColor = btn.getAttribute("data-color");
        if (!userStartGame) return;

        if (selectedColor === currentColor) {
            currentScore += 5;
            score.textContent = currentScore;
            showNotification("✅ Correct match!", "correct");
        } else {
            currentScore -= 5;
            score.textContent = currentScore;
            showNotification("❌ wrong match!", "wrong");
        }
    })
})








