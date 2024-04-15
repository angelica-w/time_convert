import { useState } from "react";
import DateInput from "./DateInput";
import TimeInput from "./TimeInput";
import TimezoneInput from "./TimezoneInput";

const TimeBlock = ({date, time, setDate, setTime}) => {

    return (
        <div className="card">
            <div className="col">
                <div className="row">
                    <DateInput
                        date={date}
                        setDate={setDate}
                    >
                    </DateInput>
                    <TimeInput
                        time={time}
                        setTime={setTime}
                    >
                    </TimeInput>
                    <TimezoneInput></TimezoneInput>
                </div>
            </div>
        </div>
    )
}

export default TimeBlock;