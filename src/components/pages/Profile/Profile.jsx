import React, { useState } from 'react';
import axios from 'axios';
import Verse from '../Verse/Verse';
import { useParams } from 'react-router-dom';
const Profile = () => {
    const [infinite, setInfinite] = useState({ items: [] });
    let { id } = useParams();
    const [state, setState] = useState(null);
    const apiURL = 'https://prozaapp.art/api/v1/';
    React.useEffect(() => {
        axios.get(apiURL + 'getuserarticles/' + id + '/?format=json').then((response) => {
            response.data.reverse();
            if (response.data.length === 1) {
                setState(response.data[0]);
                setInfinite({ items: [response.data[0]] });
            } else if (!response.data.length) {
                setState({
                    id: '',
                    user: id,
                    cat: '',
                    title: '',
                    content: '',
                    author: '',
                    count_of_likes: 0,
                    count_of_reviews: 0
                });
            } else if (response.data.length === 2) {
                setState({ items: response.data });
                setInfinite({ items: [response.data[0], response.data[1]] });
                setHasMore(false);
            } else {
                setState({ items: response.data });
                setInfinite({ items: [response.data[0], response.data[1]] });
            }
        });
    }, []);
    const [indexCount, setIndexCount] = useState(2);
    const [hasMore, setHasMore] = useState(true);
    const fetchMoreData = () => {
        setInfinite({ items: [...infinite.items, state.items[indexCount]] });
        setIndexCount(indexCount + 1);
        if (indexCount === state.items.length - 1) setHasMore(false);
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
