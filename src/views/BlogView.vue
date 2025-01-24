<template>
  <div>
    <button v-if="!showEditor" @click="showEditor = true">Add new blog</button>
    <BlogEditor v-if="showEditor" @addNewItem="addNewItem" />
    <Blogs v-if="blogs.length" :blogs="blogs" :isLoading="isLoading" :error="error" @deleteBlog="deleteItem" />
    <div v-else>No blogs found.</div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useBlogs } from "../composables/useBlogs";
import BlogEditor from "../components/BlogEditor.vue";
import Blogs from "../components/Blogs.vue";

export default {
  components: { BlogEditor, Blogs },
  name: "BlogView",
  setup() {
    const { blogs, isLoading, error, addItem, deleteItem, fetchBlogs } = useBlogs();
    const showEditor = ref(false);

    onMounted(fetchBlogs);

    function addNewItem(blog) {
      addItem(blog);
      showEditor.value = false;
    }

    return {
      blogs, isLoading, error, deleteItem, showEditor, addNewItem,
    };
  },
};
</script>
