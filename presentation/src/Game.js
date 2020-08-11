import React, { useState }  from 'react'
import UpsertGame from './UpsertGame'

const Game = ({game, eraseGame, refresh}) =>{
const [update, setUpdate] = useState(false);
const toggleForm = () => setUpdate(!update);
return (
    <li>
        {game.title}
       
         <i  onClick={() => toggleForm()}
         class="glyphicon glyphicon-user"></i>
        

        <button className="del-btn"
        onClick={() => eraseGame(game._id, refresh)}> 
            x
        </button>
        
        {update ? 
         <UpsertGame game={game}
         toggleForm={toggleForm}
         refresh={refresh}/>  
         : ''}
    </li>
   )
}

export default Game



