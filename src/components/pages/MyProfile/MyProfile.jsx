import React, { useState } from 'react';
import axios from 'axios';
import { ACCESS_TOKEN } from '../../../constants/localStorageKeys';
import { getFromLocalStorage, getFromSessionStorage } from '../../../utils/storage';
import VerseAdd from '../VerseAdd/VerseAdd';
import Verse from '../Verse/Verse';
import { useAuthContext } from '../../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
const MyProfile = () => {
    const [author, setAuthor] = useState('no name');
    const accessToken = getFromSessionStorage(ACCESS_TOKEN) ?? getFromLocalStorage(ACCESS_TOKEN);
    const [infinite, setInfinite] = useState({ items: [] });
    const [state, setState] = useState(null);
    const apiURL = 'https://prozaapp.art/api/v1/';
    const { isAuthentificated, isLoading: isAuthLoading } = useAuthContext();
    const navigate = useNavigate();
    React.useEffect(() => {
        if (!isAuthentificated) {
            navigate('/login');
        }
    }, [isAuthentificated, isAuthLoading]);
    React.useEffect(() => {
        axios
            .get(apiURL + 'getcurrentuserarticles/?format=json', {
                headers: {
                    Authorization: 'Bearer ' + accessToken
                }
            })
            .then((response) => {
                if (response.data.length === 1) {
                    setState(response.data[0]);
                    setInfinite({ items: [response.data[0]] });
                } else if (response.data.length === 2) {
                    setState({ items: response.data });
                    setInfinite({ items: [response.data[0], response.data[1]] });
                    setHasMore(false);
                } else if (!response.data.length) {
                    setInfinite({ items: { length: 0 } });
                } else {
                    setState({ items: response.data });
                    setInfinite({ items: [response.data[0], response.data[1]] });
                }
            });
        axios
            .get(apiURL + 'prozauserprofile/?format=json', {
                headers: {
                    Authorization: 'Bearer ' + accessToken
                }
            })
            .then((response) => {
                setAuthor(response.data.user);
            });
    }, []);
    const [indexCount, setIndexCount] = useState(2);
    const [hasMore, setHasMore] = useState(true);
    const fetchMoreData = () => {
        setInfinite({ items: [...infinite.items, state.items[indexCount]] });
        setIndexCount(indexCount + 1);
        if (indexCount === state.items.length - 1) setHasMore(false);
    };
    if (infinite.items.length === 0) {
        return <VerseAdd accessToken={accessToken} author={author} />;
    } else {
        return (
            <Verse
                author={author}
                state={state}
                infinite={infinite}
                fetchMoreData={fetchMoreData}
                hasMore={hasMore}
            />
        );
    }
};

export default MyProfile;
