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
  
const Trans = ({data, key}) => {
    let hexCode = "0123456789ABCDEF";
    let Color = "#";
    for (let i = 0; i < 6; i++){
        Color += hexCode[Math.floor(Math.random() * 16)];
    }
    console.log(data);
    return (
      <Card>
        <CardContent>
        <Grid container spacing={0.5}>
          <Grid item xs={0.6}>
            <Avatar sx={{ bgcolor: Color }} aria-label="recipe">
              {data.category[0]}
            </Avatar>
          </Grid>
          <Grid item xs={9.4} >
            <Grid item xs={9.4}>
            <Typography display="flex" alignItems="flex-start">{data.category}</Typography> 
            </Grid>
            <Grid item xs={9.4}>
            <Typography  variant="caption" flexDirection='row' gutterBottom>{data.date}</Typography> 
            </Grid>
          </Grid>
          <Grid item xs={2} display='flex' flexDirection='row-reverse' alignItems="center">
            <Typography justifyContent="end" alignItems="center">{data.amount}</Typography>
          </Grid>
        </Grid>
        </CardContent>
      </Card>
    );
  }

export default Trans;