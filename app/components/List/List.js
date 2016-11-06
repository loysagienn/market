import React from 'react';
import style from './buildCssMap';
import {configClassName} from '../../common/helpers';
import {SvgArrowRight, SvgDot} from '../';


export default function ({items, delimiterType, routeTo}) {

    return (
        <div
            className={style.main}
        >
            {renderItems(items, delimiterType, routeTo)}
        </div>
    )
}

function renderItems(items, delimiterType, routeTo) {

    const lastInxex = items.length - 1;

    return (
        <div className={style.items}>
            {
                items.reduceRight((arr, item, index) =>
                    arr.concat(renderItem(item, index < lastInxex, delimiterType, routeTo)), [])
            }
        </div>
    )

}

function renderItem({id, name}, needDelimiter, delimiterType, routeTo) {

    return (
        <div
            className={style.item}
            key={id}
        >
            {needDelimiter ? renderDelimiter(delimiterType) : null}
            <div
                className={style.name}
                onClick={event => routeTo(id)}
            >
                {name}
            </div>
        </div>
    );
}

function renderDelimiter(delimiterType) {

    let delimiterComponent = SvgDot;

    switch (delimiterType) {
        case 'arrow':
            delimiterComponent = SvgArrowRight;
            break;
    }

    return (
        <div className={style.delimiter}>
            {delimiterComponent({className: style.delimiterSvg})}
        </div>
    )
}
