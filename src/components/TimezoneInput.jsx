import { useState } from "react";
import { TimePicker } from '@mui/x-date-pickers';

const TimezoneInput = ({timezone, setTimezone}) => {
    return (
        <div className="col">
            <select className="form-select">
                <option>UTC</option>
                <option>Local</option>
            </select>
        </div>
    )
}

export default TimezoneInput;