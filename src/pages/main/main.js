import { createElement } from '../../components/utils.js';
import { route } from '../../components/router.js';

let root = document.getElementById('root');

export function createStartPage() {
  const wrapperMain = createElement('div', 'wrapper-main');
  const containerMain = createElement('div', 'container-main');
  const Title = createElement('h1', 'title-main', 'Викторина');
  const rulsTitle = createElement('h2', 'ruls-title', 'Правила');
  const rulsList = createElement('div', 'ruls-list');
  const rulsItem = createElement('p', 'ruls-item');
  rulsItem.innerHTML = `Прослушай голос птицы<br>
Выбери ответ из предложенных ниже вариантов<br>
если ответ верный - получаешь 5 баллов. Если нет, то с каждой последующей попыткой результат уменьшается на 1 балл<br>
После нахождения верного ответа переходи к следующему вопросу<br>
По окончанию викторины выводится итоговый результат<br>
При каждом ответе вы можете увидеть изображение с птицей, прочитать информацию о ней, прослушать какие звуки она издает`;

  const btnStart = createElement('button', 'button-start', 'start');
  const btnShowGallery = createElement(
    'button',
    'button-show-gallery',
    'show gallery'
  );

  rulsList.append(rulsItem);
  containerMain.append(Title, rulsTitle, rulsList, btnStart, btnShowGallery);
  wrapperMain.append(containerMain);
  root.append(wrapperMain);

  btnStart.addEventListener('click', () => {
    window.location.hash = '#/quiz/';
    route('#/quiz/');
  });

  btnShowGallery.addEventListener('click', () => {
    window.location.hash = '#/gallery/';
    route('#/gallery/');
  });
}
