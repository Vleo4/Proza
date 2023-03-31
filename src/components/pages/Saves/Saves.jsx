import React, { useEffect, useState } from 'react';
import Verse from '../Verse/Verse';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../../contexts/AuthContext';
import { getSavedArticles } from '../../../api/requests';
const Saves = () => {
    const [infinite, setInfinite] = useState({ items: [] });
    const { isAuthentificated, isLoading: isAuthLoading } = useAuthContext();
    const navigate = useNavigate();
    useEffect(() => {
        if (!isAuthentificated) {
            navigate('/login');
        }
    }, [isAuthentificated, isAuthLoading]);
    const [state, setState] = useState(null);
    useEffect(() => {
        async function fetchData() {
            let data = await getSavedArticles();
            if (data.length > 0) {
                setState({ items: data });
                if (data.length > 1) {
                    setInfinite({ items: [data[0], data[1]] });
                } else {
                    setInfinite({ items: [data[0]] });
                }
            } else {
                setState({
                    items: [
                        {
                            user: 'У вас немає збережених'
                        }
                    ]
                });
                setInfinite({
                    items: [
                        {
                            user: 'У вас немає збережених'
                        }
                    ]
                });
            }
        }
        fetchData();
    }, []);
    const [indexCount, setIndexCount] = useState(2);
    const [hasMore, setHasMore] = useState(true);
    const fetchMoreData = () => {
        if (indexCount === state.items.length - 1) setHasMore(false);
        else {
            setInfinite({ items: [...infinite.items, state.items[indexCount]] });
            setIndexCount(indexCount + 1);
        }
    };
    if (!state) {
        return <h1>Loading...</h1>;
    } else {
        return (
            <Verse
                state={state}
                infinite={infinite}
                fetchMoreData={fetchMoreData}
                hasMore={hasMore}
            />
        );
    }
};

export default Saves;
