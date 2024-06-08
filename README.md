# MNS TICKET

## Description
MNS TICKET est une application de gestion de tickets permettant aux utilisateurs de soumettre des demandes d'assistance technique. Le projet est construit avec Angular 17.3.3 et utilise un backend PHP pour gérer les requêtes et les données.

## Fonctionnalités
- Soumission de tickets par les utilisateurs
- Suivi de l'état des tickets
- Réponses des administrateurs aux tickets
- Gestion des utilisateurs

## Prérequis
Avant de commencer, assurez-vous d'avoir les éléments suivants installés :
- [Angular CLI](https://cli.angular.io/) version 17.3.3
- Un serveur web compatible PHP (Apache, Nginx, etc.)
- Une base de données SQL (MySQL, MariaDB, etc.)

## Installation

### Frontend (Angular)
Clonez le dépôt et installez les dépendances nécessaires :

```bash
git clone https://github.com/ladrom/mns-ticket.git
cd mns-ticket
npm install
```

### Backend (PHP)
- Déplacez les fichiers PHP du dossier backend vers le répertoire de votre serveur web.

- Importez la base de données SQL fournie :

Créez une nouvelle base de données dans votre serveur SQL.
Importez le fichier SQL fourni (mns_ticket.sql) dans cette base de données.

## Configuration
Modifiez le fichier config.ts pour définir le chemin de votre backend :

```ts
// src/config.ts
export const environment = {
  production: false,
  apiBaseUrl: 'http://votre-domaine-ou-ip/backend/'
};
```

## Utilisation
Pour démarrer l'application Angular en mode développement, exécutez :

```bash
ng serve
```

Ensuite, ouvrez votre navigateur et accédez à http://localhost:4200.

Dans l'application, vous pouvez utiliser les utilisateurs suivants :

- Nom d'utilisateur : Alex Smith (Administrateur)
Email  : alex.smith@example.com

- Nom d'utilisateur: Jessica Jones (Gestionnaire)
Email  : jessica.jones@example.org

- Nom d'utilisateur : Mark Taylor (Etudiant)
Email : mark.taylor@example.net

- Nom d'utilisateur : Emily Davis (Etudiant)
Email  : emily.davis@example.co

- Nom d'utilisateur : Michael Brown (Etudiant)
Email  : michael.brown@example.info

<span style="color:red;">Le mot de passe est le même pour tous les utilisateurs : toto</span>

