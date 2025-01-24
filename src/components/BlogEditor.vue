<template>
  <h2>Add a New Blog</h2>
  <div id="editor-form-div">
    <form @submit.prevent="submitForm">
      <div>
        <label for="title">Title:</label>
        <input v-model="newBlog.title" type="text" id="title" required/>
      </div>
      <div>
        <label for="id">Id:</label>
        <input v-model="newBlog.id" type="text" id="id" disabled/>
      </div>
      <div>
        <label for="author">Author:</label>
        <input v-model="newBlog.author" type="text" id="author" required/>
      </div>
      <div>
        <label for="description">Description:</label>
        <textarea v-model="newBlog.description" id="description" required></textarea>
      </div>
      <div>
        <label for="image">Image URL:</label>
        <input v-model="newBlog.image" type="text" id="image"/>
      </div>
      <button type="submit">Add Blog</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "BlogEditor",
  emits: ["addNewItem", "checkSlugExists"],
  data() {
    return {
      newBlog: {
        id: "",
        title: "",
        author: "",
        description: "",
        image: "",
      },
      existingSlugs: [],
    };
  },
  watch: {
    "newBlog.title": "generateSlug",
  },
  methods: {
    generateSlug() {
      if (!this.newBlog.title) {
        this.newBlog.id = "";
        return;
      }

      // Convert title to slug format
      let baseSlug = this.newBlog.title
          .toLowerCase() // Make title lowercase
          .replace(/[^a-z0-9\s-]/g, '')
          .trim() // Remove extra spaces
          .replace(/\s+/g, '-')
          .replace(/-+/g, '-');

      let slug = baseSlug;
      let counter = 1;

      while (this.existingSlugs.includes(slug)) {
        slug = `${baseSlug}-${counter}`;
        counter++;
      }

      this.newBlog.id = slug;
    },
    submitForm() {

      this.$emit("addNewItem", this.newBlog);

      this.$emit("checkSlugExists", this.newBlog.id);

      this.newBlog = {
        id: "",
        title: "",
        author: "",
        description: "",
        image: "",
      };
    },
  },
};
</script>
