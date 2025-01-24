import { ref, computed } from 'vue';

export function useSearch(items, defaultFilter = 'title') {
    const searchTerm = ref('');
    const filters = ref([defaultFilter]);

    const filteredItems = computed(() => {
        const itemsArray = Array.isArray(items) ? items : items.value;
        return (itemsArray || []).filter(item =>
            filters.value.some(filter =>
                item[filter] && item[filter].toLowerCase().includes(searchTerm.value.toLowerCase())
            )
        );
    });

    return { searchTerm, filters, filteredItems };
}
