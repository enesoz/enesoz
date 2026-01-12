---
description: Deploy Angular App to GitHub Pages
---

# Deploying to GitHub Pages

This workflow allows you to publish your CV application to GitHub Pages for free hosting.

## Prerequisites

- You must be logged into GitHub in your terminal (or have SSH keys set up).
- The repository must be connected to `https://github.com/enesoz/my-cv.git`.

## Steps

1. **Add the deployment capability**:
    We will use the `angular-cli-ghpages` package to simplify deployment.

    ```bash
    ng add angular-cli-ghpages
    ```

2. **Build and Deploy**:
    We need to build the project with the correct "base URL" so it works at `https://enesoz.github.io/my-cv/`.

    The command below builds the project and attempts to upload it to the `gh-pages` branch of your repository.

    ```bash
    ng deploy --base-href=/my-cv/
    ```

3. **Handle Refresh/Deep Links (404 Trick)**:
    GitHub Pages doesn't natively support Single Page Apps (SPA) deep linking. If you refresh a page like `/en`, you might get a 404 error.
    To fix this, we can ensure a `404.html` exists that mirrors `index.html`.

    *Note: The `angular-cli-ghpages` might not do this automatically. It is often safer to set `cname` or use a post-build script, but for now, the basic deployment above will work for the root page.*

## Viewing your site

After deployment, your site will be available at:
`https://enesoz.github.io/my-cv/`
