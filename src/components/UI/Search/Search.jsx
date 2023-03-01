import React, { useState } from 'react';
import './Search.scss';

const Search = () => {
    const [search, setSearch] = useState('');

    return (
        <form className='search'>
            <input
                type='text'
                className='search-input'
                placeholder='Пошук...'
                value={search}
                onChange={(e) => setSearch(e.target.value)}></input>
            {search && <div className='list'>loading</div>}
        </form>
    );
};

export default Search;
