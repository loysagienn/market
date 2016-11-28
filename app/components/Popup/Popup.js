import React, {PropTypes} from 'react';
import style from './buildCssMap';
import {configClassName} from '../../common/helpers';
import {ShowHide} from '../';

function Popup({children, className, onClick, animationType, position = 'bottom left'}) {

    className = configClassName(style.main, className, getPositionClassName(position));

    if (animationType) {
        return (
            <ShowHide className={className} onClick={onClick} animationType={animationType}>
                {children}
            </ShowHide>
        )
    }

    return (
        <div className={className} onClick={onClick}>
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

Popup.propTypes = {
    className: PropTypes.string,
    animationType: ShowHide.propTypes.animationType,
    onClick: PropTypes.func,
    position: PropTypes.string
};

export default Popup;
