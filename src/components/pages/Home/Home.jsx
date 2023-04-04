import React, { useEffect, useState } from 'react';
import './Home.scss';
import Verse from '../Verse/Verse';
import { useAuthContext } from '../../../contexts/AuthContext';
import portrait from '../../../assets/images/portrait.svg';
import { getArticles, getRecommendations } from '../../../api/requests';
const Home = () => {
    const [rerenderC, rerenderComp] = useState(false);
    const [infinite, setInfinite] = useState({ items: [] });
    const [state, setState] = useState(null);
    const { isAuthentificated } = useAuthContext();
    useEffect(() => {
        async function fetchData() {
            let data;
            if (isAuthentificated) {
                data = await getRecommendations();
            } else {
                data = await getArticles();
            }
            if (data) {
                setState({ items: data });
                setInfinite({ items: [data[0], data[1]] });
            }
        }
        fetchData();
    }, [isAuthentificated]);
    const [indexCount, setIndexCount] = useState(2);
    const [hasMore, setHasMore] = useState(true);
    const fetchMoreData = () => {
        if (indexCount === state.items.length - 1) setHasMore(false);
        else {
            setInfinite({ items: [...infinite.items, state.items[indexCount]] });
            setIndexCount(indexCount + 1);
        }
    };
    if (infinite.items < 1 || infinite.items[0] === undefined) {
        return (
            <div className='parent'>
                <img src={portrait} className={'load'} />
            </div>
        );
    } else {
        return (
            <Verse
                state={state}
                rerenderC={rerenderC}
                rerenderComp={rerenderComp}
                infinite={infinite}
                fetchMoreData={fetchMoreData}
                hasMore={hasMore}
            />
        );
    }
};

export default Home;
