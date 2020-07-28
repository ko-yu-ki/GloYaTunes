import { radioPlayerInit } from './radioPlayer.js'; //ипортируем функцию из radioPlayer.js
import { musicPlayerInit } from './musicPlayer.js'; //ипортируем функцию из musicPlayer.js
import { videoPlayerInit } from './videoPlayer.js'; //ипортируем функцию из videoPlayer.js

const playerBtn = document.querySelectorAll('.player-btn');
const playerBlock = document.querySelectorAll('.player-block');
const temp = document.querySelector('.temp');

const deactivationPlayer = () => {
  temp.style.display = 'none';
  playerBtn.forEach(item => item.classList.remove('active')); 
  playerBlock.forEach(item => item.classList.remove('active'));
};

playerBtn.forEach((btn, btnIndex) => {
  btn.addEventListener('click', () => {
    deactivationPlayer();
    btn.classList.add('active');
    playerBlock[btnIndex].classList.add('active');
  });
});

radioPlayerInit();
musicPlayerInit();
videoPlayerInit();