---
title: "Nuxt.js File-Based Routing: Building Scalable Applications"
description: "Learn how Nuxt.js generates routes automatically from your file structure, eliminating the need for manual route configuration and keeping your app organized."
date: 2024-02-08
lastmod: 2024-02-08
draft: false
tags: ["nuxt", "nuxtjs", "routing", "file-based-routing"]
categories: ["Nuxt.js"]
authors: ["Venkata Subash"]
---

## Introduction

One of Nuxt.js's most powerful features is its file-based routing system. Instead of manually defining routes in a configuration file, Nuxt automatically generates routes based on your file and folder structure. This makes your project more organized and scales beautifully as your application grows.

## How File-Based Routing Works

In Nuxt, every `.vue` file in the `pages/` directory automatically becomes a route. This is inspired by frameworks like Next.js and is one of the reasons Nuxt is so developer-friendly.

### Basic Example

Create this folder structure:

```
pages/
├── index.vue          → /
├── about.vue          → /about
└── contact.vue        → /contact
```

That's it! Nuxt automatically creates three routes. No configuration needed.

## Nested Routes

For nested pages, create subdirectories:

```
pages/
├── index.vue
├── blog/
│   ├── index.vue      → /blog
│   ├── [id].vue       → /blog/:id
│   └── guides/
│       └── [slug].vue → /blog/guides/:slug
```

### Example: Blog Post Page

```vue
<!-- pages/blog/[id].vue -->
<template>
  <div>
    <h1>Blog Post #{{ id }}</h1>
    <article v-if="post">
      <h2>{{ post.title }}</h2>
      <p>{{ post.content }}</p>
    </article>
    <p v-else>Loading...</p>
  </div>
</template>

<script setup>
const route = useRoute()
const id = route.params.id

const post = ref(null)

onMounted(async () => {
  const response = await fetch(`/api/posts/${id}`)
  post.value = await response.json()
})
</script>
```

## Dynamic Routes with Brackets

### Single Parameter Routes

Use square brackets to create dynamic segments:

```
pages/
├── products/
│   └── [id].vue       → /products/:id
```

Access the parameter with `useRoute()`:

```javascript
const route = useRoute()
const productId = route.params.id
```

### Multiple Parameters

```
pages/
└── users/
    └── [userId]/
        └── posts/
            └── [postId].vue  → /users/:userId/posts/:postId
```

```javascript
const route = useRoute()
const userId = route.params.userId
const postId = route.params.postId
```

### Catch-All Routes with `[...slug]`

For flexible matching:

```
pages/
├── [...slug].vue      → Matches any route (/about, /about/team, /docs/api/v2, etc.)
└── docs/
    └── [...path].vue  → /docs/* (matches anything under /docs)
```

This is useful for 404 pages or documentation sites:

```vue
<!-- pages/[...slug].vue -->
<template>
  <div>
    <h1>Page Not Found</h1>
    <p>Requested path: {{ slug }}</p>
    <NuxtLink to="/">Back to Home</NuxtLink>
  </div>
</template>

<script setup>
const route = useRoute()
const slug = route.params.slug
</script>
```

## Navigation

Nuxt provides the `<NuxtLink>` component for client-side navigation:

```vue
<template>
  <nav>
    <NuxtLink to="/">Home</NuxtLink>
    <NuxtLink to="/about">About</NuxtLink>
    <NuxtLink to="/blog">Blog</NuxtLink>
    <NuxtLink :to="`/products/${productId}`">Product</NuxtLink>
  </nav>
</template>
```

Or programmatically with `navigateTo()`:

```javascript
const router = useRouter()

const goToProduct = (id) => {
  router.push(`/products/${id}`)
}
```

## Nested Layouts

Create subdirectories with a parent layout:

```
pages/
├── layouts/
│   └── admin.vue
└── admin/
    ├── index.vue      → /admin (uses admin layout)
    └── users.vue      → /admin/users (uses admin layout)
```

Define layout in pages:

```vue
<template>
  <div>
    <h1>Admin Dashboard</h1>
    <slot />
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'admin'
})
</script>
```

## Middleware

Add route-specific middleware for authentication and validation:

```
middleware/
└── auth.ts
```

```typescript
// middleware/auth.ts
export default defineRouteMiddleware((to, from) => {
  if (!useAuthStore().isAuthenticated) {
    return navigateTo('/login')
  }
})
```

Apply to routes:

```vue
<script setup>
definePageMeta({
  middleware: 'auth'
})
</script>
```

## Real-World Example: E-Commerce Site

Here's how you might structure a simple e-commerce site:

```
pages/
├── index.vue                    → /
├── login.vue                    → /login
├── products.vue                 → /products
├── products/
│   └── [id].vue                 → /products/:id
├── cart.vue                     → /cart
├── checkout.vue                 → /checkout
└── account/
    ├── index.vue                → /account
    ├── orders.vue               → /account/orders
    └── [orderId]/
        └── details.vue          → /account/:orderId/details
```

## Benefits of File-Based Routing

1. **Automatic Route Generation**: No manual configuration needed
2. **Better Organization**: File structure mirrors your app's navigation
3. **Scalability**: Adding new pages is as simple as creating files
4. **Type Safety**: Nuxt can detect route parameters automatically
5. **Convention Over Configuration**: Predictable structure for teams

## Tips & Best Practices

1. **Keep it Flat When Possible**: Too many nested directories can be confusing
2. **Use Meaningful Names**: File names become URLs, so be descriptive
3. **Leverage Middleware**: Use it for authentication and permissions
4. **Consider 404 Handling**: Add a catch-all route at the end
5. **Use NuxtLink**: It automatically preloads pages for better performance

## Conclusion

File-based routing is one of Nuxt.js's greatest features. It removes the complexity of manual route configuration while keeping your project organized and scalable. Once you get used to it, you'll wonder how you ever managed routes manually!

Start a new Nuxt project and experiment with creating different page structures. You'll quickly see how intuitive and powerful this approach is.
