---
title: "Understanding Vue 3 Reactivity: Refs vs Reactive"
description: "Explore the differences between ref() and reactive() in Vue 3, when to use each one, and how Vue's reactivity system works under the hood."
date: 2024-02-10
lastmod: 2024-02-10
draft: false
tags: ["vue", "vue3", "reactivity", "javascript"]
categories: ["Vue.js"]
authors: ["Venkata Subash"]
---

## Introduction

Vue 3's reactivity system is powerful, but it can be confusing when you're first learning about `ref()` and `reactive()`. Both are essential for creating reactive state, but they're used in different situations. Let's clarify when and how to use each one.

## Reactivity Basics

At its core, Vue's reactivity system uses JavaScript Proxies to detect changes to your data and update the DOM accordingly. When you modify a reactive value, Vue automatically re-renders any components that depend on it.

## `ref()` - Wrapping Single Values

### What is `ref()`?

`ref()` creates a reactive reference to a single value. It wraps the value in an object with a `.value` property.

```javascript
import { ref } from 'vue'

const count = ref(0)
console.log(count.value) // 0
count.value = 1          // Triggers reactivity
```

### When to Use `ref()`

Use `ref()` when you need to:
- Store simple values (strings, numbers, booleans)
- Have mutable primitive values
- Create a reference that can be reassigned

```javascript
import { ref } from 'vue'

export default {
  setup() {
    const username = ref('John')
    const isLoading = ref(false)
    const pageCount = ref(1)

    return { username, isLoading, pageCount }
  }
}
```

### `ref()` in Templates

Interestingly, in templates you don't need to use `.value`:

```vue
<template>
  <!-- Vue automatically unwraps ref in templates -->
  <p>{{ count }}</p>
  <!-- equivalent to {{ count.value }} -->
</template>

<script setup>
import { ref } from 'vue'

const count = ref(0)
</script>
```

## `reactive()` - For Objects

### What is `reactive()`?

`reactive()` creates a reactive proxy for an object. It works directly with properties, no `.value` needed.

```javascript
import { reactive } from 'vue'

const state = reactive({
  count: 0,
  message: 'Hello'
})

console.log(state.count)  // 0 (no .value!)
state.count = 1           // Triggers reactivity
```

### When to Use `reactive()`

Use `reactive()` when you need to:
- Create a reactive object with multiple properties
- Model a complex entity with related fields
- Maintain an object-like structure

```javascript
import { reactive } from 'vue'

export default {
  setup() {
    const user = reactive({
      id: 1,
      name: 'Alice',
      email: 'alice@example.com',
      isAdmin: false
    })

    return { user }
  }
}
```

## Head-to-Head Comparison

### `ref()` vs `reactive()`

| Feature | `ref()` | `reactive()` |
|---------|---------|--------------|
| Works with | Any type | Objects only |
| Property access | `.value` required | Direct property |
| Template unwrapping | Automatic | N/A |
| Reassignability | Can reassign entire value | Can reassign properties |
| TypeScript support | Excellent with generics | Harder to type |

## Practical Examples

### Using `ref()` for Form Input

```vue
<template>
  <form @submit.prevent="handleSubmit">
    <input v-model="email" type="email" placeholder="Email" />
    <input v-model="password" type="password" placeholder="Password" />
    <button type="submit">Login</button>
  </form>
</template>

<script setup>
import { ref } from 'vue'

const email = ref('')
const password = ref('')

const handleSubmit = () => {
  console.log('Logging in with:', {
    email: email.value,
    password: password.value
  })
}
</script>
```

### Using `reactive()` for Complex State

```vue
<template>
  <div class="profile">
    <h1>{{ profile.name }}</h1>
    <p>{{ profile.email }}</p>
    <p>Role: {{ profile.role }}</p>
    <button @click="toggleAdmin">Toggle Admin</button>
  </div>
</template>

<script setup>
import { reactive } from 'vue'

const profile = reactive({
  name: 'Bob',
  email: 'bob@example.com',
  role: 'user',
  isAdmin: false
})

const toggleAdmin = () => {
  profile.isAdmin = !profile.isAdmin
  profile.role = profile.isAdmin ? 'admin' : 'user'
}
</script>
```

## The Golden Rule

If you're unsure which to use, here's a simple rule:

> **Use `ref()` by default.** It's more predictable, easier to reassign, and has better TypeScript support. Use `reactive()` only when you specifically need an object-like interface.

## Advanced: Unwrapping in Objects

When you return multiple `ref()` values from `setup()`, they remain as refs:

```javascript
const state = reactive({
  count: ref(0),
  message: ref('Hello')
})

console.log(state.count)  // Automatically unwrapped! Returns 0, not Ref object
state.count++             // Works without .value
```

This is a special feature - objects created with `reactive()` automatically unwrap any `ref()` properties!

## Best Practices

1. **Default to `ref()`** for most reactive state
2. **Use `reactive()`** for form models or related object data
3. **Combine them wisely** - use refs in reactive objects when appropriate
4. **Be consistent** in your codebase - pick a style and stick to it
5. **Document your reasoning** if you use `reactive()` for readability

## Conclusion

Both `ref()` and `reactive()` are essential tools in Vue 3. While `ref()` is more versatile and generally recommended, `reactive()` shines when modeling complex objects. Understanding the differences will help you write cleaner, more maintainable Vue code.

The key is using the right tool for the right job. Start with `ref()`, and introduce `reactive()` when your state naturally fits an object structure.
