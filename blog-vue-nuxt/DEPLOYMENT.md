# Cloudflare Pages Deployment Guide

Quick steps to deploy your Hugo blog to Cloudflare Pages from your computer.

## Prerequisites

- Hugo Extended (v0.120+)
- Git
- GitHub account
- Cloudflare account (free tier is fine)

## Quick Start (5 minutes)

### 1. Create GitHub Repository

```bash
cd blog-vue-nuxt
git init
git add .
git commit -m "Initial commit: Hugo blog with Vue and Nuxt content"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/blog-vue-nuxt.git
git push -u origin main
```

### 2. Set Up Cloudflare Pages

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Click **Pages** in left sidebar
3. Click **Create a project**
4. Select **Connect to Git**
5. Install Cloudflare GitHub app and authorize it
6. Select your `blog-vue-nuxt` repository

### 3. Configure Build Settings

In the Cloudflare Pages setup screen:

- **Production branch**: `main`
- **Framework preset**: `Hugo`
- **Build command**: `hugo --minify`
- **Build output directory**: `public`

### 4. Add Environment Variables

Click **Environment variables**:

```
HUGO_VERSION = 0.120.0
```

This ensures Cloudflare uses Hugo Extended.

### 5. Deploy!

Click **Save and Deploy**. Cloudflare will:
1. Clone your repository
2. Run `hugo --minify`
3. Deploy the `public/` folder to Cloudflare's network

Your site is now live! Cloudflare will give you a `.pages.dev` URL.

## Automatic Deployments

Every time you push to `main`, Cloudflare automatically:
- Builds your site
- Deploys it globally
- Invalidates cache

```bash
# Create a new post
hugo new content posts/my-new-post.md

# Edit the post
nano content/posts/my-new-post.md

# Commit and push
git add .
git commit -m "Add new post: My New Post"
git push origin main
```

Done! Your blog updates automatically.

## Connect Custom Domain

1. Buy a domain (or use an existing one)
2. In Cloudflare Pages → **Custom domains**
3. Add your domain
4. Update nameservers to Cloudflare's (instructions provided)
5. Update `baseURL` in `hugo.toml`

```toml
baseURL = 'https://yourdomain.com/'
```

## Local Deployment (Optional)

If you prefer deploying from your computer:

### Install Wrangler CLI

```bash
npm install -g wrangler
```

### Authenticate

```bash
wrangler login
```

### Deploy

```bash
hugo --minify
wrangler pages deploy public --project-name blog-vue-nuxt
```

## SEO Setup

After deployment, submit your sitemap to search engines:

### Google Search Console

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add your domain
3. Verify with Cloudflare nameservers (automatic if using Cloudflare DNS)
4. Go to **Sitemaps**
5. Submit: `https://yourdomain.com/sitemap.xml`

### Bing Webmaster Tools

1. Go to [Bing Webmaster Tools](https://www.bing.com/webmasters)
2. Add your site
3. Verify and submit sitemap

### Monitoring

- **Google Search Console**: Check indexing, search queries, and errors
- **Cloudflare Analytics**: View traffic, visitors, and performance
- **Hugo built-in**: Local testing with `hugo server --buildDrafts`

## Analytics Setup

### Add Google Analytics

1. Create a Google Analytics account
2. Get your Measurement ID (starts with `G-`)
3. Update `hugo.toml`:

```toml
[params]
  analytics = "G-YOUR-MEASUREMENT-ID"
```

Rebuild and redeploy:

```bash
hugo --minify
git add .
git commit -m "Add Google Analytics"
git push origin main
```

## Troubleshooting

### Build Fails

**Error:** `Hugo not found` or version mismatch

**Solution:** Check Cloudflare Pages logs. Ensure `HUGO_VERSION = 0.120.0` is set in environment variables.

### Sitemap Not Indexing

**Error:** Sitemap shows 0 URLs in Google Search Console

**Solution:**
1. Check `enableSitemap = true` in `hugo.toml`
2. Verify sitemap exists: Visit `https://yourdomain.com/sitemap.xml`
3. Manually submit in Search Console

### Custom Domain Not Working

**Error:** Domain shows Cloudflare default page

**Solution:**
1. Wait 24-48 hours for DNS propagation
2. Check nameserver settings in your domain registrar
3. Verify in Cloudflare → Websites → DNS

### Changes Not Showing

**Error:** Pushed changes but site unchanged

**Solution:**
1. Check Cloudflare Pages deployment status (should say "Success")
2. Clear browser cache: `Ctrl+Shift+Delete` (or Cmd+Shift+Delete on Mac)
3. Try different browser or incognito mode

## Performance Monitoring

Cloudflare provides built-in analytics:

1. Go to Cloudflare Pages → **Analytics**
2. View:
   - Requests and bandwidth
   - Status codes
   - Countries
   - Cache performance

## Updating Content

### Add a New Post

```bash
hugo new content posts/topic-name.md
```

Edit the file:

```yaml
---
title: "Your Post Title"
description: "Short description for SEO (150-160 chars)"
date: 2024-02-15
tags: ["vue", "nuxt"]
categories: ["Vue.js"]
draft: false
---

# Your Content Here
```

### Edit Existing Post

```bash
nano content/posts/existing-post.md
```

### Publish Draft

Change `draft: true` to `draft: false`, then:

```bash
git add .
git commit -m "Publish: Post Title"
git push origin main
```

## Backup Your Content

Your GitHub repository is your backup, but consider:

```bash
# Regular local backups
cp -r blog-vue-nuxt ~/Backups/blog-$(date +%Y%m%d)

# Or use a backup service
```

## Resources

- [Hugo Docs](https://gohugo.io/documentation/)
- [Blowfish Theme](https://blowfish.page/)
- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages/)
- [SEO Best Practices](https://developers.google.com/search/docs)

## Next Steps

1. ✅ Deploy to Cloudflare Pages (this guide)
2. ✅ Set up custom domain
3. ✅ Submit sitemap to Google/Bing
4. ✅ Set up analytics
5. Add more blog posts
6. Share on social media
7. Build an audience!

Happy blogging! 🚀
