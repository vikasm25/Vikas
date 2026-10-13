# Vikas Kumar Meena — Personal Website

A portfolio for my environmental engineering research, projects, fieldwork, publications, and conference presentations. The site is built with plain HTML, CSS, and JavaScript; it needs no framework, package installation, or build step.

Website: [vikasm25.github.io/Vikas](https://vikasm25.github.io/Vikas/)

## What the Site Includes

- Responsive Home, About, Projects, Publications, and Contact pages.
- Light and dark themes with the visitor's choice saved in the browser.
- Search on the Projects and Publications pages, plus category filters for projects.
- Project and experience details in a popup; project images appear there when available.

## Preview Locally

From the project directory, start a local server:

```sh
python -m http.server 8000
```

Open [http://localhost:8000/](http://localhost:8000/) in a browser. On Windows, `py -m http.server 8000` also works if Python is installed through the Python launcher.

## Project Files

| Path | Purpose |
| --- | --- |
| `index.html` | Introduction, research focus, and featured work |
| `about.html` | Research, education, skills, certifications, and achievements |
| `projects.html` | Searchable projects and experience, including the shared details popup |
| `publication.html` | Searchable publications and conference presentations |
| `contact.html` | Email and professional profiles |
| `css/base.css` | Shared colours, typography, navigation, footer, and responsive rules |
| `css/site.css` | Page sections, cards, publication rows, and popup styling |
| `js/site.js` | Theme switch and mobile navigation |
| `js/catalog.js` | Search, project filters, and popup behaviour |
| `assets/images/` | Images used by the pages and project popup |

## Update Content

- Edit text and links in the relevant HTML page. The header navigation is repeated in all five pages, so update each copy when changing it.
- Add a project in the `#projects` section of `projects.html`. Its `data-category` controls filtering, `.work-detail` supplies the popup description, and `data-image-src` supplies an optional popup image.
- Add a publication or presentation as a `.publication-row.searchable-entry` in the appropriate section of `publication.html`. Search uses the row's text, so no separate search index is needed.
- Adjust the light and dark colour variables in `css/base.css`; page-specific layouts are in `css/site.css`.
- Keep image filename spelling and letter case identical to HTML references. Static hosts such as GitHub Pages treat filename case as significant.

## Publish

Publish the project directory as a static site with GitHub Pages or another static host. Keep `index.html` and the other pages at the site root, with the `css/`, `js/`, and `assets/` folders beside them. No generated build directory is required.

## License

The source code is licensed under the [MIT License](LICENSE). Personal information, photographs, project images, and contact details are excluded from that permission and may not be reused or redistributed.
