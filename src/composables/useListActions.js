import { reactive } from 'vue';

export function useListActions(initialList = []) {
    const blogs = reactive([...initialList]);

    function addItem(item) {
        blogs.push(item);
    }

    function deleteItem(blogId) {

        let index = -1;
        for (let i = 0; i < blogs.length; i++) {
            if (blogs[i].id === blogId) {
                index = i;
                break;
            }
        }
        console.log(blogs.values())
        if (index !== -1) blogs.splice(index, 1);
    }

    return { blogs, addItem, deleteItem };
}
