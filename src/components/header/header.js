import createElement from "../utils.js";
import route from '../router.js';

export default {
  setHeader(){
    
const header = createElement('div', 'header');
    const logo = createElement('div', 'logo');
    const logoImage = createElement('div', 'logo-image');
    const logoText = createElement('div', 'logo-text');
    const logoSpan = createElement('span', 'logo-text-span');
    logoSpan.innerHTML = 'Bird';
    
    logoText.textContent = 'Song';
    
    const nav = createElement('ul', 'nav');
    const mainBtn = createElement('li', 'main-btn');
    const mainBtnLink = createElement('a', 'main-btn-link');
    mainBtnLink.setAttribute('href', '#/');
    mainBtn.append(mainBtnLink);
    mainBtnLink.addEventListener('click', (e) => {
      route('#/');
      mainBtnLink.classList.add('active-header');
    })
    mainBtnLink.textContent = 'Main';
    const quizBtn = createElement('li', 'quiz-btn');
    const quizBtnLink = createElement('a', 'quiz-btn-link');
    quizBtnLink.setAttribute('href', '#/quiz/');
    quizBtn.append(quizBtnLink);
    quizBtnLink.addEventListener('click', () => {
      route('#/quiz/');
      quizBtnLink.classList.add('active-header');
    })
    quizBtnLink.textContent = 'quiz';

    const resultBtn = createElement('li', 'result-btn');
    const resultBtnLink = createElement('a', 'result-btn-link');
    resultBtnLink.setAttribute('href', '#/result/');
    resultBtnLink.addEventListener('click', () => {
      route('#/result/');
      resultBtnLink.classList.add('active-header');
    })
    resultBtn.append(resultBtnLink);
    resultBtnLink.textContent = 'result';

    const galleryBtn = createElement('li', 'gallery-btn');
    const galleryBtnLink = createElement('a', 'gallery-btn-link');
    galleryBtnLink.setAttribute('href', '#/gallery/');
    galleryBtn.append(galleryBtnLink);
    galleryBtnLink.addEventListener('click', (e) => {
      galleryBtn.classList.add('active-header');
      route('#/gallery/');
      
    })
    galleryBtnLink.textContent = 'gallery';

    logoText.append(logoSpan);
    logo.append(logoImage, logoText);
    nav.append(mainBtn, quizBtn, resultBtn, galleryBtn);
    header.append(logo, nav);
    root.append(header);
  }
}