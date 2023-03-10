import React, { useState, useEffect } from 'react';
import './Search.scss';
import api from 'api';
import useDebounce from 'utils/useDebounce';

const Search = () => {
    const [search, setSearch] = useState('');
    // eslint-disable-next-line no-unused-vars
    const [posts, setPosts] = useState([]);
    const debouncedSearch = useDebounce(search, 500);

    useEffect(() => {
        const loadSearch = async () => {
            try {
                // eslint-disable-next-line no-unused-vars
                const searchData = await api.posts.search(debouncedSearch);
            } catch (e) {
                console.error(e);
            }
        };
        loadSearch();
    }, [debouncedSearch]);

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
