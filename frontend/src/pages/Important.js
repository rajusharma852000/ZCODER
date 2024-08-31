import React, { useContext } from 'react';
import LeftNav from '../components/LeftNav';
import { authContext } from '../context/Context';

const Important = () => {
    const { leftNavVisibility } = useContext(authContext);

    return (
        <>
            <div className="flex w-full h-[calc(100%-56px)] absolute top-0 left-0 translate-y-14 bg-black text-white">
                {leftNavVisibility && <LeftNav />}
                <div className="flex w-[calc(100%-240px)] grow h-full items-center justify-center">
                    
                </div>
            </div>
        </>
    );
};

export default Important;
