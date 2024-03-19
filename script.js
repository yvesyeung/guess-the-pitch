import { pitchesArray } from './data.js';

const video = document.querySelector('.video');
const btnContainer = document.querySelector('.btn-container');
const answerBtns = document.querySelectorAll('.answer-btn');
const resultLabel = document.querySelector('.result');
const correctLabel = document.querySelector('.correct');
const incorrectLabel = document.querySelector('.incorrect');
const percentLabel = document.querySelector('.percent');
const progressBar = document.querySelector('.progress');
const summary = document.querySelector('.summary');
const summaryCircle = document.querySelector('.summary-circle');
const summaryScore = document.querySelector('.summary-score');
const summaryFraction = document.querySelector('.summary-fraction');
const summaryComment = document.querySelector('.summary-comment');
const playAgnBtn = document.querySelector('.play-again-btn');

let currentPitch; // Keep track of current pitch type
let correct = 0; // Keep track of # correct answers
let incorrect = 0; // Keep track of # incorrect answers
let percent = 0; // Keep track of % of correct answers
let progress = 0; // Keep track of progress bar length

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

const moveProgress = function () {
  progress += 5;
  progressBar.style.width = `${progress}%`;
};

const showSummary = function (show = true) {
  if (show) {
    summary.classList.add('slide-up');
    summaryCircle.style.display = 'inline-block';
    summaryScore.innerHTML = `${percent}%`;
  } else {
    summary.classList.remove('slide-up');
    summaryCircle.style.display = 'none';
    return;
  }

  summaryFraction.innerHTML = `You got ${correct} out of 20 correct`;

  if (correct < 10) {
    summaryCircle.style.setProperty('--score-color', '#d21f1f');
    summaryComment.innerHTML = `You should practice more 😅`;
  } else if (correct >= 10 && correct < 14) {
    summaryCircle.style.setProperty('--score-color', '#fa9f36');
    summaryComment.innerHTML = `Not bad, but can you do better? `;
  } else if (correct >= 14 && correct < 17) {
    summaryCircle.style.setProperty('--score-color', '#eded31');
    summaryComment.innerHTML = `You're pretty good at this`;
  } else if (correct >= 17 && correct < 20) {
    summaryCircle.style.setProperty('--score-color', '#1fd246');
    summaryComment.innerHTML = `You must watch a lot of baseball!`;
  } else if (correct == 20) {
    summaryCircle.style.setProperty('--score-color', '#1fd246');
    summaryComment.innerHTML = `PERFECT GAME!`;
  }

  summaryCircle.style.setProperty(
    '--score-dashoffset',
    471 - (471 * percent) / 100
  );
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
    moveProgress();
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
    moveProgress();
  }

  if (progress < 100) {
    setTimeout(getNewPitch, 2000);
  } else {
    console.log('game over');
    setTimeout(showSummary, 1500);
  }
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

  percent = Math.floor((100 * correct) / (correct + incorrect));
  percentLabel.innerHTML = `${percent}%`;
};

// Reset game
const resetGame = function () {
  getNewPitch();

  correct = 0;
  correctLabel.innerHTML = `0 ✅`;
  incorrect = 0;
  incorrectLabel.innerHTML = `0 ❌`;
  percentLabel.innerHTML = `- %`;
  progress = 0;
  progressBar.style.width = `0%`;

  showSummary(false);
};

getNewPitch();

video.addEventListener('timeupdate', resetVideo);
btnContainer.addEventListener('click', checkAnswer);
playAgnBtn.addEventListener('click', resetGame);
