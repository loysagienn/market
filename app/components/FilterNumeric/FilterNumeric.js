import React, {Component, PropTypes} from 'react';
import style from './buildCssMap';
import {configClassName} from '../../common/helpers';
import {Input, BilateralSlider} from '../'


export default class FilterNumeric extends Component {
    constructor(props) {
        super(props);
        this._sliderValue = null;
    }

    _onChange(valueStart, valueEnd) {
        this._sliderValue = [valueStart, valueEnd];

        this.forceUpdate();
    }

    _routeToFilter() {
        if (this._sliderValue === null) {
            return;
        }

        let {filter: {minValue, maxValue}} = this.props;
        let [valueStart, valueEnd] = this._sliderValue;

        let value;

        if (valueStart === +minValue && valueEnd === +maxValue) {
            value = null;
        } else {
            value = this._sliderValue.join(',');
        }

        const {filter: {key}, routeToFilter} = this.props;

        this._sliderValue = null;

        routeToFilter({[key]: value || null});
    }

    render() {
        let {filter: {key, name, minValue, maxValue}, selected, routeToFilter} = this.props;

        minValue = +minValue;
        maxValue = +maxValue;

        let [valueStart, valueEnd] = this._sliderValue || (selected ? selected.split(',') : [minValue, maxValue]);

        valueStart = +valueStart;
        valueEnd = +valueEnd;

        return (
            <div className={configClassName(style.filter)}>
                <div className={style.name}>
                    {name.charAt(0).toUpperCase() + name.slice(1)}
                </div>
                <div className={style.control}>
                    <div className={style.inputs}>
                        <Input
                            type='number'
                            minValue={minValue}
                            maxValue={valueEnd}
                            value={valueStart}
                            onChange={value => this._onChange(value, valueEnd)}
                            className={style.input}
                            onBlur={event => this._routeToFilter()}
                        />
                        <Input
                            type='number'
                            minValue={valueStart}
                            maxValue={maxValue}
                            value={valueEnd}
                            onChange={value => this._onChange(valueStart, value)}
                            className={style.input}
                            onBlur={event => this._routeToFilter()}
                        />
                    </div>
                    <BilateralSlider
                        className={style.slider}
                        minValue={minValue}
                        maxValue={maxValue}
                        valueStart={valueStart}
                        valueEnd={valueEnd}
                        onMove={({valueStart, valueEnd}) => this._onChange(valueStart, valueEnd)}
                        onChange={value => this._routeToFilter()}
                    />
                </div>
            </div>
        )
    }
}

FilterNumeric.propTypes = {
    filter: PropTypes.object,
    selected: PropTypes.string,
    routeToFilter: PropTypes.func
};
