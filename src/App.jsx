import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import dayjs from 'dayjs';
import { useState } from 'react'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import TimeBlock from './components/TimeBlock';

function App() {
  const [count, setCount] = useState(0);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [selectedTime, setSelectedTime] = useState(dayjs());
  const [newDate, setNewDate] = useState(dayjs());
  const [newTime, setNewTime] = useState(dayjs());

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <h1>Time Converter</h1>
        <TimeBlock
          date={selectedDate}
          time={selectedTime}
          setDate={setSelectedDate}
          setTime={setSelectedTime}
        >
        </TimeBlock>
        <TimeBlock
          date={newDate}
          time={newTime}
          setDate={setNewDate}
          setTime={setNewTime}
        >
        </TimeBlock>
      </LocalizationProvider>
    </>
  )
}

export default App
