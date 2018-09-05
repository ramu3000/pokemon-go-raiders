import React from 'react';
import raidImage from '../images/raid.jpg'; 
import RaidList from './RaidList';

const card = (props) => {

  if(!props.raid){
    return (
      <li>wrong raid info</li>
    )
  } 
  const { level, gym: { name: gymName }}  = props.raid;


  return (
    <li>
      <div className="raid-strength">
        <div className="raid-logo">
          <img src={raidImage} alt="upcoming raid"/>
        </div>
        <div className="raid-proximity"> 300 meters </div>
        <div className="raid-timers"> 30 minutes </div>
      </div>
      <div className="raid-info">
        <p className="raid-gym-name">{ gymName || "betoniporsaat"} </p>
        <p className="raid-people-waiting">There is 3 people waiting </p>
        <p className="raid-people-rating">{level} </p>
      </div>
      <button className="gym-btn-more-info">More info</button>
     
    </li>
  )
}

export default card;