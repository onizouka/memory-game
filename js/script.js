const image = [
    "imgDino/1.jpg",
    "imgDino/2.jpg",
    "imgDino/3.jpg",
    "imgDino/4.jpg",
    "imgDino/5.jpg",
    "imgDino/6.jpg",
    "imgDino/7.jpg",
    "imgDino/8.jpg",
    "imgDino/9.jpg",
    "imgDino/10.jpg",
];

let cards = [...image, ...image];
let flippedCard = [];
let lockBoard = false;
let counterVal = 0;

function incrementClick() {
  updateDisplay(++counterVal);
}

function resetCounter() {
  counterVal = 0;
  updateDisplay(counterVal);
}

function updateDisplay(val) {
  document.getElementById('counter-label').innerHTML = val;
}

function handleCardClick() {
    if (lockBoard || this.classList.contains('flipped')) return;
    this.classList.add("flipped");
    this.querySelector('img').style.display = 'block';
    flippedCard.push(this);
    if (flippedCard.length === 2) {
        incrementClick(); 
        lockBoard = true;
        setTimeout(checkForMatch, 1000);
    }
}
function checkForMatch() {
    const [card1, card2] = flippedCard;
    const img1 = card1.querySelector('img').src;
    const img2 = card2.querySelector('img').src;

    if (img1 === img2) {
        card1.removeEventListener('click', handleCardClick);
        card2.removeEventListener('click', handleCardClick);
        resetCards();

    } else {

        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            card1.querySelector('img').style.display = 'none';
            card2.querySelector('img').style.display = 'none';
            resetCards();
        }, 1000);
    }
}

function resetCards() {
    flippedCard = [];
    lockBoard = false;
}
        
    

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] =  [array[j], array[i]]
    }
    return array;
}
 
function createBoard() {
    const board = document.getElementById('plateau-de-jeu')
    board.innerHTML = '';
    shuffle(cards);
    // Construction de l'élément qui va accueillir les cartes
    cards.forEach((imgSrc, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        const img = document.createElement('img');
        img.src = imgSrc;
        img.style.display = 'none';
        card.appendChild(img);

        // Mise en place de l'évènement après sa construction
        card.addEventListener('click', handleCardClick);

        board.appendChild(card);
    });
}
window.onload = createBoard;
