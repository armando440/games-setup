import React from 'react';
import CreateGame from './CreateGame';

class Games extends React.Component {
    //track state
    state = {
        games: [
            { title: "Rainbo six siege" }
        ]
    }
    //componentDidMount() calls a function to fetch()
    getGames = () => {
        const api_url = process.env.REACT_APP_API_URL;
        fetch(`${api_url}/games`)
        .then(response => response.json())
        .then(data => this.setState({games:data},))
    }
    componentDidMount(){
        this.getGames();
    }
    //render list of games 
    render() {
        const displayGames = this.state.games.map(game => <li>{game.title}</li>);
        return (
            <>
                <CreateGame refresh={this.getGames}/>
                 <ul>
                  {displayGames}
                </ul>
            </>
        )
    }

}

export default Games;