import React, {Component} from 'react';
import style from './buildCssMap';
import {configClassName} from '../../common/helpers';



export default function({value, onChange, className, onFocus, onBlur}) {

    return (
        <input
            className={configClassName(style.main, className)}
            value={value}
            onChange={event => onChange(event.target.value)}
            onFocus={event => onFocus && onFocus(event)}
            onBlur={event => onBlur && onBlur(event)}
        />
    )
}
