import {React} from 'react'
import Search from '../../Components/Search'
import TextField from "@mui/material/TextField";
import "./home.css"
import bg from "./bg.jpg"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from 'react';

function handleClick(date,from,to) {
    console.log(date,from,to)
}
export default function Home() {
    const [date, setDate] = useState(new Date());
    const [from, setFrom] = useState('')
    const [to, setTo] = useState('')
  return (

    <div className='home'>
        <div>
        <img src={bg} className='Background-Image'/>
        </div>
        <div className='Top-Panel'>SIH PROJECT</div>
      <div className='Search-Panel'>
      <div>
        <TextField 
        onChange={(e) => setFrom(e.target.value)}  // Corrected event handling
        id="outlined-basic"
        variant="outlined"
        label="From:"
        className='Search'
        value={from}  // Added controlled component value
        sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'green', // Outline color
              },
              '&:hover fieldset': {
                borderColor: 'blue', // Outline color when hovering
              },
              '&.Mui-focused fieldset': {
                borderColor: 'Black', // Outline color when focused
              },
            },
            '& .MuiInputBase-input': {
              color: 'purple', // Text color inside the input
            },
            '& .MuiInputLabel-root': {
              color: 'Green', // Label color
            },
            '& .Mui-focused': {
              color: 'Black', // Label color when focused
            }
          }}
          />
        </div>
          <div>
        <TextField
          onChange={(e) => setTo(e.target.value)}  // Corrected event handling
          id="outlined-basic"
          variant="outlined"
          label="To:"
          className='Search'
          value={to}  // Added controlled component value
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'green', // Outline color
              },
              '&:hover fieldset': {
                borderColor: 'blue', // Outline color when hovering
              },
              '&.Mui-focused fieldset': {
                borderColor: 'Black', // Outline color when focused
              },
            },
            '& .MuiInputBase-input': {
              color: 'purple', // Text color inside the input
            },
            '& .MuiInputLabel-root': {
              color: 'Green', // Label color
            },
            '& .Mui-focused': {
              color: 'Black', // Label color when focused
            }
          }}
          />
          </div>
          <div>
          <DatePicker selected={date} onChange={(date) => setDate(date)} className='Date-Picker' />
          </div>
          <div>
          <button className='Button' onClickCapture={() => handleClick(date, from, to)} >Click Me!</button>
          </div>
        </div>
    </div>
  )
}
