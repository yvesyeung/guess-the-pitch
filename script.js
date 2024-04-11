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

// Manage game state
export const state = {
  currentPitch: null,
  correct: null,
  incorrect: 0,
  percent: 0,
  progress: 0,
};

// Start new game
export const startGame = function () {
  // Set state variables to 0
  state.correct = 0;
  state.incorrect = 0;
  state.percent = 0;
  state.progress = 0;

  // Set HTML labels to 0
  correctLabel.innerHTML = `0 ✅`;
  incorrectLabel.innerHTML = `0 ❌`;
  percentLabel.innerHTML = `- %`;
  progressBar.style.width = `0%`;

  // Get rid of start page / summary page
  start.classList.add('slide-up');
  showSummary(false);

  getNewPitch();
};

// Get new pitch video
export const getNewPitch = function () {
  const index = Math.floor(Math.random() * 9010);
  video.src = `https://sporty-clips.mlb.com/${pitchesArray[index].url}#t=2.5`;
  state.currentPitch = pitchesArray[index].pitch;

  resultLabel.style.display = 'none';
  enableBtns();
};

// Reset video so it plays the segment between 2.5s and 5s on a loop
export const resetVideo = function () {
  if (this.currentTime >= 5) {
    this.currentTime = 2.5;
  }
};

// Enable or disable answer buttons
export const enableBtns = function (enable = true) {
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
export const moveProgress = function () {
  state.progress += 5;
  progressBar.style.width = `${state.progress}%`;
};

// Show / hide summary page
export const showSummary = function (show = true) {
  if (show) {
    summary.classList.add('slide-up');
    summaryCircle.style.display = 'inline-block';
    summaryScore.innerHTML = `${state.percent}%`;
  } else {
    summary.classList.remove('slide-up');
    summaryCircle.style.display = 'none';
    return;
  }

  summaryFraction.innerHTML = `You got ${state.correct} out of 20 correct`;

  if (state.correct < 10) {
    summaryCircle.style.setProperty('--score-color', '#d21f1f');
    summaryComment.innerHTML = `Is that all you got?`;
  } else if (state.correct >= 10 && state.correct < 14) {
    summaryCircle.style.setProperty('--score-color', '#fa9f36');
    summaryComment.innerHTML = `Not bad, but can you do better? `;
  } else if (state.correct >= 14 && state.correct < 17) {
    summaryCircle.style.setProperty('--score-color', '#eded31');
    summaryComment.innerHTML = `You're pretty good at this!`;
  } else if (state.correct >= 17 && state.correct < 20) {
    summaryCircle.style.setProperty('--score-color', '#1fd246');
    summaryComment.innerHTML = `You must watch a lot of baseball!`;
  } else if (state.correct === 20) {
    summaryCircle.style.setProperty('--score-color', '#1fd246');
    summaryComment.innerHTML = `PERFECT GAME!`;
  }

  summaryCircle.style.setProperty(
    '--score-dashoffset',
    471 - (471 * state.percent) / 100
  );
};

// Check if user's answer is correct then update score and get new pitch
export const checkAnswer = function (e) {
  const answerBtn = e.target.closest('.answer-btn');
  if (!answerBtn) return;

  const answer = answerBtn.dataset.pitch;
  if (answer === state.currentPitch) {
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
      if (btn.dataset.pitch === state.currentPitch)
        btn.classList.add('correct-btn');
    });
    increaseScore(false);
    moveProgress();
  }

  if (state.progress < 100) {
    setTimeout(getNewPitch, 2000);
  } else {
    setTimeout(showSummary, 1500);
  }
};

// Increase current scores
export const increaseScore = function (isCorrect) {
  if (isCorrect) {
    state.correct += 1;
    correctLabel.innerHTML = `${state.correct} ✅`;
  } else {
    state.incorrect += 1;
    incorrectLabel.innerHTML = `${state.incorrect} ❌`;
  }

  state.percent = Math.floor(
    (100 * state.correct) / (state.correct + state.incorrect)
  );
  percentLabel.innerHTML = `${state.percent}%`;
};

// Event listeners added to a DOMContentLoaded listener to avoid this Jest error:
// TypeError: Cannot read properties of null (reading 'addEventListener')
document.addEventListener('DOMContentLoaded', function () {
  startBtn.addEventListener('click', startGame);
  playAgnBtn.addEventListener('click', startGame);
  video.addEventListener('timeupdate', resetVideo);
  btnContainer.addEventListener('click', checkAnswer);
});

// TO DO
// 3. Handle rare network error on video load
// 4. Test cases?
// 6. Performance test with Lighthouse in Chrome dev tools
// 7. Search engine optimization (SEO)
// 8. Add analytics (google analytics, fathom, etc.)
