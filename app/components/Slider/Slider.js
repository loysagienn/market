import React, {PropTypes, Component} from 'react';
import {BilateralSlider} from '../';

export default function Slider ({className, minValue, maxValue, value, onMove, onChange, roundingPrecision}) {
    return (
        <BilateralSlider
            className={className}
            minValue={minValue}
            maxValue={maxValue}
            valueStart={minValue}
            valueEnd={value}
            preventEditStart={true}
            onMove={({valueEnd}) => onMove(valueEnd)}
            onChange={({valueEnd}) => onChange(valueEnd)}
            roundingPrecision={roundingPrecision}
        />
    );
}

Slider.propTypes = {
    className: PropTypes.string,
    minValue: PropTypes.number,
    maxValue: PropTypes.number,
    value: PropTypes.number,
    onMove: PropTypes.func,
    onChange: PropTypes.func,
    roundingPrecision: PropTypes.number
};
