<template>
  <div>
    <div v-if="isLoading">Loading...</div>
    <div v-else-if="error">{{ error }}</div>

    <div v-else>
      <input v-model="searchTerm" placeholder="Search blogs..." class="search-input"/>

      <div class="filter-container">
        <label>
          <input type="checkbox" v-model="filters" value="title"/>
          Search by Title
        </label>
        <label>
          <input type="checkbox" v-model="filters" value="description"/>
          Search by Description
        </label>
      </div>

      <div >
        <div v-for="blog in filteredBlogs" :key="blog.id" class="blog-item card">
          <div class="blog-content">
            <img :src="blog.image" alt="Blog Image" class="blog-image"/>
            <div class="blog-text">
              <p class="publish-date">{{ new Date(blog.publishDate).toDateString().toUpperCase()}}</p>
              <h3>{{ blog.title }}</h3>
              <p>By: {{ blog.author }}</p>
              <p class="description">{{ blog.description }}</p>
              <button @click="removeBlog(blog.id)" class="remove-button">Remove</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useSearch } from '../composables/useSearch';

export default {
  props: {
    blogs: Array,
    isLoading: Boolean,
    error: String,
  },
  emits: ['deleteBlog'],
  setup(props, { emit }) {
    const { searchTerm, filters, filteredItems } = useSearch(props.blogs);

    const removeBlog = (blogId) => {
      console.log('Blog ID:', blogId);
      emit('deleteBlog', blogId);
    };

    return {
      searchTerm,
      filters,
      filteredBlogs: filteredItems,
      removeBlog,
    };
  },
};
</script>
