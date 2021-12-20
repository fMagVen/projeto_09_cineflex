import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function MovieChoice(props)
{
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const request = axios.get('https://mock-api.driven.com.br/api/v4/cineflex/movies');
        request.then(response => {setMovies(response.data)}, error => {console.log(error)})
    },[])

    if(movies === [])
    {
    return(
        <>
        <div className="header flex center-hor center-ver grey-bg total-width"><h1 className="weight-400">CINEFLEX</h1></div>
        <div className="choice-title total-width flex center-hor center-ver">
            <h2 className="weight-400 size-24">
                Selecione o filme
            </h2>
        </div>
        <div className="available-movies">
        carregando...
        </div>
        </>
    )
    }
    else
    {
    return(
        <>
        <div className="header flex center-hor center-ver grey-bg total-width"><h1 className="weight-400">CINEFLEX</h1></div>
        <div className="choice-title total-width flex center-hor center-ver">
            <h2 className="weight-400 size-24">
                Selecione o filme
            </h2>
        </div>
        <div className="available-movies flex center-hor">
        {movies.map(item =>
            <Link to={`/filme/${item.id}`} key={item.id}>
            <div  className='movie-container flex center-hor center-ver'>
                <img src={item.posterURL} alt={item.name} />
            </div>
            </Link>
        )}
        </div>
        </>
    );
    }
}
