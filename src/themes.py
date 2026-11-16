# -*- coding: utf-8 -*-
"""Thèmes visuels, indépendants de la langue.

Le site est sombre et immersif. Chaque projet garde son identité : sa teinte,
sa typographie, son animation « signature » (voir assets/js/sig/all.js).
"""

HOME_THEME = {
    "fonts": "Syne:wght@500..800&family=Instrument+Sans:ital,wght@0,400..700;1,400..700&family=JetBrains+Mono:wght@400;600",
    "display": "'Syne', sans-serif",
    "body": "'Instrument Sans', system-ui, sans-serif",
}

THEMES = {
    "livres-interactifs": {
        "tags": ["Python", "Flask", "OpenAI", "Ollama"],
        "preview_font": "Newsreader:ital,wght@0,500;1,500",
        "fonts": "Newsreader:ital,opsz,wght@0,6..72,300..800;1,6..72,300..800&family=Instrument+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400;600",
        "display": "'Newsreader', Georgia, serif",
        "body": "'Instrument Sans', system-ui, sans-serif",
        "bg": "#14110E", "bg2": "#1E1915", "ink": "#F3EBDD", "muted": "#A89C8A",
        "accent": "#8FB37A", "accent2": "#D9636F", "line": "rgba(243,235,221,.14)",
        "sig": "graph", "mood": "paper",
    },
    "iassou3": {
        "tags": ["React Native", "Expo", "Supabase", "OpenAI"],
        "preview_font": "Syne:wght@800",
        "fonts": "Syne:wght@500..800&family=Instrument+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400;600",
        "display": "'Syne', sans-serif",
        "body": "'Instrument Sans', system-ui, sans-serif",
        "bg": "#120A2A", "bg2": "#1C1140", "ink": "#FBF6FF", "muted": "#B3A4D4",
        "accent": "#F6B73C", "accent2": "#FF4D8D", "line": "rgba(251,246,255,.14)",
        "sig": "chat", "mood": "neon",
    },
    "pi-26": {
        "tags": ["LightGBM", "SHAP", "Pandas", "Streamlit"],
        "preview_font": "Archivo:wdth,wght@110,800",
        "fonts": "Archivo:ital,wdth,wght@0,62..125,300..900;1,62..125,300..900&family=JetBrains+Mono:wght@400;600",
        "display": "'Archivo', sans-serif",
        "body": "'Archivo', system-ui, sans-serif",
        "bg": "#070B12", "bg2": "#0E1623", "ink": "#EEF2F7", "muted": "#8A96A8",
        "accent": "#FFC53D", "accent2": "#3BD0FF", "line": "rgba(238,242,247,.12)",
        "sig": "grid", "mood": "night",
    },
    "dsm-gestion": {
        "tags": ["Next.js", "PostgreSQL", "Claude", "Ollama"],
        "preview_font": "Barlow+Condensed:wght@800",
        "fonts": "Barlow+Condensed:wght@600;700;800&family=Barlow:ital,wght@0,400;0,500;0,600;1,400&family=JetBrains+Mono:wght@400;600",
        "display": "'Barlow Condensed', sans-serif",
        "body": "'Barlow', system-ui, sans-serif",
        "bg": "#0B1F4D", "bg2": "#122C66", "ink": "#F6F8FC", "muted": "#A9BBE0",
        "accent": "#F28C28", "accent2": "#FFFFFF", "line": "rgba(246,248,252,.18)",
        "sig": "invoice", "mood": "blueprint",
    },
    "triply": {
        "tags": ["Flutter", "Firebase", "Google Maps"],
        "preview_font": "DM+Serif+Display",
        "fonts": "DM+Serif+Display:ital@0;1&family=DM+Sans:opsz,wght@9..40,400..700&family=JetBrains+Mono:wght@400;600",
        "display": "'DM Serif Display', Georgia, serif",
        "body": "'DM Sans', system-ui, sans-serif",
        "bg": "#07262B", "bg2": "#0D353B", "ink": "#F4EAD2", "muted": "#9DB7B5",
        "accent": "#F26B5B", "accent2": "#5CC8C2", "line": "rgba(244,234,210,.14)",
        "sig": "map", "mood": "sand",
    },
    "objectif-prime": {
        "tags": ["Next.js", "Supabase", "Tailwind"],
        "preview_font": "Outfit:wght@700",
        "fonts": "Outfit:wght@300..800&family=JetBrains+Mono:wght@400;600",
        "display": "'Outfit', sans-serif",
        "body": "'Outfit', system-ui, sans-serif",
        "bg": "#0B1F17", "bg2": "#122C21", "ink": "#EEF8F1", "muted": "#8FB09F",
        "accent": "#3DDC84", "accent2": "#FF8A3D", "line": "rgba(238,248,241,.14)",
        "sig": "curve", "mood": "fresh",
    },
    "ecotracker": {
        "tags": ["MongoDB", "API REST", "Python"],
        "preview_font": "Fraunces:wght@600",
        "fonts": "Fraunces:ital,opsz,wght@0,9..144,300..900;1,9..144,300..900&family=Nunito+Sans:ital,opsz,wght@0,6..12,400..700;1,6..12,400..700&family=JetBrains+Mono:wght@400;600",
        "display": "'Fraunces', Georgia, serif",
        "body": "'Nunito Sans', system-ui, sans-serif",
        "bg": "#121F14", "bg2": "#1B2D1E", "ink": "#EFF3E4", "muted": "#A3B493",
        "accent": "#A5D250", "accent2": "#D2A05F", "line": "rgba(239,243,228,.14)",
        "sig": "leaves", "mood": "forest",
    },
    "mlops": {
        "tags": ["DVC", "MLflow", "FastAPI", "Docker"],
        "preview_font": "JetBrains+Mono:wght@700",
        "fonts": "JetBrains+Mono:ital,wght@0,400..800;1,400..800&family=IBM+Plex+Sans:ital,wght@0,400;0,500;0,600;1,400",
        "display": "'JetBrains Mono', ui-monospace, monospace",
        "body": "'IBM Plex Sans', system-ui, sans-serif",
        "bg": "#0E1116", "bg2": "#171B23", "ink": "#EDF0F5", "muted": "#8B93A3",
        "accent": "#4D7CFF", "accent2": "#19C37D", "line": "rgba(237,240,245,.13)",
        "sig": "dag", "mood": "lab",
    },
}

# Couleur d'accent utilisée sur la page d'accueil pour prévisualiser chaque projet
PREVIEW = {slug: (t["bg"], t["accent"], t["ink"], t["display"]) for slug, t in THEMES.items()}
