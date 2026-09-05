# TodoList React

Ce projet est une application front-end de gestion de tâches développée avec React et Vite. Il ne s’agit plus d’un simple prototype : l’interface actuelle inclut un tableau de bord, des filtres, des cartes de tâches, une validation de formulaire et un calendrier interactif.

## 🚀 Fonctionnalités actuellement présentes

- Ajout d’une nouvelle tâche via une modale
- Affichage des tâches sous forme de cartes
- Cocher / décocher une tâche comme terminée
- Modifier le titre d’une tâche
- Supprimer une tâche
- Filtrage par statut : toutes, à faire, terminées
- Notification visuelle après l’ajout d’une tâche
- Menu latéral avec navigation simple
- Calendrier interactif avec sélection de date
- Indicateur de progression globale des tâches
- Interface responsive en style moderne

## 🧩 Composants principaux

- src/App.jsx : gestion de l’état global, filtres, menu, calendrier et progression
- src/TaskReceiver.jsx : formulaire d’ajout avec validation de saisie
- src/Taskcontainer.jsx : liste des tâches et actions sur chaque carte
- src/main.jsx : point d’entrée de l’application
- src/index.css : styles globaux et base Tailwind

## 🛠️ Stack technique

- React 19
- Vite 8
- Tailwind CSS 4
- React Icons
- date-fns
- react-day-picker
- ESLint

## 📁 Structure du projet

- src/App.jsx : logique principale de l’application
- src/TaskReceiver.jsx : modale de création de tâche
- src/Taskcontainer.jsx : conteneur et cartes de tâches
- src/index.css : configuration visuelle globale
- public/ : fichiers statiques

## ▶️ Installation et lancement

1. Installer les dépendances :
   ```bash
   npm install
   ```

2. Démarrer le serveur de développement :
   ```bash
   npm run dev
   ```

3. Ouvrir l’application dans le navigateur à l’URL affichée par Vite.

## 📦 Scripts disponibles

- npm run dev : lance le serveur de développement
- npm run build : construit la version de production
- npm run preview : prévisualise la build
- npm run lint : vérifie le projet avec ESLint

## 📝 État du projet

Le projet correspond actuellement à un MVP visuel et fonctionnel de gestion de tâches avec interface dashboard. Les fonctionnalités déjà intégrées dépassent le simple écran de liste et montrent une base solide pour la suite.

Les améliorations restantes concernent surtout :

- la persistance des données dans le navigateur
- l’association d’une date et d’une heure à chaque tâche
- l’affichage des tâches selon la date sélectionnée dans le calendrier
- une vue calendrier plus avancée inspirée de Google Calendar
- la gestion plus robuste des identifiants après suppression

## ✅ Ce qui a été ajouté par rapport au README précédent

- dashboard d’accueil moderne
- menu latéral
- filtres de tâches
- cartes de tâches avec actions
- modification en ligne
- bouton de suppression
- notification de confirmation
- calendrier interactif
- indicateur de progression
- intégration de react-day-picker et date-fns
