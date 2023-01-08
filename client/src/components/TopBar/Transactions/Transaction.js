import React from "react";
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Stack } from "@mui/material";
  
const Trans = ({data, key}) => {
    let hexCode = "0123456789ABCDEF";
    let Color = "#";
    for (let i = 0; i < 6; i++){
        Color += hexCode[Math.floor(Math.random() * 16)];
    }
    console.log(data);
    return (
      <Card sx={{width:"60%"}}>
        <CardContent>
        <Grid container spacing={0.5} sx={{alignItems:"center"}}>
          <Grid item  sx={{width:"40px"}}>
            <Avatar sx={{ bgcolor: Color,fontSize:"18px" }} aria-label="recipe" >
              {data.item[0]}
            </Avatar>
          </Grid>
          <Grid item xs={8} sx={{marginLeft:"15px"}} >
            <Stack>
            <Typography sx={{fontWeight:"bold",fontSize:"18px"}}>{data.item}</Typography> 
            <Typography  variant="caption" flexDirection='row' gutterBottom>{data.date}</Typography> 
            </Stack>
          </Grid>
          <Grid item xs={2} display='flex' flexDirection='row-reverse' alignItems="center">
            <Typography justifyContent="end" alignItems="center">₹ {data.amount}</Typography>
          </Grid>
        </Grid>
        </CardContent>
      </Card>
    );
  }

export default Trans;