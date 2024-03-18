import { pitchesArray } from './data.js';

const video = document.querySelector('.video');
const btnContainer = document.querySelector('.ui-container');
const resultLabel = document.querySelector('.result');
const scoreLabel = document.querySelector('.score');
const highScoreLabel = document.querySelector('.high-score');

let currentPitch; // Keep track of current pitch type
let score = 0; // Keep track of current score
let highScore = localStorage.getItem('highScore') || 0; // Keep track of high score
highScoreLabel.innerHTML = `HI SCORE: ${highScore}`;

// Get new pitch video
const getNewPitch = function () {
  const index = Math.floor(Math.random() * 9992);

  video.src = `https://sporty-clips.mlb.com/${pitchesArray[index].url}#t=2.5`;

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
  scoreLabel.innerHTML = `STREAK: ${score}`;
  if (score > highScore) {
    highScore = score;
    highScoreLabel.innerHTML = `HI SCORE: ${highScore}`;
    localStorage.setItem('highScore', highScore);
  }
};

// Reset score
const resetScore = function () {
  score = 0;
  scoreLabel.innerHTML = `STREAK: 0`;
};

getNewPitch();

video.addEventListener('timeupdate', resetVideo);
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
