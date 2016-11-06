import React from 'react';
import style from './buildCssMap';



export default function() {
    return (
        <div
            className={style.main}
        >
            <div className={style.code}>404</div>
            <div className={style.text}>Страница не найдена</div>
        </div>
    )
}
