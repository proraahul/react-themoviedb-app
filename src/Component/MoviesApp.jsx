import { data } from 'autoprefixer';
import React, { useEffect, useState } from 'react';
import MovieCard from './MovieCard';


const URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1';

const fetchMovies = async (page = 1) => {
    const params = new URLSearchParams({
        api_key: "3fd2be6f0c70a2a598f084ddfb75487c",
        sort_by: "popularity.desc",
        page: page,
    });

    const url = `https://api.themoviedb.org/3/discover/movie?${params}`;

    const movies = await fetch(url);
    const data = await movies.json();
    return data;
}


const searchMovieByName = async (movieName = '') => {
    const params = new URLSearchParams({
        api_key: '3fd2be6f0c70a2a598f084ddfb75487c',
        query: movieName,
    });

    const url = `https://api.themoviedb.org/3/search/movie?${params}`;

    const movies = await fetch(url);
    const data = await movies.json();
    return data;
}

const MoviesApp = () => {
    const [movieData, setMovieData] = useState([]);
    const [search, setSearch] = useState("");


    useEffect(() => {
        const fetchData = fetch(URL);
        fetchData.then((response) => {
            return response.json();
        }).then((data) => {
            // console.log(data.results);
            setMovieData(data.results)
        }).catch((error) => console.log(error));
    
    }, []);

    const onClick = (data) => {
        // console.log(data);
    }

    const onChange = (e) => {
        const value = e.target.value;
        setSearch(value);
    }


    const onSearchClick = async () => {
        const data = await searchMovieByName(search);
        console.log("onSearchClick", data.results);
        setMovieData(data.results);
    }

    // useEffect(() => {
    //     if (!search) {
    //       return;
    //     }
    
    //     async function getMovies() {
    //       const data = await searchMovieByName(search);
    //       setMovieData(data.results);
    //     }
    
    //     getMovies();
    //   }, [search]);
    

    useEffect(() => {
        async function getMovies() {
            const data = await fetchMovies();
            setMovieData(data.results);
        }

        getMovies();
    }, []);


    return (
        <div>
            <label className='m-5 flex justify-end'>
                <input
                    type='text'
                    className='px-4 py-2 border rounded'
                    placeholder='Search movies'
                    value={search}
                    onChange={onChange}
                />
                <button
                    className='px-4 py-2 bg-green-500 text-white rounded'
                    onClick={onSearchClick}
                >
                    Search
                </button>
            </label>

            <div className='grid gap-4 m-5 md:grid-cols-3 lg:grid-cols-4'>
                {
                    movieData ? movieData.map((movie) => {
                        return (<MovieCard key={movie.id} data={movie} onClick={onClick} />)
                    }) : <p>Loading...</p>
                }
            </div>
        </div>
    );
}

export default MoviesApp;
