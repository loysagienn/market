import React, {Component} from 'react';
import style from './buildCssMap';
import {Tile, BilateralSlider, Slider, Input} from '../';

export default class Examples extends Component {
    constructor(props) {
        super(props);
        this.state = {
            valueStart: 2,
            valueEnd: 20
        }
    }

    componentDidMount() {
        this._input.focus();
    }

    render() {
        return (
            <div className={style.main}>
                <Tile className={style.sliderTile}>
                    <BilateralSlider
                        minValue={2}
                        maxValue={30}
                        valueStart={this.state.valueStart}
                        valueEnd={this.state.valueEnd}
                        onMove={event => console.log('onMove', event)}
                        onChange={({valueStart, valueEnd}) => {console.log('onChange', valueStart, valueEnd); this.setState({valueStart, valueEnd})}}
                        roundingPrecision={0}
                    />
                </Tile>
                <Tile className={style.sliderTile}>
                    <Slider
                        minValue={2}
                        maxValue={30}
                        value={15}
                        onMove={event => console.log('onMove', event)}
                        onChange={event => console.log('onChange', event)}
                    />
                </Tile>
                <div className={style.input}>
                    <Input
                        ref={input => this._input = input}
                    />
                </div>
            </div>
        );
    }
}
