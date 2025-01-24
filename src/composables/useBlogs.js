import { ref } from "vue";
import { createClient } from "contentful";
import { useListActions } from "./useListActions";

const client = createClient({
    space: "yxth25gm00r8",
    accessToken: "3tJzc7aMN-CsKPHGRH8qzxCK_JSEL5HGpcHg8s0j9AA",
});

export function useBlogs() {
    const isLoading = ref(false);
    const error = ref(null);
    const { blogs, addItem, deleteItem } = useListActions();

    async function fetchBlogs() {
        isLoading.value = true;
        try {
            const response = await client.getEntries({ content_type: "blogPost" });
            blogs.value = response.items
                .filter(item => item.fields.title && item.fields.description)
                .map(item => ({
                    id: item.sys.id,
                    title: item.fields.title,
                    author: item.fields.author || "Unknown",
                    description: item.fields.description,
                    image: item.fields.image?.fields?.file?.url || "https://via.placeholder.com/200",
                }));
        } catch (err) {
            error.value = err.message;
        } finally {
            isLoading.value = false;
        }
    }

    function addItemToList(blog) {
        if (!blog || !blog.title || !blog.description) {
            console.error("Invalid blog data:", blog);
            return;
        }

        const item = {
            id: blog.id,
            title: blog.title,
            author: blog.author || "Unknown",
            description: blog.description,
            image: blog.image,
            publishDate: new Date().toISOString(),
        };

        addItem(item);
        blogs.value.push(item);
    }

    return { blogs, isLoading, error, addItem: addItemToList, deleteItem, fetchBlogs };
}
