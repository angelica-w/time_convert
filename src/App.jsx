import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
// import dayjs from 'dayjs';
import { useState } from 'react'
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { DateTime } from 'luxon';
import TimeBlock from './components/TimeBlock';
import DateInput from './components/DateInput';
import { Divider } from '@mui/material';
import { StyledEngineProvider } from '@mui/material';


function App() {
  const [datetimes, setDatetimes] = useState([DateTime.now()]);
  const [locations, setLocations] = useState([""]);
  const [timezones, setTimezones] = useState([DateTime.now().zoneName]);
  const [prevTimezones, setPrevTimezones] = useState([DateTime.now().zoneName]);

  const addBlock = () => {
    const newBlock = datetimes[0].setZone("Asia/Tokyo");
    setDatetimes([...datetimes, newBlock]);
    setLocations([...locations, "Tokyo, Japan"]);
    setTimezones([...timezones, "Asia/Tokyo"]);
  }

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

  const updateTimezones = (tz, ind) => {
    if (tz) {
      console.log("new timezone", tz);
      setPrevTimezones(timezones);
      console.log("prevtz", prevTimezones);

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

  const interpolateColor = (color1, color2, factor) => {
    let result = color1.slice();
    for (let i = 0; i < 3; i++) {
      result[i] = Math.round(result[i] + factor * (color2[i] - color1[i]));
    }
    return result;
  };

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
  console.log("datetimes", datetimes);
  console.log("timezones", timezones);

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
          >
          </TimeBlock>
          );
        })}
        <button className="button" onClick={addBlock}>Add Block</button>
      </LocalizationProvider>
    </StyledEngineProvider>
  )
}

export default App
