# Ride/w - Application de Covoiturage

![LOGO](temp_logo.png)

## Description

Ride/w est une application de covoiturage conçue pour simplifier et améliorer l'expérience de covoiturage au Québec. Elle permet aux utilisateurs de trouver et de proposer des trajets en toute simplicité, tout en favorisant une mobilité plus durable et économique.

## Développé par

- **Charles Lesage**
- **Levon Gyumishyan**
- **Johnny Quach**
- **Alexandre Lupascu**

## Prérequis

Pour exécuter et développer le projet, vous aurez besoin des éléments suivants :

- **Expo** : Un framework pour les applications React Native
- **Node.js** : Environnement d'exécution JavaScript
- **Système d'exploitation compatible** : macOS, Linux ou Windows

## Installation

### 💻 Installation (Linux, macOS, Windows)

#### 1️⃣ Installer Node.js

- **macOS & Windows** :
  - Téléchargez et installez Node.js depuis le site officiel [Node.js](https://nodejs.org/)
- **Linux (Ubuntu/Debian)** :
  ```sh
  sudo apt update
  sudo apt install nodejs npm
  ```

#### 2️⃣ Installer Expo CLI

Installez Expo CLI globalement en utilisant npm ou yarn :
```sh
npm install -g expo-cli
```

## Exécution de l'application

1. Ouvrir un terminal et naviguer dans le dossier du projet :
   ```sh
   cd chemin/vers/le/projet
   ```
2. Installer les dépendances :
   ```sh
   npm install
   ```
   * Si vous utilisez Windows, il faudrait utiliser plutôt la commande suivante :
    ``` sh
    npm install --force
    ```
3. Démarrer l'aplication Expo :
   ```sh
   expo start
   ```
4. Scanner le QR Code avec l'application Expo Go (iOS/Android) ou exécuter sur un émulateur


5. Démarrer le serveur :
```sh
   node server.js
   ```  

## Setup et developpement

Dans le dossier 'backend', créer un fichier '.env'. Dans ce fichier, ajouter les lignes suivantes :
    MONGO_URI = mongodb+srv://VOTRE_NOM_D_UTLISATEUR:VOTRE_MDP@ridew.xta2m.mongodb.net/?retryWrites=true&w=majority&appName=RideW
    JWT_SECRET = VOTRE_CLÉE_SECRETE

Pour tester des requêtes HTTP manuellement :
    - Avoir l'extension VSCode 'REST Client'
    - Dans /backend -> test.http, écrire votre requête et cliquer sur 'Send request en haut à gauche du code.


## Aide

Si vous rencontrez des problèmes, vous pouvez essayer les commandes suivantes :

- Réinstaller les dépendances :
  ```sh
  rm -rf node_modules && npm install
  ```
- Réinitialiser le cache Expo :
  ```sh
  expo start -c
  ```

## Auteurs

- **Charles Lesage** - [@ma17du32et422](https://github.com/ma17du32et422)
- **Gyumishyan, Levon** - [@levongyumishyan](https://github.com/levongyumishyan)
- **Quach, Johnny** - [@6235953](https://github.com/6235953)
- **Lupascu, Alexandre** - [@alexandrelupascu](https://github.com/alexandrelupascu)

## Licence

Ce projet est sous licence **MIT license**. Consultez le fichier `LICENSE.md` pour plus de détails.

## Remerciements

Nous remercions le Collège du Bois de Boulogne pour avoir généreusement fourni ses ressources et son soutien pédagogique, avec une reconnaissance particulière pour les précieux conseils et consultations de Rauf Babari.

---


