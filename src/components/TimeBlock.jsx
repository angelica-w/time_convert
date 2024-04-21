import { useState } from "react";
import DateInput from "./DateInput";
import TimeInput from "./TimeInput";
import TimezoneInput from "./TimezoneInput";
import { Grid } from "@mui/material";
import { Card, CardContent } from "@mui/material";

const TimeBlock = ({ind, datetime, location, timezone, setDays, setTimes, setTimezones}) => {

    return (
        <Card>
            <CardContent>
                <Grid container spacing={2}>
                    <Grid item xs={10}>
                        <TimezoneInput
                            ind={ind}
                            location={location}
                            timezone={timezone}
                            setTimezones={setTimezones}
                        >
                        </TimezoneInput>
                    </Grid>
                    <Grid item xs={6}>
                        <DateInput
                            ind={ind}
                            datetime={datetime}
                            setDays={setDays}
                        >
                        </DateInput>
                    </Grid>
                    <Grid item xs={6}>
                        <TimeInput
                            ind={ind}
                            datetime={datetime}
                            setTimes={setTimes}
                        >
                        </TimeInput>
                    </Grid>
                </Grid>

            </CardContent>
        </Card>


        // <div className="card">
        //     <div className="col">
        //         <div className="row">
        //             <TimezoneInput
        //                 location={location}
        //                 timezone={timezone}
        //                 setLocation={setLocation}
        //                 setTimezone={setTimezone}
        //             >
        //             </TimezoneInput>
        //         </div>
        //         <div className="row">
        //             <DateInput
        //                 date={date}
        //                 setDate={setDate}
        //             >
        //             </DateInput>
        //             <TimeInput
        //                 time={time}
        //                 setTime={setTime}
        //             >
        //             </TimeInput>
        //         </div>
        //     </div>
        // </div>
    )
}

export default TimeBlock;