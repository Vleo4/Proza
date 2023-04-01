import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getArticleId } from '../../../api/requests';
import Verse from '../Verse/Verse';

const ArticleID = () => {
    const [infinite, setInfinite] = useState({ items: [] });
    const [state, setState] = useState({ items: [] });
    let { id } = useParams();
    useEffect(() => {
        async function fetchData() {
            let data = await getArticleId(id);
            if (data) {
                setState({ items: [data] });
                setInfinite({ items: [data] });
            }
        }
        fetchData();
    }, [id]);
    const [hasMore, setHasMore] = useState(false);
    const fetchMoreData = () => {
        setHasMore(false);
    };
    if (!state.items) {
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

export default ArticleID;
