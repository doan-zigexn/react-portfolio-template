# Portfolio Customization Report
**Date:** 2026-06-01
**Branch:** `week2-claude-code-exercise/portfolio-search`
**Status:** All changes reverted to original state. Ready for re-application.

---

## 1. Profile & Content Personalization

### Files to change

#### `public/data/settings.json`
| Field | Original | New |
|---|---|---|
| `preloaderSettings.title` | `"React <strong>Portfolio</strong>"` | `"Doan <strong>Nguyen</strong>"` |
| `preloaderSettings.subtitle` | `"by Ryan Balieiro"` | `"Junior Developer"` |

#### `public/data/profile.json`
Full replacement. Key changes:

| Field | Original | New |
|---|---|---|
| `name` | `"Mark Choi"` | `"Doan Nguyen"` |
| `profilePictureUrl` | `"images/pictures/profile-picture.jpg"` | `"images/pictures/main_port.jpg"` |
| `locales.en.localized_name` | `"Mark Choi"` | `"Doan Nguyen"` |
| `locales.en.localized_name_stylized` | `"[[Mark {{Choi}}]]"` | `"[[Doan {{Nguyen}}]]"` |
| `locales.en.status_message_available_for_freelance` | `"Available for freelance!"` | `"Open to opportunities!"` |
| `locales.en.roles` | `["Backend Developer", "Frontend Developer", "DevOps Engineer", "UX Designer"]` | `["Junior Developer", "Backend Developer"]` |

Remove: Korean, Spanish, French locale entries (not relevant to user).
Remove: `name_pronunciation_ipa`, `name_pronunciation_audio_url`.
**Image:** Copy `~/Downloads/caulong/main_port.jpg` → `public/images/pictures/main_port.jpg`

#### `public/data/sections/cover.json`
Two changes inside the existing structure:

**1. Title locales** — simplify to English only:
```json
"en": {
    "title_short": "Welcome!",
    "title_short_nav": "About me",
    "title_long_prefix": "Hello...",
    "title_long": "I'm {{Doan Nguyen!}}"
}
```
Remove: `es`, `fr`, `ko` title locale entries.

**2. Bio text** — replace the `ArticleText` item's `locales` with English only:
```json
"en": {
    "text": "<p>I'm a {{backend developer}} born in 2004, passionate about building [[scalable web applications]]. I work primarily with Spring Boot and Ruby on Rails, and have hands-on experience with Redis, Kafka, and Elasticsearch.</p><p>I enjoy tackling complex problems, learning new technologies, and writing clean, maintainable code. Still early in my career, but I bring [[curiosity, dedication, and a drive to grow]] every single day.</p><p>Let's build something [[great together!]]</p>"
}
```

#### `public/data/sections/skills.json`
Full replacement. Keep same structure (`ArticleCards` + two `ArticleSkills`) but with new content:

**ArticleCards (id: 1)** — 4 cards:
1. `{{Backend}} Development` — Building REST APIs with Spring Boot and Ruby on Rails.
2. `{{Frontend}} Development` — Creating responsive UIs with JavaScript, HTML & CSS.
3. `{{Distributed}} Systems` — Working with Kafka, Redis, and Elasticsearch.
4. `{{Containerization}}` — Containerizing applications with Docker.

**ArticleSkills — Backend Stack (id: 2):**
| Skill | Icon | Color | Start | Proficiency |
|---|---|---|---|---|
| Spring Boot | `fa-solid fa-leaf` | `#6DB33F` | 2022-06 | 75% |
| Ruby on Rails | `fa-solid fa-gem` | `#CC0000` | 2023-03 | 70% |
| Redis | `fa-solid fa-memory` | `#DC382D` | 2023-06 | 60% |
| Elasticsearch | `fa-solid fa-magnifying-glass` | `#005571` | 2023-09 | 55% |
| Apache Kafka | `fa-solid fa-stream` | `#231F20` | 2024-01 | 50% |
| Docker | `fa-brands fa-docker` | `#2496ED` | 2023-06 | 40% (Basic) |

**ArticleSkills — Frontend Stack (id: 3):**
| Skill | Icon | Color | Start | Proficiency |
|---|---|---|---|---|
| HTML 5 | `fa-brands fa-html5` | `#E34F26` | 2021-09 | 85% |
| CSS 3 | `fa-brands fa-css3-alt` | `#1572B6` | 2021-09 | 75% |
| JavaScript | `fa-brands fa-js` | `#F7DF1E` / `#a69617` | 2022-03 | 75% |

---

## 2. Portfolio Projects

#### `public/data/sections/portfolio.json`
Full replacement. Simplify title locales to English only. Two categories: `category_web`, `category_apps`.

| # | Title | Category | GitHub URL | Icon | Color | Tags |
|---|---|---|---|---|---|---|
| 1 | Second Life | Web | `github.com/Naodab/Second_Life` | `fa-solid fa-recycle` | `#1a7a4a` | Spring Boot, Microservices, TypeScript, Docker |
| 2 | DeepCare | Web | `github.com/Naodab/DeepCare` | `fa-solid fa-heart-pulse` | `#c0392b` | AI, Healthcare, Django, Next.js |
| 3 | Chess | Web | `github.com/Naodab/Chess` | `fa-solid fa-chess` | `#2c3e50` | Spring Boot, WebSocket, Java, AI |
| 4 | SmartHome | Web | `github.com/Naodab/Smart_Home` | `fa-solid fa-house-signal` | `#2980b9` | IoT, Django, AI, PyTorch |
| 5 | AI Stylist App | Apps | `github.com/huynh-van-loc/ai-stylist-app` | `fa-solid fa-shirt` | `#8e44ad` | AI, Fashion, Mobile |
| 6 | Dictionary App | Apps | `github.com/Naodab/DictionaryApp` | `fa-solid fa-book-open` | `#d35400` | Android, Kotlin, WebRTC, Firebase |

**Note on AI Stylist App:** The GitHub URL `github.com/huynh-van-loc/ai-stylist-app` returned 404 during fetch — the repo may be private or the URL is incorrect. Verify before applying.

**Project descriptions (sourced from READMEs):**

- **Second Life:** A microservices-based web platform with dedicated services for authentication, booking, inventory, product listing, and location. Built with Spring Boot on the backend and a TypeScript frontend, fully orchestrated with Docker Compose.
- **DeepCare:** An AI-powered healthcare diagnostics platform. Supports brain tumor detection from MRI scans, skin cancer detection, and multi-disease prediction. Backend: Django REST Framework + TensorFlow/PyTorch. Frontend: Next.js.
- **Chess:** A full-featured chess web app supporting AI single-player (Minimax + Alpha-Beta Pruning) and real-time multiplayer via WebSockets. Built with Spring Boot, JWT authentication, and MySQL.
- **SmartHome:** A smart home platform integrating IoT device control with AI/ML features powered by PyTorch with CUDA support. Backend: Django REST Framework. Frontend: Next.js.
- **AI Stylist App:** An AI-powered personal stylist application that provides outfit recommendations and fashion suggestions.
- **Dictionary App:** A comprehensive Android dictionary app for learning English. Features an English–English dictionary, vocabulary quizzes, favorites, and real-time video calls via WebRTC. Built with Kotlin, Firebase, and ObjectBox for offline-first search.

---

## 3. Portfolio Search Bar Feature (Planned, Not Implemented)

### Requirements
- Placed between the category buttons and the project grid.
- Matches query against each project's **title**, **tags**, and **description** (case-insensitive).
- Respects the currently active category filter (All / Web / Apps).
- **300 ms debounce** — no flicker on every keystroke.
- **Clear button** visible when input has text; clicking it clears the query and refocuses the input.
- **Empty state** — friendly inline message + reset button when no projects match (no browser alert).
- **Accessible** — labeled `<input>`, live region announcing result count changes for screen readers.
- **Mobile** — full-width bar under category buttons, readable on small screens.

### Files to investigate before implementing
To implement this correctly, the following source files need to be read first:

```
src/
  components/
    articles/
      ArticlePortfolio/          ← main component to modify
        ArticlePortfolio.jsx (or .tsx)
        ArticlePortfolio.module.scss (or .css)
        components/
          PortfolioItem.*         ← item card sub-component
          CategoryFilter.*        ← category button sub-component (if exists)
  hooks/
    useDebounce.*                ← may already exist; create if not
```

### Implementation plan (high-level)
1. **`useDebounce` hook** — `hooks/useDebounce.js` — takes `(value, delay)`, returns debounced value.
2. **`PortfolioSearchBar` component** — controlled input with clear button, `aria-label`, `aria-controls` pointing at the grid.
3. **Search logic in `ArticlePortfolio`** — add `searchQuery` state; after debounce, filter `visibleItems` by checking `title.toLowerCase()`, `tags.join(' ').toLowerCase()`, and `text.toLowerCase()` against the query, then intersect with the active category filter.
4. **Empty state** — render a message + "Clear search" button inside the grid container when filtered result is empty.
5. **Live region** — `<div role="status" aria-live="polite">` that announces `"X projects found"` after each filter update.
6. **Styles** — full-width on mobile via the existing grid's CSS breakpoint.


As a senior developer, replace content in this app with my information:
  Profile:
    Name: Doan Nguyen, Role: Junior Developer, Image: ~/Downloads/caulong/main_port.jpg, bio: generate for me, born in 2004 and passionate about coding
  Skills: Spring boot, Ruby on Rails, Javascirpt, HTML & CSS, basic docker, elasticsearch, redis, kafka
  Portfolio:
    1. Second life: https://github.com/Naodab/Second_Life
    2. DeepCare: https://github.com/Naodab/DeepCare
    3. Chess: https://github.com/Naodab/Chess
    4. SmartHome: https://github.com/Naodab/Smart_Home
    5. AiStylistApp: https://github.com/huynh-van-loc/ai-stylist-app
    6. DictionaryApp: https://github.com/Naodab/DictionaryApp
  Category portfolio: categorize_by in public/data/sections/portfolio.json

  Use following docs to address my request:
    1. @docs/tutorials/TUTORIAL_02_CONFIGURING_SETTINGS_JSON.md
    2. @docs/tutorials/TUTORIAL_04_PROFILE_AND_STRINGS.md
    3. @docs/tutorials/TUTORIAL_11_ARTICLE_SKILLS.md
    4. @docs/tutorials/TUTORIAL_14_ARTICLE_PORTFOLIO.md
