import React, { useEffect, useState } from 'react';
import Verse from '../Verse/Verse';
import { useAuthContext } from '../../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { getArticles } from '../../../api/requests';
const Article = () => {
    const { isAuthentificated, isLoading: isAuthLoading } = useAuthContext();
    const navigate = useNavigate();
    useEffect(() => {
        if (!isAuthentificated) {
            navigate('/login');
        }
    }, [isAuthentificated, isAuthLoading]);
    const [infinite, setInfinite] = useState({ items: [] });
    const [state, setState] = useState(null);
    useEffect(() => {
        async function fetchData() {
            let data = await getArticles();
            if (data) {
                setState({ items: data });
                setInfinite({ items: [data[0], data[1]] });
            }
        }
        fetchData();
    }, [isAuthentificated]);
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
        <Verse state={state} infinite={infinite} fetchMoreData={fetchMoreData} hasMore={hasMore} />
    );
};

export default Article;
