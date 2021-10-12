import React from 'react';

export interface ISearchFilter {
    value: string;
    onFilter: (val: string) => void;
};

export const SearchFilter = ({ value, onFilter} : ISearchFilter) => (
    <div className="search__filter"  aria-label="search-filter">
        <label>Filter:</label>
        <input type="text" aria-label="search-filter-input" alt="Search Filter" value={value} onChange={(e) => onFilter(e.target.value)} ></input>
    </div>

);

export default SearchFilter;
