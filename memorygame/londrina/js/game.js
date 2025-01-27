const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');

const characters = [
  'carlos_alberto_garcia',
  'marinho',
  'cesar',
  'zequinha',
  'germano',
  'celsinho',
  'neneca',
  'gauchinho',
  'dirceu',
  'marcio_alcantara',
  ];

//referencias das imagens:
//carlos_alberto_garcia: https://www.ogol.com.br/jogador/carlos-alberto-garcia/428717
//marinho: 
//cesar: https://www.lance.com.br/palmeiras/encaminha-contratacao-goleiro-cesar-londrina.html
//zequinha: https://terceirotempo.uol.com.br/que-fim-levou/zequinha-1953
//germano: https://ge.globo.com/pr/futebol/times/londrina/noticia/2016/11/depois-de-idas-e-vindas-germano-vira-o-simbolo-do-londrina-na-retomada.html
//celsinho: https://ric.com.br/esportes/futebol/londrina-se-reapresenta-de-olho-no-inicio-do-campeonato-paranaense/
//neneca: https://www.futebolinterior.com.br/luto-morre-neneca-goleiro-campeao-brasileiro-com-o-guarani/
//gauchinho: https://terceirotempo.uol.com.br/que-fim-levou/gauchinho-ex-atacante-do-londrina-773
//dirceu: https://www.londrinaesporteclube.com.br/noticia/2019/10/25/londrina-busca-manter-a-escalada-na-tabela-em-desafio-diante-do-oeste-no-estadio-do-cafe
//marcio_alcantara: https://www.youtube.com/watch?v=n_VkBGv0Goc

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
