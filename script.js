import { pitchesArray } from './data.js';

const video = document.querySelector('.video');
const btnContainer = document.querySelector('.btn-container');
const answerBtns = document.querySelectorAll('.answer-btn');
const resultLabel = document.querySelector('.result');
const correctLabel = document.querySelector('.correct');
const incorrectLabel = document.querySelector('.incorrect');
const percentLabel = document.querySelector('.percent');
// const highScoreLabel = document.querySelector('.high-score');

let currentPitch; // Keep track of current pitch type
let correct = 0; // Keep track of current score
let incorrect = 0;
// let highScore = localStorage.getItem('highScore') || 0; // Keep track of high score
// highScoreLabel.innerHTML = `HI SCORE: ${highScore}`;

// Get new pitch video
const getNewPitch = function () {
  const index = Math.floor(Math.random() * 9992);

  video.src = `https://sporty-clips.mlb.com/${pitchesArray[index].url}#t=2.5`;

  currentPitch = pitchesArray[index].pitch;
  console.log(currentPitch);

  resultLabel.style.display = 'none';
  enableBtns();
};

// Reset video so it plays the segment between 2.5s and 5s on a loop
const resetVideo = function () {
  if (this.currentTime >= 5) {
    this.currentTime = 2.5;
  }
};

// Enable or disable answer buttons
const enableBtns = function (enable = true) {
  if (enable) {
    answerBtns.forEach(btn => {
      btn.disabled = false;
      btn.classList.remove('answer-correct');
      btn.classList.remove('answer-incorrect');
    });
  } else {
    answerBtns.forEach(btn => (btn.disabled = true));
  }
};

// Check if user's answer is correct then update score and get new pitch
const checkAnswer = function (e) {
  const answerBtn = e.target.closest('.answer-btn');
  if (!answerBtn) return;

  const answer = answerBtn.dataset.pitch;
  if (answer == currentPitch) {
    answerBtn.classList.add('answer-correct');
    enableBtns(false);
    resultLabel.innerHTML = `✅ Correct!`;
    resultLabel.style.display = 'flex';
    increaseScore(true);
  } else {
    answerBtn.classList.add('answer-incorrect');
    enableBtns(false);
    resultLabel.innerHTML = `❌ Incorrect`;
    resultLabel.style.display = 'flex';
    answerBtns.forEach(btn => {
      if (btn.dataset.pitch == currentPitch)
        btn.classList.add('answer-correct');
    });
    increaseScore(false);
  }

  setTimeout(getNewPitch, 2000);
};

// Increase current score and update high score as needed
const increaseScore = function (isCorrect) {
  if (isCorrect) {
    correct += 1;
    correctLabel.innerHTML = `${correct} ✅`;
  } else {
    incorrect += 1;
    incorrectLabel.innerHTML = `${incorrect} ❌`;
  }

  const percent = Math.floor((100 * correct) / (correct + incorrect));
  percentLabel.innerHTML = `${percent}%`;

  // if (score > highScore) {
  //   highScore = score;
  //   highScoreLabel.innerHTML = `HI SCORE: ${highScore}`;
  //   localStorage.setItem('highScore', highScore);
  // }
};

// Reset score
const resetScore = function () {
  correct = 0;
  correctLabel.innerHTML = `0 ✅`;
  incorrect = 0;
  incorrectLabel.innerHTML = `0 ❌`;
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
