# Taskplus

Taskplus est une application de gestion de tâches développée avec React. Le projet contient maintenant un frontend React/Vite et une API backend Express connectée à une base MySQL locale exécutée avec XAMPP.

## Architecture actuelle

```text
React/Vite → API Node.js/Express → MySQL (XAMPP)
```

- Le frontend affiche le tableau de bord et gère actuellement les tâches dans `useState`.
- Le backend expose une API REST et génère les UUID des nouvelles tâches.
- MySQL assure la persistance dans la base `taskplus`.
- Le frontend n'est pas encore connecté à l'API : le raccordement des appels HTTP reste à effectuer manuellement.

## Fonctionnalités frontend

- Ajout d'une tâche via une modale avec validation.
- Affichage des tâches sous forme de cartes.
- Marquage d'une tâche comme terminée ou active.
- Modification du titre d'une tâche.
- Suppression d'une tâche.
- Filtrage par statut : toutes, à faire et terminées.
- Notification après l'ajout d'une tâche.
- Menu latéral responsive.
- Calendrier interactif en français.
- Indicateur de progression globale.

## API backend disponible

Le serveur se trouve dans `server/server.js` et écoute par défaut sur le port `3301`.

| Méthode | Route | Rôle |
| --- | --- | --- |
| GET | `/api/health` | Vérifier l'API et la connexion MySQL |
| GET | `/api/tasks` | Récupérer les tâches |
| POST | `/api/tasks` | Créer une tâche et générer son UUID |
| PATCH | `/api/tasks/:id` | Modifier le titre ou le statut |
| DELETE | `/api/tasks/:id` | Supprimer une tâche |

## Base de données

La base utilisée est `taskplus`. La table `tasks` contient notamment :

- `id` : UUID stocké en `CHAR(36)` et clé primaire ;
- `title` : titre obligatoire de la tâche ;
- `done` : statut de la tâche ;
- `created_at` : date de création ;
- `updated_at` : date de dernière modification.

MySQL doit être démarré depuis XAMPP. Les paramètres de connexion sont définis dans `.env`, qui est exclu du dépôt avec `.gitignore`.

Exemple de configuration locale :

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=taskplus
PORT=3301
```

## Installation

Installer les dépendances depuis la racine du projet :

```bash
npm install
```

Avant de démarrer le backend, créer la base `taskplus` et la table `tasks` dans MySQL, puis renseigner `.env`.

## Lancement

Démarrer l'API backend dans un terminal :

```bash
npm run server
```

Démarrer le frontend dans un autre terminal :

```bash
npm run dev
```

Routes utiles :

- frontend : adresse indiquée par Vite, généralement `http://localhost:5173` ;
- API : `http://localhost:3301` ;
- test de connexion : `http://localhost:3301/api/health`.

## Scripts disponibles

- `npm run dev` : démarrer le frontend Vite ;
- `npm run server` : démarrer l'API Express ;
- `npm run build` : construire le frontend pour la production ;
- `npm run preview` : prévisualiser la build ;
- `npm run lint` : vérifier le code avec ESLint.

## Structure principale

```text
src/
├── App.jsx             # État actuel de l'interface et actions frontend
├── TaskReceiver.jsx    # Formulaire d'ajout d'une tâche
├── Taskcontainer.jsx   # Liste et cartes des tâches
├── index.css           # Styles globaux
└── main.jsx            # Point d'entrée React
server/
└── server.js           # API Express et connexion MySQL
```

## État actuel et prochaines étapes

Le backend est créé, la connexion à MySQL a été testée avec succès et les routes CRUD sont disponibles. Le frontend utilise encore temporairement un état local : les tâches créées dans l'interface ne sont donc pas encore enregistrées dans MySQL.

Travaux restants :

- charger les tâches avec `GET /api/tasks` ;
- remplacer l'ajout local par `POST /api/tasks` ;
- connecter la modification et le changement de statut à `PATCH /api/tasks/:id` ;
- connecter la suppression à `DELETE /api/tasks/:id` ;
- ajouter le proxy Vite pour le développement ;
- associer les dates et heures du calendrier aux tâches ;
- créer une vue calendrier plus détaillée.
