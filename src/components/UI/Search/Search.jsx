import React, { useState, useEffect } from 'react';
import './Search.scss';
import api from 'api';
import useDebounce from 'utils/useDebounce';
import { Link } from 'react-router-dom';

const Search = () => {
    const [search, setSearch] = useState('');
    const [posts, setPosts] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const debouncedSearch = useDebounce(search, 500);

    useEffect(() => {
        if (!debouncedSearch) {
            setPosts([]);
            return;
        }

        const loadSearch = async () => {
            try {
                setLoading(true);
                const searchData = await api.posts.search(debouncedSearch);
                setPosts(searchData);
            } catch (e) {
                setPosts([]);
                console.error(e);
            } finally {
                setLoading(false);
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
                onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
                <div className='list'>
                    {isLoading ? (
                        <span className='list__loading'>Loading...</span>
                    ) : (
                        posts.map((post) => (
                            <Link className='list__link' to={'/article/' + post.id} key={post.id}>
                                {post.title}
                            </Link>
                        ))
                    )}
                </div>
            )}
        </form>
    );
};

export default Search;
