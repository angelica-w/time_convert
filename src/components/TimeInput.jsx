import { useState } from "react";
import { TimePicker } from '@mui/x-date-pickers';

const TimeInput = ({time, setTime}) => {
    return (
        <div className="col">
            <TimePicker
                value={time}
                onChange={(newValue) => setTime(newValue)}
                views={["hours", "minutes"]}
            />
        </div>
    )
}

export default TimeInput;