# PageShop - Application de Shopping

Une application web de panier d'achat interactive développée avec HTML, CSS et JavaScript.

## Fonctionnalités

- **Catalogue de produits** : Affichage des produits avec images, noms et prix
- **Gestion des quantités** : Boutons + et - pour ajuster les quantités
- **Panier d'achat** : Affichage en temps réel des articles sélectionnés
- **Favoris** : Système de cœur pour marquer les produits favoris
- **Suppression** : Modal de confirmation pour supprimer des articles
- **Validation** : Système de validation du panier avec calcul du total

## Technologies utilisées

- HTML5
- CSS3
- JavaScript (ES5)
- Bootstrap 5
- Font Awesome

## Structure du projet

```
projet DOM1/
├── index.html          # Page principale
├── style.css           # Styles CSS
├── js/
│   └── script.js       # Logique JavaScript
├── bag.png             # Image du sac
├── baskets.png         # Image des baskets
├── socks.png           # Image des chaussettes
├── delete.png          # Icône de suppression
└── README.md           # Documentation
```

## Installation et utilisation

1. Clonez le repository
2. Ouvrez `index.html` dans votre navigateur web
3. Utilisez les boutons + et - pour ajouter/retirer des articles
4. Cliquez sur le cœur pour marquer en favori
5. Utilisez la poubelle pour supprimer un article
6. Validez votre panier quand vous êtes prêt

## Fonctionnalités détaillées

### Gestion du panier
- Les articles apparaissent automatiquement dans le panier quand la quantité > 0
- Le prix total est calculé en temps réel
- Possibilité de vider le panier ou de valider la commande

### Interface utilisateur
- Design responsive avec Bootstrap
- Modal de confirmation pour les suppressions
- Boutons interactifs avec états désactivés/activés
- Interface moderne et intuitive

## Auteur

Développé dans le cadre d'un workshop DOM.
