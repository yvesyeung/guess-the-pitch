import { pitchesArray } from './data.js';

let index = Math.floor(Math.random() * 10000);

console.log(index);
console.log(pitchesArray[index]);

let videoContainer = document.querySelector('.video-container');

let html = `<video
src="https://sporty-clips.mlb.com/UDJNQTBfWGw0TUFRPT1fVkFkU1hRWUZYZ1VBQ2dFQUJRQUFBZ1lIQUFCVFV3Y0FWRkVFQmdjQkExY0VDRlJX.mp4#t=2.5"
class="video-player"
preload="none"
data-embed="default"
autoplay
playsinline
muted
></video>`;

videoContainer.insertAdjacentHTML('afterbegin', html);

let video = document.querySelector('.video-player');

video.addEventListener('timeupdate', function () {
  // check whether we have passed 5 seconds,
  // current time is given in seconds
  if (this.currentTime >= 5) {
    // pause the playback
    console.log('current time met');
    this.currentTime = 2.5;
  }
});

// 1a. Get random pitch video url and pitch type

// 1b. Display the pitch video, show loading graphic as needed

// 2a. Display answer options

// 2b. Determine if user's answer is correct, and display message

// 3a. Update current game and overall tallies in UI
// Current Score and High Score
// Modal for % Correct For Each Pitch Type

// 3b. Update overall tallies in local storage
// High Score, % Correct For Each Pitch Type
