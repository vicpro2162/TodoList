# Todo Web — Fonctionnalités

## 1. Gestion des tâches

* Ajouter une tâche
* Afficher les tâches
* Modifier une tâche
* Supprimer une tâche
* Marquer une tâche comme terminée
* Réactiver une tâche terminée

## 2. Détails d'une tâche

Une tâche peut contenir :

* Titre
* Description
* Date de création
* Date d'échéance
* Heure
* Priorité
* Catégorie
* Tags
* Statut

### Statuts

* À faire
* En cours
* Terminée

### Priorités

* Basse
* Normale
* Haute
* Urgente

---

## 3. Organisation

L'utilisateur peut :

* Créer des catégories
* Associer une tâche à une catégorie
* Créer des projets
* Associer des tâches à un projet
* Ajouter des tags
* Trier les tâches

---

## 4. Recherche et filtrage

L'utilisateur peut :

* Rechercher une tâche
* Filtrer par statut
* Filtrer par priorité
* Filtrer par catégorie
* Filtrer par projet
* Filtrer par date
* Filtrer par tags

### Tri

* Plus récente
* Plus ancienne
* Échéance la plus proche
* Priorité
* Alphabétique

---

## 5. Dates et échéances

L'application permet de :

* Définir une date limite
* Définir une heure limite
* Identifier les tâches en retard
* Afficher les tâches du jour
* Afficher les tâches de la semaine
* Afficher les prochaines échéances

---

## 6. Sous-tâches

Une tâche peut contenir plusieurs sous-tâches.

Exemple :

```text
☐ Préparer l'examen de Java

    ☑ Relire le chapitre 1
    ☑ Relire le chapitre 2
    ☐ Faire les exercices
    ☐ Faire les annales
```

La progression de la tâche principale peut être calculée automatiquement.

---

## 7. Tâches récurrentes

Permettre de créer des tâches répétitives :

* Tous les jours
* Toutes les semaines
* Tous les mois
* Jours personnalisés

Exemple :

```text
☐ Réviser Java
   ↻ Tous les lundi et mercredi
```

---

## 8. Notifications et rappels

L'utilisateur peut :

* Ajouter un rappel
* Recevoir une notification avant l'échéance
* Recevoir une notification pour une tâche en retard

---

## 9. Tableau de bord

Afficher :

* Nombre total de tâches
* Tâches terminées
* Tâches restantes
* Tâches en retard
* Tâches prioritaires
* Tâches du jour
* Progression globale

Exemple :

```text
Aujourd'hui

12 tâches
████████░░ 80%

✓ 8 terminées
○ 3 restantes
! 1 en retard
```

---

## 10. Calendrier

Une vue calendrier permet de visualiser les tâches selon leur date.

Vues possibles :

* Jour
* Semaine
* Mois

L'utilisateur peut sélectionner une date pour voir les tâches associées.

---

## 11. Gestion des tâches terminées

Prévoir une section dédiée aux tâches terminées permettant de :

* Consulter les tâches terminées
* Restaurer une tâche
* Supprimer définitivement une tâche
* Vider toutes les tâches terminées

---

## 12. Persistance des données

Les tâches doivent rester disponibles après actualisation de la page.

### Première version

Utilisation de :

```text
localStorage
```

### Version avancée

Stockage dans une base de données via une API.

---

## 13. Compte utilisateur — version avancée

* Créer un compte
* Se connecter
* Se déconnecter
* Modifier son profil
* Synchroniser ses tâches entre plusieurs appareils

---

## 14. Collaboration — version avancée

Permettre de :

* Partager un projet
* Inviter un utilisateur
* Attribuer une tâche à quelqu'un
* Ajouter des commentaires
* Suivre les modifications

---

# Priorité des fonctionnalités

## MVP — indispensable

* [x] Ajouter une tâche
* [x] Afficher les tâches
* [x] Cocher une tâche
* [ ] Modifier une tâche
* [ ] Supprimer une tâche
* [ ] Filtrer les tâches
* [ ] Sauvegarder les tâches

## Version 2

* [ ] Recherche
* [ ] Priorités
* [ ] Catégories
* [ ] Dates d'échéance
* [ ] Tri
* [ ] Sous-tâches

## Version 3

* [ ] Tâches récurrentes
* [ ] Rappels
* [ ] Notifications
* [ ] Calendrier
* [ ] Statistiques
* [ ] Dashboard avancé

## Version 4

* [ ] Authentification
* [ ] Base de données
* [ ] Synchronisation
* [ ] Multi-appareils

## Version 5

* [ ] Collaboration
* [ ] Partage de projets
* [ ] Attribution de tâches
* [ ] Commentaires

```

