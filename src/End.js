import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function End(props)
{
    console.log(props.movieBuild)
    console.log(props.buyTickets)

    const [serverResponse, setServerResponse] = useState()

    useEffect( () => {
    const request = axios.post(`https://mock-api.driven.com.br/api/v4/cineflex/seats/book-many`, props.buyTickets)
    request.then(response => setServerResponse(response), error => console.log(error))
    },[])

    if(!serverResponse)
    {
        return(
            <>
            <div className="header flex center-hor center-ver grey-bg total-width"><h1 className="weight-400">CINEFLEX</h1></div>
            <div className="choice-title total-width flex center-hor center-ver">
                <h2 className="choice-title-last weight-700 size-24">
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
                <h2 className="choice-title-last weight-700 size-24">
                    Pedido feito com sucesso!
                </h2>
            </div>
            <div className="session-summary flex">
                <div className="movie-time-date">
                    <span className='title weight-700'>Filme e sessão</span>
                    <div className='final-info'>{props.movieBuild.name}</div>
                    <div className='final-info'>{props.movieBuild.date}<span> </span><span> </span>{props.movieBuild.time}</div>
                </div>
                <div className="seats-final">
                <span className='title weight-700'>Ingressos</span>
                    {props.movieBuild.seats.map(item => <div className='final-info'>{`Assento ${item}`}</div>)}
                </div>
                <div className="buyer">
                <span className='title weight-700'>Comprador</span>
                    <div className='final-info'>Nome: {props.buyTickets.name}</div>
                    <div className='final-info'>CPF: {props.buyTickets.cpf}</div>
                </div>
                <div className='flex center-hor'>
                    <Link to={'/'}>
                        <button>Voltar pra Home</button>
                    </Link>
                </div>
            </div>
            </>
        )
    }

}