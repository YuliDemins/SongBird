import { createElement } from "../utils.js";
import { route } from '../router.js';

export function setHeader() {
    
const header = createElement('div', 'header');
    const logo = createElement('div', 'logo');
    const logoImage = createElement('div', 'logo-image');
    const logoText = createElement('div', 'logo-text', 'Song');
    const logoSpan = createElement('span', 'logo-text-span', 'Bird');
    
    const nav = createElement('ul', 'nav');

    const routeLink = [
      {
        name: 'main',
        route: '#/'
      },
      {
        name: 'quiz',
        route: '#/quiz/'
      },
      {
        name: 'result',
        route: '#/result/'
      },
      {
        name: 'gallery',
        route: '#/gallery/'
      }
    ]

    routeLink.forEach((link) => {
      const navlink = createElement('li', `${link.name}-btn`);
      const btn = createElement('a', `${link.name}-btn-link`, link.name);
      btn.setAttribute('href', link.route);
      btn.addEventListener('click', () => route(link.route));
      navlink.append(btn);
      nav.append(navlink);
    })

    logoText.append(logoSpan);
    logo.append(logoImage, logoText);
    header.append(logo, nav);
    root.append(header);
  }
