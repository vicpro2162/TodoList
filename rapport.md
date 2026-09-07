# Rapport d'activités

**Entreprise :** ID To Real  
**Date :** 4 septembre 2026  
**Lieu :** Lomé, Togo  
**Auteur :** Victorien ATSOU

## Objectif

L'objectif de cette journée était de faire évoluer l'interface et les fonctionnalités de l'application de gestion de tâches afin de finaliser le MVP et de préparer les prochaines étapes du projet.

## Travaux réalisés

### 1. Finalisation des fonctionnalités principales du MVP

- Implémentation de l'ajout d'une tâche depuis une fenêtre de saisie.
- Affichage des tâches sous forme de cartes individuelles.
- Possibilité de marquer une tâche comme terminée et de la réactiver.
- Ajout de la modification du titre d'une tâche.
- Ajout de la suppression d'une tâche.
- Mise en place d'un filtrage par statut : toutes les tâches, tâches à faire et tâches terminées.
- Ajout d'une validation empêchant l'enregistrement d'une tâche vide.

### 2. Amélioration de l'interface utilisateur

- Migration du rendu vers une interface basée sur Tailwind CSS.
- Création de cartes de tâches avec un espacement visuel régulier.
- Ajout de boutons d'action pour modifier, enregistrer, annuler et supprimer une tâche.
- Mise en place d'une notification de succès stylisée après l'ajout d'une tâche.
- Ajout d'un message d'erreur stylisé pour les saisies invalides.
- Adaptation de l'interface aux différentes tailles d'écran.

### 3. Mise en place de la navigation

- Remplacement de la barre de navigation visible par un menu hamburger.
- Ajout d'un panneau latéral qui s'ouvre avec une animation.
- Ajout d'un voile de fond avec effet de flou lors de l'ouverture du menu.
- Conservation des entrées principales « Tâches » et « Paramètres ».

### 4. Intégration d'un calendrier interactif

- Installation et intégration de la bibliothèque `react-day-picker`.
- Ajout de la bibliothèque `date-fns` pour la localisation française.
- Mise en place de la sélection d'une date.
- Ajout de la navigation entre les mois.
- Intégration du calendrier dans la colonne latérale de l'interface.
- Préparation de la future association entre les dates sélectionnées et les tâches.

### 5. Organisation de l'interface selon la maquette

- Création d'une structure en trois zones : navigation, contenu principal et panneau latéral.
- Ajout d'une section de progression globale des tâches.
- Mise en place d'un en-tête avec message d'accueil et bouton de création de tâche.
- Adaptation de l'affichage pour correspondre à la maquette papier du projet.

### 6. Documentation et suivi du projet

- Création du fichier `progress.md` pour suivre l'état d'avancement des fonctionnalités.
- Création du fichier `logique.md` sous forme de cours expliquant la logique React du projet.
- Ajout de commentaires d'orientation dans les principaux composants.
- Mise à jour du fichier `.gitignore` afin d'ignorer `logique.md`.
- Création d'un commit Git regroupant l'évolution de l'interface et des fonctionnalités.

## Résultats obtenus

À l'issue de cette journée :

- Le MVP comprend l'ajout, l'affichage, la coche, la réactivation, la modification, la suppression et le filtrage des tâches.
- L'interface possède désormais un rendu moderne, responsive et basé sur Tailwind CSS.
- Les tâches sont présentées sous forme de cartes avec des actions dédiées.
- La navigation est accessible depuis un menu hamburger.
- Un calendrier interactif en français est disponible dans l'interface.
- La progression globale des tâches est affichée.
- Les validations et notifications sont intégrées à l'expérience utilisateur.
- Le code a été documenté et l'avancement du projet est suivi dans un fichier dédié.
- Les commandes `npm run lint` et `npm run build` ont été validées avec succès.

## Prochaines étapes

- Ajouter la sauvegarde des tâches avec `localStorage`.
- Associer une date et une heure à chaque tâche.
- Afficher les tâches correspondant au jour sélectionné dans le calendrier.
- Ajouter une vue détaillée du calendrier en plein écran.
- Mettre à jour la documentation du MVP après l'ajout de la persistance des données.

---

# Rapport d'activités — 7 septembre 2026

## Objectif

Préparer la persistance des tâches et mettre en place une architecture backend permettant de relier l'application React à une base de données MySQL locale exécutée avec XAMPP.

## Travaux réalisés

### 1. Choix de l'architecture technique

- Choix d'une architecture séparant le frontend, l'API backend et la base de données.
- Définition du flux : React → API Express → MySQL.
- Décision de gérer la génération des UUID côté backend plutôt que côté frontend.
- Remplacement du nom de la base et de l'application par `taskplus`.

### 2. Création de la base de données

- Création de la base MySQL `taskplus` avec XAMPP.
- Création de la table `tasks`.
- Utilisation d'un identifiant `CHAR(36)` compatible avec les UUID.
- Ajout des colonnes `title`, `done`, `created_at` et `updated_at`.
- Utilisation de `ON UPDATE CURRENT_TIMESTAMP` pour actualiser automatiquement la date de modification.

### 3. Configuration de l'environnement

- Création et configuration du fichier `.env` à la racine du projet.
- Configuration de la connexion à MySQL sur `localhost:3306`.
- Configuration de la base `taskplus` et du port de l'API sur `3301`.
- Ajout du fichier `.env` dans `.gitignore` afin de protéger les identifiants de connexion.

### 4. Installation des dépendances backend

- Installation d'Express pour créer l'API.
- Installation de `mysql2` pour communiquer avec MySQL.
- Installation de `dotenv` pour charger les variables d'environnement.
- Installation de `cors` pour autoriser les requêtes du frontend.

### 5. Création du backend

- Création du serveur Express dans `server/server.js`.
- Mise en place de la connexion à MySQL avec un pool de connexions.
- Ajout de la route `GET /api/health` pour tester l'état de l'API et de la base.
- Ajout des routes CRUD pour les tâches :
	- `GET /api/tasks` ;
	- `POST /api/tasks` ;
	- `PATCH /api/tasks/:id` ;
	- `DELETE /api/tasks/:id`.
- Ajout de la validation du titre des tâches.
- Génération des UUID côté backend lors de la création d'une tâche.

### 6. Vérifications réalisées

- Démarrage réussi de l'API sur `http://localhost:3301`.
- Vérification réussie de la connexion à MySQL avec la route `/api/health`.
- Validation du projet avec `npm run lint`.
- Validation de la build frontend avec `npm run build`.

## État actuel

Le backend et la base MySQL sont prêts et communiquent correctement. Le frontend utilise encore temporairement son état local avec `useState` et génère encore les UUID dans `src/App.jsx`.

## Travaux restant à réaliser

- Connecter manuellement React à `GET /api/tasks` pour charger les tâches depuis MySQL.
- Remplacer l'ajout local par `POST /api/tasks`.
- Connecter la modification et le changement de statut à `PATCH /api/tasks/:id`.
- Connecter la suppression à `DELETE /api/tasks/:id`.
- Ajouter le proxy Vite vers le backend en développement.
- Tester les opérations CRUD depuis l'interface React.
- Ajouter ensuite les dates d'exécution des tâches dans la base et dans l'interface.
