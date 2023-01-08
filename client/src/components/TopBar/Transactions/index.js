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
  console.log(data);
  // data = [
  //   { category: "Food", date: "1st January 2023", amount: "10$" },
  //   { category: "Clothing", date: "6th January 2023", amount: "20$" },
  //   { category: "Electricity", date: "31st December 2022", amount: "8$" },
  //   { category: "Petrol", date: "1st January 2022", amount: "13$" },
  // ];

  const getDate = (date)=>{
    let d = new Date(date);
    return dayjs(d).format("DD-MM-YY");
  }
  const catWiseData = (data) => {
    var updatedData = {};
    var items = {};
    var finalData = [];
    data.forEach((invoice) => {
      invoice.items.forEach((item) => {
        if(updatedData[item.category] == undefined){
          updatedData[item.category]=item.value;
          items[item.category] = [{item: item.name, amount: item.value,date: getDate(invoice.date)}];
        }
        else{
          updatedData[item.category] += item.value;
          items[item.category].push({item: item.name, amount: item.value,date : getDate(invoice.date)});
        }
      })
    })
    // console.log(updatedData);
    const keys = Object.keys(updatedData);
    for(const key of keys){
      finalData.push({
        item: key,
        amount: updatedData[key],
        items: items[key]
      })

    }
    // console.log(finalData);
    return finalData;
  }
  const classes = useStyles();
  const [shownData, setShownData] = React.useState([]);
  const [tempData,setTempData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [category, setCategory] = React.useState('All');
  const [sortBy, setSortBy] = React.useState('date');
  const [order, setOrder] = React.useState('asc');
  const [date, setDate] = React.useState(dayjs('2014-08-18T21:11:54'));
  // console.log(shownData);
  // setShownData(catWiseData(data));
  console.log("Hi");  

  const handleCatChange = (event) => {
    console.log(event.target.value);
    setCategory(event.target.value);
    var newData = [...tempData];
    let index = newData.findIndex((temp)=> temp.item == event.target.value);
    console.log(index)
    if(index !== -1){
      setShownData(newData[index].items)
      // console.log(newData[index].items)
    }
  };
  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  }
  const handleOrderChange = (event) => {
    setOrder(event.target.value);
  }
  React.useEffect(()=>{
    const data1 = catWiseData(data);
    setShownData(data1);
    setTempData(data1);
  }, [])
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
        <Grid container spacing={0.5} sx={{alignItems:"center"}}>
            <Grid item xs={4}>
              <FormControl  sx={{ m: 1, width:"200px" }}>
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
                  {tempData.map((transaction, key) => (
                     <MenuItem value={transaction.item}> {transaction.item}</MenuItem>
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
            <FormControl  sx={{ m: 1, width:"200px" }}>
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
                  <MenuItem value={"date"}>Date</MenuItem>
                  <MenuItem value={"amount"}>Amount</MenuItem>
                </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 80 }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              label="Date"
              inputFormat="MM/DD/YYYY"
              value={date}
              onChange={setDate}
              renderInput={(params) => <TextField {...params} />}
              sx={{zIndex: 'tooltip'}}
            />
            </LocalizationProvider>
            </FormControl>
            </Grid>
        </Grid>
        {shownData.map((transaction, key) => (
          <Box sx={{ m: 2, display: 'flex', justifyContent: "flex-start"}}>
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
