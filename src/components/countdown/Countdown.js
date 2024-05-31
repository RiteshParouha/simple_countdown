import React, { useState, useEffect } from 'react';
import styles from "./Countdown.module.css";

const initailCountdown = { days: 0, hour: 0, minute: 0, second: 0 }

const Countdown = () => {
    const [selectedDate, setSelectedDate] = useState("");
    const [intervalId, setIntervalId] = useState("");
    const [countdown, setCountdown] = useState(initailCountdown);
    const [showSuccess, setShowSuccess] = useState(false);

    const startTimer = () => {
        if (!intervalId && selectedDate) {
            const currentTime = new Date().getTime();
            const endTime = new Date(selectedDate).getTime();

            if (endTime - currentTime < 0) {
                alert("Invalid Time Selected");
               return
            }

            setShowSuccess(false);
            const id = setInterval(() => {
                const currentTime = new Date().getTime();
                const endTime = new Date(selectedDate).getTime();
                let divisor = 1;
                const timeDifference = endTime - currentTime;

                divisor = Math.floor(timeDifference / 1000);

                const second = divisor % 60;
                divisor = Math.floor(divisor / 60);

                const minute = divisor % 60;
                divisor = Math.floor(divisor / 60);

                const hour = divisor % 24;
                const days = Math.floor(divisor / 24);

                setCountdown({ days, hour, minute, second });
            }, 1000);
            setIntervalId(id);
        }
    }

    useEffect(()=>{
        if(selectedDate && intervalId){
            if(countdown.days + countdown.hour + countdown.minute + countdown.second == 0){
                setShowSuccess(true);
                clearInterval(intervalId);
                setSelectedDate("");
                setIntervalId("");
            }
        }
    },[countdown]);
    return (
        <div className={styles.parentContainer}> <h1 className={styles.heading}>Countdown <span style={{ color: "rgb(149 29 146)" }}>Timer</span></h1>
            <input className={styles.input} type="datetime-local" onChange={(e) => {
                setSelectedDate(e.target.value);
            }} />
            {!intervalId ? <button className={styles.operationButton} onClick={() => {
                startTimer();
            }}>Start Timer</button> : <button className={styles.operationButton} onClick={() => {
                clearTimeout(intervalId);
                setCountdown(initailCountdown);
                setIntervalId("");
            }}>Stop Timer</button>}

            {!showSuccess ? <div className={styles.countdown}>
                <div>
                    <h2 style={{ color: "#ffffff" }}>{countdown?.days}</h2>
                    <h3 style={{ color: "rgb(213 199 199)" }}>Days</h3>
                </div>
                <div>
                    <h2 style={{ color: "#ffffff" }}>{countdown?.hour}</h2>
                    <h3 style={{ color: "rgb(213 199 199)" }}>Hours</h3>
                </div>
                <div>
                    <h2 style={{ color: "#ffffff" }}>{countdown?.minute}</h2>
                    <h3 style={{ color: "rgb(213 199 199)" }}>Minutes</h3>
                </div>
                <div>
                    <h2 style={{ color: "#ffffff" }}>{countdown?.second}</h2>
                    <h3 style={{ color: "rgb(213 199 199)" }}>Seconds</h3>
                </div>
            </div> : <h2 style={{ color: "rgb(149 29 146)" }}>{`:) The Countdown is over! What's next on your adventure? :)`}</h2>}
        </div>
    )
}

export default Countdown