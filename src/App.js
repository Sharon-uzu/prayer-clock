
import React, { useState, useEffect } from "react";
import "./App.css";
import img1 from './Assets/gatee.jpeg'
import img2 from './Assets/gate.jpeg'
import logo from './Assets/logo.jpeg'

const gateImages = {  
  "Gate 1 (12AM)": img2,  
  "Gate 2 (3AM)": img1,  
  "Gate 3 (6AM)": img1,  
  "Gate 4 (9AM)": img2,  
  "Gate 5 (12PM)": img2,  
  "Gate 6 (3PM)": img1,  
  "Gate 7 (6PM)": img1,  
  "Gate 8 (9PM)": img2,  
};  
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

  const gateRanges = {
    12: [12, 1],
    3: [3, 4],
    6: [6, 7],
    9: [9, 10],
  };

  const getGatesForTime = (hours, isAM) => {  
    const gates = {  
      12: isAM ? "Gate 1 (12AM)" : "Gate 5 (12PM)",  
      3: isAM ? "Gate 2 (3AM)" : "Gate 6 (3PM)",  
      6: isAM ? "Gate 3 (6AM)" : "Gate 7 (6PM)",  
      9: isAM ? "Gate 4 (9AM)" : "Gate 8 (9PM)",  
    };  
    return gates[hours] || "";  
  };  

  const getMessageForTime = (hours, isAM) => {  
    const messages = {  
      12: isAM ? "The Hour of Warfare" : "The Hour of Soul Winning",  
      3: isAM ? "The Hour of Mystery" : "The Hour of Mercy",  
      6: isAM ? "The Hour of Communion" : "The Hour of Supply of the Spirit",  
      9: isAM ? "The Hour of Dealing with the Flesh" : "The Hour of Escape",  
    };  
    return messages[hours] || "";  
  };  

  const activeGate = getGatesForTime(hours, isAM);  
  const isActiveGroup1 = /Gate (1|4|5|8)/.test(activeGate);  
  
  // Set the background image based on the active gate  
  // const backgroundImage = activeGate  
  //   ? (isActiveGroup1 ? url(${img1}) : url(${img2}))  
  //   : 'black';   

  const activeGateRange = gateRanges[hours] || null;

  const clockRadius = 125;
  const center = { x: clockRadius, y: clockRadius };

  const getClockPosition = (num) => {
    const angle = ((num % 12) * 30 - 90) * (Math.PI / 180);
    return {
      x: center.x + clockRadius * 0.8 * Math.cos(angle),
      y: center.y + clockRadius * 0.8 * Math.sin(angle),
    };
  };

  return (
    <div>
      <header>
        <img src={logo} alt="" />
      </header>
    
    <div className="clock-container">
      
      <div className="ab-bg"></div>
      <p className="ampm">{isAM ? "AM" : "PM"}</p>

      <div className="clock" style={{
        border: `5px solid ${activeGate ? "#f5b533" : "grey"}`,
      }}>
        {activeGateRange && (
          <svg className="triangle-overlay" width="750px" height="100%">
            <polygon
              points={`
                ${center.x},${center.y} 
                ${getClockPosition(activeGateRange[0]).x},${getClockPosition(activeGateRange[0]).y} 
                ${getClockPosition(activeGateRange[1]).x},${getClockPosition(activeGateRange[1]).y}
              `}
              fill="#f7ac17"
              opacity="1"
            />
          </svg>
        )}

        {[12, 3, 6, 9].map((num, i) => (
          <div  
          key={i}  
          className="number"  
          style={{  
            top: (i === 0 ? "5%" : i === 1 ? "50%" : i === 2 ? "88%" : "50%"),  
            left: (i === 0 ? "50%" : i === 1 ? "95%" : i === 2 ? "50%" : "5%"),  
            transform: (i === 0 ? "translate(-50%, 0)" : i === 1 ? "translate(0,-50%)" : i === 2 ? "translate(-50%, 0)" : "translate(0,-50%)")  
          }}  
        > 
            {num}
          </div>
        ))}
        {activeGateRange && (  
          <>  
              {/* Image for 12AM/PM */}  
              <img  
                  src={gateImages[activeGate]}  
                  alt={activeGate}  
                  style={{  
                      position: 'absolute',  
                      width: '30px',  
                      height: '30px',  
                      top: '-30px',  // Adjust top to sit next to 12  
                      left: '50%', // Adjust left to position beside 12  
                      transform: 'translate(-50%, -50%)',  
                      display: hours === 12 ? 'block' : 'none',  
                  }}  
              />  
              {/* Image for 3AM/PM */}  
              <img  
                  src={gateImages[activeGate]}  
                  alt={activeGate}  
                  style={{  
                      position: 'absolute',  
                      width: '30px',  
                      height: '30px',  
                      top: '50%', // Adjust top to sit next to 3  
                      right: '-55px', // Adjust left to position beside 3  
                      transform: 'translate(-50%, -50%)',  
                      display: hours === 3 ? 'block' : 'none',  
                  }}  
              />  
              {/* Image for 6AM/PM */}  
              <img  
                  src={gateImages[activeGate]}  
                  alt={activeGate}  
                  style={{  
                      position: 'absolute',  
                      width: '30px',  
                      height: '30px',  
                      bottom: '-55px', // Adjust top to sit next to 6  
                      left: '52%', // Adjust left to position beside 6  
                      transform: 'translate(-50%, -50%)',  
                      display: hours === 6 ? 'block' : 'none',  
                  }}  
              />  
              {/* Image for 9AM/PM */}  
              <img  
                  src={gateImages[activeGate]}  
                  alt={activeGate}  
                  style={{  
                      position: 'absolute',  
                      width: '30px',  
                      height: '30px',  
                      top: '50%', // Adjust top to sit next to 9  
                      left: '-9%', // Adjust left to position beside 9  
                      transform: 'translate(-50%, -50%)',  
                      display: hours === 9 ? 'block' : 'none',  
                  }}  
              />  
          </>  
      )}  

        {/* Additional Numbers Positioned Radially */}  
        <div className="number style-a" style={{ top: "10%", left: "70%" }}>1</div>  
        <div className="number style-a" style={{ top: "25%", left: "85%" }}>2</div>  
        <div className="number style-a" style={{ top: "65%", left: "85%" }}>4</div>  
        <div className="number style-a" style={{ top: "79%", left: "69%" }}>5</div>  
        <div className="number style-b" style={{ top: "80%", left: "25%" }}>7</div>  
        <div className="number style-b" style={{ top: "63%", left: "10%" }}>8</div>  
        <div className="number style-b" style={{ top: "25%", left: "8%" }}>10</div>  
        <div className="number style-b" style={{ top: "10%", left: "25%" }}>11</div>  

        <div className="hand hour-hand" style={{ transform: `rotate(${hourDeg}deg)` }}></div>
        <div className="hand minute-hand" style={{ transform: `rotate(${minuteDeg}deg)` }}></div>
        <div className="hand second-hand" style={{ transform: `rotate(${secondDeg}deg)` }}></div>
      </div>

      <h3 className="message gates">{activeGate}</h3> 
     
      <h3 className="message">{getMessageForTime(hours, isAM)}</h3>  

    </div>
    </div>
  );
};

export default App;