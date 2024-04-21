import { useState } from "react";
import { TimePicker } from '@mui/x-date-pickers';

const TimeInput = ({ind, datetime, setTimes}) => {
    return (
        <div className="col" style={{display: "flex", justifyContent: "flex-start"}}>
            <TimePicker
                value={datetime}
                onChange={(e) => setTimes(e, ind)}
                views={["hours", "minutes"]}
            />
        </div>
    )
}

export default TimeInput;