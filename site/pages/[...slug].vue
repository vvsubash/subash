<template>
  <main>
    <ContentDoc />
    <ContentList path="/blogs" v-slot="{ list }">
      <div v-for="article in list" :key="article._path">
        <NuxtLink :to="article._path">
          <h2>{{ article.title }} Update</h2>
        </NuxtLink>
        <p>{{ article.description }}</p>
        <NuxtLink :to="article._path">Read More...</NuxtLink>
      </div>
    </ContentList>

  </main>
</template>
