import ReactDOM from 'react-dom';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './reset.css';
import './styles.css';
import MovieChoice from './MovieChoice';
import TimeChoice from './TimeChoice';
import SeatChoice from './SeatChoice';
import End from './End';

function App()
{
    const [movieBuild, setMovieBuild] = useState({})
    const [buyTickets, setBuyTickets] = useState({})

    return(
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<MovieChoice/>} key='movies' ></Route>
                <Route path='/filme/:idFilme' element={<TimeChoice/>} key='sessions'></Route>
                <Route path='/sessao/:idSessao' element={<SeatChoice movieBuild={movieBuild} setMovieBuild={setMovieBuild} buyTickets={buyTickets} setBuyTickets={setBuyTickets}/>} key='seats'></Route>
                <Route path='/sucesso' element={<End movieBuild={movieBuild} setMovieBuild={setMovieBuild} buyTickets={buyTickets} setBuyTickets={setBuyTickets}/>} key='finish'></Route>
            </Routes>
        </BrowserRouter>
    );
}

ReactDOM.render(<App/>, document.querySelector('.root'))