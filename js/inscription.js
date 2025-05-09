document.getElementById("form-inscription").addEventListener("submit", function(e) {
  e.preventDefault(); // Empêche la page de se recharger

  // Récupère les valeurs du formulaire
  const nom = document.getElementById("idNom").value;
  const prenom = document.getElementById("idPrenom").value;
  const pseudo = document.getElementById("idPseudo").value;
  const email = document.getElementById("idEmail").value;
  const tel = document.getElementById("idTel").value;
  const mdp = document.getElementById("idMotDePasse").value;
  // Récupère la liste des joueurs déjà enregistrés
  let joueurs = JSON.parse(localStorage.getItem("joueurs")) || [];

  // Ajoute le nouveau joueur
  joueurs.push({ nom, prenom, pseudo, email, tel, mdp, score: 0});

  // Enregistre la liste mise à jour
  localStorage.setItem("joueurs", JSON.stringify(joueurs));

  // Confirme l’enregistrement
  alert("Inscription réussie !");
});