# Portfolio Admin

This folder contains a lightweight browser-based CMS for the portfolio.

## Features

- Edit the home hero text
- Add, edit, and remove Projects
- Add, edit, and remove Experience items
- Add, edit, and remove Publications
- Add, edit, and remove Conferences
- Advanced raw HTML editor for the main pages

## Authentication

Use a fine-grained GitHub personal access token limited to `vikasm25/Vikas` with **Contents: Read and write**. The token is stored only in browser `sessionStorage` and is removed when you disconnect or end the browser session.

After this branch is merged, the admin dashboard will be available at `/Vikas/admin/` on GitHub Pages. Saving from the dashboard creates a commit on `main`, which triggers the normal GitHub Pages publishing flow.
