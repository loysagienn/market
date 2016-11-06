import React from 'react';
import style from './buildCssMap';
import {configClassName} from '../../common/helpers';


export default function({activePageNumber, morePageCount, distanceCount = 3, onChange}) {
    let number = Math.max(activePageNumber - distanceCount, 1);
    const lastNumber = Math.min(activePageNumber + Math.min(morePageCount, distanceCount), 50);

    const items = [];

    while (number <= lastNumber) {
        items.push(renderItem(number, number === activePageNumber, onChange));
        ++number;
    }

    return (
        <div className={style.main}>
            {items}
        </div>
    );
}

function renderItem(number, isActive, onChange) {
    return (
        <div
            className={configClassName(style.item, {[style.isActive]: isActive})}
            onClick={event => onChange(number)}
            key={number}
        >
            {number}
        </div>
    )
}
