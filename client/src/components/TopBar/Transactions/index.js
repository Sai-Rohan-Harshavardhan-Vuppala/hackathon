import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { makeStyles } from '@mui/styles';
import Transaction from "./Transaction";
import Grid from "@mui/material/Grid"

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

const Transactions = ({ data }) => {

  const classes = useStyles();

  const [category, setCategory] = React.useState('All');
  const [sortBy, setSortBy] = React.useState('date');
  const [order, setOrder] = React.useState('asc');
  const handleCatChange = (event) => {
    setCategory(event.target.value);
  };
  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  }
  const handleOrderChange = (event) => {
    setOrder(event.target.value);
  }
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
          <FormControl  sx={{ m: 1, minWidth: 80 }}>
            <InputLabel id="demo-select-small">Order</InputLabel>
              <Select
                className={classes.select}
                inputProps={{
                  classes: {
                      icon: classes.icon,
                  },
                }}
                labelId="demo-select-small"
                id="demo-select-small"
                value={order}
                onChange={handleOrderChange}
                label="order"
              >
                <MenuItem value={"asc"}>Asc</MenuItem>
                <MenuItem value={"desc"}>Desc</MenuItem>
              </Select>
          </FormControl>
          <FormControl  sx={{ m: 1, minWidth: 80 }}>
            <InputLabel id="demo-select-small">Sort by</InputLabel>
              <Select
                className={classes.select}
                inputProps={{
                  classes: {
                      icon: classes.icon,
                  },
                }}
                labelId="demo-select-small"
                id="demo-select-small"
                value={sortBy}
                onChange={handleSortChange}
                label="sort"
              >
                <MenuItem value={"date"}>date</MenuItem>
                <MenuItem value={"amount"}>amount</MenuItem>
              </Select>
          </FormControl>
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
};

export default Transactions;
