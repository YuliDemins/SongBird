import { createStartPage } from '../pages/main/main';
import { createQuiz } from '../pages/quiz/quiz';
import { createResultPage } from '../pages/result/result';
import { createGallery } from '../pages/gallery/gallery';
import { createPage } from '../index.js';

export async function route(location) {
  switch (location) {
    case '#/':
      createPage(createStartPage);
      break;

    case '#/quiz/':
      createPage(createQuiz);
      break;

    case '#/result/':
      createPage(createResultPage);
      break;

    case '#/gallery/':
      createPage(createGallery);
      break;
  }
}

window.addEventListener('load', () => {
  const location = window.location.hash;
  if (location) route(location);
});
