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
    <li className="gym-card__item">
      <div className="raid-strength">
        <div className="raid-logo">
          <img src={raidImage} alt="upcoming raid" />
        </div>
        <div className="raid-proximity-timer-wrapper">
          <div className="raid-proximity">
            <i className="fas fa-map-marker-alt" /> {distance} meters{" "}
          </div>

          <div className="raid-timers">
            <i className="fas fa-clock" />
            {raidLastInMinutes()}
          </div>
        </div>
      </div>
      <div className="raid-info__wrapper">
        <div className="raid-info-basic">
          <p className="raid-gym-name">Gym name: {name || "betoniporsaat"} </p>

          <p className="raid-people-rating">
            {boss || "boss not known"} <br />
            level: {level || 0}{" "}
          </p>
        </div>
        <div>
          <p>
            There is <b>{players || 0}</b> people waiting
          </p>
        </div>
      </div>

      <button className="gym-btn-more-info">More info</button>
    </li>
  );
};

export default card;
