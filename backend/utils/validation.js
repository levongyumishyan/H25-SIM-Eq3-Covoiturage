const mdpTailleMin = 6;

function verifierMotDePasse(mdp) {
  const erreurs = [];

  if (mdp.length < mdpTailleMin) {
    erreurs.push(`Le mot de passe doit contenir au moins ${mdpTailleMin} caractères`);
  }

  if (!/[A-Z]/.test(mdp)) {
    erreurs.push("Le mot de passe doit contenir au moins une majuscule");
  }

  if (!/[a-z]/.test(mdp)) {
    erreurs.push("Le mot de passe doit contenir au moins une minuscule");
  }

  if (!/[0-9]/.test(mdp)) {
    erreurs.push("Le mot de passe doit contenir au moins un chiffre");
  }

  if (!/[!@#$%^&*]/.test(mdp)) {
    erreurs.push("Le mot de passe doit contenir au moins un caractère spécial (!@#$%^&*)");
  }

  return erreurs;
}

module.exports = { verifierMotDePasse };