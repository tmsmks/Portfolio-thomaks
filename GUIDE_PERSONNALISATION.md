# Guide de Personnalisation du Portfolio

Ce guide vous accompagne dans la personnalisation de votre portfolio pour qu'il reflète parfaitement votre profil et vos compétences.

## 🎨 Personnalisation Rapide

### 1. Informations Personnelles

**Dans `index.html`, ligne 67 :**
```html
<h1 class="text-5xl font-bold mb-4">Votre Nom</h1>
```
Remplacez "Votre Nom" par votre nom réel.

**Ligne 68 :**
```html
<p class="text-xl mb-6 opacity-90">Étudiant en Informatique</p>
```
Modifiez selon votre statut actuel (Étudiant, Développeur, Consultant, etc.).

### 2. Description du Parcours

**Lignes 89-93 :**
```html
<p class="text-lg leading-relaxed opacity-90">
    Passionné par les technologies de l'information, je suis actuellement en formation en informatique 
    avec un focus particulier sur la gestion des données et l'ingénierie des systèmes. 
    Mon objectif est de devenir un expert dans le domaine du Big Data et de l'administration de bases de données.
</p>
```
Personnalisez cette description selon votre parcours et vos objectifs.

## 📊 Compétences et Projets

### Compétence 4 - Gestion des Données

**Description officielle (lignes 120-130) :**
- La description est maintenant basée sur le référentiel officiel
- Personnalisez selon votre expérience spécifique

**Activités Critiques (lignes 140-180) :**
- Les AC sont maintenant listées selon le référentiel
- Cochez/décochez selon vos compétences réelles
- Ajoutez des exemples concrets de vos réalisations

**Situations Professionnelles (lignes 190-210) :**
- Les situations sont basées sur le référentiel officiel
- Ajoutez vos expériences spécifiques pour chaque situation

**Projet (lignes 220-250) :**
- Remplacez "Système de Gestion de Ventes" par votre projet réel
- Ajoutez une vraie image de votre schéma de base de données
- Personnalisez la description et les réalisations

### Compétence 5 - Conduite de Projet

**Description officielle (lignes 280-290) :**
- La description est maintenant basée sur le référentiel officiel
- Personnalisez selon votre expérience spécifique

**Activités Critiques (lignes 300-340) :**
- Les AC sont maintenant listées selon le référentiel
- Cochez/décochez selon vos compétences réelles
- Ajoutez des exemples concrets de vos réalisations

**Situations Professionnelles (lignes 350-370) :**
- Les situations sont basées sur le référentiel officiel
- Ajoutez vos expériences spécifiques pour chaque situation

**Projet d'équipe (lignes 380-420) :**
- Remplacez "Application Web E-commerce" par votre projet
- Ajoutez vos vrais diagrammes Gantt et UML
- Personnalisez les phases et sprints

### Compétence 6 - Collaboration

**Description officielle (lignes 450-460) :**
- La description est maintenant basée sur le référentiel officiel
- Personnalisez selon votre expérience spécifique

**Activités Critiques (lignes 470-510) :**
- Les AC sont maintenant listées selon le référentiel
- Cochez/décochez selon vos compétences réelles
- Ajoutez des exemples concrets de vos réalisations

**Situations Professionnelles (lignes 520-540) :**
- Les situations sont basées sur le référentiel officiel
- Ajoutez vos expériences spécifiques pour chaque situation

**Compétences interpersonnelles (lignes 550-580) :**
- Ajustez les étoiles selon vos niveaux
- Ajoutez d'autres compétences si nécessaire

**Schéma d'équipe (lignes 590-630) :**
- Remplacez par votre vraie structure d'équipe
- Ajoutez les vrais noms/rôles

## 🎯 Objectifs Professionnels

**Section Conclusion (lignes 650-680) :**
```html
<p class="text-blue-100">Devenir Data Engineer ou Administrateur de Base de Données</p>
```
Modifiez selon vos objectifs réels.

## 🔗 Liens et Contacts

**Boutons d'action (lignes 700-720) :**
```html
<a href="#" class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-300 flex items-center justify-center">
    <i class="fas fa-download mr-2"></i>
    Télécharger mon CV
</a>
```

Remplacez `href="#"` par :
- Votre CV : `href="assets/documents/mon-cv.pdf"`
- LinkedIn : `href="https://linkedin.com/in/votre-profil"`
- Email : `href="mailto:votre@email.com"`

## 🖼️ Images et Médias

### Structure des Dossiers
```
assets/
├── images/
│   ├── schema-bdd.png          # Schéma de base de données
│   ├── diagramme-uml.png       # Diagramme UML
│   ├── planning-gantt.png      # Planning Gantt
│   └── photo-profil.jpg        # Photo de profil
└── documents/
    └── cv.pdf                  # Votre CV
```

### Ajout d'Images

**Pour remplacer les placeholders :**
```html
<!-- Avant -->
<div class="bg-gray-100 rounded-lg p-4 text-center">
    <i class="fas fa-database text-4xl text-gray-400 mb-2"></i>
    <p class="text-gray-600">Schéma ERD du système de gestion de ventes</p>
    <p class="text-sm text-gray-500 mt-2">[Image du schéma à ajouter]</p>
</div>

<!-- Après -->
<div class="bg-white rounded-lg p-4">
    <img src="assets/images/schema-bdd.png" alt="Schéma de base de données" class="w-full h-auto rounded-lg">
</div>
```

## 🎨 Personnalisation Avancée

### Couleurs

**Modifiez dans `tailwind.config.js` :**
```javascript
colors: {
  primary: {
    600: '#2563eb', // Couleur principale
  },
  secondary: {
    600: '#c026d3', // Couleur secondaire
  },
  accent: {
    600: '#16a34a', // Couleur d'accent
  }
}
```

### Animations

**Dans `assets/styles.css` :**
- Modifiez les durées d'animation
- Changez les effets de transition
- Personnalisez les keyframes

### Typographie

**Ajoutez des polices personnalisées :**
```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

## 📱 Responsive Design

Le site est déjà responsive, mais vous pouvez ajuster :

**Breakpoints :**
- Mobile : < 768px
- Tablette : 768px - 1024px
- Desktop : > 1024px

**Classes utiles :**
- `md:hidden` : Caché sur tablette et plus
- `lg:block` : Visible sur desktop
- `sm:text-lg` : Texte plus grand sur mobile

## 🔧 Optimisations

### Performance
1. **Optimisez les images :**
   - Utilisez le format WebP
   - Compressez les images
   - Utilisez des tailles appropriées

2. **Minifiez le CSS :**
   ```bash
   npm run build:prod
   ```

### SEO
1. **Meta tags :**
   ```html
   <meta name="description" content="Portfolio de [Votre Nom] - [Votre spécialité]">
   <meta name="keywords" content="informatique, développement, base de données, [vos mots-clés]">
   ```

2. **Open Graph :**
   ```html
   <meta property="og:title" content="Portfolio [Votre Nom]">
   <meta property="og:description" content="[Description]">
   <meta property="og:image" content="[URL de votre image]">
   ```

## 🚀 Déploiement

### GitHub Pages
1. Créez un repository GitHub
2. Uploadez vos fichiers
3. Activez GitHub Pages dans les paramètres

### Netlify
1. Connectez votre repository GitHub
2. Configurez le build (pas nécessaire pour un site statique)
3. Déployez automatiquement

### Vercel
1. Importez votre projet
2. Déployez en un clic

## 📝 Checklist de Personnalisation

- [ ] Nom et titre mis à jour
- [ ] Description du parcours personnalisée
- [ ] Projets réels ajoutés avec images
- [ ] Compétences ajustées selon votre niveau
- [ ] Liens vers CV et réseaux sociaux
- [ ] Images optimisées et ajoutées
- [ ] Couleurs adaptées à votre identité
- [ ] Tests sur mobile et tablette
- [ ] SEO optimisé
- [ ] Déploiement effectué

## 🆘 Support

Si vous rencontrez des difficultés :
1. Vérifiez la console du navigateur (F12)
2. Assurez-vous que tous les fichiers sont présents
3. Vérifiez les chemins des images et documents
4. Testez sur différents navigateurs

**Bon portfolio ! 🎉**
