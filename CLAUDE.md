# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Single-page React portfolio/resume for Matteo Vilardo (Game/Backend Developer). Built on Create React App with Tailwind, Framer Motion, and Aceternity-style components. Italian + English mixed copy. Theme switcher (3 palettes) at runtime.

## Commands

- `npm start` — dev server on http://localhost:3000
- `npm run build` — production build into `build/`
- `npm test` — CRA Jest watcher (no real tests beyond default `App.test.js`)
- Docker: `docker build -t resume . && docker run -p 3000:3000 resume`

No lint script wired. ESLint runs via `react-scripts` (`react-app` config). Two pre-existing `react-hooks/exhaustive-deps` warnings in `atoms/effects/InfiniteMovingCards.jsx` and `atoms/effects/ThreeDCard.jsx` come from upstream Aceternity code — leave them.

## Architecture (Atomic Design)

`src/App.js` is ~25 lines: wraps everything in `<ThemeProvider>` and composes top-level organisms inside `<PageLayout>`. No state, no copy, no JSX details. To change anything visible, edit `src/data/` or the relevant atom/molecule/organism — never `App.js`.

```
src/
  App.js                          composition root
  index.js / index.css
  context/ThemeContext.js         ThemeProvider + useTheme()
  utils/cn.js                     clsx + tailwind-merge helper
  data/                           ALL CONTENT lives here
    index.js                      re-exports DATA + named exports
    profile.js                    name, title, description, image, contacts, cv
    projects.js                   projects array
    experience.js                 work history
    themes.js                     THEMES + DEFAULT_THEME_KEY
    strings.js                    UI copy (sections, labels, footer, hero)
    navigation.js                 NAV_ITEMS for FloatingNavbar
    tech.js                       TECH_GROUPS + TECH_QUOTES (icons as strings)
    iconMap.js                    string → lucide-react component map
  components/
    atoms/                        primitives, no business logic
      Button.jsx                  themed CTA (solid/ghost variants)
      PulseDot.jsx                animated dot
      Tag.jsx                     chip (project tags, period chips)
      ContactIcon.jsx             social link with hover ring
      Icon.jsx                    <Icon name="code" /> via iconMap
      effects/                    Aceternity animation primitives
        TracingBeam.jsx
        TextGenerateEffect.jsx
        InfiniteMovingCards.jsx
        ThreeDCard.jsx            (CardContainer/Body/Item)
    molecules/                    small composites
      SectionHeading.jsx          h2 + subtitle + divider + p
      ProjectFilterBar.jsx        filter chips row
      TechItem.jsx                icon + name + level card
      ContactSocialBar.jsx        Hero social row (LinkedIn/Upwork/CV/Email)
      TimelineEntry.jsx           single experience entry
      ProjectMeta.jsx             role/year/client/stack 4-cell grid
    organisms/                    full sections + standalone widgets
      FloatingNavbar.jsx          scroll-aware top nav
      ThemeSwitcher.jsx           3-palette picker (top-right)
      DSSBackground.jsx           fixed 3D parallax tunnel
      Preloader.jsx               full-screen loader (owns its own state)
      HeroSection.jsx             hero with parallax (owns its useScroll ref)
      ProjectCard.jsx             single project card
      ProjectModal.jsx            project detail modal w/ image carousel
      ProjectsGrid.jsx            section: filter + grid + modal state
      ExperienceTimeline.jsx      section: TracingBeam + TimelineEntry[]
      TechStack.jsx               section: groups + InfiniteMovingCards
      ContactSection.jsx          section: form (mailto submit)
      SiteFooter.jsx              footer
    templates/
      PageLayout.jsx              root container + DSSBackground + Navbar + ThemeSwitcher slots
```

### Theming

Single source: `src/context/ThemeContext.js`. `<ThemeProvider>` wraps the app in `App.js`. Components consume with `const { theme } = useTheme();` and inline-style with `theme.accent`/`theme.primary` plus alpha-hex suffixes (e.g. `${accent}22` for ~13% opacity). **No theme prop drilling** — if you need theme in a new component, call `useTheme()`.

### Localization (i18n)

Single source: `src/context/LocaleContext.js`. `<LocaleProvider>` wraps the app (above ThemeProvider). Supports `it` and `en`. Initial locale: `localStorage("locale")` if set, else `navigator.language` starting with `it` → `it`, else `en`. Selection persists via `localStorage`.

Pattern: any translatable field is either a plain string (locale-agnostic, e.g. `"Unity"`, `"C#"`, year `"2023"`) **or** an object `{ it: "...", en: "..." }`. Components resolve via the `t(value)` helper from `useLocale()`:

```js
const { locale, t } = useLocale();
const s = STRINGS[locale];                  // section-style copy bucket per locale
<p>{t(project.description)}</p>             // plain or { it, en }
```

`STRINGS` in `data/strings.js` is keyed by locale (`STRINGS.it.sections.contact.button`). `PROJECT_FILTERS` is a separate export with `{ value, label }` so the filter VALUE stays universal (matches `project.categories[]`) while the LABEL is translated.

### State location

- Theme — `ThemeContext` (global).
- Project filter + selected modal — `ProjectsGrid` (local).
- Preloader visibility — `Preloader` (local, timed via `LOADING_DURATION_MS = 900` constant inside the file).
- Hero scroll parallax — `HeroSection` (local `useScroll` against its own ref).

No other global state. No router (single page, anchor scroll).

## How to change content

| Task | Where |
|------|-------|
| Edit name/title/bio/contact links | `src/data/profile.js` |
| Add/edit/remove a project | `src/data/projects.js` (push an object with `id`, `title`, `categories[]`, `description`, `longDescription`, `images[]`, `tags[]`, `metadata`). Each entry in `categories[]` must match a string in `STRINGS.sections.projects.filters`; the project shows up under every category it lists. |
| Add/edit experience entry | `src/data/experience.js` (first entry renders as "PRESENT" with accent color) |
| Edit tech stack list | `src/data/tech.js` — `icon` is a string key from `iconMap.js`. Add new icons there if needed. |
| Edit tech testimonials | `src/data/tech.js` → `TECH_QUOTES` |
| Edit any UI copy | `src/data/strings.js` (STRINGS.it / STRINGS.en) |
| Edit nav items | `src/data/navigation.js` (icon is a string from `iconMap.js`; `name` accepts `{ it, en }`) |
| Add a third language | extend `SUPPORTED` in `LocaleContext.js`, add new key under `STRINGS`, add `{ it, en, xx }` translations across data files. `t()` falls back to `en` if missing. |
| Add a new color theme | `src/data/themes.js` — append a key with `{ name, primary, secondary, accent, bg, grid }`. The switcher renders `Object.entries(THEMES)` so the new palette appears automatically. |
| Change default theme on load | `src/data/themes.js` → `DEFAULT_THEME_KEY` |
| Tweak preloader duration | `LOADING_DURATION_MS` const at top of `src/components/organisms/Preloader.jsx` |

## React reminders (post-3-year break)

- All components are functional with hooks. No classes.
- `useState` / `useEffect` / `useContext` cover ~all needs in this codebase. `useMemo`/`useRef` used in a few places (theme value memo, scroll refs).
- Keep components pure: data flows down (props), events flow up (callbacks). Theme/global state goes through context.
- `cn(...)` from `utils/cn.js` is the canonical way to combine Tailwind classes conditionally — `clsx + tailwind-merge` resolves duplicate utility conflicts.
- File extensions: components are `.jsx`, data/utils/context are `.js`. CRA accepts both interchangeably.
- Imports from `lucide-react` for icons. Add new icon names to `data/iconMap.js` so they're addressable as strings.

## Asset / publish notes

- `public/cv-matteo-vilardo-it.pdf` and `public/cv-matteo-vilardo-en.pdf` — **missing**. The CV download in `data/profile.js` resolves per locale via `t()`; both PDFs must exist or the download 404s. Filenames are configurable in `profile.js → contacts.cv`.
- `public/images/trenitalia_*.png` are reused as placeholders in `data/projects.js` for "Real Estate" and "Cultural Heritage". Replace before publishing.
- Contact form uses `mailto:` only — no backend.
- `GEMINI.md` is the original brief; not loaded at runtime.
