import axios from 'axios'
import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

export default function TimeChoice()
{
    const [movieInfo, setMovieInfo] = useState()
    const { idFilme } = useParams()
    
    useEffect( () => {
    const request = axios.get(`https://mock-api.driven.com.br/api/v4/cineflex/movies/${idFilme}/showtimes`)
    request.then(response => setMovieInfo(response.data), error => console.log(error))
    },[])
    if(!movieInfo)
    {
        return(
            <>
            <div className="header flex center-hor center-ver grey-bg total-width"><h1 className="weight-400">CINEFLEX</h1></div>
            <div className="choice-title total-width flex center-hor center-ver">
                <h2 className="weight-400 size-24">
                    Carregando...
                </h2>
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
                Selecione o horário
            </h2>
        </div>
        <div className="available-time">
            {movieInfo.days.map(item =>
            <>
            <div className="day flex" key={item.id}>
                <h3 className='weight-400'>{item.weekday} - {item.date}</h3>
            </div>
                {item.showtimes.map(subitem =>
                    <Link to={`/sessao/${subitem.id}`} key={subitem.id}>
                    <button className='time-choice weight-400'>{subitem.name}</button>
                    </Link>
                )}
                </>
                )}
        </div>
        <div className="current-choice flex center-ver">
            <div className="frame flex center-ver center-hor">
                <img src={movieInfo.posterURL} alt={movieInfo.title} />
            </div>
            <div className="written-info weight-400">
                {movieInfo.title}
            </div>
        </div>
        </>
        )
    }
}