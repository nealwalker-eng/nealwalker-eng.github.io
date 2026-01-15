# GitHub Pages Deployment Troubleshooting

## Quick Fixes

### 1. Check if GitHub Pages is Enabled

1. Go to: https://github.com/nealwalker-eng/nealwalker-eng.github.io
2. Click **Settings** (top right of repository)
3. Scroll down to **Pages** (left sidebar)
4. Under **Source**, make sure **GitHub Actions** is selected
5. If it says "None" or "Deploy from a branch", change it to **GitHub Actions**
6. Click **Save**

### 2. Check if Repository is Public

1. Go to repository Settings
2. Scroll to the bottom
3. Under **Danger Zone**, check if it says "Change repository visibility"
4. If it's private, click **Change visibility** → **Make public**
5. GitHub Pages requires public repositories for free hosting

### 3. Check GitHub Actions Workflow

1. Go to your repository
2. Click the **Actions** tab
3. Look for "Deploy to GitHub Pages" workflow
4. Click on it to see if it ran and if there were any errors
5. If it failed, check the error messages

### 4. Manually Trigger Deployment

If the workflow didn't run automatically:

1. Go to **Actions** tab
2. Click "Deploy to GitHub Pages" workflow
3. Click **Run workflow** button (top right)
4. Select **main** branch
5. Click **Run workflow**

### 5. Verify Build Output

The workflow should create an `out` folder. If there are build errors, they'll show in the Actions log.

## Common Issues

### Issue: "Workflow not found"
- Make sure `.github/workflows/deploy.yml` exists in your repository
- Check that you pushed it to GitHub

### Issue: "Build failed"
- Check the Actions log for specific error messages
- Common causes: missing dependencies, TypeScript errors, build configuration issues

### Issue: "Pages not deploying"
- Ensure GitHub Pages is set to use "GitHub Actions" (not "Deploy from a branch")
- Wait 5-10 minutes after enabling
- Clear browser cache and try again

### Issue: "404 errors on pages"
- This is normal for the first few minutes after deployment
- Wait 10-15 minutes for DNS propagation

## Still Not Working?

If none of the above works, we can:
1. Check the Actions logs together
2. Try an alternative deployment method
3. Verify all configuration files are correct
