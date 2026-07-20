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

## Premium Add-ons (already wired into the code)

### 1. Custom Domain
This is a static site, so any registrar works (Namecheap, GoDaddy, Google Domains successor, etc.). Buy `hasibbay.com` or similar, then point it at your host:
- **GitHub Pages** — add a `CNAME` file containing your domain to the repo root, then set the A/ALIAS records per [GitHub's docs](https://docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site).
- **Netlify / Vercel** — add the domain in the dashboard's Domain settings and follow the DNS instructions shown there.
**Status: live on GitHub Pages** at `https://hasibul100.github.io/hasibbay/`. All meta tags, JSON-LD, `sitemap.xml` and `robots.txt` already point to this URL. If you later move to a custom domain (e.g. `hasibbay.com`), replace every `https://hasibul100.github.io/hasibbay/` reference in `index.html`, `sitemap.xml`, `robots.txt` and `manifest.json` with your new domain, and add a `CNAME` file to the repo root containing just the domain name.

### 2. Analytics
Commented snippets for both **Google Analytics 4** and **Plausible Analytics** are already sitting in `index.html`'s `<head>`, right after the JSON-LD blocks. Uncomment ONE of them and fill in your GA4 Measurement ID or Plausible domain.

### 3. Richer JSON-LD
`index.html` now ships three schema blocks: an expanded `Person` schema (skills, occupations, languages), a `WebSite` schema, and a `BreadcrumbList` schema — all pre-filled with your real info.

### 4. Custom Open Graph Banner
A 1200×630 banner (`assets/images/og-banner.png`) has been generated and wired into the Open Graph / Twitter Card meta tags. Swap it for your own design any time — just keep the same filename and dimensions.

### 5. Project Gallery
The static Projects grid uses placeholder screenshots. Replace each `<img src="https://placehold.co/...">` with real screenshots saved in `assets/images/` once you have them.

### 6. TradingView Widget (Live Market)
A live embedded chart sits at the top of the Trading section, powered by TradingView's official widget script (loaded at the bottom of `index.html`). It defaults to `FX:EURUSD` on a 1-hour interval — change the `symbol` / `interval` values inside `initTradingView()` in `script.js` to show a different pair or timeframe.

### 7. GitHub API — Auto-Loaded Projects
Below the static project cards, a "Latest Public Repositories" grid pulls live data from `https://api.github.com/users/Hasibul100/repos`, sorted by most recently updated (forks excluded). No key needed — GitHub's public API is used directly. To point it at a different account, change `GITHUB_USERNAME` near the top of the GitHub section in `script.js`.

### 8. EmailJS Contact Form
The contact form is wired for [EmailJS](https://www.emailjs.com):
1. Create a free EmailJS account, add an Email Service and a Template with `{{from_name}}`, `{{from_email}}`, `{{message}}` variables.
2. In `script.js`, replace `YOUR_EMAILJS_PUBLIC_KEY`, `YOUR_EMAILJS_SERVICE_ID` and `YOUR_EMAILJS_TEMPLATE_ID` with your real values.
3. Until those are filled in, the form automatically falls back to a local "demo mode" confirmation so it never looks broken to visitors.

### 9. Bangla / English Language Switch
Click the **EN / বাং** toggle in the navbar to switch languages instantly — no page reload, and the choice is remembered via `localStorage`. Key sections (nav, hero, section headings, contact form labels) are already translated. To translate more content, add a `data-i18n="your.key"` attribute to any element in `index.html`, then add a matching Bangla string under `translations.bn` in `script.js`.

### 10. Lighthouse 95+ Checklist
The site is already built with performance/SEO/accessibility in mind:
- Lazy-loaded images with explicit `width`/`height` to avoid layout shift
- `fetchpriority="high"` on the hero image, deferred/async third-party scripts
- Semantic HTML, visible focus states, `prefers-reduced-motion` support, alt text on every image
- Full meta/OG/Twitter/JSON-LD SEO coverage, `robots.txt` and `sitemap.xml`

To push toward a 95+ score in your own audit, also:
- Serve your real photos as compressed **WebP/AVIF** instead of the placeholder JPG/PNG
- Self-host the Google Fonts (or subset them) to cut an external request
- Run `Lighthouse` in Chrome DevTools after deploying (scores from `localhost` or dev previews are often lower than production due to missing HTTPS/CDN caching)
- If you don't end up using the TradingView widget or EmailJS, remove their `<script>` tags to trim unused JS

## Performance & Accessibility Notes

- Images use `loading="lazy"` and explicit `width`/`height` to reduce layout shift.
- Animations respect `prefers-reduced-motion`.
- Color contrast follows WCAG AA guidance against the dark background.
- All interactive elements are keyboard-focusable with visible focus states.

## License

Released under the MIT License — see `LICENSE`.
