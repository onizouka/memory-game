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

let cards = [...image, ...image];// Double le tableau pour avoir chaque image en double (paires)
let flippedCard = [];// Tableau pour stocker les deux cartes retournées
let lockBoard = false;// Empêche de retourner d'autres cartes pendant la vérification d'une paire
let counterVal = 0;// Compteur de coups

// Incrémente le compteur à chaque coup et met à jour l'affichage
function incrementClick() {
  updateDisplay(++counterVal);
}

// Réinitialise le jeu et le compteur
function resetGame() {
    resetCounter();// Remet le compteur à 0
    flippedCard = [];// Vide les cartes retournées
    lockBoard = false;// Débloque le plateau
    document.getElementById('messageVictoire').style.display = 'none';         // Cache le message de victoire
    createBoard();          // Remélange et réinitialise la grille de jeu
}

// Met à jour l'affichage du compteur
function updateDisplay(val) {
  document.getElementById('counter-label').innerHTML = val;
}

// Gère le clic sur une carte
function handleCardClick() {
    // Si le plateau est bloqué ou si la carte est déjà retournée, on ne fait rien
    if (lockBoard || this.classList.contains('flipped')) return;
    this.classList.add("flipped");// Ajoute la classe flipped pour l'effet visuel
    this.querySelector('img').style.display = 'block';// Affiche l'image de la carte
    flippedCard.push(this);// Ajoute la carte retournée au tableau

    // Si deux cartes sont retournées
    if (flippedCard.length === 2) {// Récupère les deux cartes retournées
        incrementClick(); 
        lockBoard = true;
        setTimeout(checkForMatch, 500);
    }
}
function checkForMatch() {
    const [card1, card2] = flippedCard;
    const img1 = card1.querySelector('img').src;
    const img2 = card2.querySelector('img').src;

    if (img1 === img2) {
        // Si les images sont identiques, on désactive le clic sur ces cartes
        card1.removeEventListener('click', handleCardClick);
        card2.removeEventListener('click', handleCardClick);
        resetCards();// Réinitialise le tableau flippedCard et débloque le plateau
        checkVictory();// Vérifie si la partie est gagnée
    } else {
// Si les images sont différentes, on les retourne face cachée après 1s
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            card1.querySelector('img').style.display = 'none';
            card2.querySelector('img').style.display = 'none';
            resetCards();// Réinitialise le tableau flippedCard et débloque le plateau
        }, 1000);
    }
}
function checkVictory(){ 
    // Vérifie si toutes les cartes sont retournées (victoire)
        const allCards = document.querySelectorAll('.card');
        const allFlipped = [...allCards].every(card => card.classList.contains('flipped'));
    if (allFlipped) {
        // Afficher un effet ou un message
        document.getElementById('messageVictoire').style.display = 'block';
        // Optionnel : animation, confettis, etc.
    }
}

// Réinitialise le tableau des cartes retournées et débloque le plateau
function resetCards() {
    flippedCard = [];
    lockBoard = false;
}
        
    
// Mélange le tableau passé en paramètre (algorithme de Fisher-Yates)
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] =  [array[j], array[i]]
    }
    return array;
}
 // Crée le plateau de jeu et ajoute les cartes mélangées
function createBoard() {
    const board = document.getElementById('plateau-de-jeu')
    board.innerHTML = '';// Vide le plateau
    shuffle(cards); // Mélange les cartes

    // Pour chaque image, crée une carte
    cards.forEach((imgSrc, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        const img = document.createElement('img');
        img.src = imgSrc;
        img.style.display = 'none';// Cache l'image au début
        card.appendChild(img);

        // Ajoute l'événement de clic à la carte
        card.addEventListener('click', handleCardClick);

        board.appendChild(card);// Ajoute la carte au plateau
    });
}
// Réinitialise le compteur de coups
function resetCounter() {
         counterVal = 0;
         updateDisplay(counterVal);
}
// Fonction exécutée au chargement de la page
        window.onload = function() {
            createBoard ();
// Ajoute l'événement de réinitialisation si le bouton existe
            const resetBtn = document.querySelector('.dropbtnr');
            if(resetBtn) {
                resetBtn.addEventListener('click', resetGame);
            }
}
// Enregistre le score du joueur dans le localStorage
function enregistrerScore() {
  const pseudo = sessionStorage.getItem("pseudoJoueur");// Récupère le pseudo du joueur
  if (!pseudo) {
    alert("Veuillez vous connecter pour enregistrer votre score.");
    return;
  }

  // Récupère le score final
  const scoreFinal = parseInt(document.getElementById('counter-label').textContent);
   // Récupère la liste des joueurs depuis le localStorage
  let joueurs = JSON.parse(localStorage.getItem("joueurs")) || [];
  // Cherche le joueur actuel dans la liste
  let joueur = joueurs.find(j => j.pseudo === pseudo);
  if (joueur) {
    joueur.score = scoreFinal;// Met à jour le score si le joueur existe déjà
  } else {
    joueurs.push({ pseudo, score: scoreFinal }); // Sinon, ajoute le joueur
  }
  localStorage.setItem("joueurs", JSON.stringify(joueurs));// Sauvegarde la liste
  alert("Score enregistré !");
}

// Appelle cette fonction à la fin de la partie, dans checkVictory()
function checkVictory() {
  const allCards = document.querySelectorAll('.card');
  const allFlipped = [...allCards].every(card => card.classList.contains('flipped'));
  if (allFlipped) {
    document.getElementById('messageVictoire').style.display = 'block';
    enregistrerScore(); 
  }
}