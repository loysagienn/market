import React, {PropTypes} from 'react';
import {configClassName} from '../../common/helpers';
import style from './buildCssMap';

export default function RadioButton({className, buttons, onClick}) {
    return (
        <div className={configClassName(className, style.main)}>
            {
                buttons.map(button => renderButton(button, onClick))
            }
        </div>
    );
}

function renderButton({text, id, checked}, onClick) {
    return (
        <div
            key={id}
            className={configClassName(style.button, {[style.checked]: checked})}
            onClick={event => onClick(event, id)}
        >
            {text}
        </div>
    );
}

// RadioButton.propTypes = {
//     className: PropTypes.string,
//     buttons: PropTypes.array.required,
//     onClick: PropTypes.func.required
// };
