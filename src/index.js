import './style.scss';
import './assets/svg/rsschool.svg';
import { setHeader } from './components/header/header.js';
import { createStartPage } from './pages/main/main';
import { setFooter } from './components/footer/footer.js';
let root = document.getElementById('root');

export function createPage(page) {
  root.innerHTML = ``;
  setHeader();
  page();
  setFooter();
}

createPage(createStartPage);
