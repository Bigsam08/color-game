const rules = document.getElementById('rules');
const sound = document.getElementById('sound');
const highScore = document.getElementById('high-score');
const reset = document.getElementById('reset');
const start = document.getElementById('start');
const displayRules = document.getElementById('display-rules');
const menu = document.getElementById('menu');
const displaySound = document.getElementById('display-sound');
const on = document.getElementById('on');
const off = document.getElementById('off');
const score = document.getElementById('score');
const randomColor = document.getElementById('box-color');
const hint = document.getElementById('hint');
const popUp = document.getElementById('pop-up');
const highestScoreSave = document.getElementById('display-highest-score');
const timerText = document.getElementById('duration');
let audio = new Audio('assets/music.mp3');
audio.loop = true;


// set timer for 2 seconds
let duration = 120;
let durationCount = null;
let colorInterval;


// random colors gloabl
const colors = ['red', 'blue', 'white', 'yellow', 'black', 'green'];
let randomPicked = '';



let maxScore = localStorage.getItem('highScore');
if (!maxScore) {
    maxScore = 0; // Set to 0 if no high score exists
}

// Rules Display

rules.onclick = () => {
	displayRules.style.visibility = 'visible';
}
menu.onclick = () => {
	displayRules.style.visibility = 'hidden';
}


// SOUND DISPLAY 

sound.onclick = () => {
	displaySound.style.visibility = 'visible';
}
document.getElementById('sound-back').onclick = () => {
	displaySound.style.visibility = 'hidden';
}

// PLAY SOUND IF AUDIO IS CHECKED
on.onclick = () => {
	if (on.checked) {
		audio.play();
	}
}
// deactivate sound
off.onclick = () => {
	if (off.checked) {
		audio.pause();
	}
}




/**  SETTING A QUICK CLOCK */
const updateTime = () => {
	let time = new Date();
	let hr = time.getHours();
	let min = time.getMinutes();
	if (min < 10) min = '0' + min;
	document.getElementById('timer').textContent = hr + ':' + min;
}
setInterval(updateTime, 1000); // update every sec



//  MAIN GAME ---------------------------------------------------------------------------------------
start.onclick = () => {
	document.getElementById('display-game').style.visibility = 'visible';
	/**
 * FUNCTION TO SET A 2 MINS TIMER FOR EACH GAME
 */
	duration = 120;
	document.getElementById('duration').textContent = "GAME STARTS"; // Immediately reset to 120 seconds


	// Setting the duration
	const durationFunction = () => {
		let minutes = Math.floor(duration / 60);
		let seconds = duration % 60;

		let formattedSeconds = seconds < 10 ? '0' + seconds : seconds;
		document.getElementById('duration').textContent = minutes + ':' + formattedSeconds;
		duration--;


		duration < 10 ? timerText.style.color = 'red' : timerText.style.color = 'black'

		if (duration < 0) {
			clearInterval(durationCount); // stop timer
			clearInterval(colorInterval); // Stop the random color change when time is up
			randomColor.style.borderColor = 'transparent';
			document.getElementById('duration').textContent = "TIME UP!!!!";
			popUp.style.backgroundColor = 'white';
			popUp.textContent = 'GAME OVER!!!';
			popUp.style.color = 'black';
			popUp.style.visibility = 'visible';


			// check highest and store it

			if (currentSCoreCount > maxScore) {
                maxScore = currentSCoreCount;
                localStorage.setItem('highScore', maxScore); // Save the new high score to localStorage
                highestScoreSave.textContent = `${maxScore}`; // Update displayed high score
            }

		}
	}

	durationCount = setInterval(durationFunction, 1000);

	/**
 * LIST OF RANDOM COLORS
 * FOR USERS TO GUESS
 */



	const getRandomCOlor = () => {
		randomPicked = colors[Math.floor(Math.random() * colors.length)];
		randomColor.style.borderColor = randomPicked;
	}
	colorInterval = setInterval(getRandomCOlor, 2000) // change random color every 2 seconds


	/**
 *  Match User choice with guessed color
 */

	let currentSCoreCount = parseInt(score.innerHTML); // convert the score to an integer


	const userOptions = document.querySelectorAll('.user-options');
	userOptions.forEach(btn => {
		btn.onclick = () => {
			const userChoice = btn.dataset.color; // get user selected color
			if (userChoice === randomPicked) {
				popUp.style.backgroundColor = 'green';
				popUp.textContent = 'Correct!!!';
				popUp.style.color = 'white';
				currentSCoreCount += 5; // increase the score by +5
				score.textContent = currentSCoreCount;
			} else {
				popUp.style.backgroundColor = 'red';
				popUp.textContent = 'Wrong!!!';
				popUp.style.color = 'white';
				currentSCoreCount -= 5; // increase the score by +5
				score.textContent = currentSCoreCount;
			}

			popUp.style.visibility = 'visible';
			setTimeout(() => {
				popUp.style.visibility = 'hidden';
			}, 1000);  /// display correct or wrong pop up within 1 secs
		}
	})

	/**
 * HINT BUTTON
 * toggle visibility
 */
	hint.onclick = () => {
		randomColor.style.visibility === 'visible' ? randomColor.style.visibility = 'hidden' : randomColor.style.visibility = 'visible';

	}

}




document.getElementById('quit-game').onclick = () => {
	document.getElementById('display-game').style.visibility = 'hidden';
	randomColor.style.visibility = 'hidden';
	popUp.style.visibility = 'hidden';
	if (durationCount !== null) {
		clearInterval(durationCount); // Stop any previous countdown
	}

}


// VIEW HIGH SCORE ____________________________
document.getElementById('check-high-score').onclick = () => {
	document.getElementById('display-score').style.visibility = "visible";
}
document.getElementById('score-back').onclick = () => {
	document.getElementById('display-score').style.visibility = "hidden";
}
