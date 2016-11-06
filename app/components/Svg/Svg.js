import React from 'react';
import style from './buildCssMap';
import {configClassName} from '../../common/helpers';

const render = ({size: [width = 24, height = 24] = [], color = '', path = '', className = ''}) => (
    <svg
        className={configClassName(className, style.main)}
        viewBox={`0 0 ${width} ${height}`}
        width={width}
        height={height}
    >
        <path
            fill={color}
            d={path}
        />
    </svg>
);


export const SvgArrowRight = ({className, color}) => render({
    className, color,
    size: [24, 24],
    path: 'M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z'
});

export const SvgArrowLeft = ({className, color}) => render({
    className, color,
    size: [24, 24],
    path: 'M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z'
});

export const SvgArrowUp = ({className, color}) => render({
    className, color,
    size: [24, 24],
    path: 'M7.41,15.41L12,10.83L16.59,15.41L18,14L12,8L6,14L7.41,15.41Z'
});

export const SvgArrowDown = ({className, color}) => render({
    className, color,
    size: [24, 24],
    path: 'M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58'
});

export const SvgCheckboxUnchecked = ({className, color}) => render({
    className, color,
    size: [24, 24],
    path: 'M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3M19,5V19H5V5H19Z'
});

export const SvgCheckboxChecked = ({className, color}) => render({
    className, color,
    size: [24, 24],
    path: 'M10,17L5,12L6.41,10.58L10,14.17L17.59,6.58L19,8M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3Z'
});

export const SvgCheckboxIntermediate = ({className, color}) => render({
    className, color,
    size: [24, 24],
    path: 'M12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3Z'
});

export const SvgLoading = ({className, color}) => render({
    className: configClassName(className, style.loading),
    color,
    size: [24, 24],
    path: 'M12,6V9L16,5L12,1V4A8,8 0 0,0 4,12C4,13.57 4.46,15.03 5.24,16.26L6.7,14.8C6.25,13.97 6,13 6,12A6,6 0 0,1 12,6M18.76,7.74L17.3,9.2C17.74,10.04 18,11 18,12A6,6 0 0,1 12,18V15L8,19L12,23V20A8,8 0 0,0 20,12C20,10.43 19.54,8.97 18.76,7.74Z'
});

export const SvgDot = ({className, color}) => render({
    className, color,
    size: [24, 24],
    path: 'M12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9Z'
});
