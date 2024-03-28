import { pitchesArray } from './data.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

const start = document.querySelector('.start-page');
const startBtn = document.querySelector('.start-btn');
const playAgnBtn = document.querySelector('.play-again');
const video = document.querySelector('.video');
const btnContainer = document.querySelector('.btns');
const answerBtns = document.querySelectorAll('.answer-btn');
const resultLabel = document.querySelector('.result');
const correctLabel = document.querySelector('.correct');
const incorrectLabel = document.querySelector('.incorrect');
const percentLabel = document.querySelector('.percent');
const progressBar = document.querySelector('.progress');
const summary = document.querySelector('.summary-page');
const summaryCircle = document.querySelector('.summary-score-circle');
const summaryScore = document.querySelector('.summary-score-percent');
const summaryFraction = document.querySelector('.summary-fraction');
const summaryComment = document.querySelector('.summary-comment');

let currentPitch; // Keep track of current pitch type
let correct = 0; // Keep track of # correct answers
let incorrect = 0; // Keep track of # incorrect answers
let percent = 0; // Keep track of % of correct answers
let progress = 0; // Keep track of progress bar length

// Start new game
const startGame = function () {
  // Set all variables to 0
  correct = 0;
  correctLabel.innerHTML = `0 ✅`;
  incorrect = 0;
  incorrectLabel.innerHTML = `0 ❌`;
  percentLabel.innerHTML = `- %`;
  progress = 0;
  progressBar.style.width = `0%`;

  // Get rid of start page / summary page
  start.classList.add('slide-up');
  showSummary(false);

  getNewPitch();
};

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
    btnContainer.style.setProperty('pointer-events', 'auto');
    answerBtns.forEach(btn => {
      btn.classList.remove('correct-btn');
      btn.classList.remove('incorrect-btn');
    });
  } else {
    btnContainer.style.setProperty('pointer-events', 'none');
  }
};

// Move progress bar
const moveProgress = function () {
  progress += 50;
  progressBar.style.width = `${progress}%`;
};

// Show / hide summary page
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
    answerBtn.classList.add('correct-btn');
    enableBtns(false);
    resultLabel.innerHTML = `✅ Correct!`;
    resultLabel.style.display = 'flex';
    increaseScore(true);
    moveProgress();
  } else {
    answerBtn.classList.add('incorrect-btn');
    enableBtns(false);
    resultLabel.innerHTML = `❌ Incorrect`;
    resultLabel.style.display = 'flex';
    answerBtns.forEach(btn => {
      if (btn.dataset.pitch == currentPitch) btn.classList.add('correct-btn');
    });
    increaseScore(false);
    moveProgress();
  }

  if (progress < 100) {
    setTimeout(getNewPitch, 2000);
  } else {
    setTimeout(showSummary, 1500);
  }
};

// Increase current scores
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

// Event listeners
startBtn.addEventListener('click', startGame);
playAgnBtn.addEventListener('click', startGame);
video.addEventListener('timeupdate', resetVideo);
btnContainer.addEventListener('click', checkAnswer);

// TO DO
// 2a. Mobile responsiveness, test how it looks if you open from messenger
// 2b. Test in different browsers
// 3. Handle load error
// 4. Test cases?
// 5. Twitter share button
// 6. Performance test with Lighthouse in Chrome dev tools
// 7. Search engine optimization (SEO)
// 8. Add analytics (google analytics, fathom, etc.)
