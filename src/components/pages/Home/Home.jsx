import React, { useState } from 'react';
import axios from 'axios';
import Verse from '../Verse/Verse';

const Home = () => {
    const [infinite, setInfinite] = useState({ items: [] });
    const [state, setState] = useState(null);
    const [author, setAuthor] = useState(null);
    const apiURL = 'https://prozaapp.art/api/v1/';
    React.useEffect(() => {
        axios.get(apiURL + 'article/?format=json').then((response) => {
            response.data.reverse();
            setAuthor(response.data[0].user);
            setState({ items: response.data });
            setInfinite({ items: [response.data[0], response.data[1]] });
        });
    }, []);
    const [indexCount, setIndexCount] = useState(2);
    const [hasMore, setHasMore] = useState(true);
    const fetchMoreData = () => {
        setInfinite({ items: [...infinite.items, state.items[indexCount]] });
        setIndexCount(indexCount + 1);
        if (indexCount === state.items.length - 1) setHasMore(false);
    };
    return (
        <Verse
            state={state}
            infinite={infinite}
            author={author}
            fetchMoreData={fetchMoreData}
            hasMore={hasMore}
        />
    );
};

export default Home;
