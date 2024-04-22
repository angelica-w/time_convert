import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { DateTime } from 'luxon';
import TimeBlock from './components/TimeBlock';
import { StyledEngineProvider } from '@mui/material';
import { Alert } from '@mui/material';


function App() {
  const [datetimes, setDatetimes] = useState([DateTime.now()]);
  const [locations, setLocations] = useState(["Current Location"]);
  const [timezones, setTimezones] = useState([DateTime.now().zoneName]);
  const [openAlert, setOpenAlert] = useState(false);

  // add new TimeBlock, defaulted to Tokyo timezone
  const addBlock = () => {
    const newBlock = datetimes[0].setZone("Asia/Tokyo");
    setDatetimes([...datetimes, newBlock]);
    setLocations([...locations, "Tokyo, Japan"]);
    setTimezones([...timezones, "Asia/Tokyo"]);
  }

  // delete a TimeBlock
  const deleteBlock = (ind) => {
    // only allow a TimeBlock to be deleted if there are more than one TimeBlocks
    if (datetimes.length === 1) {
      setOpenAlert(true);
    }
    else {
      const newDatetimes = datetimes.filter((datetime, index) => index !== ind);
      const newLocations = locations.filter((location, index) => index !== ind);
      const newTimezones = timezones.filter((timezone, index) => index !== ind);

      setDatetimes(newDatetimes);
      setLocations(newLocations);
      setTimezones(newTimezones);
    }
  }

  // update all Timeblock datetimes based on selected datetime
  const updateDatetimes = (e, ind) => {
    const newDatetimes = datetimes.map((datetime, index) => {
      const newdt = DateTime.fromObject({
          year: e.c.year,
          month: e.c.month,
          day: e.c.day,
          hour: e.c.hour,
          minute: e.c.minute,
        },
        { zone: timezones[ind]}
      ).setZone(timezones[index]);
      return newdt;
    });

    setDatetimes(newDatetimes);
  }

  // update all TimeBlock timezones and corresponding datetimes based on selected timezone
  const updateTimezones = (tz, ind) => {
    // only update if non-null timezone is selected
    if (tz) {
      const newTimezones = timezones.map((timezone, index) =>
        ind === index ? tz : timezone
      );
      const newDatetimes = datetimes.map((datetime, index) => {
        const newdt = DateTime.fromObject({
          year: datetimes[ind].year,
          month: datetimes[ind].month,
          day: datetimes[ind].day,
          hour: datetimes[ind].hour,
          minute: datetimes[ind].minute,
        }, {zone: tz}
        ).setZone((newTimezones[index]));
        return newdt;
      });

      setTimezones(newTimezones);
      setDatetimes(newDatetimes);
    }
  }

  // calculate color gradient
  const interpolateColor = (color1, color2, factor) => {
    let result = color1.slice();
    for (let i = 0; i < 3; i++) {
      result[i] = Math.round(result[i] + factor * (color2[i] - color1[i]));
    }
    return result;
  };

  // get background color for TimeBlock based on time of day
  const getColor = (datetime) => {
    const hr = datetime.hour;
    const normHr = (hr % 24) / 24;

    const morningColor = [176, 231, 255];
    const noonColor = [71, 169, 255];
    const eveningColor = [138, 167, 255];
    const nightColor = [123,123,148];

    let color;
    if (hr >= 6 && hr < 12) {
      const dayFactor = (normHr - 6 / 24) / (12 / 24 - 6 / 24);
      color = interpolateColor(morningColor, noonColor, dayFactor);
    }
    else if (hr >= 12 && hr < 18) {
      const afternoonFactor = (normHr - 12 / 24) / (18 / 24 - 12 / 24);
      color = interpolateColor(noonColor, eveningColor, afternoonFactor);
    }
    else if (hr >= 18 && hr < 24) {
      const nightFactor = (normHr - 18 / 24) / (24 / 24 - 18 / 24);
      color = interpolateColor(eveningColor, nightColor, nightFactor);
    }
    else {
      const morningFactor = (normHr - 0 / 24) / (6 / 24 - 0 / 24);
      color = interpolateColor(nightColor, morningColor, morningFactor);
    }
    return `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
  }

  return (
    <StyledEngineProvider injectFirst>
      <h1>Time Converter</h1>
      <LocalizationProvider dateAdapter={AdapterLuxon}>
        {datetimes.map((datetime, index) => {
          const bgColor = getColor(datetime);
          return (
            <TimeBlock
            className="block"
            color={bgColor}
            key={index}
            ind={index}
            datetime={datetime}
            location={locations[index]}
            timezone={timezones[index]}
            setDatetimes={updateDatetimes}
            setTimezones={updateTimezones}
            deleteBlock={deleteBlock}
          >
          </TimeBlock>
          );
        })}
        <button className="button" onClick={addBlock}>Add Block</button>
        {openAlert ?
          <Alert severity="warning" onClose={() => setOpenAlert(false)}>
            Can't delete the last remaining time block
          </Alert>
        : null}
      </LocalizationProvider>
    </StyledEngineProvider>
  )
}

export default App
