import { pitchesArray } from './data.js';

const videoPlayer = document.querySelector('.video-player');
const btnContainer = document.querySelector('.btn-container');
const resultLabel = document.querySelector('.result');
const scoreLabel = document.querySelector('.score');
const highScoreLabel = document.querySelector('.high-score');

let currentPitch; // Keep track of current pitch type
let score = 0; // Keep track of current score
let highScore = 0; // Keep track of high score

// Get new pitch video
const getNewPitch = function () {
  const index = Math.floor(Math.random() * 9996);

  videoPlayer.src = `https://sporty-clips.mlb.com/${pitchesArray[index].url}#t=2.5`;

  currentPitch = pitchesArray[index].pitch;
  console.log(currentPitch);
};

// Reset video so it plays the segment between 2.5s and 5s on a loop
const resetVideo = function () {
  if (this.currentTime >= 5) {
    this.currentTime = 2.5;
  }
};

// Check if user's answer is correct then update score and get new pitch
const checkAnswer = function (e) {
  const answerBtn = e.target.closest('.answer-btn');
  if (!answerBtn) return;

  const answer = answerBtn.dataset.pitch;
  if (answer == currentPitch) {
    resultLabel.innerHTML = `Correct! It was a ${currentPitch}`;
    increaseScore();
  } else {
    resultLabel.innerHTML = `Incorrect. It was a ${currentPitch}`;
    resetScore();
  }

  setTimeout(getNewPitch, 1500);
};

// Increase current score and update high score as needed
const increaseScore = function () {
  score += 1;
  scoreLabel.innerHTML = `Current score = ${score}`;
  if (score > highScore) {
    highScore = score;
    highScoreLabel.innerHTML = `High score = ${highScore}`;
  }
};

// Reset score
const resetScore = function () {
  score = 0;
  scoreLabel.innerHTML = `Current score = 0`;
};

getNewPitch();

videoPlayer.addEventListener('timeupdate', resetVideo);
btnContainer.addEventListener('click', checkAnswer);

// 1a. Get random pitch video url and pitch type

// 1b. Display the pitch video, show loading graphic as needed

// 2a. Display answer options

// 2b. Determine if user's answer is correct, and display message

// 3a. Update current game and overall tallies in UI
// Current Score and High Score
// Modal for % Correct For Each Pitch Type

// 3b. Update overall tallies in local storage
// High Score, % Correct For Each Pitch Type
