import React, { Component } from 'react';
import './App.css';
import Player from './components/player'
import  axios from 'axios';


const url = 'http://localhost:4000/vote';

const list = [
  {
    id: 1,
    name: 'Micheal Ballard',
    player_image: "https://tmssl.akamaized.net/images/portrait/originals/63-1461310873.jpg",
    votes: 0
  },
  {
    id: 2,
    name: 'Didier Drogba',
    player_image: "https://articlebio.com/uploads/bio/2017/02/17/didier-drogba.jpg",
    votes: 0
  },
  {
    id: 3,
    name: 'Eden Hazard',
    player_image: "https://e2.365dm.com/18/06/768x432/skysports-eden-hazard-chelsea_4339330.jpg?20180715163556",
    votes: 0
  },
  {
    id: 4,
    name: 'Frank Lampard',
    player_image: "https://www.thesun.co.uk/wp-content/uploads/2017/12/nintchdbpict000063649142.jpg?strip=all&w=679",
    votes: 0
  }
]


class App extends Component {
  constructor() {
    super();

    this.drone = new window.Scaledrone("Scaledrone channelId", {

    });
    this.drone.on('open', error => {
      if(error) {
        return  console.error(error)
      }
      console.log("connected to room");

    });
    const room = this.drone.subscribe("votes");
    room.on('data', data => {
      // const { id } = data;
       console.log(data);
      this.state.players.map(player => {
        if(player.id === data) {
          return Object.assign({}, player, {
            votes: player.votes += 5
          });
        } else {
          return player;
        }
      });
      this.setState({players: this.state.players});
    });
  }

  state = {
    players: [],
  };

  componentDidMount() {
   this.setState({ players: list });
 }

 handleEvent  = id => {
   //console.log(id)
   const vote = {
     player_id : id
   }

   axios.post(url, {vote}).then((response) => {
     //console.log(response);
   })
 }

  render() {
    return (
      <div>
      <br />
        <h1 className="App">Vote your best chelsea player</h1>
        <div className="flex">
           {this.state.players.map(player =>
           <Player
           key={player.id}
           id={player.id}
           name={player.name}
           player_image={player.player_image}
           voteCount={player.votes}
           onVote={this.handleEvent} />)}
        </div>
      </div>
    )
  }
}

export default App;
