import React from 'react';

export default class CreateGame extends React.Component {
    state = {
        title: "",
        developer: "",
        mode: "",
    } 
    handleSubmit = (event) => {
        event.preventDefault(); 
        const api_url = process.env.REACT_APP_API_URL;
        fetch(`${api_url}/games`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(this.state)
        }) .then(response => response.json())
          .then(data => console.log(data))
          .then(() => {
              this.setState({
                title: "",
                developer: "",
                mode: ""
              })
          }).then(this.props.refresh)
    }
    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }
    render(){
         return (
             <form onSubmit={this.handleSubmit}>
                 <input name="title"
                    type="text"
                    placeholder="Title"
                    value={this.state.title}
                    onChange={this.handleChange}/>
                 <input name="developer"
                     type="text"
                     placeholder="developer"
                     value={this.state.developer}
                     onChange={this.handleChange}/>
                  <input type="submit" value="Add Game"/>
             </form>
         )
    }
}
