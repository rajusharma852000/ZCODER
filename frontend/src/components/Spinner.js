import React from 'react'
import loader from './loader.gif';

const Spinner = () => {
    return (
        <>
            <img src={loader} alt="loader" className='block my-5 mx-auto h-[6rem]' />
        </>
    );
}

export default Spinner;