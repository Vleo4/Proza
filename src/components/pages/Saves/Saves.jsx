import React, { useState } from 'react';
import axios from 'axios';
import Verse from '../Verse/Verse';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../../contexts/AuthContext';
import { getFromLocalStorage, getFromSessionStorage } from '../../../utils/storage';
import { ACCESS_TOKEN } from '../../../constants/localStorageKeys';
const Saves = () => {
    const accessToken = getFromSessionStorage(ACCESS_TOKEN) ?? getFromLocalStorage(ACCESS_TOKEN);
    const [infinite, setInfinite] = useState({ items: [] });
    const { isAuthentificated, isLoading: isAuthLoading } = useAuthContext();
    const navigate = useNavigate();
    React.useEffect(() => {
        if (!isAuthentificated) {
            navigate('/');
        }
    }, [isAuthentificated, isAuthLoading]);
    const [state, setState] = useState(null);
    const apiURL = 'https://prozaapp.art/api/v1/';
    React.useEffect(() => {
        axios
            .get(apiURL + 'savedarticles/?format=json', {
                headers: {
                    Authorization: 'Bearer ' + accessToken
                }
            })
            .then((response) => {
                if (response.data.length === 1) {
                    setState(response.data[0]);
                    setInfinite({ items: [response.data[0]] });
                } else if (!response.data.length) {
                    setState({
                        id: '',
                        user: '',
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
        <Verse state={state} infinite={infinite} fetchMoreData={fetchMoreData} hasMore={hasMore} />
    );
};

export default Saves;
