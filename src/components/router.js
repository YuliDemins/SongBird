import createStartPage from "./pages/main";
import createQuiz from "./pages/quiz";
import header from './header/header.js';
import footer from './footer/footer.js';
import createResultPage from "./pages/result";
import createGallery from './pages/gallery';

let root = document.getElementById('root');

export default function route(location) {
switch (location) {
  case '#/':
    root.innerHTML= ``;
    header.setHeader();
    createStartPage();
    footer.setFooter();
    break

    case '#/quiz/':
      root.innerHTML = ``;
      header.setHeader();
      createQuiz();
      footer.setFooter();
      break

    case '#/result/':
      root.innerHTML = ``;
      header.setHeader();
      createResultPage();
      footer.setFooter();
      break

    case '#/gallery/':
      root.innerHTML = ``;
      header.setHeader();
      createGallery();
      footer.setFooter();
      break
  }
};

  window.addEventListener('load', ()=> {
    const location = window.location.hash;
    if (location) route(location);
  });