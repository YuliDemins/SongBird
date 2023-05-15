import createElement from '../utils.js';

let root = document.getElementById('root');

export default function createStartPage() {
  const wrapperMain = createElement('div', 'wrapper-main');
  const containerMain = createElement('div', 'container-main');
  const Title = createElement('h1', 'title-main');
  Title.innerHTML = 'Викторина';
  const rulsTitle = createElement('h2', 'ruls-title');
  rulsTitle.innerHTML = 'Правила';

  const rulsList = createElement('ul', 'ruls-list');
  const rulsItem1 = createElement('li', 'ruls-item');
  rulsItem1.innerHTML = 'Прослушай голос птицы';
  const rulsItem2 = createElement('li', 'ruls-item');
  rulsItem2.innerHTML = 'Выберите ответ из предложенных ниже вариантов';
  const rulsItem3 = createElement('li', 'ruls-item');
  rulsItem3.innerHTML = 'если ответ верный - получаете 5 баллов. Если нет, то с каждой последующей попыткой результат уменьшается на 1 балл';
  const rulsItem4 = createElement('li', 'ruls-item');
  rulsItem4.innerHTML = 'После нахождения верного ответа переходите к следующему вопросу'
  const rulsItem5 = createElement('li', 'ruls-item');
  rulsItem5.innerHTML = 'По окончанию викторины выводится итоговый результат';
  const rulsItem6 = createElement('li', 'ruls-item');
  rulsItem6.innerHTML = 'При каждом ответе вы можете увидеть изображение с птицей, прочитать информацию о ней, прослушать какие звуки она издает';

  const btnStart = createElement('button', 'button-start');
  btnStart.textContent = 'start';

  const btnShowGallery = createElement('button', 'button-show-gallery')
  btnShowGallery.textContent = 'show gallery';

rulsList.append(rulsItem1, rulsItem2, rulsItem3, rulsItem4, rulsItem5, rulsItem6);
containerMain.append(Title, rulsTitle, rulsList, btnStart, btnShowGallery);
wrapperMain.append(containerMain);
root.append(wrapperMain);
  
  btnStart.addEventListener('click', (e) => {
    window.location.hash = "#/quiz/";
    route('#/quiz/');
  })

  btnShowGallery.addEventListener('click', (e) => {
    window.location.hash = "#/gallery/";
    route('#/gallery/');
  })
}
