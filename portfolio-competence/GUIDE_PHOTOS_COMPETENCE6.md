# Guide pour Ajouter les Photos - Compétence 6

Ce guide vous explique comment ajouter vos photos dans la page de la Compétence 6.

## 📁 Structure des Photos

Placez vos photos dans le dossier `assets/images/` avec les noms suivants :

### Collaboration WAAT
- `waat-equipe.jpg` - Équipe WAAT
- `waat-formation.jpg` - Formation des stagiaires
- `waat-reunions.jpg` - Réunions d'équipe

## 🔧 Comment Remplacer les Placeholders

### 1. Équipe WAAT

**Remplacez ce code :**
```html
<div class="bg-gray-100 rounded-lg p-4 text-center">
    <i class="fas fa-users text-3xl text-gray-400 mb-2"></i>
    <p class="text-gray-600 text-sm">Équipe WAAT</p>
    <p class="text-xs text-gray-500 mt-1">[Photo à ajouter]</p>
</div>
```

**Par :**
```html
<div class="bg-white rounded-lg p-2">
    <img src="assets/images/waat-equipe.jpg" alt="Équipe WAAT" class="w-full h-auto rounded-lg">
    <p class="text-gray-600 text-sm mt-2 text-center">Équipe WAAT</p>
</div>
```

### 2. Formation des Stagiaires

**Remplacez ce code :**
```html
<div class="bg-gray-100 rounded-lg p-4 text-center">
    <i class="fas fa-chalkboard-teacher text-3xl text-gray-400 mb-2"></i>
    <p class="text-gray-600 text-sm">Formation Stagiaires</p>
    <p class="text-xs text-gray-500 mt-1">[Photo à ajouter]</p>
</div>
```

**Par :**
```html
<div class="bg-white rounded-lg p-2">
    <img src="assets/images/waat-formation.jpg" alt="Formation des stagiaires WAAT" class="w-full h-auto rounded-lg">
    <p class="text-gray-600 text-sm mt-2 text-center">Formation Stagiaires</p>
</div>
```

### 3. Réunions d'Équipe

**Remplacez ce code :**
```html
<div class="bg-gray-100 rounded-lg p-4 text-center">
    <i class="fas fa-comments text-3xl text-gray-400 mb-2"></i>
    <p class="text-gray-600 text-sm">Réunions d'Équipe</p>
    <p class="text-xs text-gray-500 mt-1">[Photo à ajouter]</p>
</div>
```

**Par :**
```html
<div class="bg-white rounded-lg p-2">
    <img src="assets/images/waat-reunions.jpg" alt="Réunions d'équipe WAAT" class="w-full h-auto rounded-lg">
    <p class="text-gray-600 text-sm mt-2 text-center">Réunions d'Équipe</p>
</div>
```

## 📸 Conseils pour les Photos

### Format et Taille
- **Format recommandé :** JPG ou PNG
- **Taille optimale :** 800x600 pixels minimum
- **Poids maximum :** 500KB par image

### Contenu des Photos
1. **Équipe WAAT :** Photo de groupe de l'équipe (avec autorisation)
2. **Formation Stagiaires :** Capture d'écran de session de formation ou photo de travail
3. **Réunions d'Équipe :** Capture d'écran de réunion virtuelle ou photo de réunion

### Confidentialité et Autorisations
- **Demandez l'autorisation** avant de publier des photos d'équipe
- **Masquez les visages** si nécessaire
- **Utilisez des captures d'écran** de réunions virtuelles
- **Respectez la confidentialité** de WAAT

## 🚀 Étapes pour Ajouter les Photos

1. **Préparez vos photos** selon les conseils ci-dessus
2. **Obtenez les autorisations** nécessaires
3. **Placez-les** dans le dossier `assets/images/`
4. **Remplacez les placeholders** dans `competence6.html`
5. **Testez** que les images s'affichent correctement
6. **Optimisez** si nécessaire (taille, qualité)

## ✅ Vérification

Après avoir ajouté vos photos, vérifiez que :
- Les images s'affichent correctement
- Les textes alternatifs sont appropriés
- Le responsive design fonctionne
- Les images ne sont pas trop lourdes
- Vous avez les autorisations nécessaires

## 🆘 En Cas de Problème

Si les images ne s'affichent pas :
1. Vérifiez le chemin du fichier
2. Vérifiez que le nom du fichier correspond exactement
3. Vérifiez que le fichier est bien dans le bon dossier
4. Vérifiez la console du navigateur pour les erreurs

## ⚠️ Important - Confidentialité

- **Ne publiez jamais** de photos sans autorisation
- **Masquez les informations sensibles** (noms, données clients, etc.)
- **Utilisez des captures d'écran génériques** si nécessaire
- **Respectez la politique de confidentialité** de WAAT
