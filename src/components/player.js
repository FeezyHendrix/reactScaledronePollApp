import React, { Component } from 'react';
import '../App.css';

class Player extends Component {
  constructor(props) {
    super(props);
    this.state = {count: 0};
  }

  handleVote = () => {
    this.props.onVote(this.props.id)
  };

  render() {
    return (
      <div>
        <h1 className="App">{this.props.voteCount}</h1>
        <img className="Player-image" src={this.props.player_image} alt="player profile" />
        <p className="Player-text">{this.props.name}</p>
        <button className="Player-button" onClick={this.handleVote}>Vote +</button>
      </div>
    );
  }
}

export default Player;
