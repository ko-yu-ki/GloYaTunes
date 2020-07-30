export const radioPlayerInit = () => {
  console.log('radio init');


  const radio = document.querySelector('.radio');
  const radioNavigation = document.querySelector('.radio-navigation');
  const radioHeader = document.querySelector('.radio-header__big');
  const radioCoverImg = document.querySelector('.radio-cover__img');
  const radioItem = document.querySelectorAll('.radio-item');
  const radioStop = document.querySelector('.radio-stop');
  const radioVolumeButton = document.querySelectorAll('.radio-volume-icon');
  const volume = document.querySelectorAll('.volume-progress');
  const radioVolume = volume[1];

  const audio = new Audio(); //создает объект
  audio.type = 'audio/aac';

  radioStop.disabled = true;

  const toggleIcon = () => {
    if (audio.paused) {
      radio.classList.remove('play');
      radioStop.classList.remove('fa-stop');
      radioStop.classList.add('fa-play');
    }
    else {
      radio.classList.add('play');
      radioStop.classList.remove('fa-play');
      radioStop.classList.add('fa-stop');
    }
  };

  const selectStation = (elem) => {
    radioItem.forEach(item => item.classList.remove('select'));
    elem.classList.add('select');
  };

  radioNavigation.addEventListener('change', (event) => {
    const target =  event.target;
    const parent = target.closest('.radio-item');
    const title = parent.querySelector('.radio-name').textContent;
    const cover = parent.querySelector('.radio-img').src;

    radioCoverImg.src = cover;
    radioHeader.textContent = title;
    selectStation(parent); //обозначаем выбранную станцию
    radioStop.disabled = false;
    audio.src = target.dataset.radioStation; // получаем адрес станции из index.html
    audio.play();
    toggleIcon();
  });

  radioStop.addEventListener('click', () => {
    if (audio.paused) {
      audio.play();
      toggleIcon();
    } else {
      audio.pause();
      toggleIcon();
    }
  });

  radioVolume.addEventListener('input', () => {
    audio.volume = radioVolume.value / 100;

    if (audio.volume > 0) {
      radioVolumeButton[0].classList.remove('fa-volume-off');
      radioVolumeButton[0].classList.add('fa-volume-down');
    } else if (audio.volume === 0) {
      radioVolumeButton[0].classList.remove('fa-volume-down');
      radioVolumeButton[0].classList.add('fa-volume-off');
    } 
  });


}