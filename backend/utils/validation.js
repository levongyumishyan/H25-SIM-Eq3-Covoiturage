/**
 * Taille minimale requise pour un mot de passe.
 * @constant {number}
 */
const mdpTailleMin = 6;

/**
 * Vérifie si un mot de passe respecte les critères de sécurité :
 * - Longueur minimale de 6 caractères
 * - Contient au moins une majuscule
 * - Contient au moins une minuscule
 * - Contient au moins un chiffre
 * - Contient au moins un caractère spécial (!@#$%^&*)
 *
 * @function
 * @param {string} mdp - Le mot de passe à vérifier
 * @returns {string[]} - Un tableau contenant les messages d'erreur. Vide si le mot de passe est valide.
 */
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