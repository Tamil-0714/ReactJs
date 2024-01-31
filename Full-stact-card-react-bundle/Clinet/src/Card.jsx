import { useState } from "react";
import "./Card.css";

const Card = ({ user }) => {

  return (
    <div className="cardContainer">
      <div className="top-box">
        {console.log(user)}
        <span className="status online">
          {user.status ? "Online" : "Ofline"}
        </span>
        <img
          src={`../public/images/${user.profilePath}.jpg`}
          alt="Profile-Pic" 
          className="profile-pic"
        />
        <h3 className="name">{user.Name}</h3>
        <h2 className="city">{user.City}</h2>
        <p className="role">{user.Job}</p>
        <div className="buttons">
          <button className="msg">Message</button>
          <button className="follow outline">Followers</button>
        </div>
      </div>
      <div className="bottom-box">
        <h6 className="skills">Skills</h6>
        <ul>
          {JSON.parse(user.Skills).map((skill, idx) => {
            return <li key={idx}>{skill}</li>;
          })}
        </ul>
      </div>
    </div>
  );
};

export default Card;

{
  /*

*/
}
