import birdsData from '../birds.js';
import createElement from '../utils.js';

const root = document.getElementById('root');

export default function createGallery(){
  let arrBirds = birdsData.flat();
  let number = 0;

  const wrapperGallery = createElement('div', 'wrapper-gallery');
  const containerGallery = createElement('div', 'container-gallery');
  const TitleGallery = createElement('div', 'title-gallery');

  TitleGallery.textContent = 'Галерея';
  
// ---Slider---

const Arrows = createElement('div', 'gallery-arrow');
const Next = createElement('div', 'gallery-arrow-next');
const Prev = createElement('div', 'gallery-arrow-prev');
Arrows.append(Prev, Next);


const birdContainer = createElement('div', 'bird-container');

  const galleryCard = createElement("div", "gallery-card");
  const galleryCardCurrent = createElement("div", "gallery-card-current");
  const galleryCardDiv = createElement("div", "gallery-card-div");
  const galleryCardImage = createElement("div", "gallery-card-image");
  galleryCardImage.style.backgroundImage = `url(${arrBirds[0]['image']})`
  
  const galleryCardDesc = createElement("div", "gallery-card-desc");
  const galleryCardTitle = createElement("div", "gallery-card-title");
  galleryCardTitle.textContent = arrBirds[0]['name'];
  
  const galleryCardSpecies = createElement("div", "gallery-card-species");
  galleryCardSpecies.textContent = arrBirds[0]['species'];

  const galleryCardAudio = createElement("div", "gallery-card-audio");
  const galleryCardAudioSing = createElement("audio", "gallery-card-audio-sing");
  galleryCardAudioSing.src = arrBirds[0]['audio'];

  const galleryAudioControls = createElement("div", "gallery-audio-controls");
  const galleryAudioPlay = createElement("div", "gallery-audio-play");
  const galleryAudioTime = createElement("div", "gallery-audio-time");
  const galleryAudioTimeLine = createElement("div", "gallery-time-line");
  const galleryAudioTimeLineCurrent = createElement("div","gallery-time-line-current");
  const galleryAudioTimeInfo = createElement("div", "gallery-time-line-info");
  const galleryTimeInfoRun = createElement("div", "gallery-time-line-run");
  galleryTimeInfoRun.textContent = "00:00";
  const galleryTimeInfoShow = createElement("div", "gallery-time-line-show");
  galleryTimeInfoShow.textContent = "00:00";
  galleryAudioTimeInfo.append(galleryTimeInfoRun, galleryTimeInfoShow);
  galleryAudioTimeLine.append(galleryAudioTimeLineCurrent);
  galleryAudioTime.append(galleryAudioTimeLine, galleryAudioTimeInfo);
  galleryAudioControls.append(galleryAudioPlay, galleryAudioTime);

  const galleryCardInfo = createElement("div", "answer-card-info");
  galleryCardInfo.textContent = arrBirds[0]['description'];

  galleryCardDiv.append(galleryCardImage, galleryCardDesc, galleryCardInfo);
  galleryCardAudio.append(galleryCardAudioSing, galleryAudioControls);
  galleryCardDesc.append(galleryCardTitle, galleryCardSpecies, galleryCardAudio);
  galleryCardCurrent.append(galleryCardDiv, galleryCardInfo);
  galleryCard.append(galleryCardCurrent);
  birdContainer.append(galleryCard);

const birdCards = createElement('div', 'bird-cards');

let galleryWidth = birdContainer.clientWidth;

function nextCard () {
  if (number == arrBirds.length-1) {
    number = -1;
  }
  number++;
  galleryCardImage.style.backgroundImage = `url(${arrBirds[number]['image']})`;
  galleryCardTitle.textContent = arrBirds[number]['name'];
  galleryCardSpecies.textContent = arrBirds[number]['species'];
  galleryCardAudioSing.src = arrBirds[number]['audio'];
  galleryCardInfo.textContent = arrBirds[number]['description'];
};

function prevCard () {
  if (number == 0) {
    number = arrBirds.length;
  }
  number--;
  galleryCardImage.style.backgroundImage = `url(${arrBirds[number]['image']})`;
  galleryCardTitle.textContent = arrBirds[number]['name'];
  galleryCardSpecies.textContent = arrBirds[number]['species'];
  galleryCardAudioSing.src = arrBirds[number]['audio'];
  galleryCardInfo.textContent = arrBirds[number]['description'];
  };


    Next.addEventListener('click', () => {
      resetStyleAudio();
      nextCard();
    });

    Prev.addEventListener('click', () => {
      resetStyleAudio();
      prevCard();
    });

    function resetStyleAudio() {
      galleryAudioPlay.classList.remove("question-audio-pause");
      pauseAudio(galleryCardAudioSing);
      galleryTimeInfoRun.textContent = "00:00";
      galleryCardAudioSing.onloadedmetadata = function () {
        galleryTimeInfoShow.textContent = `${Math.floor(
          galleryCardAudioSing.duration / 60
          )
            .toString()
            .padStart(2, "0")}:${Math.floor(galleryCardAudioSing.duration % 60)
            .toString()
            .padStart(2, "0")}`;
        };
        galleryAudioTimeLineCurrent.removeAttribute("style");
    }

containerGallery.append(TitleGallery, Arrows, birdContainer);
wrapperGallery.append(containerGallery);
root.append(wrapperGallery);

let isPlay = false;

galleryAudioPlay.addEventListener("click", () => {
  togglePlay(galleryCardAudioSing);
  galleryAudioPlay.classList.toggle("question-audio-pause");

  function onProgressCard(e) {
    let duration = event.target.duration;
    let currentTime = event.target.currentTime;
    let progress = (100 / duration) * currentTime;

    galleryAudioTimeLineCurrent.style.width = progress + "%";
    galleryTimeInfoRun.textContent = `${Math.floor(currentTime / 60)
      .toString()
      .padStart(2, "0")}:${Math.floor(currentTime % 60)
      .toString()
      .padStart(2, "0")}`;

    galleryTimeInfoShow.textContent = `${Math.floor(duration / 60)
      .toString()
      .padStart(2, "0")}:${Math.floor(duration % 60)
      .toString()
      .padStart(2, "0")}`;
    if (galleryCardAudioSing.currentTime == galleryCardAudioSing.duration) {
      galleryAudioPlay.classList.remove("question-audio-pause");
      isPlay = false;
    } 
    
  }
  galleryCardAudioSing.addEventListener("timeupdate", onProgressCard);
});

function playAudio(audio) {
  audio.play();
  isPlay = true;
}

function pauseAudio(audio) {
  audio.pause();
  isPlay = false;
}

function togglePlay(audio) {
  isPlay = !isPlay;
  isPlay ? playAudio(audio) : pauseAudio(audio);
}


const galleryAudioVolume = createElement("div", "question-audio-volume");
const galleryAudioVolumeButton = createElement("div", "question-audio-volume-button" );
const galleryAudioVolumeLine = createElement("input", "volume-line");
galleryAudioVolumeLine.setAttribute("type", "range");
galleryAudioVolume.append(
  galleryAudioVolumeButton,
  galleryAudioVolumeLine
);

galleryCardAudio.append(galleryAudioVolume);


galleryAudioVolumeButton.addEventListener("click", () => {
  galleryAudioVolumeLine.classList.add("_change-volume");
});

galleryAudioVolumeLine.addEventListener("change", () => {
  changeVolume(galleryCardAudioSing);
});

galleryAudioVolumeLine.value = 100;
function changeVolume(audio) {
  const newVolume = parseInt(galleryAudioVolumeLine.value);
  audio.volume = newVolume / 100;

  galleryAudioVolumeLine.addEventListener("input", () => galleryAudioVolumeLine.style.setProperty("--value", galleryAudioVolumeLine.value));

  galleryAudioVolumeLine.style.setProperty("--value", galleryAudioVolumeLine.value);
  galleryAudioVolumeLine.style.setProperty("--min", galleryAudioVolumeLine.min == "" ? "0" : galleryAudioVolumeLine.value.min);
  galleryAudioVolumeLine.style.setProperty( "--max", galleryAudioVolumeLine.max == "" ? "100" : galleryAudioVolumeLine.max);
}

changeVolume(galleryCardAudioSing);

}
