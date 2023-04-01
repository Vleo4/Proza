import React, { useEffect, useState } from 'react';
import Verse from '../Verse/Verse';
import { useParams } from 'react-router-dom';
import { getCurrentUser, getUserArticles } from '../../../api/requests';
import VerseAdd from '../VerseAdd/VerseAdd';
import { useAuthContext } from '../../../contexts/AuthContext';
const Profile = () => {
    const [infinite, setInfinite] = useState({ items: [] });
    let { id } = useParams();
    const [state, setState] = useState(null);
    const [cat, setCat] = useState(null);
    const [current, setCurrent] = useState(null);
    const { isAuthentificated } = useAuthContext();
    useEffect(() => {
        async function fetchData() {
            if (isAuthentificated) {
                let data = await getCurrentUser();
                if (data) {
                    setCurrent(data.user);
                    setCat(data.fav_category);
                }
            }
        }
        fetchData();
    }, [isAuthentificated]);
    const [length, setLength] = useState(0);
    useEffect(() => {
        async function fetchData() {
            const data = await getUserArticles(id);
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
    if (infinite.items.length === 0) {
        return <VerseAdd author={id} cat={cat} current={current} />;
    }
    return (
        <Verse
            state={state}
            author={id}
            infinite={infinite}
            fetchMoreData={fetchMoreData}
            hasMore={hasMore}
            length={length}
        />
    );
};

export default Profile;
