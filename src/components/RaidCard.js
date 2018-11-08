import React from "react";
import raidImage from "../images/raid.jpg";

const card = props => {
  if (!props.name) {
    console.error(props);
    return <li>wrong raid info</li>;
  }
  const { name, distance, level, players, boss, endTime } = props;

  const raidLastInMinutes = () => {
    return endTime;
  };

  return (
    <li>
      <div className="raid-strength">
        <div className="raid-logo">
          <img src={raidImage} alt="upcoming raid" />
        </div>
        <div className="raid-proximity"> {distance} meters </div>
        <div className="raid-timers">{raidLastInMinutes()} </div>
      </div>
      <div className="raid-info">
        <p className="raid-gym-name">{name || "betoniporsaat"} </p>
        <p className="raid-people-waiting">
          There is <b>{players || 0}</b> people waiting
        </p>
        <p className="raid-people-rating">
          {boss || "boss not known"} {level || 0}{" "}
        </p>
      </div>
      <button className="gym-btn-more-info">More info</button>
    </li>
  );
};

export default card;
