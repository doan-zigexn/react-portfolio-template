import "./PortfolioSearchBar.scss"
import React, { useRef } from 'react'
import { useLanguage } from "/src/providers/LanguageProvider.jsx"

function PortfolioSearchBar({ searchInput, setSearchInput }) {
    const language = useLanguage()
    const inputRef = useRef(null)

    const handleClear = () => {
        setSearchInput("")
        inputRef.current?.focus()
    }

    return (
        <div role="search" className="portfolio-search-bar">
            <label htmlFor="portfolio-search" className="visually-hidden">
                {language.getString("portfolio_search_placeholder")}
            </label>
            <div className="portfolio-search-bar-inner">
                <i className="fa-solid fa-magnifying-glass portfolio-search-bar-icon"
                   aria-hidden="true"/>
                <input
                    ref={inputRef}
                    id="portfolio-search"
                    type="search"
                    className="portfolio-search-bar-input"
                    placeholder={language.getString("portfolio_search_placeholder")}
                    value={searchInput}
                    onChange={e => setSearchInput(e.target.value)}
                    autoComplete="off"
                />
                {searchInput && (
                    <button type="button"
                            className="portfolio-search-bar-clear"
                            aria-label={language.getString("portfolio_search_clear")}
                            onClick={handleClear}>
                        <i className="fa-solid fa-xmark" aria-hidden="true"/>
                    </button>
                )}
            </div>
        </div>
    )
}

export default PortfolioSearchBar
