import React from 'react'

export default function MovieCard(props) {
    const { data } = props;

    const IMG_BASE_URL = 'https://image.tmdb.org/t/p/w1280'

    const onClick = () => {
        if (props.onClick) {
            props.onClick(data);
        }
    };

    return (
        <div className='border rounded p-4 relative bg-white overflow-hidden' onClick={onClick}>
            <img src={`${IMG_BASE_URL}${data.poster_path}`} alt='Movie Poster' />
            <div className='flex justify-between items-center m-2'>
                <h2 className='text-xl font-bold m-1'>{data.title}</h2>
                <p className='bg-teal-800 text-white font-semibold p-1 rounded'>{data.vote_average}</p>
            </div>
            <p className='p-4 absolute left-0 right-0 bottom-0 max-h-full bg-teal-400 transform translate-y-[100%] overflow-y-auto '>{data.overview}</p>

        </div>
    )
}
