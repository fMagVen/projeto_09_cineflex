import axios from 'axios'
import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import styled from 'styled-components'

export default function SeatChoice(props)
{

    const [sessionInfo, setSessionInfo] = useState()
    const [myName, setMyName] = useState()
    const [myCpf, setMyCpf] = useState()
    const { idSessao } = useParams()
    
    useEffect( () => {
    const request = axios.get(`https://mock-api.driven.com.br/api/v4/cineflex/showtimes/${idSessao}/seats`)
    request.then(response => seatsFunc(response.data), error => console.log(error))
    },[])

    function seatsFunc(received)
    {
        for(let i = 0; i < received.seats.length; i++)
        {
            received.seats[i].chosen = false
        }
        setSessionInfo(received)
    }

    function takeSeat(seatId, seatName, seatIsAvailable, SeatIsChosen)
    {
        let sessionInfoReplacer = {}
        sessionInfoReplacer.id = sessionInfo.id
        sessionInfoReplacer.name = sessionInfo.name
        sessionInfoReplacer.day = sessionInfo.day
        sessionInfoReplacer.movie = sessionInfo.movie
        sessionInfoReplacer.seats = []

        for(let i = 0; i < sessionInfo.seats.length; i++)
        {
            sessionInfoReplacer.seats.push(sessionInfo.seats[i])
            if(sessionInfoReplacer.seats[i].id === seatId)
                sessionInfoReplacer.seats[i].chosen = true
        }
        setSessionInfo(sessionInfoReplacer)
    }

    function finish()
    {
        console.log(sessionInfo)
        let build = {}
        build.name = sessionInfo.movie.title
        build.date = sessionInfo.day.date
        build.time = sessionInfo.name
        props.setMovieBuild(build)
        console.log(props.movieBuild)

        let idsOfSeats = []
        let nameOfSeats = []
        let buildAPI = {}
        for(let i = 0; i < sessionInfo.seats.length; i++)
        {
            if(sessionInfo.seats[i].chosen === true)
            {
                idsOfSeats.push(sessionInfo.seats[i].id)
                nameOfSeats.push(sessionInfo.seats[i].name)
            }
        }
        buildAPI.ids = idsOfSeats
        buildAPI.name = myName
        buildAPI.cpf = myCpf
        build.seats = nameOfSeats
        props.setBuyTickets(buildAPI)
        console.log(props.buyTickets)
    }

    const grey = {bgcolor: '#C3CFD9', border: '1px solid #808F9D' }
    const yellow = {bgcolor: '#FBE192', border: '1px solid #F7C52B' }
    const green = {bgcolor: '#8DD7CF', border: '1px solid #45BDB0' }

    if(!sessionInfo)
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
                Selecione o(s) assento(s)
            </h2>
        </div>
        <div className="available-seats flex">
            {sessionInfo.seats.map(item =>
            <Rectangle key={item.id}
                onClick={() => takeSeat(item.id, item.name, item.isAvailable, item.chosen)} 
                color={!item.isAvailable ? yellow : item.chosen ? green : grey}>{item.name}
            </Rectangle>)}
        </div>
        <div className="seat-types flex">
            <div className="seat-type weight-400 flex">  
                <Rectangle color={green}/>
                Selecionado
            </div>
            <div className="seat-type weight-400 flex">  
                <Rectangle color={grey}/>
                Disponivel
            </div>
            <div className="seat-type weight-400 flex">  
                <Rectangle color={yellow}/>
                Ocupado
            </div>
        </div>
        <div className="buyer-info">
            <div className="name flex">
                <span className='weight-400'>Nome do comprador:</span>
                <input onChange={e => setMyName(e.target.value)} value={myName} type="text" placeholder='Digite seu nome...' />
            </div>
            <div className="cpf flex">
                <span className='weight-400'>CPF do comprador:</span>
                <input onChange={e => setMyCpf(e.target.value)} value={myCpf} type="text" placeholder='Digite seu CPF...' />
            </div>
            <div className='flex center-hor'>
                <Link to={'/sucesso'}>
                    <button onClick={() => finish()} className='seats-choice weight-400'>Reservar assento(s)</button>
                </Link>
            </div>
        </div>
        <div className="current-choice flex center-ver">
            <div className="frame flex center-ver center-hor">
                <img src={sessionInfo.movie.posterURL} alt={sessionInfo.movie.title} />
            </div>
            <div className="written-info weight-400 flex ">
                <div>{sessionInfo.movie.title}</div>
                <div>
                    {sessionInfo.day.weekday}<span> - </span>
                    {sessionInfo.name}
                </div>
            </div>
        </div>
        </>
    )
    }
}

const Rectangle = styled.div`
    width: 26px;
    height: 26px;
    box-sizing: border-box;
    border-radius: 12px;
    font-size: 11px;
    font-weight: 400;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${props => props.color.bgcolor};
    border: ${props => props.color.border}
`