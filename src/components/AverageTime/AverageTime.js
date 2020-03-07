import React, { useState } from 'react';

const AverageTime = (props) => {
    const [aveTime, setAveTime] = useState('N/A');
    //const [frontTimes, setFrontTimes] = useState(0);
    //const [frontsToday, setFrontsToday] = useState(0);

    
    const today = new Date().toLocaleDateString();
    let frontTimes = 0;
    let frontsToday = 0;
    props.fronts.forEach(front => {
        console.log(front, today);
        if (front.date === today) {
            console.log(front, today);
            frontsToday++;
            frontTimes += front.timeElapsed;
        }
    });
    console.log(frontTimes);
    setAveTime(frontTimes / frontsToday);

    return (
        <div id="aveTime">
            <h2>Ave Time: <br />{aveTime}</h2>
        </div>
    )
}

export default AverageTime;