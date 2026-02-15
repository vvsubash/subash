# Quick Start Guide - Deploy in 10 Minutes

Get your technical blog live on Cloudflare Pages in just a few steps.

## Prerequisites

✅ You have these ready:
- GitHub account
- Cloudflare account (free)
- Git installed

## 1️⃣ GitHub Setup (2 min)

```bash
cd blog-vue-nuxt
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/blog-vue-nuxt.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username.

## 2️⃣ Cloudflare Connection (3 min)

1. Go to [Cloudflare Pages](https://pages.cloudflare.com/)
2. Click **Create a project** → **Connect to Git**
3. Install the Cloudflare GitHub app
4. Select repository: `blog-vue-nuxt`
5. Click **Begin setup**

## 3️⃣ Build Configuration (2 min)

Set these values in Cloudflare:

| Field | Value |
|-------|-------|
| Production branch | `main` |
| Build command | `hugo --minify` |
| Build output | `public` |
| Framework | `Hugo` |

Add environment variable:
```
HUGO_VERSION = 0.120.0
```

## 4️⃣ Deploy! (3 min)

Click **Save and Deploy**. Cloudflare will automatically:
- Clone your repo
- Build your site
- Deploy globally

Your site is live! You'll get a URL like: `https://blog-vue-nuxt.pages.dev`

## ✅ You're Done!

Your blog is now deployed. Every time you push to GitHub, it auto-deploys.

### Test It Works

```bash
hugo server --buildDrafts
# Visit http://localhost:1313
```

## Next Steps

### Add Your Domain

1. Buy a domain (optional)
2. In Cloudflare Pages → **Custom domains**
3. Add your domain
4. Update `hugo.toml`: `baseURL = 'https://yourdomain.com/'`
5. Push to GitHub

### Submit to Google

1. [Google Search Console](https://search.google.com/search-console)
2. Add your domain
3. Go to **Sitemaps**
4. Submit: `https://yourdomain.com/sitemap.xml`

### Write Posts

```bash
hugo new content posts/my-awesome-post.md
# Edit the file
git add .
git commit -m "Add new post"
git push
```

Auto-deployed! 🚀

## Troubleshooting

**Build fails?** Check environment variable `HUGO_VERSION = 0.120.0`

**Sitemap missing?** Already generated! It's at `/sitemap.xml`

**Domain not working?** Wait 24-48 hours for DNS, then check Cloudflare settings

## Resources

- Full guide: Read `DEPLOYMENT.md`
- Hugo docs: https://gohugo.io/
- Cloudflare docs: https://developers.cloudflare.com/pages/

---

**Questions?** Check the main README.md for detailed explanations.
