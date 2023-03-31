import '../Verse/Verse.scss';
import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { getArticlesCategories } from '../../../api/requests';
import Verse from '../Verse/Verse';

const Categories = () => {
    const { isAuthentificated, isLoading: isAuthLoading } = useAuthContext();
    const navigate = useNavigate();
    useEffect(() => {
        if (!isAuthentificated) {
            navigate('/login');
        }
    }, [isAuthentificated, isAuthLoading]);
    const [infinite, setInfinite] = useState({ items: [] });
    const [state, setState] = useState(null);
    const [category, setCategory] = useState(0);
    useEffect(() => {
        async function fetchData() {
            let data = await getArticlesCategories(category + 1);
            if (data) {
                setState({ items: data });
                setInfinite({ items: [data[0], data[1]] });
            }
        }
        fetchData();
    }, [category]);
    const [indexCount, setIndexCount] = useState(2);
    const [hasMore, setHasMore] = useState(true);
    const fetchMoreData = () => {
        if (indexCount === state.items.length - 1) setHasMore(false);
        else {
            setInfinite({ items: [...infinite.items, state.items[indexCount]] });
            setIndexCount(indexCount + 1);
        }
    };
    return (
        <Verse
            state={state}
            infinite={infinite}
            fetchMoreData={fetchMoreData}
            hasMore={hasMore}
            category={category}
            setCategory={setCategory}
        />
    );
};

export default Categories;
