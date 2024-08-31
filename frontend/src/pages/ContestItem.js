import React from 'react';
import contestLogo from '../images/contestLogo.png';

const ContestItem = ({event, start, host, duration, link}) => {
    const onClickContestCard = () => {
        window.open(link, '_blank', 'noopener,noreferrer');
    };
    return (
        <div>
            <div onClick={onClickContestCard} className="flex flex-col w-72 h-72 bg-zinc-900/[0.7] hover:bg-[#18181ab3]/[0.9] rounded-md border-4 border-transparent hover:border-[#18181ab3]/[0.9] cursor-pointer">
                <img src={contestLogo} alt="contest logo" className='rounded-t-md' />
                <div className='p-2 pt-4 text-white'>
                    <span className='font-semibold text-[1.1rem] line-clamp-2'>{event}</span>
                    <p className='text-zinc-400 text-[0.9rem]'>{start}</p>
                    <p className='text-zinc-400 mt-1 text-[0.9rem]'><strong>host: </strong>{host}</p>
                    <p className='text-zinc-400 text-[0.9rem]'><strong>duration: </strong>{duration}</p>
                </div>

            </div>
        </div>
    )
}

export default ContestItem
