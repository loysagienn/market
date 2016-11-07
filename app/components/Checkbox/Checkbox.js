import React from 'react';
import style from './buildCssMap';
import {configClassName} from '../../common/helpers';
import {SvgCheckboxChecked, SvgCheckboxIntermediate, SvgCheckboxUnchecked} from '../';

const themes = {
    default: style.themeDefault,
    white: style.themeWhite
};

export default function Checkbox({checked, intermediate, className, theme = 'default', onClick = () => null}) {
    return (
        <div
            className={configClassName(style.main, className, themes[theme] || themes.default)}
            onClick={onClick}
        >
            {renderCheckbox(checked, intermediate)}
        </div>
    )
}

function renderCheckbox(checked, intermediate) {
    if (checked) {
        return (
            <SvgCheckboxChecked className={style.checkboxSvg} />
        );
    }

    if (intermediate) {
        return (
            <SvgCheckboxIntermediate className={style.checkboxSvg} />
        );
    }

    return (
        <SvgCheckboxUnchecked className={style.checkboxSvg} />
    );
}
