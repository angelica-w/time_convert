import DateInput from "./DateInput";
import TimeInput from "./TimeInput";
import TimezoneInput from "./TimezoneInput";
import { Grid } from "@mui/material";
import { Card, CardContent } from "@mui/material";
import { StyledEngineProvider } from "@mui/material";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import SentimentSatisfiedOutlinedIcon from '@mui/icons-material/SentimentSatisfiedOutlined';
import SentimentDissatisfiedOutlinedIcon from '@mui/icons-material/SentimentDissatisfiedOutlined';
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";

const TimeBlock = ({className, color, ind, datetime, location, timezone, setDatetimes, setTimezones, deleteBlock}) => {

    // delete a TimeBlock
    const handleDelete = () => {
        deleteBlock(ind);
    }

    return (
        <StyledEngineProvider injectFirst>
        <Card className={className} sx={{backgroundColor: color}}>
            <CardContent>
                <Grid container spacing={2}>
                    <Grid item container xs spacing={2}>
                        <Grid item xs={12}>
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
                    <Grid item container direction="column" xs={2} justifyContent="space-between">
                        {
                            ind === 0
                            ? <Grid item container xs={2}></Grid>
                            : (
                                <Grid item container xs={2} justifyContent="flex-end" alignItems="flex-start">
                                    <IconButton onClick={handleDelete}>
                                        <DeleteOutlineOutlinedIcon />
                                    </IconButton>
                                </Grid>
                            )
                        }
                        <Grid container item xs={8} justifyContent="center" alignItems="center">
                            {
                                datetime.c.hour >= 9 && datetime.c.hour <= 17 ? (
                                    <Tooltip title="Within Working Hours">
                                        <SentimentSatisfiedOutlinedIcon sx={{fontSize: 60 }}/>
                                    </Tooltip>
                                ) : (
                                    <Tooltip title="Outside Working Hours">
                                        <SentimentDissatisfiedOutlinedIcon sx={{fontSize: 60 }}/>
                                    </Tooltip>
                                )
                            }
                        </Grid>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
        </StyledEngineProvider>
    )
}

export default TimeBlock;