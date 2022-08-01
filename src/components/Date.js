import React from 'react';
import "./Date.css"

const DateComponent = () => {

    const todayDate = new Date().toLocaleDateString();
  const todayDay = new Date().getDay();

  const day = ( 
    todayDay === 0 ? "Sunday" :
     todayDay === 1 ? "Monday" :
      todayDay === 2 ? "Tuesday" :
      todayDay === 3 ? "Wednesday" :
      todayDay === 4 ? "Thursday" :
      todayDay === 5 ? "Friday" :
      todayDay === 6 ? "Saturday" :
      null
  ) ; 


  return (
    <div className='date_container'>
        <p>{day} , {todayDate}</p>
    </div>
  )
}

export default DateComponent;