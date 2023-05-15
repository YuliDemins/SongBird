import createElement from "../utils.js";
import '../../assets/sound/valid.mp3';
import '../../assets/sound/invalid.mp3';

import { birdsData } from "../birds.js";
import route from "../router.js";

export default function createQuiz() {

  let isPlay = false;

  const wrapper = createElement("div", "wrapper");

  const titleWrapper = createElement("div", "title-wrapper");
  const BirdList = createElement("ul", "list-bird");

  const Levels = [
    "Разминка",
    "Воробьиные",
    "Лесные птицы",
    "Певчие птицы",
    "Хищные птицы",
    "Морские птицы",
  ];
  Levels.forEach((level, index) => {
    level = createElement("li", "list-bird-item");
    level.textContent = `${Levels[index]}`;
    level.classList.add(`stage${index}`);
    BirdList.append(level);
  });

  const questionWrapper = createElement("div", "question-wrapper");
  const questionImage = createElement("div", "question-img");
  const questionDiv = createElement("div", "question-div");
  const questionTitle = createElement("div", "question-title");
  const questionScore = createElement("div", "question-score");
  questionTitle.textContent = "******";
  questionScore.textContent = "Score: 0";
  const questionAudioPlayer = createElement("div", "question-audio");

  const questionAudioSing = createElement("audio", "question-audio-sing");

  const questionAudioControls = createElement("div", "question-audio-controls");
  const questionAudioPlay = createElement("div", "question-audio-play");

  let audio = questionAudioSing;
  questionAudioPlay.addEventListener("click", () => {
    togglePlay(audio);
    questionAudioPlay.classList.toggle("question-audio-pause");
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

  function onProgress(e) {
    let duration = e.target.duration;
    let currentTime = e.target.currentTime;
    let progress = (100 / duration) * currentTime;

    questionAudioTimeLineCurrent.style.width = progress + "%";

    TimeInfoRun.textContent = `${Math.floor(currentTime / 60)
      .toString()
      .padStart(2, "0")}:${Math.floor(currentTime % 60)
      .toString()
      .padStart(2, "0")}`;
    TimeInfoShow.textContent = `${Math.floor(duration / 60)
      .toString()
      .padStart(2, "0")}:${Math.floor(duration % 60)
      .toString()
      .padStart(2, "0")}`;
    if (currentTime == duration) {
      questionAudioPlay.classList.remove("question-audio-pause");
      isPlay = false
    }
  }
  audio.addEventListener("timeupdate", onProgress);

  const questionAudioTime = createElement("div", "question-audio-time");
  const questionAudioTimeLine = createElement("div", "time-line");
  const questionAudioTimeLineCurrent = createElement( "div", "time-line-current");
  const questionAudioTimeInfo = createElement("div", "time-line-info");
  const TimeInfoRun = createElement("div", "time-line-run");
  TimeInfoRun.textContent = "00:00";
  const TimeInfoShow = createElement("div", "time-line-show");
  TimeInfoShow.textContent = "00:00";
  questionAudioTimeInfo.append(TimeInfoRun, TimeInfoShow);
  questionAudioTimeLine.append(questionAudioTimeLineCurrent);
  questionAudioTime.append(questionAudioTimeLine, questionAudioTimeInfo);


function changeAudioTime () {
  questionAudioTimeLine.addEventListener ('mousedown', (e) => {
      slideDurationLine(e)
  }, false);
  questionAudioTimeLine.addEventListener('mousemove', (e) => {

      if (e.buttons == 1) {
          slideDurationLine (e);
      }
  });
  questionAudioTimeLine.addEventListener('mouseup', (e) => {
      slideDurationLine(e);
  })
}

function slideDurationLine (e) {
  const audioWidth = window.getComputedStyle(questionAudioTimeLine).width;
  const newLength = e.offsetX / parseInt(audioWidth) * audio.duration;
  audio.currentTime = newLength;
}

questionAudioTimeLine.addEventListener('click', e => {
  slideDurationLine (e)
}, false)
  const questionAudioVolume = createElement("div", "question-audio-volume");
  const questionAudioVolumeButton = createElement("div", "question-audio-volume-button" );
  const questionAudioVolumeLine = createElement("input", "volume-line");
  questionAudioVolumeLine.setAttribute("type", "range");
  questionAudioVolume.append(
    questionAudioVolumeButton,
    questionAudioVolumeLine
  );

  questionAudioVolumeButton.addEventListener("click", () => {
    questionAudioVolumeLine.classList.add("_change-volume");
  });

  questionAudioVolumeLine.addEventListener("change", () => {
    changeVolume(audio);
  });

  questionAudioVolumeLine.value = 100;
  function changeVolume(audio) {
    const newVolume = parseInt(questionAudioVolumeLine.value);
    audio.volume = newVolume / 100;

    questionAudioVolumeLine.addEventListener("input", () => questionAudioVolumeLine.style.setProperty("--value", questionAudioVolumeLine.value));

    questionAudioVolumeLine.style.setProperty("--value",questionAudioVolumeLine.value);
    questionAudioVolumeLine.style.setProperty("--min", questionAudioVolumeLine.min == "" ? "0" : questionAudioVolumeLine.value.min);
    questionAudioVolumeLine.style.setProperty( "--max", questionAudioVolumeLine.max == "" ? "100" : questionAudioVolumeLine.max);
  }

  changeVolume(audio);

  questionDiv.append(questionScore, questionTitle, questionAudioPlayer);
  questionWrapper.append(questionImage, questionDiv);
  questionAudioControls.append(questionAudioPlay, questionAudioTime);
  questionAudioPlayer.append(
    questionAudioSing,
    questionAudioControls,
    questionAudioVolume
  );

  const answerWrapper = createElement("div", "answer-wrapper");
  const answerChoise = createElement("div", "answer-choise");
  const answerList = createElement("ul", "answer-list");

  answerChoise.append(answerList);

  const answerCard = createElement("div", "answer-card");
  const answerCardDiv = createElement("div", "answer-card-div");
  const answerCardImage = createElement("div", "answer-card-image");

  const answerCardDesc = createElement("div", "answer-card-desc");
  const answerCardTitle = createElement("div", "answer-card-title");
  answerCardTitle.textContent = "Послушайте плеер.\nВыберите птицу из списка";
  
  const answerCardSpecies = createElement("div", "answer-card-species");

  const answerCardAudio = createElement("div", "answer-card-audio");
  const answerCardAudioSing = createElement("audio", "question-audio-sing");

  const answerAudioControls = createElement("div", "answer-audio-controls");
  const answerAudioPlay = createElement("div", "answer-audio-play");
  const answerAudioTime = createElement("div", "answer-audio-time");
  const answerAudioTimeLine = createElement("div", "answer-time-line");
  const answerAudioTimeLineCurrent = createElement("div","answer-time-line-current");
  const answerAudioTimeInfo = createElement("div", "answer-time-line-info");
  const answerTimeInfoRun = createElement("div", "answer-time-line-run");
  answerTimeInfoRun.textContent = "00:00";
  const answerTimeInfoShow = createElement("div", "answer-time-line-show");
  answerTimeInfoShow.textContent = "00:00";
  answerAudioTimeInfo.append(answerTimeInfoRun, answerTimeInfoShow);
  answerAudioTimeLine.append(answerAudioTimeLineCurrent);
  answerAudioTime.append(answerAudioTimeLine, answerAudioTimeInfo);
  answerAudioControls.append(answerAudioPlay, answerAudioTime);

  const answerCardInfo = createElement("div", "answer-card-info");

  answerCardDiv.append(answerCardImage, answerCardDesc);
  answerCardAudio.append(answerCardAudioSing, answerAudioControls);
  answerCardDesc.append(answerCardTitle, answerCardSpecies, answerCardAudio);
  answerCard.append(answerCardDiv, answerCardInfo);
  answerWrapper.append(answerChoise, answerCard);

  const nextWrapper = createElement("div", "next-wrapper");
  const nextLevel = createElement("div", "next-level");
  nextLevel.classList.add('disable');
  nextLevel.textContent = "Next Level";

  root.append(wrapper);
  wrapper.append(BirdList);

  wrapper.append(questionWrapper);

  wrapper.append(answerWrapper);
  wrapper.append(nextWrapper);
  nextWrapper.append(nextLevel);
  root.append(wrapper);


  let index = 0;
  let click = 0;
  let score = 0;

  function renderAnswer(index) {
    if (index < 6) {
      const Items = [];
      for (let i = 0; i < Object.keys(birdsData[index]).length; i++) {
        Items.push(birdsData[index][i]["name"]);
      }
      Items.map((item, index) => {
        item = createElement("li", "answer-list-item");
        item.id = index;
        item.innerHTML = `<div class='label'></div>${Items[index]}`;
        answerList.append(item);
      });
      return Items;
    }
    else console.log(index)

  }

  renderAnswer(index);

  let List;
  function createList() {
    List = [...answerList.getElementsByTagName("li")];
    return List;
  }

  createList();

  function findQuestionAudio(index) {
    if (index < 6) {
    let query = Math.floor(Math.random() * birdsData[index].length);
    return query;
    }
  }

  function resetStyleAudio() {
    answerAudioPlay.classList.remove("question-audio-pause");
    pauseAudio(answerCardAudioSing);
    answerTimeInfoRun.textContent = "00:00";
    answerCardAudioSing.onloadedmetadata = function () {
      answerTimeInfoShow.textContent = `${Math.floor(
        answerCardAudioSing.duration / 60
        )
          .toString()
          .padStart(2, "0")}:${Math.floor(answerCardAudioSing.duration % 60)
          .toString()
          .padStart(2, "0")}`;
      };
    answerAudioTimeLineCurrent.removeAttribute("style");
  }

  function removeCard() {
    answerCardTitle.textContent = "Послушайте плеер.\nВыберите птицу из списка"
    answerCardSpecies.textContent = ''
    answerCardImage.classList.add('inactive')
    answerCardAudio.classList.add('inactive')
    answerCardInfo.textContent = ''
  }
  removeCard()

  function renderQuestion(index) {
    let id = findQuestionAudio(index);
    if (index < 6) {
      for (let i = 0; i < Object.keys(birdsData[index]).length; i++) {
        if (Object.keys(birdsData[index])[i] == id) {
          questionAudioSing.setAttribute("src", `${Object.values(birdsData[index])[i]["audio"]}`);
          questionAudioSing.onloadedmetadata = function () {
            TimeInfoShow.textContent = `${Math.floor(questionAudioSing.duration / 60)
              .toString()
              .padStart(2, "0")}:${Math.floor(questionAudioSing.duration % 60)
              .toString()
              .padStart(2, "0")}`;
          };
        }
      }
    }


    List.forEach((elem) => {
      elem.addEventListener("click", (e) => {
        let hasWon = List.some(elem => elem.firstChild.classList.contains("valid"))
        click++;
        answerCardImage.classList.remove('inactive')
        answerCardAudio.classList.remove('inactive')
        if (!hasWon) {
          if (e.target.id == id) {
            if (click == 1) score += 5;
            if (click == 2) score += 4;
            if (click == 3) score += 3;
            if (click == 4) score += 2;
            if (click == 5) score += 1;
            elem.firstChild.classList.add("valid");
            questionTitle.textContent = Object.values(birdsData[index])[id][
              "name"];

              Sound('valid')

            questionImage.style.backgroundImage = `url(${
              Object.values(birdsData[index])[id]["image"]
            })`;
            questionScore.textContent = `Score: ${score}`;
            localStorage.setItem('score12345', score)
            checkGameOver()

            questionAudioPlay.classList.remove("question-audio-pause");
            pauseAudio(audio)

            nextLevel.classList.remove('disable')
          } 
          else {
            elem.firstChild.classList.add("invalid");
            Sound('invalid')
          }
        }
        if (hasWon) {
        }
        
        resetStyleAudio();
        answerCardTitle.textContent = Object.values(birdsData[index])[e.target.id]["name"];
        answerCardSpecies.textContent = Object.values(birdsData[index])[e.target.id]["species"];
        answerCardImage.style.backgroundImage = `url(${Object.values(birdsData[index])[e.target.id]["image"]})`;
        answerCardAudioSing.src = Object.values(birdsData[index])[e.target.id]["audio"];
        answerCardInfo.textContent = Object.values(birdsData[index])[e.target.id]["description"];
      });
    });
    return score;
  };



  answerAudioPlay.addEventListener("click", () => {
    togglePlay(answerCardAudioSing);
    answerAudioPlay.classList.toggle("question-audio-pause");

    function onProgressCard(e) {
      let duration = event.target.duration;
      let currentTime = event.target.currentTime;
      let progress = (100 / duration) * currentTime;

      answerAudioTimeLineCurrent.style.width = progress + "%";
      answerTimeInfoRun.textContent = `${Math.floor(currentTime / 60)
        .toString()
        .padStart(2, "0")}:${Math.floor(currentTime % 60)
        .toString()
        .padStart(2, "0")}`;

      answerTimeInfoShow.textContent = `${Math.floor(duration / 60)
        .toString()
        .padStart(2, "0")}:${Math.floor(duration % 60)
        .toString()
        .padStart(2, "0")}`;
      if (answerCardAudioSing.currentTime == answerCardAudioSing.duration) {
        answerAudioPlay.classList.remove("question-audio-pause");
        isPlay = false
      }
    }
    answerCardAudioSing.addEventListener("timeupdate", onProgressCard);
  });

  renderQuestion(index);

  nextLevel.addEventListener("click", () => {
    changeIndex();

  });

function activeLevel(index){
  if (index < 6 ){
    [...document.getElementsByClassName('list-bird-item')].forEach(el => {
      el.classList.remove('active-bird')
    })
    
     document.querySelector(`.stage${index}`).classList.add('active-bird')
  }
  
}
activeLevel(index);

  function changeIndex() {
    if (List.some(elem => elem.firstChild.classList.contains("valid"))) {
        index++;
        answerList.innerHTML = "";
        questionImage.removeAttribute("style");
        questionTitle.textContent = "xxxxx";
        questionAudioPlay.classList.remove("question-audio-pause");
        click = 0;

        nextLevel.classList.add('disable')

        pauseAudio(audio);

        renderAnswer(index);
        createList();
        renderQuestion(index);

        activeLevel(index)

        TimeInfoRun.textContent = "00:00";
        questionAudioSing.onloadedmetadata = function () {
          TimeInfoShow.textContent = `${Math.floor(
            questionAudioSing.duration / 60
          )
            .toString()
            .padStart(2, "0")}:${Math.floor(questionAudioSing.duration % 60)
            .toString()
            .padStart(2, "0")}`;
        };
        TimeInfoShow.textContent= '00:00'
        questionAudioTimeLineCurrent.removeAttribute("style");

        resetStyleAudio();

        List.forEach((el) => el.firstChild.classList.remove("valid", "invalid"));

      removeCard();
      

      if (index > 5) {
        route('#/result/');
        window.location.hash = "#/result/";
        console.log(questionScore);
        return questionScore;
      }
    }

  }
  function checkGameOver(){
    if (document.querySelector('.stage5').classList.contains('active-bird')){
      nextLevel.textContent = 'show result';
      }
  }

  checkGameOver();

  function Sound(song){
    let audioAnswer = new Audio(song);
    audioAnswer.src = `./assets/sound/${song}.mp3`;
    audioAnswer.play();
  }
}

