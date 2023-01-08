import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { makeStyles } from '@mui/styles';
import Transaction from "./Transaction";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material"
import Grid from "@mui/material/Grid";
import Button from '@mui/material/Button';
import dayjs from 'dayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import {KeyboardDoubleArrowUp, KeyboardDoubleArrowDown} from "@mui/icons-material";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
const axios = require('axios');

const useStyles = makeStyles({
  select: {
      '&:before': {
          borderColor: 'white',
      },
      '&:after': {
          borderColor: 'white',
      },
      '&:not(.Mui-disabled):hover::before': {
          borderColor: 'white',
      },
  },
  icon: {
      fill: 'white',
  },
  root: {
      color: 'white',
  },
})

const Transactions = ({data}) => {

  const classes = useStyles();

  const [loading, setLoading] = React.useState(true);
  const [category, setCategory] = React.useState('All');
  const [sortBy, setSortBy] = React.useState('date');
  const [order, setOrder] = React.useState('asc');
  const [date, setDate] = React.useState(dayjs('2014-08-18T21:11:54'));
  const handleCatChange = (event) => {
    setCategory(event.target.value);
  };
  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  }
  const handleOrderChange = (event) => {
    setOrder(event.target.value);
  }

  const Arrow = () => {
    if(order == 0) return (
      < KeyboardDoubleArrowUp />
    );
    else return (
      < KeyboardDoubleArrowDown />
    )
  }

  if(!loading){
    return (
      <div>
        <Typography>
          Loading...
        </Typography>
      </div>
    )
  }
  else{
    return (
      <div>
        <Grid container spacing={0.5}>
            <Grid item xs={4}>
              <FormControl  sx={{ m: 1, minWidth: 80 }}>
              <InputLabel id="demo-simple-select-autowidth-label">Category</InputLabel>
                <Select
                  className={classes.select}
                  inputProps={{
                    classes: {
                        icon: classes.icon,
                    },
                  }}
                  labelId="demo-simple-select-autowidth-label"
                  id="demo-simple-select-autowidth-label"
                  value={category}
                  onChange={handleCatChange}
                  autoWidth
                  label="Category"
                >
                  <MenuItem value={"All"}>All</MenuItem>
                  {data.map((transaction, key) => (
                     <MenuItem value={transaction.category}> {transaction.category}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={8} sx={{display:"flex", flexDirection:"row-reverse"}}>
            <Button
              sx = {{
                border: 1,
                borderColor: "grey.500",
                color: "#616161",
                transform: "scale(0.8)"
              }}
              onClick={() => {
                setOrder(!order);
              }}
            >
              <Arrow />
            </Button>
            <FormControl  sx={{ m: 1, minWidth: 80 }}>
              <InputLabel id="demo-simple-select-autowidth-label">Sort by</InputLabel>
                <Select
                  className={classes.select}
                  inputProps={{
                    classes: {
                        icon: classes.icon,
                    },
                  }}
                  labelId="demo-simple-select-autowidth-label"
                  id="demo-simple-select-autowidth-label"
                  value={sortBy}
                  onChange={handleSortChange}
                  autoWidth
                  label="sort"
                >
                  <MenuItem value={"date"}>date</MenuItem>
                  <MenuItem value={"amount"}>amount</MenuItem>
                </Select>
            </FormControl>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              label="Date desktop"
              inputFormat="MM/DD/YYYY"
              value={date}
              onChange={setDate}
              renderInput={(params) => <TextField {...params} />}
              sx={{zIndex: 'tooltip'}}
            />
            </LocalizationProvider>
            </Grid>
        </Grid>
        {data.map((transaction, key) => (
          <Box sx={{ m: 2, difplay: 'flex', width: '85%', justifyContent: 'center'}}>
            <Transaction 
            data={transaction}
            key={key}
          />
          </Box>
        ))}
      </div>
    );
  }
  
};

export default Transactions;
