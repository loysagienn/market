import React from 'react';
import style from './buildCssMap';
import {configClassName} from '../../common/helpers';

const themes = {
    default: style.themeDefault,
    transparent: style.themeTransparent,
    white: style.themeWhite
};

function onClickHandler(event, onClick) {
    event.preventDefault();
    onClick(event);
}

export default ({children, onClick, className, disabled, theme}) => (
    <div
        className={configClassName(
            style.button,
            className,
            themes[theme] || themes.default,
            {[style.disabled]: disabled}
        )}
        onClick={event => onClickHandler(event, onClick)}
    >
        {children}
    </div>
);
