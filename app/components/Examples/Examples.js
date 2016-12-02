import React, {Component} from 'react';
import style from './buildCssMap';
import {Tile, BilateralSlider} from '../';

export default class Examples extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={style.main}>
                <Tile className={style.sliderTile}>
                    <BilateralSlider
                        minValue={2}
                        maxValue={30}
                        valueStart={4}
                        valueEnd={20}
                        onMove={event => console.log('onMove', event)}
                        onChange={event => console.log('onChange', event)}
                        roundingPrecision={0}
                    />
                </Tile>
            </div>
        );
    }
}
