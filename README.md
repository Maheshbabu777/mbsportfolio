# mbsportfolio

Personal site of Mahesh Babu Vishnumolakala. React 19, Vite and Tailwind, deployed on Vercel.

## Run it

```bash
npm install
npm run dev      # local dev server
npm run build    # production build in dist/
```

## Environment variables (Vercel project settings)

| Variable | What it does |
| --- | --- |
| `VITE_FIREBASE_API_KEY`, `VITE_FIREBASE_AUTH_DOMAIN`, `VITE_FIREBASE_PROJECT_ID` | Firestore like counter in the footer |
| `VITE_WEB3FORMS_KEY` | Optional. Contact form posts straight to the inbox. Without it the form opens the visitor's mail app. |

## Where things live

- `src/data.js` holds all the content: profile, experience, projects, skills, achievements. Edit this file to update the site.
- `src/components/` has one file per section, plus the header, search menu (Ctrl/⌘ K), cursor, sounds and the ghost game.
- `public/` has the fonts (Geist, Geist Mono, Geist Pixel), the resume PDF, favicon and the link preview image.
- `vercel.json` rewrites every route to `index.html` so `/contact` works on refresh.

## Features

- Light, dark and colour mode (logos in their real colours), remembered per visitor
- Search menu with keyboard navigation
- Contact page with a draft that survives reloads
- Live GitHub contribution graph
- Click sounds with a mute switch
- Catch the ghost: a 30 second game with the logo, started from Play in the header
