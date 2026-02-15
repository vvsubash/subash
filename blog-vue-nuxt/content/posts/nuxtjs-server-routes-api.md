---
title: "Nuxt.js Server Routes and API Endpoints: Build Full-Stack Apps"
description: "Discover how to build backend API endpoints directly in your Nuxt.js application using server routes. Learn about API handlers, database integration, and best practices."
date: 2024-02-05
lastmod: 2024-02-05
draft: false
tags: ["nuxt", "nuxtjs", "api", "server", "backend"]
categories: ["Nuxt.js"]
authors: ["Venkata Subash"]
---

## Introduction

One of Nuxt.js's greatest strengths is that it's a **full-stack framework**. You can build both your frontend and backend in the same project. Nuxt server routes let you create API endpoints without leaving your Vue.js application, eliminating the need for a separate backend server.

## What Are Server Routes?

In Nuxt, any file in the `server/routes/` directory automatically becomes an API endpoint. Similarly, files in `server/api/` are automatically prefixed with `/api/`.

## File-Based API Routes

### Basic API Endpoint

Create a simple endpoint:

```
server/
└── api/
    └── hello.get.ts
```

```typescript
// server/api/hello.get.ts
export default defineEventHandler((event) => {
  return {
    message: 'Hello from Nuxt server!'
  }
})
```

Access it at `GET /api/hello`. That's it!

## HTTP Methods

The filename determines the HTTP method. Nuxt automatically routes based on the suffix:

```
server/api/
├── products.get.ts    → GET /api/products
├── products.post.ts   → POST /api/products
├── products/
│   └── [id].patch.ts  → PATCH /api/products/:id
└── products/
    └── [id].delete.ts → DELETE /api/products/:id
```

### Example: CRUD Operations

```typescript
// server/api/products.get.ts
export default defineEventHandler(async (event) => {
  const products = await getProductsFromDatabase()
  return products
})
```

```typescript
// server/api/products.post.ts
export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const newProduct = await createProduct(body)
  return newProduct
})
```

```typescript
// server/api/products/[id].get.ts
export default defineEventHandler(async (event) => {
  const { id } = getRouterParams(event)
  const product = await getProductById(id)

  if (!product) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Product not found'
    })
  }

  return product
})
```

## Reading Request Data

### Query Parameters

```typescript
// GET /api/search?q=vue&limit=10
export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  // query.q = 'vue'
  // query.limit = '10'
})
```

### URL Parameters

```typescript
// GET /api/users/123
export default defineEventHandler(async (event) => {
  const { id } = getRouterParams(event)
  // id = '123'
})
```

### Request Body

```typescript
// POST /api/posts with JSON body
export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  // body = { title: 'My Post', content: '...' }
})
```

### Headers

```typescript
export default defineEventHandler((event) => {
  const auth = getHeader(event, 'authorization')
  // auth = 'Bearer token...'
})
```

## Real-World Example: User API

Here's a complete example of a user management API:

```typescript
// server/api/users.get.ts
export default defineEventHandler(async (event) => {
  try {
    const users = await db.user.findMany()
    return users
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch users'
    })
  }
})
```

```typescript
// server/api/users.post.ts
export default defineEventHandler(async (event) => {
  const { email, name } = await readBody(event)

  // Validate input
  if (!email || !name) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Email and name are required'
    })
  }

  // Create user
  const user = await db.user.create({
    data: { email, name }
  })

  setResponseStatus(event, 201) // 201 Created
  return user
})
```

```typescript
// server/api/users/[id].get.ts
export default defineEventHandler(async (event) => {
  const { id } = getRouterParams(event)

  const user = await db.user.findUnique({
    where: { id }
  })

  if (!user) {
    throw createError({
      statusCode: 404,
      statusMessage: 'User not found'
    })
  }

  return user
})
```

```typescript
// server/api/users/[id].delete.ts
export default defineEventHandler(async (event) => {
  const { id } = getRouterParams(event)

  const user = await db.user.delete({
    where: { id }
  })

  return { message: 'User deleted', user }
})
```

## Calling Your APIs from Vue Components

Use `$fetch()` (built into Nuxt) to call your API:

```vue
<template>
  <div>
    <h1>Users</h1>
    <ul>
      <li v-for="user in users" :key="user.id">
        {{ user.name }} ({{ user.email }})
      </li>
    </ul>
    <button @click="addUser">Add User</button>
  </div>
</template>

<script setup>
const users = ref([])

onMounted(async () => {
  users.value = await $fetch('/api/users')
})

const addUser = async () => {
  const newUser = await $fetch('/api/users', {
    method: 'POST',
    body: {
      name: 'John Doe',
      email: 'john@example.com'
    }
  })

  users.value.push(newUser)
}
</script>
```

## Error Handling

Return meaningful errors to the client:

```typescript
export default defineEventHandler(async (event) => {
  if (!isAuthorized(event)) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized'
    })
  }

  // ... rest of handler
})
```

The client receives:

```javascript
try {
  await $fetch('/api/protected')
} catch (error) {
  console.log(error.statusCode)    // 401
  console.log(error.statusMessage) // 'Unauthorized'
}
```

## Middleware for Server Routes

Add middleware in `server/middleware/`:

```typescript
// server/middleware/auth.ts
export default defineEventHandler((event) => {
  const token = getHeader(event, 'authorization')

  if (event.node.req.url?.startsWith('/api/admin')) {
    if (!token) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Missing auth token'
      })
    }
  }
})
```

## Database Integration

Nuxt pairs perfectly with databases using Prisma:

```bash
npm install @prisma/client
npx prisma init
```

```typescript
// server/api/posts.get.ts
export default defineEventHandler(async (event) => {
  const posts = await prisma.post.findMany({
    include: { author: true }
  })
  return posts
})
```

## Environment Variables

Store secrets in `.env`:

```env
DATABASE_URL=postgresql://...
API_KEY=secret123
```

Access in server routes:

```typescript
export default defineEventHandler(async (event) => {
  const apiKey = process.env.API_KEY
  // Use apiKey for external API calls
})
```

## Benefits of Full-Stack Nuxt

1. **No Separate Backend**: Deploy everything together
2. **Shared Code**: Use TypeScript types between frontend and backend
3. **Automatic API Routes**: No router configuration needed
4. **Built-in Middleware**: Authentication, validation, logging
5. **Scalable**: Start simple and grow as needed

## Best Practices

1. **Use TypeScript**: Better error detection and IDE support
2. **Validate Input**: Always check user-provided data
3. **Return Consistent Responses**: JSON structure matters
4. **Use Proper Status Codes**: 200, 201, 400, 404, 500, etc.
5. **Log Important Events**: Helps with debugging and monitoring
6. **Keep Routes Organized**: Use folders to group related endpoints

## Conclusion

Nuxt server routes make it incredibly easy to build full-stack applications without leaving the comfort of your Vue.js ecosystem. Whether you're building a simple blog or a complex web application, Nuxt's server capabilities have you covered.

Start simple with a few GET endpoints, then gradually add POST, PUT, and DELETE operations as your app grows. You'll appreciate how quickly you can prototype and build features!
