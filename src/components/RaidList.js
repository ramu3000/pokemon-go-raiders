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
        name: "Resistance sacrificial altar",
        coord: {
          lat: "60.186982",
          lon: "24.965476"
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
      }
    ],
    myLocation: { latitude: 0, longitude: 0 },
    closestGyms: []
  };

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
      key: gym.id,
      name: gym.name
    }));

    const closestGyms = geolib.orderByDistance(
      this.state.myLocation,
      fetchedGyms
    );
  }

  raidList() {
    const gymRaids = this.state.raids.map(function(raid) {
      //const gym = this.state.gyms.filter(gym => gym.id === raid.gym);
      return raid;
    });

    return (
      <ul>
        {gymRaids.map(function(gymRaid, i) {
          return <RaidCard key={i} raid={gymRaid} distance={gymRaid} />;
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
    this.location();
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
