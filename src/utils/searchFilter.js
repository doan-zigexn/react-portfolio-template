/**
 * Filters an array of article item wrappers by a text query.
 * Matches case-insensitively against title, description text (HTML-stripped), and tags.
 *
 * @param {Array} items
 * @param {string} query
 * @returns {Array}
 */
export function filterItemsBySearch(items, query) {
    if (!query || !query.trim()) return items

    const q = query.toLowerCase().trim()
    return items.filter(item => {
        const title = (item.locales?.title || "").replace(/<[^>]+>/g, "").toLowerCase()
        const text  = (item.locales?.text  || "").replace(/<[^>]+>/g, "").toLowerCase()
        const tags  = (item.locales?.tags  || []).join(" ").toLowerCase()
        return title.includes(q) || text.includes(q) || tags.includes(q)
    })
}
