
export function Player (controller, audio, timelime, timelimecurrent, run, show) {
  let isPlay = false;

controller.addEventListener('click', () => {
  togglePlay();
})

function togglePlay() {
  isPlay = !isPlay;
  isPlay ? playAudio() : pauseAudio();
}

function playAudio() {
  if(!audio) return;
  audio.play();
  controller.classList.add("question-audio-pause")
  return isPlay = true; 
}

function pauseAudio() {
  if(!audio) return;
  audio.pause();
  controller.classList.remove("question-audio-pause")
  return isPlay = false;
}


function onProgress(e){
  let duration = e.target.duration;
  let currentTime = e.target.currentTime;
  let progress = (100 / duration) * currentTime;

  timelimecurrent.style.width = progress + "%";

  run.textContent = `${Math.floor(currentTime / 60)
    .toString()
    .padStart(2, "0")}:${Math.floor(currentTime % 60)
    .toString()
    .padStart(2, "0")}`;
  show.textContent = `${Math.floor(duration / 60)
    .toString()
    .padStart(2, "0")}:${Math.floor(duration % 60)
    .toString()
    .padStart(2, "0")}`;
  if (currentTime == duration) {
    controller.classList.remove("question-audio-pause");
    return isPlay = false
  }
}

audio.addEventListener("timeupdate", onProgress);

function changeAudioTime () {
  timelime.addEventListener ('mousedown', (e) => {
      slideDurationLine(e)
  }, false);
  timelime.addEventListener('mousemove', (e) => {

      if (e.buttons == 1) {
          slideDurationLine (e);
      }
  });
  timelime.addEventListener('mouseup', (e) => {
      slideDurationLine(e);
  })
}

function slideDurationLine (e) {
  const audioWidth = window.getComputedStyle(timelime).width;
  const newLength = e.offsetX / parseInt(audioWidth) * audio.duration;
  audio.currentTime = newLength;
}

timelime.addEventListener('click', e => {
  slideDurationLine (e)
}, false)

  changeAudioTime()
}

export function Volume (audio, volume, volumeline) {

  volume.addEventListener("click", () => {
    volumeline.classList.add("_change-volume");
  });

  volumeline.addEventListener("change", () => {
    changeVolume();
  });

  function changeVolume() {
    const newVolume = parseInt(volumeline.value);
    audio.volume = newVolume / 100;

    volumeline.addEventListener("input", () => volumeline.style.setProperty("--value", volumeline.value));

    volumeline.style.setProperty("--value",volumeline.value);
    volumeline.style.setProperty("--min", volumeline.min == "" ? "0" : volumeline.value.min);
    volumeline.style.setProperty( "--max", volumeline.max == "" ? "100" : volumeline.max);
  }

  changeVolume();
}

export function resetAudio(controller, audio, timelimecurrent, run, show) {
  controller.classList.remove('question-audio-pause');
  audio.pause();
  audio.currentTime = 0;
  run.textContent = '00:00';
  show.textContent = '00:00';
  audio.onloadedmetadata = function () {
    show.textContent = `${Math.floor(
      audio.duration / 60
    )
      .toString()
      .padStart(2, '0')}:${Math.floor(audio.duration % 60)
      .toString()
      .padStart(2, '0')}`;
  };
  timelimecurrent.removeAttribute('style');
}