import { useState } from "react";
import { DatePicker } from '@mui/x-date-pickers';

const DateInput = ({date, setDate}) => {
    return (
        <div className="col">
            <DatePicker
                value={date}
                onChange={(newValue) => setDate(newValue)}
            />
        </div>
    )
}

export default DateInput;