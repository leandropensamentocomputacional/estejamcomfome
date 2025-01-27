const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');

const characters = [
  'ronaldo_fenomeno',
  'rivellino',
  'cassio',
  'dida',
  'basilio',
  'guerrero',
  'wladimir',
  'neto',
  'marcelinho_carioca',
  'socrates',
  ];

//referencias das imagens:
//cassio: https://www.corinthians.com.br/noticias/gigante-historico-cassio-completa-400-jogos-pelo-corinthians
//ronaldo_fenomeno: https://br.pinterest.com/pin/277252920797324943/
//rivellino: https://ge.globo.com/futebol/times/corinthians/noticia/2013/04/rivellino-agradece-homenagem-do-corinthians-camisa-linda.html
//socrates: https://todopoderosotimao.com.br/p_idolos/socrates.php
//marcelinho_carioca: https://www.instagram.com/frasescoringao/p/DEQgR4EPVG-/?img_index=1
//neto: https://centraldotimao.com.br/noticias-do-corinthians-o-craque-neto-faz-54-anos-relembre-momentos-em-fotos-e-videos/
//basilio: https://blogdopaulinho.com.br/2017/05/01/quanto-vale-a-camisa-do-autor-do-gol-mais-importante-da-historia-do-corinthians/
//dida: https://www.instagram.com/didapenta/p/CxT_1-yMHnT/
//guerrero: https://www.terra.com.br/esportes/corinthians/indeciso-guerrero-assume-vontade-de-voltar-a-europa,686f92ad0513b410VgnCLD200000b1bf46d0RCRD.html
//wladimir: https://jovempan.com.br/esportes/membro-da-democracia-wladimir-elogia-fim-de-concentracao-no-atletico-mg.html

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
