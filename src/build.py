#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Génère le site statique (FR à la racine, EN sous /en/) à partir des contenus et des gabarits.

    python3 src/build.py
"""
import os
import re
import shutil
import importlib
from pathlib import Path

from jinja2 import Environment, FileSystemLoader, select_autoescape

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "src"
TPL = SRC / "templates"

import sys
sys.path.insert(0, str(SRC))
import themes  # noqa: E402

LANGS = {
    "fr": {"module": "content_fr", "prefix": "", "projects_dir": "projets", "other": "en"},
    "en": {"module": "content_en", "prefix": "en/", "projects_dir": "projects", "other": "fr"},
}

env = Environment(loader=FileSystemLoader(str(TPL)), autoescape=select_autoescape(["html"]), trim_blocks=True, lstrip_blocks=True)


def slugify_id(s):
    return re.sub(r"[^a-z0-9]+", "-", s.lower()).strip("-")


env.filters["slug"] = slugify_id


def write(path: Path, html: str):
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(html, encoding="utf-8")
    print("  wrote", path.relative_to(ROOT))


def page_paths(lang, slug=None):
    """Chemins (relatifs à la racine du site) d'une page dans chaque langue."""
    out = {}
    for code, cfg in LANGS.items():
        if slug is None:
            out[code] = f"{cfg['prefix']}index.html"
        else:
            out[code] = f"{cfg['prefix']}{cfg['projects_dir']}/{slug}.html"
    return out


def build():
    contents = {code: importlib.import_module(cfg["module"]) for code, cfg in LANGS.items()}
    for code, cfg in LANGS.items():
        c = contents[code]
        other = cfg["other"]
        projects = c.PROJECTS
        for p in projects:
            p["theme"] = themes.THEMES[p["slug"]]
            p["href"] = f"{cfg['projects_dir']}/{p['slug']}.html"

        # Accueil
        depth = 1 if cfg["prefix"] else 0
        root = "../" * depth
        paths = page_paths(code)
        write(ROOT / paths[code], env.get_template("home.html").render(
            site=c.SITE, home=c.HOME, path=c.PATH, skills=c.SKILLS, languages=c.LANGUAGES,
            projects=projects, theme=themes.HOME_THEME, root=root, lang=code,
            alt_href=root + paths[other], page="home", canonical=paths[code],
        ))

        # Projets
        for i, p in enumerate(projects):
            depth = 2 if cfg["prefix"] else 1
            root = "../" * depth
            paths = page_paths(code, p["slug"])
            prev_p = projects[i - 1] if i > 0 else projects[-1]
            next_p = projects[(i + 1) % len(projects)]
            write(ROOT / paths[code], env.get_template("project.html").render(
                site=c.SITE, p=p, theme=p["theme"], root=root, lang=code,
                alt_href=root + paths[other], page="project", canonical=paths[code],
                prev_p=prev_p, next_p=next_p, home_href=root + ("en/index.html" if cfg["prefix"] else "index.html"),
                index=i + 1, total=len(projects),
            ))

    # 404 (GitHub Pages)
    c = contents["fr"]
    write(ROOT / "404.html", env.get_template("404.html").render(site=c.SITE, theme=themes.HOME_THEME, root="/Portfolio-thomaks/", lang="fr"))
    print("done")


if __name__ == "__main__":
    build()
