import { describe, it, expect } from 'vitest'
import { filterItemsBySearch } from './searchFilter.js'

const ITEMS = [
    {
        categoryId: 'category_web',
        locales: {
            title: 'Chess',
            text: 'An <b>online chess</b> game platform.',
            tags: ['Game', 'JavaScript'],
        },
    },
    {
        categoryId: 'category_apps',
        locales: {
            title: '<span class="text-primary">DeepCare</span>',
            text: 'A <b>healthcare</b> application for tracking vitals.',
            tags: ['Healthcare', 'Ruby on Rails'],
        },
    },
    {
        categoryId: 'category_web',
        locales: {
            title: 'SmartHome',
            text: 'An IoT-based home management system.',
            tags: ['IoT', 'Spring Boot'],
        },
    },
]

describe('filterItemsBySearch', () => {
    it('returns all items when query is empty string', () => {
        expect(filterItemsBySearch(ITEMS, '')).toHaveLength(3)
    })

    it('returns all items when query is null', () => {
        expect(filterItemsBySearch(ITEMS, null)).toHaveLength(3)
    })

    it('matches title case-insensitively', () => {
        const result = filterItemsBySearch(ITEMS, 'chess')
        expect(result).toHaveLength(1)
        expect(result[0].locales.title).toBe('Chess')
    })

    it('matches tags case-insensitively', () => {
        const result = filterItemsBySearch(ITEMS, 'iot')
        expect(result).toHaveLength(1)
        expect(result[0].locales.title).toBe('SmartHome')
    })

    it('matches description text after stripping HTML', () => {
        const result = filterItemsBySearch(ITEMS, 'healthcare')
        expect(result).toHaveLength(1)
        expect(result[0].categoryId).toBe('category_apps')
    })

    it('returns empty array when nothing matches', () => {
        expect(filterItemsBySearch(ITEMS, 'python')).toHaveLength(0)
    })

    it('strips HTML from title before matching — does not false-match on tag names', () => {
        // DeepCare title contains <span class="text-primary"> — searching markup tokens must not match
        expect(filterItemsBySearch(ITEMS, 'span')).toHaveLength(0)
        expect(filterItemsBySearch(ITEMS, 'text-primary')).toHaveLength(0)
        // The real title content should still be findable
        expect(filterItemsBySearch(ITEMS, 'deepcare')).toHaveLength(1)
    })
})
