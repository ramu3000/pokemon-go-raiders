import React, { Component } from "react";
import geolib from "geolib";
import RaidCard from "./RaidCard";

class RaidList extends Component {
  state = {
    gyms: [
      {
        id: 1,
        name: "betoniporsaat",
        coord: {
          lat: "60.184715",
          lon: "24.981974"
        }
      },
      {
        id: 2,
        name: "studio mural",
        coord: {
          lat: "60.184633",
          lon: "24.978734"
        }
      },
      {
        id: 3,
        name: "Resistance sacrificial altar",
        coord: {
          lat: "60.181178",
          lon: "24.975042"
        }
      },
      {
        id: 4,
        name: "Marjatan Talo",
        coord: {
          lat: "60.186980",
          lon: "24.965468"
        }
      },
      {
        id: 5,
        name: "Kinaporinpuisto",
        coord: {
          lat: "60.189201",
          lon: "24.961163"
        }
      },
      {
        id: 6,
        name: "Hanhiparvi",
        coord: {
          lat: "60.184480",
          lon: "24.962948"
        }
      }
    ],
    raids: [
      {
        id: 1,
        boss: "machamp",
        endTime: "14:50", //s
        level: 4,
        playerQue: 2,
        gym: 1
      },
      {
        id: 2,
        boss: "lugia",
        endTime: "14:50", //s
        level: 5,
        playerQue: 0,
        gym: 2
      },
      {
        id: 3,
        boss: "lugia",
        endTime: "14:50", //s
        level: 5,
        playerQue: 0,
        gym: 3
      },
      {
        id: 4,
        boss: "lugia",
        endTime: "14:50", //s
        level: 5,
        playerQue: 0,
        gym: 5
      }
    ],
    myLocation: { latitude: 60.1838972, longitude: 24.9816705 },
    closestGyms: []
  };

  componentDidMount() {
    this.location();
  }

  async location() {
    if (!("geolocation" in navigator) || !navigator.geolocation) {
      console.log("no access or geolocation in navigator");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        //this.setState({ myLocation: { latitude, longitude } });
      },
      err => {
        console.log(err);
      },
      { timeout: 99999 }
    );

    //const myLocation = { latitude: "60.183504", longitude: "24.980144" };

    const fetchedGyms = this.state.gyms.map(gym => ({
      latitude: gym.coord.lat,
      longitude: gym.coord.lon,
      key: gym.id
    }));

    const gymDistance = geolib.orderByDistance(
      this.state.myLocation,
      fetchedGyms
    );

    const gymsWithDistance = this.state.gyms.map(gym => {
      let distance;
      gymDistance.forEach(gymWithDistance => {
        if (gym.id === +gymWithDistance.key + 1) {
          distance = gymWithDistance.distance;
        }
      });
      return { distance, ...gym };
    });
    this.setState({ closestGyms: gymsWithDistance });
  }

  raidList() {
    const gyms = this.state.closestGyms;
    if (gyms.length === 0) return;
    const gymsWithHasRaids = this.state.raids.map(function(raid) {
      const gym = gyms.find(gym => gym.id === raid.gym);
      return {
        id: raid.id,
        name: gym.name,
        distance: gym.distance,
        level: raid.level,
        boss: raid.boss,
        players: raid.playerQue
      };
    });
    return (
      <ul>
        {gymsWithHasRaids.map(function(gymRaid, i) {
          return (
            <RaidCard
              key={gymRaid.id}
              distance={gymRaid.distance}
              name={gymRaid.name}
              level={gymRaid.level}
              players={gymRaid.players}
              boss={gymRaid.boss}
            />
          );
        })}
      </ul>
    );
  }

  onEveryMinuteUpdateTimeElapsed() {
    console.log("minut");
  }

  onCompletion() {
    console.log("oncomplete");
  }

  render() {
    return (
      <div className="raid-container">
        <h2>Raid in progress</h2>
        {this.raidList()}
        <h2>incoming raids</h2>
        <ul />
      </div>
    );
  }
}

export default RaidList;
