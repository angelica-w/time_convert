import { useState } from "react";
import DateInput from "./DateInput";
import TimeInput from "./TimeInput";
import TimezoneInput from "./TimezoneInput";
import { Grid } from "@mui/material";
import { Card, CardContent } from "@mui/material";
import { StyledEngineProvider } from "@mui/material";

const TimeBlock = ({className, color, ind, datetime, location, timezone, setDatetimes, setTimezones}) => {

    return (
        <StyledEngineProvider injectFirst>
        <Card className={className} sx={{backgroundColor: color}}>
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
                            setDays={setDatetimes}
                        >
                        </DateInput>
                    </Grid>
                    <Grid item xs={6}>
                        <TimeInput
                            ind={ind}
                            datetime={datetime}
                            setTimes={setDatetimes}
                        >
                        </TimeInput>
                    </Grid>
                </Grid>

            </CardContent>
        </Card>
        </StyledEngineProvider>
    )
}

export default TimeBlock;