import React, { useState, useEffect } from 'react';
import './Search.scss';
import api from 'api';
import useDebounce from 'utils/useDebounce';

const Search = () => {
    const [search, setSearch] = useState('');
    const [posts, setPosts] = useState([]);
    const debouncedSearch = useDebounce(search, 500);

    useEffect(() => {
        const loadSearch = async () => {
            try {
                const searchData = await api.posts.search(debouncedSearch);
                console.log(searchData);
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
