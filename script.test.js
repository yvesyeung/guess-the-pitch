// const { startGame } = require('./script.js');

import {
  state,
  startGame,
  getNewPitch,
  resetVideo,
  enableBtns,
  moveProgress,
  showSummary,
  checkAnswer,
  increaseScore,
} from './script.js';

test('startGame function exists', () => {
  expect(startGame).toBeDefined();
});

// test('startGame modifies variables correctly', () => {
//   startGame();
//   expect(state.correct).toBe(0);
//   expect(state.incorrect).toBe(0);
//   expect(state.percent).toBe(0);
//   expect(state.progress).toBe(0);
// });

test('getNewPitch function exists', () => {
  expect(getNewPitch).toBeDefined();
});

test('resetVideo function exists', () => {
  expect(resetVideo).toBeDefined();
});

test('enableBtns function exists', () => {
  expect(enableBtns).toBeDefined();
});

test('moveProgress function exists', () => {
  expect(moveProgress).toBeDefined();
});

test('showSummary function exists', () => {
  expect(showSummary).toBeDefined();
});

test('checkAnswer function exists', () => {
  expect(checkAnswer).toBeDefined();
});

test('increaseScore function exists', () => {
  expect(increaseScore).toBeDefined();
});
