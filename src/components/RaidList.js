import React, { Component } from "react";
import geolib from "geolib";
import RaidCard from "./RaidCard";

import db from "../utils/db";

class RaidList extends Component {
  state = {
    gyms: [],
    raids: [],
    myLocation: { latitude: 60.1838972, longitude: 24.9816705 },
    closestGyms: []
  };

  componentDidMount() {
    this.getGyms();
    this.getRaids();
  }

  componentDidUpdate() {
    if (this.state.closestGyms.length === 0) {
      this.location();
    }
  }

  async getGyms() {
    const querySnapshot = await db.gyms;
    const gyms = [];
    querySnapshot.forEach(gym => {
      const data = gym.data();
      gyms.push({
        id: gym.id,
        name: data.name,
        coords: data.coords
      });
    });
    this.setState({ gyms });
  }
  async getRaids() {
    const querySnapshot = await db.raids;
    const raids = [];
    querySnapshot.forEach(raid => {
      const data = raid.data();
      raids.push({
        id: raid.id,
        boss: data.boss,
        gym: data.gym.id,
        level: data.level,
        playerQue: data.playerQue,
        endTime: data.endtime
      });
    });
    console.log(raids);
    this.setState({ raids });
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
    const fetchedGyms = {};

    this.state.gyms.forEach(gym => {
      const id = gym.id;
      fetchedGyms[id] = {
        latitude: gym.coords.latitude,
        longitude: gym.coords.longitude
      };
    });

    const gymDistance = geolib.orderByDistance(
      this.state.myLocation,
      fetchedGyms
    );

    const gymsWithDistance = this.state.gyms.map(gym => {
      let distance;
      gymDistance.forEach(gymWithDistance => {
        if (gym.id === gymWithDistance.key) {
          distance = gymWithDistance.distance;
        }
      });
      return { distance, ...gym };
    });
    console.log(gymsWithDistance);
    this.setState({ closestGyms: gymsWithDistance });
  }

  raidList() {
    const gyms = this.state.closestGyms;
    if (gyms.length === 0) return;
    const gymsWithHasRaids = this.state.raids.map(function(raid) {
      const gym = gyms.find(gym => gym.id === raid.gym);
      if (!gym) return null;
      return {
        id: raid.id,
        name: gym.name,
        distance: gym.distance,
        level: raid.level,
        boss: raid.boss,
        players: raid.playerQue,
        endTime: raid.endTime.seconds
      };
    });
    return (
      <ul>
        {gymsWithHasRaids.map(function(gymRaid, i) {
          if (!gymRaid) {
            return null;
          }
          const time = new Date(gymRaid.endTime).toLocaleTimeString();
          console.log(time);
          return (
            <RaidCard
              key={gymRaid.id}
              distance={gymRaid.distance}
              name={gymRaid.name}
              level={gymRaid.level}
              players={gymRaid.players}
              boss={gymRaid.boss}
              endTime={time}
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
