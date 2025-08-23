# Guide pour Ajouter les Photos - Compétence 5

Ce guide vous explique comment ajouter vos photos dans la page de la Compétence 5.

## 📁 Structure des Photos

Placez vos photos dans le dossier `assets/images/` avec les noms suivants :

### Projet École
- `ecole-gantt.jpg` - Diagramme de Gantt des projets
- `ecole-equipe.jpg` - Organisation d'équipe

### Projets WAAT
- `waat-planning.jpg` - Planning Microsoft
- `waat-dataflow.jpg` - Dataflow All Operators
- `waat-snowflake.jpg` - Migration Snowflake

## 🔧 Comment Remplacer les Placeholders

### 1. Projet École - Diagramme de Gantt

**Remplacez ce code :**
```html
<div class="bg-gray-100 rounded-lg p-4 text-center">
    <i class="fas fa-chart-gantt text-3xl text-gray-400 mb-2"></i>
    <p class="text-gray-600 text-sm">Diagramme de Gantt</p>
    <p class="text-xs text-gray-500 mt-1">[Photo à ajouter]</p>
</div>
```

**Par :**
```html
<div class="bg-white rounded-lg p-2">
    <img src="assets/images/ecole-gantt.jpg" alt="Diagramme de Gantt projet école" class="w-full h-auto rounded-lg">
    <p class="text-gray-600 text-sm mt-2 text-center">Diagramme de Gantt</p>
</div>
```

### 2. Projet École - Organisation d'Équipe

**Remplacez ce code :**
```html
<div class="bg-gray-100 rounded-lg p-4 text-center">
    <i class="fas fa-users text-3xl text-gray-400 mb-2"></i>
    <p class="text-gray-600 text-sm">Organisation d'équipe</p>
    <p class="text-xs text-gray-500 mt-1">[Photo à ajouter]</p>
</div>
```

**Par :**
```html
<div class="bg-white rounded-lg p-2">
    <img src="assets/images/ecole-equipe.jpg" alt="Organisation d'équipe projet école" class="w-full h-auto rounded-lg">
    <p class="text-gray-600 text-sm mt-2 text-center">Organisation d'équipe</p>
</div>
```

### 3. WAAT - Planning Microsoft

**Remplacez ce code :**
```html
<div class="bg-gray-100 rounded-lg p-4 text-center">
    <i class="fas fa-chart-gantt text-3xl text-gray-400 mb-2"></i>
    <p class="text-gray-600 text-sm">Planning Microsoft</p>
    <p class="text-xs text-gray-500 mt-1">[Photo à ajouter]</p>
</div>
```

**Par :**
```html
<div class="bg-white rounded-lg p-2">
    <img src="assets/images/waat-planning.jpg" alt="Planning Microsoft WAAT" class="w-full h-auto rounded-lg">
    <p class="text-gray-600 text-sm mt-2 text-center">Planning Microsoft</p>
</div>
```

### 4. WAAT - Dataflow All Operators

**Remplacez ce code :**
```html
<div class="bg-gray-100 rounded-lg p-4 text-center">
    <i class="fas fa-database text-3xl text-gray-400 mb-2"></i>
    <p class="text-gray-600 text-sm">Dataflow All Operators</p>
    <p class="text-xs text-gray-500 mt-1">[Photo à ajouter]</p>
</div>
```

**Par :**
```html
<div class="bg-white rounded-lg p-2">
    <img src="assets/images/waat-dataflow.jpg" alt="Dataflow All Operators WAAT" class="w-full h-auto rounded-lg">
    <p class="text-gray-600 text-sm mt-2 text-center">Dataflow All Operators</p>
</div>
```

### 5. WAAT - Migration Snowflake

**Remplacez ce code :**
```html
<div class="bg-gray-100 rounded-lg p-4 text-center">
    <i class="fas fa-cloud text-3xl text-gray-400 mb-2"></i>
    <p class="text-gray-600 text-sm">Migration Snowflake</p>
    <p class="text-xs text-gray-500 mt-1">[Photo à ajouter]</p>
</div>
```

**Par :**
```html
<div class="bg-white rounded-lg p-2">
    <img src="assets/images/waat-snowflake.jpg" alt="Migration Snowflake WAAT" class="w-full h-auto rounded-lg">
    <p class="text-gray-600 text-sm mt-2 text-center">Migration Snowflake</p>
</div>
```

## 📸 Conseils pour les Photos

### Format et Taille
- **Format recommandé :** JPG ou PNG
- **Taille optimale :** 800x600 pixels minimum
- **Poids maximum :** 500KB par image

### Contenu des Photos
1. **Diagramme de Gantt :** Capture d'écran de votre planning de projet
2. **Organisation d'équipe :** Photo de groupe ou schéma d'organisation
3. **Planning Microsoft :** Capture d'écran de votre planner
4. **Dataflow All Operators :** Capture d'écran du dataflow
5. **Migration Snowflake :** Capture d'écran de la migration

### Confidentialité
- Masquez les données sensibles
- Utilisez des données d'exemple si nécessaire
- Respectez la confidentialité de WAAT

## 🚀 Étapes pour Ajouter les Photos

1. **Préparez vos photos** selon les conseils ci-dessus
2. **Placez-les** dans le dossier `assets/images/`
3. **Remplacez les placeholders** dans `competence5.html`
4. **Testez** que les images s'affichent correctement
5. **Optimisez** si nécessaire (taille, qualité)

## ✅ Vérification

Après avoir ajouté vos photos, vérifiez que :
- Les images s'affichent correctement
- Les textes alternatifs sont appropriés
- Le responsive design fonctionne
- Les images ne sont pas trop lourdes

## 🆘 En Cas de Problème

Si les images ne s'affichent pas :
1. Vérifiez le chemin du fichier
2. Vérifiez que le nom du fichier correspond exactement
3. Vérifiez que le fichier est bien dans le bon dossier
4. Vérifiez la console du navigateur pour les erreurs
