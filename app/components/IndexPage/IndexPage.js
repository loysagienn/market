import React from 'react';
import style from './buildCssMap';


export default function() {
    return (
        <div className={style.main}>
            <p>Это экспериментальное приложение для поиска товаров на Яндекс.Маркете</p>
            <p>Работает на основе Контентного API маркета</p>
        </div>
    )
}
