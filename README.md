# Lorcana Mobile Expo

## 🔄 Introduction
Lorcana Mobile Expo est une application mobile construite avec **React Native** et **Expo**, utilisant **Expo Router** pour la navigation et **Context API** pour la gestion de l'état global. Elle permet aux utilisateurs de gérer leur collection de cartes Lorcana, suivre leurs chapitres, et créer une wishlist.

## 📁 Structure du projet
Le projet suit une architecture modulaire avec Expo Router pour organiser les pages sous le dossier **app/**.

```
lorcana-app/
│── app/                   # Dossier principal pour Expo Router
│   │── (tabs)/            # Groupe d'onglets pour la navigation principale
│   │   │── collection.jsx  # Page Collection
│   │   │── wishlist.jsx    # Page Wishlist
│   │── index.jsx           # Page d'accueil (anciennement Welcome)
│   │── _layout.jsx         # Layout principal
│   │── login.jsx           # Page de connexion
│   │── register.jsx        # Page d'inscription
│── context/                # Gestion de l'état global
│   │── AuthContext.js      # Contexte d'authentification
│   │── CollectionContext.js# Contexte de collection de cartes
│   │── WishlistContext.js  # Contexte de wishlist
│── components/             # Composants réutilisables
│── assets/                 # Images et ressources statiques
│── package.json            # Dépendances et scripts
│── app.json                # Configuration Expo
```

## 🗂 Fonctionnalités principales
- **Authentification** : Inscription, connexion, et gestion des sessions.
- **Collection de cartes** : Affichage des cartes possédées et ajout de nouvelles cartes.
- **Wishlist** : Gestion des cartes souhaitées.
- **Chapitres** : Organisation et suivi des chapitres Lorcana.
- **Navigation avec Expo Router** : Organisation des pages et navigation fluide.

## 🌐 Installation et exécution
### 1. Cloner le projet
```sh
git clone https://github.com/ton-repo/lorcana-app.git
cd lorcana-app
```

### 2. Installer les dépendances
```sh
yarn install  # ou npm install
```

### 3. Lancer l'application
```sh
npx expo start
```
Ouvrir l'application avec **Expo Go** sur un appareil physique ou un émulateur.

## 🤖 Contexte et gestion de l'état
L'application utilise **Context API** pour gérer l'état global. Voici les principaux contextes :

- **AuthContext.js** : Stocke les informations d'utilisateur et l'état de connexion.
- **CollectionContext.js** : Gère la collection de cartes.
- **WishlistContext.js** : Gère les cartes ajoutées à la wishlist.

## ⚖️ Problèmes courants et solutions
### ⚠️ "This screen doesn't exist."
- Assurez-vous que **index.jsx** est bien placé dans **app/**.
- Vérifiez les erreurs de nommage des fichiers.

### ⚠️ "Element type is invalid..."
- Vérifiez que tous les composants sont bien exportés et importés.
- Erreur courante :
  ```js
  import CollectionProvider from './context/CollectionContext'; // ❌ Erreur
  import { CollectionProvider } from './context/CollectionContext'; // ✅ Correct
  ```

### ⚠️ "Identifier has already been declared"
- Assurez-vous que chaque fichier de contexte **n'exporte pas plusieurs fois** la même variable.

## 💪 Contribution
Les contributions sont les bienvenues ! Forkez le projet et proposez vos améliorations.

## 🏁 Conclusion
Lorcana Mobile Expo vise à offrir une expérience simple et efficace pour gérer sa collection Lorcana. N'hésitez pas à proposer des améliorations et à signaler des bugs.

---

✨ **Bon codage et amuse-toi avec Lorcana !** 🚀



Documentation faite par moi amelioration faite par chat gpt mdr--
