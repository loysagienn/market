import React from 'react';
import style from './buildCssMap';
import {configClassName} from '../../common/helpers';

export default function({children, className, onClick, position = 'bottom left'}) {
    return (
        <div
            className={configClassName(style.main, className, getPositionClassName(position))}
            onClick={onClick}
        >
            {children}
        </div>
    )
}

function getPositionClassName(position) {
    let [main, specific] = position.split(' ');

    main = main.charAt(0).toUpperCase() + main.slice(1).toLowerCase();
    specific = specific.charAt(0).toUpperCase() + specific.slice(1).toLowerCase();

    return configClassName(style[`positionMain${main}`], style[`positionSpecific${specific}`])
}
