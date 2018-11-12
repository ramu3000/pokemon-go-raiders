import React from "react";
import Rating from "react-rating";

import GymCard from "./GymCard";

export const WizardPageOne = props => {
  function renderGyms() {
    if (props.gyms.length === 0) return null;

    const gymListHtml = props.gyms.map(gym => (
      <GymCard
        key={gym.id}
        id={gym.id}
        name={gym.name}
        distance={gym.distance}
        step={props.addGym}
      />
    ));
    return <ul>{gymListHtml}</ul>;
  }
  return (
    <div>
      <button onClick={props.onBack}>back</button>
      <h2>Choose your gym</h2>
      <p>please choose gym where raid is starting </p>
      {renderGyms()}
    </div>
  );
};

export const PageTwo = props => {
  const { onBack, addRating, difficulty } = props;
  return (
    <div>
      <h2>Boss dificulty</h2>
      <p>Add boss dificulty</p>
      <button onClick={onBack}>back</button>
      <Rating onChange={addRating} initialRating={difficulty} />
    </div>
  );
};
export const PageThree = props => {
  const { hasStarted } = props;
  return (
    <div>
      <h2>Has it started yet?</h2>
      <p>Please choose yes or no</p>
      <button data-started="true" onClick={hasStarted}>
        Yes
      </button>
      <button data-started="false" onClick={hasStarted}>
        No
      </button>
      <button onClick={props.onBack}>back</button>
    </div>
  );
};
