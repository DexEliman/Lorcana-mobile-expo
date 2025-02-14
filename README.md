# Application Mobile Lorcana

## Structure du Projet

Ce projet est structuré comme suit :

- **src/** : Répertoire principal pour le code de l'application.
  - **components/** : Contient les composants réutilisables pour l'application.
  - **screens/** : Contient les différentes écrans de l'application.
  - **context/** : Contient l'API Context pour la gestion de l'état global.
  - **api/** : Contient les appels API et les configurations.
  - **assets/** : Contient les images et autres fichiers statiques.

## Description des Répertoires

- **components/** : Ce répertoire contiendra tous les composants réutilisables qui peuvent être utilisés à travers différents écrans.
- **screens/** : Ce répertoire contiendra les divers écrans de l'application, tels que l'écran de connexion, d'inscription et de gestion des cartes.
- **context/** : Ce répertoire gérera l'état global de l'application en utilisant l'API Context.
- **api/** : Ce répertoire gérera tous les appels API et les configurations pour interagir avec le backend.
- **assets/** : Ce répertoire stockera les images et autres fichiers statiques utilisés dans l'application.

## Fonctionnalités de l'Application

L'application inclut les fonctionnalités suivantes :
1. **Authentification** :
   - Inscription
   - Connexion
   - Déconnexion

2. **Gestion des Cartes** :
   - Afficher les cartes d'un chapitre
   - Filtrer et rechercher les cartes
   - Ajouter des cartes à la collection

3. **Gestion des Chapitres** :
   - Afficher la liste des chapitres

4. **Wishlist** :
   - Ajouter ou retirer des cartes de la wishlist

## Démarrage du Projet

Pour démarrer l'application, exécutez les commandes suivantes :

1. Naviguez vers le répertoire du projet :
   ```bash
   cd Lorcana
   ```

2. Démarrez le serveur de développement :
   ```bash
   npm start
   ```

Cela lancera l'environnement de développement Expo.
