import React, { useEffect, useState } from 'react';
import { ACCESS_TOKEN } from '../../../constants/localStorageKeys';
import { getFromLocalStorage, getFromSessionStorage } from '../../../utils/storage';
import VerseAdd from '../VerseAdd/VerseAdd';
import Verse from '../Verse/Verse';
import { useAuthContext } from '../../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, getCurrentUserArticles } from '../../../api/requests';
const MyProfile = () => {
    const [author, setAuthor] = useState('');
    const accessToken = getFromSessionStorage(ACCESS_TOKEN) ?? getFromLocalStorage(ACCESS_TOKEN);
    const [infinite, setInfinite] = useState({ items: [] });
    const [state, setState] = useState({ items: [] });
    const { isAuthentificated } = useAuthContext();
    const navigate = useNavigate();
    const [hasMore, setHasMore] = useState(true);
    const [alert, setAlert] = useState(false);
    const [alertMobile, setAlertMobile] = useState(false);
    const toggleAlert = () => {
        setAlert(!alert);
    };
    const toggleAlertMobile = () => {
        setAlertMobile(!alertMobile);
    };
    useEffect(() => {
        if (!isAuthentificated) {
            navigate('/login');
        }
    }, []);
    useEffect(() => {
        async function fetchData() {
            let data = await getCurrentUser();
            if (data) {
                setAuthor(data.user);
            }
        }
        fetchData();
    }, []);
    useEffect(() => {
        async function fetchData() {
            let data = await getCurrentUserArticles();
            data = data.sort((a, b) => b.id - a.id);
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
    }, [alert, alertMobile]);
    const [indexCount, setIndexCount] = useState(2);
    const fetchMoreData = () => {
        if (indexCount === state.items.length - 1) setHasMore(false);
        else {
            setInfinite({ items: [...infinite.items, state.items[indexCount]] });
            setIndexCount(indexCount + 1);
        }
    };
    if (infinite.items.length === 0) {
        return (
            <VerseAdd
                accessToken={accessToken}
                alert={alert}
                toggleAlert={toggleAlert}
                alertMobile={alertMobile}
                toggleAlertMobile={toggleAlertMobile}
                author={author}
            />
        );
    } else {
        return (
            <Verse
                alert={alert}
                toggleAlert={toggleAlert}
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
