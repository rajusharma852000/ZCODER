import React, { useContext, useEffect, useState } from 'react';
import { authContext } from '../context/Context';
import LeftNav from '../components/LeftNav';
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from '../components/Spinner';
import ContestItem from './ContestItem';


const Contests = () => {
    const { leftNavVisibility } = useContext(authContext);
    const [contests, setContests] = useState([]);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(25);

    const fetchDataOnScroll = async () => {
        try {
            const url = `https://clist.by/api/v4/contest/?limit=20&offset=${page * 20}&total_count=true&with_problems=false&upcoming=true&format_time=true&start_time__during=15 days&end_time__during=15 days&order_by=start`;
            setPage(page + 1);
            let res = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'ApiKey rajusharma852000:515e1635bbfa3c54feaa73e8d4dff9f6a91114df'
                },
            });
            let data = await res.json();
            setContests(contests.concat(data.objects));
            setTotalResults(data.meta.total_count);
        }
        catch (error) {
            console.log({ message: 'Fetch more request failed', error: error })
        }

    }
    const updateContests = async () => {

        try {
            // props.setProgress(10);
            const url = `https://clist.by/api/v4/contest/?limit=20&offset=0&total_count=true&with_problems=false&upcoming=true&format_time=true&start_time__during=7 days&end_time__during=7 days&order_by=start`;
            let res = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'ApiKey rajusharma852000:515e1635bbfa3c54feaa73e8d4dff9f6a91114df'
                },
            });
            // props.setProgress(33);
            let data = await res.json();
            // props.setProgress(66);
            setContests(data.objects);
            setTotalResults(data.meta.total_count);
            // props.setProgress(100);
        }
        catch (error) {
            console.log({ message: 'Fetch request failed', error: error })
        }
    }

    useEffect(() => {
        updateContests();
        document.title = `Contests | Zcoder`;
    }, []);

    return (
        <>
            <div className="flex w-full h-[calc(100%-56px)] absolute top-0 left-0 translate-y-14 bg-black">
                {leftNavVisibility && <LeftNav />}
                <div id="scrollableDiv" className="flex flex-col grow items-center w-[calc(100%-240px)] h-auto overflow-y-auto text-white">
                    <div className="flex items-center w-[90%] min-h-12 rounded-md font-serif bg-slate-400 text-[1.5rem] mt-6 mb-2 pl-3">
                        <span>Upcoming Contests</span>
                    </div>
                    <InfiniteScroll
                        dataLength={contests.length}
                        next={fetchDataOnScroll}
                        hasMore={contests.length < totalResults}
                        loader={<Spinner />}
                        scrollableTarget="scrollableDiv"

                    >
                        {<div className='flex flex-wrap justify-evenly'>
                            {contests.map((contest) => {
                                //a unique key is must else react won't be able to identify the data on the time of re-rendering. and elements will not be modified as we are expecting
                                return <div className="m-5" key={contest.href}>
                                    <ContestItem event={contest.event} start={contest.start} host={contest.host} duration={contest.duration} link={contest.href} />
                                </div>
                            })
                            }
                        </div>}
                    </InfiniteScroll>
                </div>
            </div>
        </>
    )
}

export default Contests
