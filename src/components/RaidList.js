import React, { Component } from 'react';

import RaidCard from './RaidCard';


class RaidList extends Component {

  raidList(){
    
  }

  render() {
    return (
      <div className="raid-container">
        <h2>Raid in progress</h2>
        <ul>
          <RaidCard />
          <RaidCard />
          <RaidCard />
        </ul>

        <h2>incoming raids</h2>
        <ul>
          <RaidCard />
          <RaidCard />
          <RaidCard />
        </ul>
      </div>
    );
  }
}

export default RaidList;
