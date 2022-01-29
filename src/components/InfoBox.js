import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import './InfoBox.css';

function InfoBox({title,todayData,totalData,active,isRed,...props}) {
  return (
  <Card onClick={props.onClick}  className={`infoBox ${active && "infoBox--selected"} ${
    isRed && "infoBox--red"
  }`}> 
    <CardContent>
      <Typography className="infoBox_title" color="textSecondary"
      >{title}</Typography>

      <h2 className={`infoBox__cases ${!isRed && "infoBox__cases--green"}`}>{todayData}</h2>
      <Typography className="infoBox_total" color="textSecondary"
      >{totalData} Total</Typography>

    </CardContent>

  </Card>);
}

export default InfoBox;
