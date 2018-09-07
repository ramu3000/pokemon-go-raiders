import React, { Component } from 'react';

import RaidCard from './RaidCard';
import { Timer } from './Timer';

class RaidList extends Component {

  raidList(){

    const gyms = [
      {
        id:1,
        name: 'betoniporsaat',
        location: {
          lat: '23424.23423',
          lon: '1432342.324'
        }
      },
      {
        id:2,
        name: 'kukkeli',
        location: {
          lat: '23424.23423',
          lon: '1432342.324'
        }
      }
    ];

    const raids = [
      { 
        id: 1,
        boss:'machamp',
        endTime: 900, //s
        level: 4,
        playerQue: 2,
        gym: 1
      },
      { 
        id: 2,
        boss:'lugia',
        endTime: 5400, //s
        level: 5,
        playerQue: 0,
        gym: 2
      },
    ];

    
    const gymRaids = raids.map(function(raid){
      
      const gym = gyms.filter(gym => gym.id === raid.gym);
      raid.gym = gym[0];
      return raid; 
    })
    console.log(gymRaids);
    

    return (
      <ul>
        {
          gymRaids.map(function(gymRaid){
            return <RaidCard raid={gymRaid}/>
          })
        }
      </ul>
    )

  }

  onEveryMinuteUpdateTimeElapsed() {
    console.log('minut');
  }

  onCompletion() {
    console.log('oncomplete');
  }

  render() {
    return (
      <div className="raid-container">
        <h2>Raid in progress</h2>
          {this.raidList()}
        <h2>incoming raids</h2>
        <ul>
          <Timer timeRemainingInSeconds={200}
          onEveryMinute={() => this.onEveryMinuteUpdateTimeElapsed() }
          onCompletion={() => this.onCompletion()}/>

        </ul>
      </div>
    );
  }
}

export default RaidList;
