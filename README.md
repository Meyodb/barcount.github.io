# 🍺 BarCount - Gestion d'Inventaire Bar

[![Live Demo](https://img.shields.io/badge/Live%20Demo-GitHub%20Pages-blue)](https://votre-username.github.io/barcount-pwa/)
[![PWA](https://img.shields.io/badge/PWA-Ready-green)](https://web.dev/progressive-web-apps/)
[![License](https://img.shields.io/badge/License-MIT-yellow)](LICENSE)

## 🎯 Description

**BarCount** est une application web progressive (PWA) moderne et épurée pour la gestion d'inventaire des alcools dans un bar. Conçue pour être utilisée sur mobile et desktop, elle offre une interface intuitive avec de belles animations.

## ✨ Fonctionnalités

- 📱 **Application Web Progressive (PWA)** - Installable sur mobile et desktop
- 🎨 **Design épuré et moderne** - Interface élégante avec animations fluides
- 🔄 **Gestion temps réel** - Compteurs +/- pour chaque produit
- 📋 **Liste "À Remonter"** - Suivi automatique des bouteilles manquantes
- 💾 **Sauvegarde automatique** - Données persistantes en localStorage
- 🌐 **Fonctionnement offline** - Service Worker pour utilisation hors ligne
- 📱 **Responsive design** - Optimisé pour tous les écrans

## 🍸 Produits Gérés

- Absolut Vodka
- Beefeater Gin
- Jameson Irish Whiskey
- El Jimador Tequila
- Bacardi Carta Blanca
- Jack Daniel's Whiskey
- Bacardi Oro
- Triple Sec
- Crème de Pêche

## 🚀 Installation Locale

1. Clonez ce repository :
```bash
git clone https://github.com/votre-username/barcount-pwa.git
cd barcount-pwa
```

2. Lancez un serveur local :
```bash
python3 -m http.server 8000
```

3. Ouvrez votre navigateur à l'adresse : `http://localhost:8000`

## 📱 Installation sur Mobile

1. Ouvrez l'application dans Safari (iOS) ou Chrome (Android)
2. Appuyez sur "Ajouter à l'écran d'accueil"
3. L'application s'installera comme une app native

## 🎮 Utilisation

### Inventaire
- Utilisez les boutons **+** (rouge) pour indiquer qu'une bouteille manque
- Utilisez les boutons **-** (gris) pour corriger une erreur
- Les compteurs se mettent à jour en temps réel

### Liste "À Remonter"
- Les bouteilles avec compteur > 0 apparaissent automatiquement
- Cliquez sur **"✓ Remonté"** une fois la bouteille remontée
- Utilisez **"Tout Effacer"** pour remettre tous les compteurs à zéro

## 🎨 Design

L'application utilise un design épuré avec :
- Palette de couleurs moderne (bleu foncé, violet, accents colorés)
- Effets de glassmorphism et transparence
- Animations fluides et micro-interactions
- Typographie claire et lisible

## 🔧 Technologies Utilisées

- **HTML5** - Structure sémantique
- **CSS3** - Animations et design moderne
- **JavaScript ES6+** - Logique applicative
- **Service Worker** - Fonctionnement offline
- **LocalStorage** - Persistance des données
- **PWA** - Installation et expérience native

## 📂 Structure du Projet

```
barcount-pwa/
├── index.html          # Page principale
├── app.js              # Logique JavaScript
├── style.css           # Styles et animations
├── sw.js               # Service Worker
├── manifest.json       # Manifeste PWA
├── clear-cache.html    # Page de gestion du cache
├── images/             # Logos des bouteilles
│   ├── absolut.svg
│   ├── beefeater.svg
│   └── ...
└── README.md          # Documentation
```

## 🌐 Déploiement sur GitHub Pages

Ce projet est automatiquement déployé sur GitHub Pages. Chaque push sur la branche `main` met à jour l'application en ligne.

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :
- Ouvrir des issues pour signaler des bugs
- Proposer des améliorations
- Soumettre des pull requests

## 📄 License

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 🔗 Liens Utiles

- [Application Live](https://votre-username.github.io/barcount-pwa/)
- [Progressive Web Apps](https://web.dev/progressive-web-apps/)
- [Service Workers](https://developer.mozilla.org/fr/docs/Web/API/Service_Worker_API)

---

**Développé avec ❤️ pour faciliter la gestion d'inventaire dans les bars**
