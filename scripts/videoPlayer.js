export const videoPlayerInit = () => {
  
  const videoPlayer = document.querySelector('.video-player');
  const videoButtonPlay = document.querySelector('.video-button__play');
  const videoButtonStop = document.querySelector('.video-button__stop');
  const videoProgress = document.querySelector('.video-progress');
  const videoTimePassed = document.querySelector('.video-time__passed');
  const videoTimeTotal = document.querySelector('.video-time__total');
  const videoVolume = document.querySelector('.volume-progress');
  const videoFullscreen = document.querySelector('.video-fullscreen'); 
  const volumeDown = document.querySelector('.fa-volume-down');
  const volumeUp = document.querySelector('.fa-volume-up');

  const toggleIcon = () => {
    if (videoPlayer.paused) {
      videoButtonPlay.classList.remove('fa-pause');
      videoButtonPlay.classList.add('fa-play');
    }
    else {
      videoButtonPlay.classList.remove('fa-play');
      videoButtonPlay.classList.add('fa-pause');
    }
  };

  const togglePlay = () => {
    if (videoPlayer.paused) {
      videoPlayer.play();
    }
    else {
      videoPlayer.pause();
    }

    toggleIcon();
  };

  const stopPlay = () => {
    videoPlayer.pause();
    videoPlayer.currentTime = 0; 
  };

  const addZero = n => n < 10 ? '0' + n : n;

  videoPlayer.addEventListener('click', togglePlay);
  videoButtonPlay.addEventListener('click', togglePlay);

  videoPlayer.addEventListener('play', toggleIcon);
  videoButtonPlay.addEventListener('pause', toggleIcon);

  videoButtonStop.addEventListener('click', stopPlay);

  videoPlayer.addEventListener('timeupdate', () => {
    const currentTime = videoPlayer.currentTime;
    const duration = videoPlayer.duration;

    videoProgress.value = (currentTime / duration) * 100;
      
    let minutePassed = Math.floor(currentTime / 60);
    let secondsPassed = Math.floor(currentTime % 60);

    let minuteTotal = Math.floor(duration / 60);
    let secondsTotal = Math.floor(duration % 60);

    videoTimePassed.textContent = `${addZero(minutePassed)}:${addZero(secondsPassed)}`;
    videoTimeTotal.textContent = `${addZero(minuteTotal)}:${addZero(secondsTotal)}`;
  });

  videoProgress.addEventListener('input', () => {
    const duration = videoPlayer.duration;
    const value = videoProgress.value;

    videoPlayer.currentTime = (value * duration ) / 100;
  });

  videoFullscreen.addEventListener('click', () => {
    console.dir(videoPlayer);
    videoPlayer.requestFullscreen();
  });

  videoVolume.addEventListener('input', () => {
    videoPlayer.volume = videoVolume.value / 100;
    console.log(videoPlayer.volume);
    if (videoPlayer.volume > 0) {
      volumeDown.classList.remove('fa-volume-off');
      volumeDown.classList.add('fa-volume-down');
    } else if (videoPlayer.volume === 0) {
      volumeDown.classList.remove('fa-volume-down');
      volumeDown.classList.add('fa-volume-off');
    } 
  });

  videoPlayer.volume = 0.5;
  videoVolume.value = videoPlayer.volume * 100;
  let buffer;

  volumeDown.addEventListener('click', () => {

    if (volumeDown.classList.contains('fa-volume-down')) {
      buffer = videoPlayer.volume;
      videoPlayer.volume = 0;
      videoVolume.value = 0;
      volumeDown.classList.remove('fa-volume-down');
      volumeDown.classList.add('fa-volume-off');
    } else {
      videoPlayer.volume = buffer;
      videoVolume.value = buffer * 100;
      volumeDown.classList.remove('fa-volume-off');
      volumeDown.classList.add('fa-volume-down');
    }

  });

  volumeUp.addEventListener('click', () => {
    videoPlayer.volume = 1;
    videoVolume.value = 100;
    volumeDown.classList.remove('fa-volume-off');
    volumeDown.classList.add('fa-volume-down');
  });


};







