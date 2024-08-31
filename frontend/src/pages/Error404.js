import React from 'react';

const Error404 = () => {
    return (
        <>
            <div className="flex flex-col items-center justify-center w-full h-[calc(100%-56px)] absolute top-0 left-0 translate-y-14 bg-black text-white">
                <h1 className='text-[4rem]'>Page Not Found</h1>
                <h3 className='text-[2rem]'>Error 404</h3>
            </div>

        </>
    );
}

export default Error404;
