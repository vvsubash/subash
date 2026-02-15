# Vue.js & Nuxt.js Technical Blog

A modern, SEO-optimized technical blog about Vue.js 3 and Nuxt.js, built with Hugo and deployed to Cloudflare Pages.

## Features

- ✅ **SEO Optimized**: Sitemap, robots.txt, meta tags, structured data
- ✅ **Fast Performance**: Hugo static site generation, minified output
- ✅ **Responsive Design**: Works on all devices with Blowfish theme
- ✅ **Automatic Deployment**: GitHub Actions → Cloudflare Pages
- ✅ **Search Enabled**: Built-in site search
- ✅ **RSS Feed**: Subscribe to new posts
- 📝 **Technical Content**: In-depth guides about Vue.js and Nuxt.js

## Project Structure

```
├── content/
│   └── posts/              # Blog posts (Markdown)
├── themes/
│   └── blowfish/           # Hugo theme
├── static/
│   └── robots.txt          # SEO robots file
├── hugo.toml               # Hugo configuration (SEO optimized)
├── .github/
│   └── workflows/
│       └── deploy.yml      # Cloudflare Pages deployment
└── public/                 # Generated site (ignored in git)
```

## Getting Started

### Prerequisites

- [Hugo Extended](https://gohugo.io/installation/) (v0.120+)
- Node.js 18+ (for Cloudflare deployment)
- Git

### Local Development

1. **Clone and install**
   ```bash
   git clone <your-repo>
   cd blog-vue-nuxt
   ```

2. **Start development server**
   ```bash
   hugo server --buildDrafts
   ```

3. **Open browser**
   Navigate to `http://localhost:1313`

### Creating New Posts

Create a new post:

```bash
hugo new content posts/my-post-title.md
```

Edit the generated file with your content. Key frontmatter fields:

```yaml
---
title: "Post Title"
description: "Short description for SEO meta tags"
date: 2024-02-15
tags: ["vue", "nuxt", "javascript"]
categories: ["Vue.js"]
draft: false
---
```

**Best Practices:**
- Descriptions: 150-160 characters
- Tags: 3-5 relevant tags
- Include code examples and screenshots
- Use `draft: true` while writing

## Deployment to Cloudflare Pages

### Step 1: Prepare Your GitHub Repository

```bash
git init
git add .
git commit -m "Initial commit: Hugo blog"
git remote add origin https://github.com/YOUR_USERNAME/blog-vue-nuxt.git
git push -u origin main
```

### Step 2: Create Cloudflare Account

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Create a free account
3. Navigate to **Pages**

### Step 3: Connect GitHub to Cloudflare Pages

1. Click **Create a project**
2. Select **Connect to Git**
3. Authorize Cloudflare to access your GitHub account
4. Select your repository `blog-vue-nuxt`
5. Click **Begin setup**

### Step 4: Configure Build Settings

In Cloudflare Pages:

- **Project name**: `blog-vue-nuxt`
- **Production branch**: `main` (or `master`)
- **Framework preset**: Select `Hugo`
- **Build command**: `hugo --minify`
- **Build output directory**: `public`

### Step 5: Add Environment Variables

In Cloudflare Pages settings → **Environment variables**:

```
HUGO_VERSION = 0.120.0
```

This ensures Cloudflare uses the correct Hugo version.

### Step 6: Set GitHub Secrets (For Local Deployments)

If you want to deploy from your computer instead:

1. Go to GitHub repository → **Settings** → **Secrets and variables** → **Actions**
2. Add these secrets:

```
CLOUDFLARE_API_TOKEN = <your-api-token>
CLOUDFLARE_ACCOUNT_ID = <your-account-id>
```

**Getting API Token:**
- Go to [Cloudflare API Tokens](https://dash.cloudflare.com/profile/api-tokens)
- Create token with "Cloudflare Pages - Edit" permission

**Getting Account ID:**
- Go to any Cloudflare Page
- Copy Account ID from sidebar

### Step 7: Deploy

Choose your deployment method:

#### Option A: Automatic (Recommended)
Push to GitHub - Cloudflare automatically builds and deploys:

```bash
git add .
git commit -m "Add new post"
git push origin main
```

#### Option B: From Your Computer
Install Wrangler CLI and deploy:

```bash
npm install -g wrangler
wrangler pages deploy public --project-name blog-vue-nuxt
```

## SEO Optimization Features

This blog is built with SEO best practices:

### 1. **Technical SEO**
- ✅ Automatic sitemap generation (`/sitemap.xml`)
- ✅ robots.txt for search engine crawling
- ✅ Canonical URLs
- ✅ Mobile-responsive design
- ✅ Fast page load times (Hugo static generation)
- ✅ Proper heading hierarchy (H1, H2, H3)

### 2. **Content SEO**
- ✅ Meta descriptions (from post descriptions)
- ✅ Schema.org structured data (via Blowfish theme)
- ✅ Open Graph meta tags for social sharing
- ✅ Keyword-rich URLs (`/posts/slug/`)

### 3. **Performance SEO**
- ✅ Minified HTML/CSS/JS
- ✅ Image optimization (use images in posts)
- ✅ Fast CDN delivery via Cloudflare
- ✅ Automatic HTTPS
- ✅ Zero CLS (Cumulative Layout Shift)

### 4. **Configuration for Better SEO**

Update `hugo.toml` with your details:

```toml
baseURL = 'https://yourdomain.com/'
title = 'Your Blog Title'
description = 'Your blog description'

[author]
  name = "Your Name"
  email = "your.email@example.com"

[[params.social]]
  icon = "github"
  url = "https://github.com/yourname"

[[params.social]]
  icon = "twitter"
  url = "https://twitter.com/yourname"
```

### 5. **Submit to Search Engines**

After deployment:

**Google Search Console:**
1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add your domain
3. Submit sitemap: `https://yourdomain.com/sitemap.xml`

**Bing Webmaster Tools:**
1. Go to [Bing Webmaster Tools](https://www.bing.com/webmasters)
2. Add your site
3. Submit sitemap

## Performance Tips

1. **Image Optimization**
   - Use compressed images
   - Hugo can optimize with a plugin
   - Consider WebP format

2. **Content Strategy**
   - Post 2-4 times per month
   - Update old posts occasionally
   - Use internal linking between posts

3. **Monitoring**
   - Check [Google Analytics](https://analytics.google.com)
   - Monitor [Google Search Console](https://search.google.com/search-console)
   - Track rankings with [Google Search Console](https://search.google.com/search-console)

## Customization

### Change Domain

1. Buy a domain (Namecheap, GoDaddy, etc.)
2. Point to Cloudflare nameservers
3. Update `baseURL` in `hugo.toml`
4. Update domain in Cloudflare Pages settings

### Modify Theme

Blowfish theme files are in `themes/blowfish/`. Common customizations:

- `layouts/partials/header.html` - Header/navbar
- `assets/css/main.css` - Styling
- `config/_default/` - Theme configuration

### Add Analytics

Update `hugo.toml`:

```toml
[params]
  analytics = "YOUR_GOOGLE_ANALYTICS_ID"
```

## Troubleshooting

### Build Fails on Cloudflare Pages

**Solution:** Add `HUGO_VERSION = 0.120.0` environment variable

### Sitemap Not Generated

**Solution:** Ensure `enableSitemap = true` in `hugo.toml`

### Changes Not Showing

**Solution:**
```bash
rm -rf public/
hugo
```

### Domain Not Found After Deployment

**Solution:** Wait 5-10 minutes for DNS propagation. Check Cloudflare Pages deployment status.

## Resources

- [Hugo Documentation](https://gohugo.io/documentation/)
- [Blowfish Theme Docs](https://blowfish.page/)
- [Cloudflare Pages Guide](https://developers.cloudflare.com/pages/)
- [Google Search Console](https://search.google.com/search-console)

## License

MIT - Feel free to use this as a template for your own blog

## Contributing

Have improvements? Create a pull request or open an issue!
