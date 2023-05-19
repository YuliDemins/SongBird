export function createElement(elementTag, elementClass, content) {
  const element = document.createElement(elementTag);
  if(elementClass) {
    element.classList.add(elementClass);
  }
  if(content) {
    element.textContent = content;
  }
  return element;
}

  export function setCard(arr, title, species, image, audio, info) {
    title.textContent = arr['name'];
    species.textContent = arr['species'];
    image.style.backgroundImage = `url(${arr['image']})`;
    audio.src = arr['audio'];
    info.textContent = arr['description'];
  }

  export function removeCard(title, species, image, audio, info) {
    title.textContent = 'Послушайте плеер. Выберите птицу из списка';
    species.textContent = '';
    image.classList.add('inactive');
    audio.classList.add('inactive');
    info.textContent = '';
  }