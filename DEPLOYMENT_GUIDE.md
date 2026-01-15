# GitHub Pages Deployment Guide

This guide will help you deploy your Next.js website to GitHub Pages at `https://nealwalker-eng.github.io/`.

## Prerequisites

1. A GitHub account
2. A repository named `nealwalker-eng.github.io` (or your username.github.io)
3. Git installed on your computer

## Step-by-Step Deployment

### 1. Initialize Git Repository (if not already done)

```bash
git init
git add .
git commit -m "Initial commit - APS website"
```

### 2. Create GitHub Repository

1. Go to [GitHub](https://github.com) and create a new repository
2. Name it `nealwalker-eng.github.io` (must match your GitHub username)
3. Make it **public** (required for free GitHub Pages)
4. **Don't** initialize with README, .gitignore, or license

### 3. Connect Local Repository to GitHub

```bash
git remote add origin https://github.com/nealwalker-eng/nealwalker-eng.github.io.git
git branch -M main
git push -u origin main
```

### 4. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Under **Source**, select **GitHub Actions**
4. The workflow will automatically deploy when you push to `main`

### 5. First Deployment

The GitHub Actions workflow (`.github/workflows/deploy.yml`) will automatically:
- Build your Next.js site
- Export it as static files
- Deploy to GitHub Pages

After pushing, you can see the deployment progress:
1. Go to the **Actions** tab in your repository
2. Watch the workflow run
3. Once complete, your site will be live at `https://nealwalker-eng.github.io/`

### 6. Future Updates

Simply push changes to the `main` branch:

```bash
git add .
git commit -m "Update website"
git push
```

The GitHub Actions workflow will automatically rebuild and redeploy your site.

## Manual Deployment (Alternative)

If you prefer to deploy manually:

```bash
# Build the site
npm run build

# The output will be in the 'out' folder
# You can then push the 'out' folder contents to the 'gh-pages' branch
```

## Troubleshooting

### Site Not Loading
- Wait 5-10 minutes after first deployment (GitHub Pages can take time to propagate)
- Check the Actions tab for any build errors
- Ensure your repository is public

### Build Errors
- Check the Actions tab for error messages
- Ensure all dependencies are in `package.json`
- Try building locally: `npm run build`

### 404 Errors
- Ensure `trailingSlash: true` is set in `next.config.js` (already configured)
- Check that all links use relative paths

### Images Not Loading
- Images should be in `public/images/` folder
- Use relative paths: `/images/filename.jpg`

## Custom Domain (Optional)

If you want to use a custom domain later:

1. Add a `CNAME` file in the `public/` folder with your domain
2. Update `next.config.js` to remove `basePath` if using root domain
3. Update DNS settings as per GitHub Pages documentation

## Notes

- GitHub Pages serves static files only (no server-side features)
- Forms will need to use Netlify Forms or another service
- The site is automatically rebuilt on every push to `main`
- Build time is typically 2-5 minutes

## Support

If you encounter issues:
1. Check GitHub Actions logs in the **Actions** tab
2. Verify all files are committed and pushed
3. Ensure the repository is public
4. Check that GitHub Pages is enabled in Settings

---

**Your site will be live at: https://nealwalker-eng.github.io/**
