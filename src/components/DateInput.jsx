import { DatePicker } from '@mui/x-date-pickers';

const DateInput = ({ind, datetime, setDays}) => {
    return (
        <div className="col" style={{display: "flex", justifyContent: "flex-start"}}>
            <DatePicker
                value={datetime}
                onChange={(e) => setDays(e, ind)}
            />
        </div>
    )
}

export default DateInput;