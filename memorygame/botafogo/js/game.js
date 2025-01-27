const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');

const characters = [
  'junior_santos',
  'loco_abreu',
  'tulio_maravilha',
  'paulinho_criciuma',
  'heleno_defreitas',
  'garrincha',
  'zagallo',
  'nilton_santos',
  'jefferson',
  'john',
  ];

//referencias das imagens:
//junior_santos: https://www.uol.com.br/esporte/colunas/mercado-da-bola/2025/01/17/atletico-mg-encaminha-a-contratacao-do-atacante-junior-santos--do-botafogo.htm
//loco_abreu: https://ca.pinterest.com/pin/807481408173072014/
//tulio_maravilha: 
//paulinho_criciuma: https://x.com/TamminenJuha/status/1249364105867264000?lang=bg
//heleno_defreitas: https://pt.wikipedia.org/wiki/Heleno_de_Freitas
//garrincha: https://imortaisdofutebol.com/craque-imortal-garrincha/
//zagallo: https://odia.ig.com.br/esporte/2024/01/6691612-lenda-do-futebol-brasileiro-zagallo-morre-aos-92-anos.html
//nilton_santos: https://imortaisdofutebol.com/craque-imortal-nilton-santos/
//jefferson: https://pt.wikipedia.org/wiki/Jefferson_de_Oliveira_Galv%C3%A3o
//john: https://www.instagram.com/johnvictor/

const createElement = (tag, className) => {
  const element = document.createElement(tag);
  element.className = className;
  return element;
}

let firstCard = '';
let secondCard = '';

const checkEndGame = () => {
  const disabledCards = document.querySelectorAll('.disabled-card');

  if (disabledCards.length === 20) {
    clearInterval(this.loop);
    alert(`Parabéns, ${spanPlayer.innerHTML}! Seu tempo foi de: ${timer.innerHTML}`);
  }
}

const checkCards = () => {
  const firstCharacter = firstCard.getAttribute('data-character');
  const secondCharacter = secondCard.getAttribute('data-character');

  if (firstCharacter === secondCharacter) {

    firstCard.firstChild.classList.add('disabled-card');
    secondCard.firstChild.classList.add('disabled-card');

    firstCard = '';
    secondCard = '';

    checkEndGame();

  } else {
    setTimeout(() => {

      firstCard.classList.remove('reveal-card');
      secondCard.classList.remove('reveal-card');

      firstCard = '';
      secondCard = '';

    }, 500);
  }

}

const revealCard = ({ target }) => {

  if (target.parentNode.className.includes('reveal-card')) {
    return;
  }

  if (firstCard === '') {

    target.parentNode.classList.add('reveal-card');
    firstCard = target.parentNode;

  } else if (secondCard === '') {

    target.parentNode.classList.add('reveal-card');
    secondCard = target.parentNode;

    checkCards();

  }
}

const createCard = (character) => {

  const card = createElement('div', 'card');
  const front = createElement('div', 'face front');
  const back = createElement('div', 'face back');

  front.style.backgroundImage = `url('../images/${character}.png')`;

  card.appendChild(front);
  card.appendChild(back);

  card.addEventListener('click', revealCard);
  card.setAttribute('data-character', character)

  return card;
}

const loadGame = () => {
  const duplicateCharacters = [...characters, ...characters];

  const shuffledArray = duplicateCharacters.sort(() => Math.random() - 0.5);

  shuffledArray.forEach((character) => {
    const card = createCard(character);
    grid.appendChild(card);
  });
}

const startTimer = () => {

  this.loop = setInterval(() => {
    const currentTime = +timer.innerHTML;
    timer.innerHTML = currentTime + 1;
  }, 1000);

}

window.onload = () => {
  spanPlayer.innerHTML = localStorage.getItem('player');
  startTimer();
  loadGame();
}
