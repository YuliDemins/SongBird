import birdsData from '../../birds.js';
import { createElement } from '../../components/utils.js';
import { Player, Volume} from '../../components/player/player.js';
import { setCard } from '../../components/utils.js';

const root = document.getElementById('root');

export function createGallery() {
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

  const galleryCard = createElement('div', 'gallery-card');
  const galleryCardCurrent = createElement('div', 'gallery-card-current');
  const galleryCardDiv = createElement('div', 'gallery-card-div');
  const galleryCardImage = createElement('div', 'gallery-card-image');

  const galleryCardDesc = createElement('div', 'gallery-card-desc');
  const galleryCardTitle = createElement('div', 'gallery-card-title');

  const galleryCardSpecies = createElement('div', 'gallery-card-species');

  const galleryCardAudio = createElement('div', 'gallery-card-audio');
  const galleryCardAudioSing = createElement(
    'audio',
    'gallery-card-audio-sing'
  );

  const galleryAudioControls = createElement('div', 'gallery-audio-controls');
  const galleryAudioPlay = createElement('div', 'gallery-audio-play');
  const galleryAudioTime = createElement('div', 'gallery-audio-time');
  const galleryAudioTimeLine = createElement('div', 'gallery-time-line');
  const galleryAudioTimeLineCurrent = createElement(
    'div',
    'gallery-time-line-current'
  );
  const galleryAudioTimeInfo = createElement('div', 'gallery-time-line-info');
  const galleryTimeInfoRun = createElement(
    'div',
    'gallery-time-line-run',
    '00:00'
  );

  const galleryTimeInfoShow = createElement(
    'div',
    'gallery-time-line-show',
    '00:00'
  );

  galleryAudioTimeInfo.append(galleryTimeInfoRun, galleryTimeInfoShow);
  galleryAudioTimeLine.append(galleryAudioTimeLineCurrent);
  galleryAudioTime.append(galleryAudioTimeLine, galleryAudioTimeInfo);
  galleryAudioControls.append(galleryAudioPlay, galleryAudioTime);

  const galleryCardInfo = createElement('div', 'answer-card-info');

  galleryCardDiv.append(galleryCardImage, galleryCardDesc, galleryCardInfo);
  galleryCardAudio.append(galleryCardAudioSing, galleryAudioControls);
  galleryCardDesc.append(
    galleryCardTitle,
    galleryCardSpecies,
    galleryCardAudio
  );
  galleryCardCurrent.append(galleryCardDiv, galleryCardInfo);
  galleryCard.append(galleryCardCurrent);
  birdContainer.append(galleryCard);

  const birdCards = createElement('div', 'bird-cards');

  setCard(arrBirds[number], galleryCardTitle, galleryCardSpecies, galleryCardImage, galleryCardAudioSing, galleryCardInfo)

  function nextCard() {
    if (number == arrBirds.length - 1) {
      number = -1;
    }
    number++;
    setCard(arrBirds[number], galleryCardTitle, galleryCardSpecies, galleryCardImage, galleryCardAudioSing, galleryCardInfo)
  }

  function prevCard() {
    if (number == 0) {
      number = arrBirds.length;
    }
    number--;
    setCard(arrBirds[number], galleryCardTitle, galleryCardSpecies, galleryCardImage, galleryCardAudioSing, galleryCardInfo)
  }

  Next.addEventListener('click', () => {
    resetStyleAudio();
    nextCard();
  });

  Prev.addEventListener('click', () => {
    resetStyleAudio();
    prevCard();
  });

  function resetStyleAudio() {
    galleryAudioPlay.classList.remove('question-audio-pause');
    Player(
      galleryAudioPlay,
      galleryCardAudioSing,
      galleryAudioTimeLine,
      galleryAudioTimeLineCurrent,
      galleryTimeInfoRun,
      galleryTimeInfoShow
    );
    galleryTimeInfoRun.textContent = '00:00';
    galleryCardAudioSing.onloadedmetadata = function () {
      galleryTimeInfoShow.textContent = `${Math.floor(
        galleryCardAudioSing.duration / 60
      )
        .toString()
        .padStart(2, '0')}:${Math.floor(galleryCardAudioSing.duration % 60)
        .toString()
        .padStart(2, '0')}`;
    };
    galleryAudioTimeLineCurrent.removeAttribute('style');
  }

  containerGallery.append(TitleGallery, Arrows, birdContainer);
  wrapperGallery.append(containerGallery);
  root.append(wrapperGallery);

  Player(
    galleryAudioPlay,
    galleryCardAudioSing,
    galleryAudioTimeLine,
    galleryAudioTimeLineCurrent,
    galleryTimeInfoRun,
    galleryTimeInfoShow
  );

  const galleryAudioVolume = createElement('div', 'question-audio-volume');
  const galleryAudioVolumeButton = createElement(
    'div',
    'question-audio-volume-button'
  );
  const galleryAudioVolumeLine = createElement('input', 'volume-line');
  galleryAudioVolumeLine.setAttribute('type', 'range');
  galleryAudioVolume.append(galleryAudioVolumeButton, galleryAudioVolumeLine);

  galleryCardAudio.append(galleryAudioVolume);

  galleryAudioVolumeLine.value = 100;

  Volume(
    galleryCardAudioSing,
    galleryAudioVolumeButton,
    galleryAudioVolumeLine
  );
}
