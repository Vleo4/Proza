import React, { useEffect, useState } from 'react';
import VerseAdd from '../VerseAdd/VerseAdd';
import Verse from '../Verse/Verse';
import { useAuthContext } from '../../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, getCurrentUserArticles } from '../../../api/requests';
const MyProfile = () => {
    const [author, setAuthor] = useState('');
    const [infinite, setInfinite] = useState({ items: [] });
    const [state, setState] = useState({ items: [] });
    const { isAuthentificated } = useAuthContext();
    const navigate = useNavigate();
    const [hasMore, setHasMore] = useState(true);
    const [cat, setCat] = useState(null);
    const [current, setCurrent] = useState(null);
    const [length, setLength] = useState(0);
    useEffect(() => {
        async function fetchData() {
            if (isAuthentificated) {
                let data = await getCurrentUser();
                if (data) {
                    setAuthor(data.user);
                    setCurrent(data.user);
                    setCat(data.fav_category);
                }
            }
        }
        fetchData();
    }, [isAuthentificated]);
    useEffect(() => {
        if (!isAuthentificated) {
            navigate('/login');
        }
    }, []);
    useEffect(() => {
        async function fetchData() {
            let data = await getCurrentUserArticles();
            data = data.sort((a, b) => b.id - a.id);
            if (data.id) {
                setLength(1);
            } else setLength(data.length);
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
    }, []);
    const [indexCount, setIndexCount] = useState(2);
    const fetchMoreData = () => {
        if (indexCount === state.items.length - 1) setHasMore(false);
        else {
            setInfinite({ items: [...infinite.items, state.items[indexCount]] });
            setIndexCount(indexCount + 1);
        }
    };
    if (infinite.items.length === 0) {
        return <VerseAdd author={author} cat={cat} current={current} />;
    } else {
        return (
            <Verse
                author={author}
                state={state}
                infinite={infinite}
                fetchMoreData={fetchMoreData}
                hasMore={hasMore}
                length={length}
            />
        );
    }
};

export default MyProfile;
