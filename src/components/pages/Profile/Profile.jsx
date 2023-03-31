import React, { useEffect, useState } from 'react';
import Verse from '../Verse/Verse';
import { useParams } from 'react-router-dom';
import { getUserArticles } from '../../../api/requests';
const Profile = () => {
    const [infinite, setInfinite] = useState({ items: [] });
    let { id } = useParams();
    const [state, setState] = useState(null);
    useEffect(() => {
        async function fetchData() {
            const data = await getUserArticles(id);
            if (data.length > 0) {
                setState({ items: data });
                if (data.length > 1) {
                    setInfinite({ items: [data[0], data[1]] });
                } else {
                    setInfinite({ items: [data[0]] });
                    setHasMore(false);
                }
                if (data.length < 3) setHasMore(false);
            }
        }
        fetchData();
    }, [id]);
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
    }
    return (
        <Verse
            state={state}
            author={id}
            infinite={infinite}
            fetchMoreData={fetchMoreData}
            hasMore={hasMore}
        />
    );
};

export default Profile;
