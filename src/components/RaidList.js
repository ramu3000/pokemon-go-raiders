import React, { Component } from 'react';

import RaidCard from './RaidCard';


class RaidList extends Component {

  raidList(){
    const raids = [
      { 
        boss:'machamp',
        endTime: 900, //s
        level: 4,
        playerQue: 2,
        gym: {
          name: 'betoniporsaat',
          location: {
            lat: '23424.23423',
            lon: '1432342.324'
          }
        }
      },
      { 
        boss:'lugia',
        endTime: 5400, //s
        level: 5,
        playerQue: 0,
        gym: {
          name: 'kukkeli',
          location: {
            lat: '23424.23423',
            lon: '1432342.324'
          }
        }
      },
    ];
    

    return (
      <ul>
        {
          raids.map(function(raid){
            return <RaidCard raid={raid}/>
          })
        }
      </ul>
    )

  }


  render() {
    return (
      <div className="raid-container">
        <h2>Raid in progress</h2>
          {this.raidList()}
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
