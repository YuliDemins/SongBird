import createElement from '../utils.js';
import createQuiz from "./quiz";
import route from '../router.js';

export default function createResultPage() {
  const score = localStorage.getItem('score12345');

  const wrapperResults = createElement('div', 'wrapper-result');
  const titleResults = createElement('h2', 'title-result');
  titleResults.textContent = 'Поздравляем !';
  const descResults = createElement('h2', 'desc-result');
  descResults.textContent = `Вы набрали ${score ?? 0} ${getBal(score)} из 30`;

  function getBal(score) {
    if (+score == 1 || +score == 21) return 'балл';
    if (+score > 1 && +score < 5 || +score > 21 && +score < 25) return 'балла';
    else return 'баллов';
  }

  const btnResult = createElement('button', 'btn-result');
  btnResult.textContent = "Попробовать снова";
  wrapperResults.append(titleResults, descResults, btnResult);
  root.append(wrapperResults);

  btnResult.addEventListener('click', (e) => {
  window.location.hash = "#/quiz/";
  route('#/quiz/');
})

  return wrapperResults;
}