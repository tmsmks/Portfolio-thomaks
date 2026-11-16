# Portfolio — Thomas Maksimous

Site statique bilingue (FR à la racine, EN sous `en/`), servi par GitHub Pages :
<https://tmsmks.github.io/Portfolio-thomaks/>

## Structure

```
src/
  content_fr.py     ← tout le texte français (accueil, parcours, compétences, projets)
  content_en.py     ← la version anglaise, même structure
  themes.py         ← palette, polices et animation « signature » de chaque projet
  templates/        ← gabarits Jinja2 (base, accueil, projet, 404)
  build.py          ← génère index.html, projets/*.html, en/…
assets/
  css/base.css      ← feuille de style unique (accueil + pages projet)
  js/app.js         ← défilement doux (Lenis), curseur, navigation, transitions, révélations
  js/home.js        ← préloader, souffle du hero, cartes empilées, timeline, ney jouable (Web Audio)
  js/project.js     ← titre lettre à lettre, galerie épinglée, compteurs
  js/sig/all.js     ← une animation canvas par projet (graphe, chat, grille, facture, carte, courbe, feuilles, DAG)
  img/              ← photo, captures, favicon
  CV_Thomas_Maksimous.pdf
```

## Modifier le site

1. Éditer `src/content_fr.py` et `src/content_en.py` (textes, projets, liens).
   Pour un nouveau projet : ajouter une entrée dans `PROJECTS` des deux fichiers et un thème dans `src/themes.py`.
2. Regénérer les pages :

   ```bash
   pip install jinja2
   python3 src/build.py
   ```

3. Vérifier en local : `python3 -m http.server 8080` puis <http://localhost:8080/>.
4. Commiter les fichiers générés (`index.html`, `projets/`, `en/`) avec les sources : GitHub Pages sert le dépôt tel quel, sans étape de build.

## Dépendances côté navigateur

Chargées depuis des CDN : [GSAP](https://gsap.com) + ScrollTrigger, [Lenis](https://lenis.darkroom.engineering), Google Fonts.
Le site reste lisible sans JavaScript et respecte `prefers-reduced-motion`.
