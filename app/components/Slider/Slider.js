import React, {PropTypes, Component} from 'react';
import style from './buildCssMap';
import {configClassName} from '../../common/helpers';

const dragSides = {
    start: 'start',
    end: 'end'
};

export class BilateralSlider extends Component {
    constructor(props) {
        super(props);

        this._dragSide = null;
        this._dragPosition = null;
        this._onDragHandler = event => this._onDrag(event);
        this._onDragEndHandler = event => this._onDragEnd(event);
    }

    _updateValues(props) {
        const {minValue = 0, maxValue} = props;

        if (this._moveSide === null) {
            const {valueStart = minValue, valueEnd = maxValue} = props;

            this._position = {

            }
        }
    }

    _onDragStart(event, side) {
        window.addEventListener('mousemove', this._onDragHandler);
        window.addEventListener('mouseup', this._onDragEndHandler);

        const {minValue = 0, maxValue} = props;
        const {valueStart = minValue, valueEnd = maxValue} = props;
        const {trackWidth} = this;

        this._dragSide = side;
        this._dragPosition = {
            start: (valueStart - minValue) / (maxValue - minValue) * trackWidth,
            end: (valueEnd - minValue) / (maxValue - minValue) * trackWidth
        }
    }

    _onDrag(event) {
        const left = event.clientX - this._trackNode.getBoundingClientRect().left;
    }

    _onDragEnd(event) {
        window.removeEventListener('mousemove', this._onDragHandler);
        window.removeEventListener('mouseup', this._onDragEndHandler);
    }

    render() {

        const {className} = this.props;

        return (
            <div
                className={configClassName(style.main, className)}
            >
                {this._renderSlider()}
            </div>
        );
    }

    _renderSlider() {
        return (
            <div className={style.slider}>
                <div className={style.filled}/>
                <div
                    className={style.track}
                    ref={trackNode => this._trackNode = trackNode}
                >
                    {this._renderBtnStart()}
                    {this._renderBtnEnd()}
                </div>
            </div>
        )
    }

    _renderBtnStart() {
        if (this.props.preventEditStart) {
            return null;
        }

        return (
            <div
                className={configClassName(style.button)}
                onMouseDown={event => this._onDragStart(event, dragSides.start)}
            />
        );
    }

    _renderBtnEnd() {

        return (
            <div
                className={configClassName(style.button)}
                onMouseDown={event => this._onDragStart(event, dragSides.end)}
            />
        );
    }

    get trackWidth() {
        return this._trackNode.offsetWidth;
    }
}

export default function Slider ({className, minValue, maxValue, value, onMove, onChange, roundingPrecision}) {
    return (
        <BilateralSlider
            className={className}
            minValue={minValue}
            maxValue={maxValue}
            valueStart={minValue}
            valueEnd={value}
            preventEditStart={true}
            onMove={onMove}
            onChange={onChange}
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

BilateralSlider.propTypes = {
    className: PropTypes.string,
    minValue: PropTypes.number,
    maxValue: PropTypes.number.isRequired,
    valueStart: PropTypes.number,
    valueEnd: PropTypes.number,
    preventEditStart: PropTypes.bool,
    preventEditEnd: PropTypes.bool,
    onMove: PropTypes.func,
    onChange: PropTypes.func,
    roundingPrecision: PropTypes.number
};
