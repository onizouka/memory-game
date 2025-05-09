// Ajoute un écouteur d'événement sur le bouton de connexion
document.getElementById("btnConnexion").addEventListener("click", function() {
    // Récupère les valeurs saisies dans les champs "pseudo" et "mot de passe"
    const pseudo = document.getElementById("idPseudo").value;
    const mdp = document.getElementById("idMdp").value;

    // Récupère la liste des joueurs depuis le localStorage, ou un tableau vide si aucun joueur n'est enregistré
    let joueurs = JSON.parse(localStorage.getItem("joueurs")) || [];
    // Cherche un joueur dont le pseudo et le mot de passe correspondent à ceux saisis
    let joueur = joueurs.find(j => j.pseudo === pseudo && j.mdp === mdp);

    if (joueur) {
        // Si le joueur existe, enregistre le pseudo dans le sessionStorage pour garder la connexion active
        sessionStorage.setItem("pseudoJoueur", pseudo);
        // Affiche le profil du joueur connecté
        afficherProfil(joueur);
    } else {
        // Si aucun joueur ne correspond, affiche une alerte d'erreur
        alert("Pseudo ou mot de passe incorrect !");
    }
});

// Ajoute un écouteur d'événement sur le bouton de déconnexion
document.getElementById("btnDeconnexion").addEventListener("click", function() {
    // Supprime le pseudo du joueur du sessionStorage (déconnexion)
    sessionStorage.removeItem("pseudoJoueur");
    // Affiche le formulaire de connexion
    document.getElementById("form-connexion").style.display = "block";
    // Cache le profil du joueur
    document.getElementById("profil-joueur").style.display = "none";
});

// Fonction pour afficher le profil du joueur connecté
function afficherProfil(joueur) {
    // Cache le formulaire de connexion
    document.getElementById("form-connexion").style.display = "none";
    // Affiche la section du profil du joueur
    document.getElementById("profil-joueur").style.display = "block";
    // Affiche le pseudo du joueur dans l'élément prévu
    document.getElementById("affPseudo").textContent = joueur.pseudo;
    // Affiche le score du joueur dans l'élément prévu
    document.getElementById("affScore").textContent = joueur.score;
}

// Au chargement de la page, vérifie si un joueur est déjà connecté
window.onload = function() {
    // Récupère le pseudo du joueur connecté depuis le sessionStorage
    const pseudo = sessionStorage.getItem("pseudoJoueur");
    if (pseudo) {
        // Récupère la liste des joueurs depuis le localStorage
        let joueurs = JSON.parse(localStorage.getItem("joueurs")) || [];
        // Cherche le joueur correspondant au pseudo
        let joueur = joueurs.find(j => j.pseudo === pseudo);
        if (joueur) {
            // Si le joueur existe, affiche son profil directement
            afficherProfil(joueur);
        }
    }
};