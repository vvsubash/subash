---
title: "Vue.js 3: Getting Started with the Composition API"
description: "A practical guide to understanding Vue 3's Composition API - learn how to structure your components, organize logic, and write more maintainable code."
date: 2024-02-15
lastmod: 2024-02-15
draft: false
tags: ["vue", "vue3", "composition-api", "javascript"]
categories: ["Vue.js"]
authors: ["Venkata Subash"]
---

## Introduction

Vue 3 introduced the Composition API, a new way to write component logic that feels natural and flexible. If you're coming from Vue 2's Options API, it might seem unfamiliar at first, but it's actually quite intuitive once you understand the basics.

In this post, we'll explore what the Composition API is, why you might want to use it, and how to get started with practical examples.

## What is the Composition API?

The Composition API is a set of functions that allow you to write Vue components by grouping related logic together, rather than organizing code by property type (data, computed, methods, etc.).

### The Traditional Options API

In Vue 2 and earlier versions of Vue 3, you might write:

```javascript
export default {
  data() {
    return {
      count: 0
    }
  },
  computed: {
    doubled() {
      return this.count * 2
    }
  },
  methods: {
    increment() {
      this.count++
    }
  }
}
```

This works fine for simple components, but when your component grows, related logic gets scattered across different sections.

### The Composition API Way

With the Composition API, you can group related logic together:

```javascript
import { ref, computed } from 'vue'

export default {
  setup() {
    const count = ref(0)
    const doubled = computed(() => count.value * 2)
    const increment = () => count.value++

    return {
      count,
      doubled,
      increment
    }
  }
}
```

## Key Functions to Know

### `ref()` - Creating Reactive Values

```javascript
import { ref } from 'vue'

export default {
  setup() {
    const message = ref('Hello Vue!')

    // To access or modify the value in setup:
    console.log(message.value)
    message.value = 'Updated!'

    // In templates, you don't need .value:
    return { message }
  }
}
```

### `computed()` - Derived State

```javascript
import { ref, computed } from 'vue'

export default {
  setup() {
    const firstName = ref('John')
    const lastName = ref('Doe')

    const fullName = computed(() => {
      return `${firstName.value} ${lastName.value}`
    })

    return { firstName, lastName, fullName }
  }
}
```

### `watch()` - Reactive Side Effects

```javascript
import { ref, watch } from 'vue'

export default {
  setup() {
    const count = ref(0)

    watch(count, (newValue, oldValue) => {
      console.log(`Count changed from ${oldValue} to ${newValue}`)
    })

    return { count }
  }
}
```

## Real-World Example: A Counter with Reset

Let's create a more practical component:

```vue
<template>
  <div class="counter">
    <p>Count: {{ count }}</p>
    <p>Doubled: {{ doubled }}</p>
    <button @click="increment">+</button>
    <button @click="decrement">-</button>
    <button @click="reset">Reset</button>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const count = ref(0)

const doubled = computed(() => count.value * 2)

const increment = () => count.value++
const decrement = () => count.value--
const reset = () => count.value = 0
</script>

<style scoped>
.counter {
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
}

button {
  margin: 5px;
  padding: 8px 16px;
  cursor: pointer;
}
</style>
```

Notice we used `<script setup>` - this is a modern syntax that simplifies the Composition API even further!

## Benefits of the Composition API

1. **Better Code Organization**: Related logic stays together
2. **Easier Code Reuse**: Extract logic into composables (reusable functions)
3. **Better TypeScript Support**: Easier to infer types
4. **More Flexible**: No restrictions on how you organize code
5. **Smaller Bundle Size**: Unused imports can be tree-shaken

## Creating a Composable

One of the biggest advantages is creating reusable logic:

```javascript
// useCounter.js
import { ref, computed } from 'vue'

export function useCounter(initialValue = 0) {
  const count = ref(initialValue)
  const doubled = computed(() => count.value * 2)

  const increment = () => count.value++
  const reset = () => count.value = initialValue

  return { count, doubled, increment, reset }
}
```

Then use it in multiple components:

```javascript
import { useCounter } from './useCounter'

export default {
  setup() {
    return useCounter(10)
  }
}
```

## When to Use Composition API

- Building complex components with multiple features
- Creating reusable logic for multiple components
- Working on large-scale applications
- Preferring a more functional programming style

The Composition API is now the recommended way to write Vue 3 components, and it's definitely worth learning!

## Conclusion

The Composition API represents a significant step forward in how we write Vue components. It encourages better organization, code reuse, and scalability. While the Options API still works great for simple components, the Composition API shines in more complex scenarios.

Start experimenting with it in your projects, and you'll quickly see why it's becoming the standard in Vue development.
