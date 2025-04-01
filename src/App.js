import React, { useState, useEffect } from "react";
import "./App.css"; // Import external CSS file

const App = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const hours = time.getHours() % 12 || 12;
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();
  const isAM = time.getHours() < 12;

  const hourDeg = (hours + minutes / 60) * 30;
  const minuteDeg = (minutes + seconds / 60) * 6;
  const secondDeg = seconds * 6;

  // Messages for specific times
  const getMessageForTime = (hours, isAM) => {
    const messages = {
      '12': isAM ? "Gate 1 - The Hour of Warfare" : "Gate 5 - The Hour of Soul winning",
      '3': isAM ? "Gate 2 - The Hour of Mystery": "Gate 6 - The Hour of Mercy",
      '6': isAM ? "Gate 3 - The Hour of Communion" : "Gate 7 - The Hour of the Supply of the Spirit",
      '9': isAM ? "Gate 4 - The Hour of Dealing with the Flesh" : "Gate 8 -The Hour of Escape",
      '12': isAM ? "Gate 1 - The Hour of Warfare" : "Gate 5 - The Hour of Soul winning",
      '3' : isAM ? "Gate 2 - The Hour of Mystery": "Gate 6 - The Hour of Mercy",
      '6': isAM ? "Gate 3 - The Hour of Communion" : " Gate 7 - The Hour of the Supply of the Spirit",
      '9': isAM ? "Gate 4 - The Hour of Dealing with the Flesh" : "Gate 8 - The Hour of Escape",
    };
    return messages[hours] || "";
  };
  const getGatesForTime = (hours, isAM) => {
    const messages = {
      '12': isAM ? "Gate 1" : "Gate 5",
      '3': isAM ? "Gate 2": "Gate 6",
      '6': isAM ? "Gate 3" : "Gate 7",
      '9': isAM ? "Gate 4" : "Gate 8",
      '12': isAM ? "Gate 1" : "Gate 5",
      '3' : isAM ? "Gate 2": "Gate 6",
      '6': isAM ? "Gate 3" : " Gate 7",
      '9': isAM ? "Gate 4 " : "Gate 8 ",
    };
    return messages[hours] || "";
  };

  // Change border color if time is 12, 3, 6, or 9
  const highlightBorder = [12, 3, 6, 9].includes(hours) ? "green" : "grey";

  return (
    <div className="clock-container">
      <p className="ampm">{isAM ? "AM" : "PM"}</p>

      <div className="clock" style={{ borderColor: highlightBorder }}>
        {/* Numbers at 12, 3, 6, 9 positioned correctly */}
        <div className="number" style={{ top: "5%", left: "50%", transform: "translate(-50%, 0)" }}>12</div>
        <div className="number" style={{ top: "50%", right: "5%", transform: "translate(0, -50%)" }}>3</div>
        <div className="number" style={{ bottom: "5%", left: "50%", transform: "translate(-50%, 0)" }}>6</div>
        <div className="number" style={{ top: "50%", left: "5%", transform: "translate(0, -50%)" }}>9</div>

        {/* Numbers between 12, 3, 6, and 9 positioned radially with different styles */}
        <div className="number style-a" style={{ top: "10%", left: "70%" }}>1</div>
        <div className="number style-a" style={{ top: "25%", left: "85%" }}>2</div>
        <div className="number style-a" style={{ top: "65%", left: "85%" }}>4</div>
        <div className="number style-a" style={{ top: "79%", left: "69%" }}>5</div>
        <div className="number style-b" style={{ top: "80%", left: "25%" }}>7</div>
        <div className="number style-b" style={{ top: "63%", left: "10%" }}>8</div>
        <div className="number style-b" style={{ top: "25%", left: "8%" }}>10</div>
        <div className="number style-b" style={{ top: "10%", left: "25%" }}>11</div>

        {/* Clock Hands */}
        <div className="hand hour-hand" style={{ transform: `rotate(${hourDeg}deg)` }}></div>
        <div className="hand minute-hand" style={{ transform: `rotate(${minuteDeg}deg)` }}></div>
        <div className="hand second-hand" style={{ transform: `rotate(${secondDeg}deg)` }}></div>
      </div>
      
      {/* Display the corresponding message */}
      <h3 className="message gates">{getGatesForTime(hours, isAM)}</h3>
      <h3 className="message">{getMessageForTime(hours, isAM)}</h3>
    </div>
  );
};

export default App;
