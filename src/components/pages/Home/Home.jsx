import React, { useState } from 'react';
import axios from 'axios';
import Verse from '../Verse/Verse';
import { useAuthContext } from '../../../contexts/AuthContext';
import { getFromLocalStorage, getFromSessionStorage } from '../../../utils/storage';
import { ACCESS_TOKEN } from '../../../constants/localStorageKeys';
import portrait from '../../../assets/images/portrait.svg';
const Home = () => {
    const [rerenderC, rerenderComp] = useState(false);
    const [infinite, setInfinite] = useState({ items: [] });
    const [state, setState] = useState(null);
    const apiURL = 'https://prozaapp.art/api/v1/';
    const { isAuthentificated } = useAuthContext();

    React.useEffect(() => {
        if (isAuthentificated) {
            console.log(isAuthentificated);
            const accessToken =
                getFromSessionStorage(ACCESS_TOKEN) ?? getFromLocalStorage(ACCESS_TOKEN);
            axios
                .get(apiURL + 'recommendations/?format=json', {
                    headers: {
                        Authorization: 'Bearer ' + accessToken
                    }
                })
                .then((response) => {
                    console.log(response.data);
                    setState({ items: response.data });
                    setInfinite({ items: [response.data[0], response.data[1]] });
                });
        } else {
            axios.get(apiURL + 'article/?format=json').then((response) => {
                console.log(response.data);
                setState({ items: response.data });
                setInfinite({ items: [response.data[0], response.data[1]] });
            });
        }
    }, [isAuthentificated]);
    const [indexCount, setIndexCount] = useState(2);
    const [hasMore, setHasMore] = useState(true);
    const fetchMoreData = () => {
        setInfinite({ items: [...infinite.items, state.items[indexCount]] });
        setIndexCount(indexCount + 1);
        if (indexCount === state.items.length - 1) setHasMore(false);
    };
    if (infinite.items < 1) {
        return (
            <img
                src={portrait}
                style={{
                    position: 'absolute',
                    top: '40%',
                    left: '46%',
                    height: '20%',
                    width: 'auto'
                }}
            />
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
