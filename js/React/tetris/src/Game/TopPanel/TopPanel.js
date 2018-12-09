import React, { Component } from 'react';
import './TopPanel.css';

class TopPanel extends Component {
  render() {
    return (
      <div id="TopPanel">
        <button onClick={this.props.new_game}
        	>New Game</button>
        <button>Select Lvl</button>
      </div>
    );
  }
}

export default TopPanel;
