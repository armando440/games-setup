import React from 'react';


const Game = ({game, eraseGame, refresh}) =>{
return (
    <li>
        {game.title}
        <button className="del-btn"
        onClick={() => eraseGame(game._id, refresh)}> 
            x
        </button>
        
    </li>
   )
}

export default Game



