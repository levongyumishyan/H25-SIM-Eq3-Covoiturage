# Ride/w - Application de Covoiturage

![LOGO](app/assets/images/logo.png)

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
   npm install expo-dev-client
   npm install zustand
   ```
3. À partir de là, vous pouvez soit :
  * Démarrer l'application avec Expo (non recommandé) :
  
    ***MAPBOX ne fonctionnera PAS***

       - ```sh
         expo start
         ```
     - Scanner le QR Code avec l'application Expo Go (iOS/Android) ou exécuter sur un émulateur

  * Démarrer le téléphone émulé sur Android Studio
    
    - Sur Windows :
      + S'assurer que ANDROID_HOME est bien set dans les variables d'environnement du système
      + Vérifier que JAVA_HOME est bien avec une version jdk 17+

    - Build l'application dans le terminal :
        ```
        npx expo run:android
        ```
      Appuyer sur
       + "a" pour ouvrir l'application dans l'émulateur
       + "r" si ça ne charge pas
    - IMPORTANT : Windows limite la longueur des "paths" à 260 caractères, ceci pourrait causer un problème dans le build.
      Dans ce cas, vous pouvez
      + changez le dossier auquel est enregistré le repository git pour un path plus court,
      + OU consultez le lien suivant pour changer le paramètre sur votre OS. 
      Plus d'informations ici : https://learn.microsoft.com/en-us/windows/win32/fileio/maximum-file-path-limitation?tabs=powershell

4. Démarrer le serveur dans un autre terminal (dans le dossier 'backend'):
   ```sh
   node server.js
   ```  

## Setup et développement

1) Dans le dossier 'backend', créer un fichier '.env'.
2) Dans ce fichier, ajouter les lignes suivantes :
    * MONGO_URI = mongodb+srv://VOTRE_NOM_D_UTLISATEUR:VOTRE_MDP@ridew.xta2m.mongodb.net/?retryWrites=true&w=majority&appName=RideW
    * JWT_SECRET = VOTRE_CLÉE_SECRETE

3) Dans le fichier 'apiConfig.js', changez l'adresse IP.

Pour tester des requêtes HTTP manuellement :
- Avoir l'extension VSCode 'REST Client'
- Dans le dossier 'backend' -> test.http, écrire votre requête et cliquer sur 'Send request' en haut à gauche du code.

4) Dans le dossier principal,
   - créer un autre fichier '.env'.
   - Dans le fichier '.env', ajouter les lignes suivantes :
     + EXPO_PUBLIC_ACCESS_KEY = key
     + MAPBOX_DOWNLOAD_TOKEN = key

5) Dans le dossier android (quand un build a été fait):
   - créer le fichier 'local.properties'
   - Dans le fichier 'local.properties', ajoutez la ligne suivante :
     + sdk.dir=C:\\Users\\UserName\\AppData\\Local\\Android\\sdk
   
## Aide

Si vous rencontrez des problèmes, vous pouvez essayer les commandes suivantes :

- Réinstaller les dépendances :
  ```sh
  rm -rf node_modules && npm install
  ```
   * Si vous utilisez Windows, essayez plutôt la commande suivante :
      ``` sh
        npm install --force
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

Nous remercions le Collège du Bois de Boulogne pour avoir généreusement fourni ses ressources et son soutien pédagogique, avec une reconnaissance particulière pour les précieux conseils et consultations de Raouf Babari.

---

