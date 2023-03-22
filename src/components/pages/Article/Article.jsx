import React, { useState } from 'react';
import axios from 'axios';
import Verse from '../Verse/Verse';
import { useAuthContext } from '../../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { getFromLocalStorage, getFromSessionStorage } from '../../../utils/storage';
import { ACCESS_TOKEN } from '../../../constants/localStorageKeys';
const Article = () => {
    const { isAuthentificated, isLoading: isAuthLoading } = useAuthContext();
    const navigate = useNavigate();
    React.useEffect(() => {
        if (!isAuthentificated) {
            navigate('/login');
        }
    }, [isAuthentificated, isAuthLoading]);
    const [infinite, setInfinite] = useState({ items: [] });
    const [state, setState] = useState(null);
    const apiURL = 'https://prozaapp.art/api/v1/';
    React.useEffect(() => {
        const accessToken =
            getFromSessionStorage(ACCESS_TOKEN) ?? getFromLocalStorage(ACCESS_TOKEN);
        axios
            .get(apiURL + 'article/?format=json', {
                headers: {
                    Authorization: 'Bearer ' + accessToken
                }
            })
            .then((response) => {
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
        <Verse state={state} infinite={infinite} fetchMoreData={fetchMoreData} hasMore={hasMore} />
    );
};

export default Article;
