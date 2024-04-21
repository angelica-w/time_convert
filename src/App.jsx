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


function App() {
  const [datetimes, setDatetimes] = useState([DateTime.now()]);
  const [locations, setLocations] = useState([""]);
  const [timezones, setTimezones] = useState([DateTime.now().zoneName]);

  const addBlock = () => {
    const newBlock = datetimes[0].setZone("Asia/Tokyo");
    setDatetimes([...datetimes, newBlock]);
    setLocations([...locations, "Tokyo, Japan"]);
    setTimezones([...timezones, "Asia/Tokyo"]);
  }

  const updateDays = (e, ind) => {
    const newDatetimes = datetimes.map((datetime, index) =>
      ind === index
        ? datetime.set({
            year: e.c.year,
            month: e.c.month,
            day: e.c.day,
          })
        : datetime
    );

    const newAllDatetimes = newDatetimes.map((datetime, index) => {
      const newdt = newDatetimes[ind].setZone(timezones[index])
      return newdt;
    });

    setDatetimes(newAllDatetimes)
  }

  const updateTimes = (e, ind) => {
    const newDatetimes = datetimes.map((datetime, index) =>
      ind === index
        ? datetime.set({
            hour: e.c.hour,
            minute: e.c.minute,
          })
        : datetime
    );

    const newAllDatetimes = newDatetimes.map((datetime, index) => {
      const newdt = newDatetimes[ind].setZone(timezones[index]);
      console.log(newdt);
      return newdt;
    });

    setDatetimes(newAllDatetimes)
  }

  const updateTimezones = (tz, ind) => {
    console.log("new timezone", tz);

    const newTimezones = timezones.map((timezone, index) =>
      ind === index ? tz : timezone
    );

    const newDatetimes = datetimes.map((datetime, index) => {
      const newdt = DateTime.fromObject({
        year: datetime.year,
        month: datetime.month,
        day: datetime.day,
        hour: datetime.hour,
        minute: datetime.minute
      }).setZone(newTimezones[index]);
      const tz = newTimezones[index];
      console.log(typeof(tz));
      // const newdt = datetime.setZone(newTimezones[index], {keepCalendarTime: true});
      console.log(newdt);
      return newdt;
    });

    setTimezones(newTimezones);
    setDatetimes(newDatetimes);
  }

  console.log("datetimes", datetimes);
  console.log("timezones", timezones);

  return (
    <>
      <h1>Time Converter</h1>
      <LocalizationProvider dateAdapter={AdapterLuxon}>
        {datetimes.map((datetime, index) => (
          <TimeBlock
            key={index}
            ind={index}
            datetime={datetime}
            location={locations[index]}
            timezone={timezones[index]}
            setDays={updateDays}
            setTimes={updateTimes}
            setTimezones={updateTimezones}
          >
          </TimeBlock>
        ))}
        <button onClick={addBlock}>Add Block</button>
      </LocalizationProvider>
    </>
  )
}

export default App