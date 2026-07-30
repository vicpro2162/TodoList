# TodoList React

Ce projet est une application front-end React/Vite dédiée à une interface de gestion de tâches. Il s’agit actuellement d’un prototype UI basé sur des composants React pour afficher une liste de tâches, saisir une nouvelle tâche et proposer des actions de validation ou d’annulation.

## 🚀 Fonctionnalités actuelles

- Interface de base pour une application de type Todo List
- Composants React séparés pour l’en-tête, le formulaire d’ajout et la liste des tâches
- Style moderne avec Tailwind CSS
- Configuration Vite prête pour le développement local

## 🛠️ Stack technique

- React 19
- Vite 8
- Tailwind CSS 4
- React Icons
- ESLint

## 📁 Structure du projet

- src/App.jsx : composant principal et bouton réutilisable
- src/TaskReceiver.jsx : fenêtre contextuelle de saisie de la tâche et boutons d’action
- src/Taskcontainer.jsx : conteneur de la liste des tâches
- src/main.jsx : point d’entrée de l’application

## ▶️ Installation et lancement

1. Installer les dépendances :
   ```bash
   npm install
   ```

2. Démarrer le serveur de développement :
   ```bash
   npm run dev
   ```

3. Ouvrir l’application dans votre navigateur à l’adresse indiquée par Vite.

## 📦 Scripts disponibles

- npm run dev : lance le serveur de développement
- npm run build : génère la version de production
- npm run preview : prévisualise la build
- npm run lint : exécute ESLint sur le projet

## 📝 Notes

Le projet est actuellement en phase de prototypage de l’interface. La logique complète de gestion des tâches peut être ajoutée ensuite selon les besoins du produit.
