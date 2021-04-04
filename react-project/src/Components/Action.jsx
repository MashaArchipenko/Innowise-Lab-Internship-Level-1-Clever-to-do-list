import React from 'react'
import Calendar from './Calendar';
import style from '../style/action.module.css'

const Action = () =>
{
    
    return(
        <>
        <div className={style.components}>
        <Calendar />
        <div className={style.events}></div>
        </div>
        </>
    )
} 

export default Action;