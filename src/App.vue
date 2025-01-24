<template>
  <div id="app">
    <header>
      <h1>Blog Management App</h1>
    </header>
    <main>
      <BlogView />
    </main>
  </div>
</template>

<script>
import BlogView from './views/BlogView.vue';

export default {
  name: 'App',
  components: {
    BlogView,
  },
};
</script>
