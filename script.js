import { pitchesArray } from './data.js';

const videoPlayer = document.querySelector('.video-player');
const pitchContainer = document.querySelector('.pitch-type');
const getPitchBtn = document.querySelector('.get-pitch-btn');

const getNewPitch = function () {
  const index = Math.floor(Math.random() * 9998);
  videoPlayer.src = `https://sporty-clips.mlb.com/${pitchesArray[index].url}#t=2.5`;
  pitchContainer.innerHTML = `Pitch type = ${pitchesArray[index].pitch}`;
};

getNewPitch();

videoPlayer.addEventListener('timeupdate', function () {
  // check whether we have passed 5 seconds,
  // current time is given in seconds
  if (this.currentTime >= 5) {
    // pause the playback
    console.log('current time met');
    this.currentTime = 2.5;
  }
});

getPitchBtn.addEventListener('click', getNewPitch);
// 1a. Get random pitch video url and pitch type

// 1b. Display the pitch video, show loading graphic as needed

// 2a. Display answer options

// 2b. Determine if user's answer is correct, and display message

// 3a. Update current game and overall tallies in UI
// Current Score and High Score
// Modal for % Correct For Each Pitch Type

// 3b. Update overall tallies in local storage
// High Score, % Correct For Each Pitch Type
