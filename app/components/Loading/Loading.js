import React from 'react';
import style from './buildCssMap';
import {configClassName} from '../../common/helpers';
import {SvgLoading} from '../';

export default function Loading({className, svgClassName}) {
    return (
        <div className={configClassName(style.main, className)}>
            <SvgLoading className={configClassName(style.loadingSvg, svgClassName)}/>
        </div>
    )
}
