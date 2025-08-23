# Guide pour Ajouter les Photos - Compétence 4

Ce guide vous explique comment ajouter vos photos dans la page de la Compétence 4.

## 📁 Structure des Photos

Placez vos photos dans le dossier `assets/images/` avec les noms suivants :

### Projet SAE 501
- `sae501-schema-bdd.jpg` - Schéma de base de données
- `sae501-application.jpg` - Capture d'écran de l'application web

### Expérience WAAT
- `waat-dashboard.jpg` - Dashboard ClicData
- `waat-excel.jpg` - Contrôles Excel

## 🔧 Comment Remplacer les Placeholders

### 1. Projet SAE 501 - Schéma de Base de Données

**Remplacez ce code :**
```html
<div class="bg-gray-100 rounded-lg p-4 text-center">
    <i class="fas fa-database text-3xl text-gray-400 mb-2"></i>
    <p class="text-gray-600 text-sm">Schéma de base de données</p>
    <p class="text-xs text-gray-500 mt-1">[Photo à ajouter]</p>
</div>
```

**Par :**
```html
<div class="bg-white rounded-lg p-2">
    <img src="assets/images/sae501-schema-bdd.jpg" alt="Schéma de base de données SAE 501" class="w-full h-auto rounded-lg">
    <p class="text-gray-600 text-sm mt-2 text-center">Schéma de base de données</p>
</div>
```

### 2. Projet SAE 501 - Application Web

**Remplacez ce code :**
```html
<div class="bg-gray-100 rounded-lg p-4 text-center">
    <i class="fas fa-code text-3xl text-gray-400 mb-2"></i>
    <p class="text-gray-600 text-sm">Application web</p>
    <p class="text-xs text-gray-500 mt-1">[Photo à ajouter]</p>
</div>
```

**Par :**
```html
<div class="bg-white rounded-lg p-2">
    <img src="assets/images/sae501-application.jpg" alt="Application web SAE 501" class="w-full h-auto rounded-lg">
    <p class="text-gray-600 text-sm mt-2 text-center">Application web</p>
</div>
```

### 3. WAAT - Dashboard ClicData

**Remplacez ce code :**
```html
<div class="bg-gray-100 rounded-lg p-4 text-center">
    <i class="fas fa-chart-bar text-3xl text-gray-400 mb-2"></i>
    <p class="text-gray-600 text-sm">Dashboard ClicData</p>
    <p class="text-xs text-gray-500 mt-1">[Photo à ajouter]</p>
</div>
```

**Par :**
```html
<div class="bg-white rounded-lg p-2">
    <img src="assets/images/waat-dashboard.jpg" alt="Dashboard ClicData WAAT" class="w-full h-auto rounded-lg">
    <p class="text-gray-600 text-sm mt-2 text-center">Dashboard ClicData</p>
</div>
```

### 4. WAAT - Contrôles Excel

**Remplacez ce code :**
```html
<div class="bg-gray-100 rounded-lg p-4 text-center">
    <i class="fas fa-file-excel text-3xl text-gray-400 mb-2"></i>
    <p class="text-gray-600 text-sm">Contrôles Excel</p>
    <p class="text-xs text-gray-500 mt-1">[Photo à ajouter]</p>
</div>
```

**Par :**
```html
<div class="bg-white rounded-lg p-2">
    <img src="assets/images/waat-excel.jpg" alt="Contrôles Excel WAAT" class="w-full h-auto rounded-lg">
    <p class="text-gray-600 text-sm mt-2 text-center">Contrôles Excel</p>
</div>
```

## 📸 Conseils pour les Photos

### Format et Taille
- **Format recommandé :** JPG ou PNG
- **Taille optimale :** 800x600 pixels minimum
- **Poids maximum :** 500KB par image

### Contenu des Photos
1. **Schéma de base de données :** Capture d'écran de votre schéma ERD
2. **Application web :** Interface utilisateur de votre application
3. **Dashboard ClicData :** Capture d'un dashboard que vous avez créé
4. **Contrôles Excel :** Capture d'écran de vos contrôles de données

### Confidentialité
- Masquez les données sensibles
- Utilisez des données d'exemple si nécessaire
- Respectez la confidentialité de WAAT

## 🚀 Étapes pour Ajouter les Photos

1. **Préparez vos photos** selon les conseils ci-dessus
2. **Placez-les** dans le dossier `assets/images/`
3. **Remplacez les placeholders** dans `competence4.html`
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
