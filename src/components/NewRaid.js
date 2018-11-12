import React from "react";

import { navigate } from "@reach/router";
import db from "../utils/db";
import { addGymsDistance } from "../utils";
import "./NewRaid.css";
import { WizardPageOne, PageTwo, PageThree } from "./wizard";

export default class NewRaid extends React.Component {
  state = {
    gyms: [],
    filterDistance: 1000,
    step: 1,
    newRaid: {
      difficulty: 0,
      gym: null,
      active: false
    }
  };
  componentDidMount() {
    this.getGyms();
  }
  onBack = () => {
    if (this.state.step >= 2) {
      this.setState({ step: this.state.step - 1 });
    } else {
      navigate("/");
    }
  };
  onAddGym = event => {
    const gymId = event.target.dataset.id;
    const raid = { ...this.state.newRaid, gym: gymId };
    this.setState({ newRaid: raid });
    this.goToNextStep();
  };
  onAddRating = difficulty => {
    const raid = { ...this.state.newRaid, difficulty };
    this.setState({ newRaid: raid });
    this.goToNextStep();
  };
  handleRaidStarted = event => {
    if (!event.target.dataset.started) {
      console.error("no value given for raid start");
      return null;
    }
    const raidStarted = event.target.dataset.started === "true";
    const raid = { ...this.state.newRaid, active: raidStarted };
    this.setState({ newRaid: raid });
    this.goToNextStep();
  };
  goToNextStep = () => {
    this.setState({ step: this.state.step + 1 });
  };
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

    const gymsWithDistance = addGymsDistance(gyms, {
      latitude: 60.1838972,
      longitude: 24.9816705
    });
    const filterDistanceGyms = gymsWithDistance.filter(
      obj => obj.distance < this.state.filterDistance
    );
    filterDistanceGyms.sort((a, b) => {
      return a.distance - b.distance;
    });
    this.setState({ gyms: filterDistanceGyms });
  }

  render() {
    const { step } = this.state;
    return (
      <div style={{ width: "100vw", height: "100vh" }}>
        {step === 1 && (
          <WizardPageOne
            onBack={this.onBack}
            gyms={this.state.gyms}
            addGym={this.onAddGym}
          />
        )}
        {step === 2 && (
          <PageTwo
            onBack={this.onBack}
            difficulty={this.state.newRaid.difficulty}
            addRating={this.onAddRating}
          />
        )}
        {step === 3 && (
          <PageThree onBack={this.onBack} hasStarted={this.handleRaidStarted} />
        )}
        {step === 4 && this.state.newRaid.active && <div>Has started</div>}
        {step === 4 && !this.state.newRaid.active && <div>Has not started</div>}
      </div>
    );
  }
}
