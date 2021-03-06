# Rendu - Challenge - Groupe 5

## Membres du groupe

- Jean Tostivint
- Victor Balducci
- Romain Dreidemy

## Description
Nous avons fait un challenge, qui test une base de données d'un projet de soldat.

Dans ce projet, nous demandons aux élèves de refactoriser une base de données.

Une note est renvoyée à chaque étape que l'utilisateur réussi ou non.

### Technos

> Backend: Nodejs + Express + Typescript
>
> Frontend: ReactJS + Typescript  

## Utilisation

Le professeur peut se connecter à son [espace d'administration](https://soft-dango-11d268.netlify.app/admin/login).
Il doit remplir le formulaire et cliquer sur le lien qu'il recevra par mail, qui lui donnera la possiblité de gérer :

- Des promos
- L'ouverture et la fermeture des challenges
- Exporter la liste des scores

### Créer un challenge

Rendez-vous dans l'espace d'administration. Vous devez créer une promo, puis vous pourrez créer un challenge pour celle-ci.  
Une fois créée vous pourrez copier le lien qui vous ai donné et l'envoyer à vos élèves.

### Participer à un challenge

En tant qu'élève le professeur vous partagera un lien. En arrivant sur ce lien, vous devrez renseigner votre adresse email pour recevoir votre lien de connexion.  
Ensuite, il suffit de suivre les étapes qu'ils vous sont indiqués.

### Comment sont gérées les notes ?

L'application enregistre la note si elle est supérieur à une note enregistrée précédemment pour le même challenge.


## Base de données (MPD)

![MPD](assets/doc/MPD.png)

Une promotion (Batch Entity) peut avoir plusieurs challenges.
Un user (User entity) ne peut participer qu'aux challenges de sa promotion.
Un score (Score entity) est lié à un challenge et à un utilisateur
