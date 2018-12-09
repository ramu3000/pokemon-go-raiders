import React, { Component } from "react";
import RaidCard from "./RaidCard";
import { parse, format } from "date-fns";

import db from "../utils/db";
import { addGymsDistance } from "../utils";

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
    const gyms = await db.getGyms();
    this.setState({ gyms });
  }

  async getRaids() {
    const raids = await db.getRaids();
    this.setState({ raids });
  }

  location() {
    if (!("geolocation" in navigator) || !navigator.geolocation) {
      console.log("no access or geolocation in navigator");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
      },
      err => {
        console.log(err);
      },
      { timeout: 99999 }
    );

    const gymsWithDistance = addGymsDistance(
      this.state.gyms,
      this.state.myLocation
    );

    this.setState({ closestGyms: gymsWithDistance });
  }

  raidList() {
    const gyms = this.state.closestGyms;
    if (gyms.length === 0) return;
    const gymsWithHasRaids = this.state.raids.map(function(raid) {
      const gym = gyms.find(gym => gym.id === raid.gym);
      if (!gym) return null;
      console.log(raid.endTime.nanoseconds);
      return {
        id: raid.id,
        name: gym.name,
        distance: gym.distance,
        level: raid.level,
        boss: raid.boss,
        players: raid.playerQue,
        endTime: raid.endTime
      };
    });
    return (
      <ul>
        {gymsWithHasRaids.map(function(gymRaid, i) {
          if (!gymRaid) {
            return null;
          }
          const time = format(gymRaid.endTime, "HH:mm:ss").toString();
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
