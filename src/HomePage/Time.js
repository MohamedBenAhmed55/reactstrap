import React from 'react';
import classes from './HomePage.module.css';
const Time = (props) => {
  const currentHour = new Date().getHours() > 9 ? new Date().getHours() : '0' + new Date().getHours() ;
  const currentMinute = new Date().getMinutes() > 9 ? new Date().getMinutes() : '0' +new Date().getMinutes(); 
 return(
  <div className={classes.ProductPreview}>
              
         {
           
         <div className={classes.TimeSection}>
           <p>{`${currentHour}:${currentMinute}`}</p>
         </div>
         }
        
         
  </div>
 );
}

export default Time;