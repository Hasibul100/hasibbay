# Hasibbay — Premium Personal Portfolio

A production-ready, fully responsive personal portfolio website built with plain **HTML5, CSS3 and vanilla JavaScript** — no frameworks, no build step. Premium dark theme with glassmorphism, scroll reveal, typing animation, animated counters and an animated candlestick-ticker background.

## Folder Structure

```
portfolio/
├── index.html
├── style.css
├── script.js
├── assets/
│   ├── images/
│   ├── icons/
│   └── favicon/
│       ├── favicon.svg
│       ├── favicon.ico
│       ├── apple-touch-icon.png
│       ├── icon-192.png
│       └── icon-512.png
├── robots.txt
├── sitemap.xml
├── manifest.json
├── README.md
└── LICENSE
```

## How To Edit

1. **Text & content** — open `index.html` in any code editor. Every section is clearly commented (`<!-- ===== SECTION ===== -->`). Edit headings, paragraphs and list items directly.
2. **Colors & theme** — all design tokens live at the top of `style.css` inside `:root`. Change `--bg`, `--card`, `--primary`, `--accent`, `--text`, `--muted` to re-theme the entire site instantly.
3. **Typing animation phrases** — edit the `phrases` array near the top of `script.js`.
4. **Skills / progress bars** — in `index.html`, each `.skill-bar` has a `data-percent="XX"` attribute; change the number and the label text next to it.
5. **Projects** — duplicate a `.project-card` block inside the Projects section and update the image, title, description and links.
6. **Statistics counters** — edit the `data-count="XX"` attribute on each `.stat__num` element.
7. **Profile photo** — replace the `src` on `.avatar-img` in the Hero section, or swap it for a local file in `assets/images/`.
8. **CV download** — place your resume at `assets/Hasibbay-CV.pdf` (the Download CV button already points here).
9. **Contact form** — the form currently validates and shows a confirmation message client-side only. To actually receive submissions, connect it to a form backend such as Formspree, EmailJS, or your own server endpoint by updating the `fetch`/submit logic in `script.js`.

## How To Deploy

### GitHub Pages
1. Push this folder to a GitHub repository.
2. Go to **Settings → Pages**.
3. Under **Source**, select the `main` branch and `/root`.
4. Save — your site will be live at `https://<username>.github.io/<repo>/`.

### Netlify
1. Log in to [netlify.com](https://netlify.com) and click **Add new site → Deploy manually**.
2. Drag and drop the `portfolio` folder onto the upload area.
3. Netlify will generate a live URL instantly. Optionally connect a custom domain under **Domain settings**.

### Vercel
1. Log in to [vercel.com](https://vercel.com) and click **Add New → Project**.
2. Import the repository (or use the Vercel CLI: `vercel deploy` from inside the `portfolio` folder).
3. Since this is a static site, no build command is required — set the output directory to the project root.

## SEO Tips

- Update `<link rel="canonical">`, Open Graph and Twitter meta tags in `index.html` with your **real production domain** once deployed.
- Update the `sitemap.xml` and `robots.txt` `Sitemap:` line with your real domain too.
- Keep the JSON-LD `Person` schema in `index.html` accurate — search engines use it for rich results.
- Compress and serve real photos in modern formats (WebP/AVIF) inside `assets/images/`.

### Google Search Console

1. Go to [search.google.com/search-console](https://search.google.com/search-console).
2. Add your property (domain or URL prefix) and verify ownership (DNS TXT record or HTML file upload).
3. Once verified, your site is registered for indexing and performance tracking.

### Submit Sitemap

1. Inside Search Console, open **Sitemaps** in the left sidebar.
2. Enter `sitemap.xml` and click **Submit**.
3. Google will periodically re-crawl the sitemap to discover updated pages.

### Request Indexing

1. Use the **URL Inspection** tool in Search Console.
2. Paste your live page URL and click **Test Live URL**.
3. If eligible, click **Request Indexing** to speed up discovery of new or updated content.

## Performance & Accessibility Notes

- Images use `loading="lazy"` and explicit `width`/`height` to reduce layout shift.
- Animations respect `prefers-reduced-motion`.
- Color contrast follows WCAG AA guidance against the dark background.
- All interactive elements are keyboard-focusable with visible focus states.

## License

Released under the MIT License — see `LICENSE`.
