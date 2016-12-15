import React, {PropTypes, Component} from 'react';
import style from './buildCssMap';
import {configClassName} from '../../common/helpers';

const dragSides = {
    start: 'start',
    end: 'end'
};

export default class BilateralSlider extends Component {
    constructor(props) {
        super(props);

        this._dragSide = null;
        this._dragPosition = null;
        this._dragValue = {};
        this._onDragHandler = event => this._onDrag(event);
        this._onDragEndHandler = event => this._onDragEnd(event);
        this._needForceUpdate = false;
        this._roundingFactor = 1;
        this._updateRoundingFactor(props);
    }

    componentWillReceiveProps(newProps) {
        this._updateRoundingFactor(newProps);
    }

    _updateRoundingFactor(props) {

        let roundingFactor = 1;

        if (props.roundingPrecision) {
            let roundingPrecision = props.roundingPrecision;

            while (roundingPrecision-- > 0) roundingFactor = roundingFactor * 10;
            while (roundingPrecision++ < 0) roundingFactor = roundingFactor * 0.1;
        } else {
            const {minValue = 0, maxValue} = this.props;

            let valuesSpace = maxValue - minValue;

            if (valuesSpace < 100) {
                while (valuesSpace < 100) {
                    roundingFactor = roundingFactor * 10;
                    valuesSpace = valuesSpace * 10;
                }
            } else if (valuesSpace > 1000) {
                while (valuesSpace > 1000) {
                    roundingFactor = roundingFactor * 0.1;
                    valuesSpace = valuesSpace * 0.1;
                }
            }
        }

        this._roundingFactor = roundingFactor;
    }

    _onDragStart(event, side) {

        event.preventDefault();

        window.addEventListener('mousemove', this._onDragHandler);
        window.addEventListener('mouseup', this._onDragEndHandler);
        window.addEventListener('touchmove', this._onDragHandler);
        window.addEventListener('touchend', this._onDragEndHandler);

        const {minValue = 0, maxValue} = this.props;
        const {valueStart = minValue, valueEnd = maxValue} = this.props;
        const {trackWidth} = this;

        this._dragSide = side;
        this._dragPosition = {
            start: this._getDragPositionPx(valueStart, trackWidth),
            end: this._getDragPositionPx(valueEnd, trackWidth)
        };
    }

    _onDrag(event) {

        event.preventDefault();
        const {trackWidth} = this;

        const {clientX} = event.touches ? event.touches[0] : event;

        const left = Math.round(clientX - this._trackNode.getBoundingClientRect().left);
        this._updateDragPosition(left, trackWidth);

        const dragPosition = this._dragPosition;

        this._needForceUpdate = true;

        const {onMove} = this.props;

        if (onMove) {
            const newDragValue = {
                valueStart: this._getValue(dragPosition.start, trackWidth),
                valueEnd: this._getValue(dragPosition.end, trackWidth)
            };
            const dragValue = this._dragValue;

            if (dragValue.valueStart !== newDragValue.valueStart || dragValue.valueEnd !== newDragValue.valueEnd) {
                this._dragValue = newDragValue;
                onMove(newDragValue)
            }
        }

        if (this._needForceUpdate) {
            this.forceUpdate();
        }
    }

    _onDragEnd(event) {

        event.preventDefault();

        window.removeEventListener('mousemove', this._onDragHandler);
        window.removeEventListener('mouseup', this._onDragEndHandler);
        window.removeEventListener('touchmove', this._onDragHandler);
        window.removeEventListener('touchend', this._onDragEndHandler);

        const {trackWidth} = this;
        const dragPosition = this._dragPosition;

        this._dragSide = null;
        this._dragPosition = null;
        this._dragValue = {};

        this._needForceUpdate = true;

        const {onChange} = this.props;

        if (onChange) {
            onChange({
                valueStart: this._getValue(dragPosition.start, trackWidth),
                valueEnd: this._getValue(dragPosition.end, trackWidth)
            });
        }

        if (this._needForceUpdate) {
            this.forceUpdate();
        }
    }

    _updateDragPosition(left, trackWidth) {
        const dragPosition = this._dragPosition;
        const newPosition = Math.min(Math.max(left, 0), trackWidth);

        if (this._dragSide === dragSides.start) {
            if (newPosition > dragPosition.end) {
                this._dragSide = dragSides.end;
                dragPosition.start = dragPosition.end;
                dragPosition.end = newPosition;
            } else {
                dragPosition.start = newPosition;
            }
        } else {
            if (newPosition < dragPosition.start) {
                this._dragSide = dragSides.start;
                dragPosition.end = dragPosition.start;
                dragPosition.start = newPosition;
            } else {
                dragPosition.end = newPosition;
            }
        }
    }

    _getValue(position, trackWidth) {

        const {minValue = 0, maxValue} = this.props;

        if (position === 0) {
            return minValue;
        }

        if (position === trackWidth) {
            return maxValue;
        }

        let value = (position / trackWidth) * (maxValue - minValue) + minValue;

        const roundingFactor = this._roundingFactor;

        value = Math.round(value * roundingFactor) / roundingFactor;

        // долбаная математика в javascript
        if (roundingFactor < 1) {
            value = Math.round(value);
        }

        return Math.max(Math.min(value, maxValue), minValue);
    }

    _getDragPositionPx(value, trackWidth) {
        const {minValue = 0, maxValue} = this.props;

        return (value - minValue) / (maxValue - minValue) * trackWidth;
    }

    _getDragPositionPercent(value) {
        const {minValue = 0, maxValue} = this.props;

        return (value - minValue) / (maxValue - minValue) * 100;
    }

    render() {

        this._needForceUpdate = false;

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

        const dragSide = this._dragSide;
        let dragPosition;

        if (this._dragPosition) {
            dragPosition = {
                start: this._dragPosition.start + 'px',
                end: this._dragPosition.end + 'px',
                endRight: this.trackWidth - this._dragPosition.end + 'px'
            }
        } else {
            const {minValue = 0, maxValue} = this.props;
            const {valueStart = minValue, valueEnd = maxValue} = this.props;
            const start = this._getDragPositionPercent(valueStart);
            const end = this._getDragPositionPercent(valueEnd);

            dragPosition = {
                start: start + '%',
                end: end + '%',
                endRight: 100 - end + '%'
            }
        }

        return (
            <div className={style.slider}>
                <div
                    className={
                        configClassName(
                            style.filled,
                            {
                                [style.filledActive]: dragSide !== null
                            }
                        )
                    }
                    style={{
                        left: dragPosition.start,
                        right: dragPosition.endRight
                    }}
                />
                <div
                    className={style.track}
                    ref={trackNode => this._trackNode = trackNode}
                >
                    {this._renderBtnStart(dragPosition)}
                    {this._renderBtnEnd(dragPosition)}
                </div>
            </div>
        )
    }

    _renderBtnStart(dragPosition) {
        if (this.props.preventEditStart) {
            return null;
        }

        const dragSide = this._dragSide;

        return (
            <div
                className={
                    configClassName(
                        style.button,
                        {
                            [style.buttonActive]: dragSide !== null,
                            [style.buttonNotActive]: dragSide === null
                        }
                    )
                }
                onMouseDown={event => this._onDragStart(event, dragSides.start)}
                onTouchStart={event => this._onDragStart(event, dragSides.start)}
                style={{
                    left: dragPosition.start
                }}
            />
        );
    }

    _renderBtnEnd(dragPosition) {
        if (this.props.preventEditEnd) {
            return null;
        }

        const dragSide = this._dragSide;

        return (
            <div
                className={
                    configClassName(
                        style.button,
                        {
                            [style.buttonActive]: dragSide !== null,
                            [style.buttonNotActive]: dragSide === null
                        }
                    )
                }
                onMouseDown={event => this._onDragStart(event, dragSides.end)}
                onTouchStart={event => this._onDragStart(event, dragSides.end)}
                style={{
                    left: dragPosition.end
                }}
            />
        );
    }

    get trackWidth() {
        return this._trackNode ? Math.round(this._trackNode.offsetWidth) : 0;
    }
}

BilateralSlider.propTypes = {
    className: PropTypes.string,
    minValue: PropTypes.number, // минимально возможное значение
    maxValue: PropTypes.number.isRequired, // максимально возможное значение
    valueStart: PropTypes.number, // начальное значение
    valueEnd: PropTypes.number, // конечное значение
    preventEditStart: PropTypes.bool, // отменить редактирование начального значения
    preventEditEnd: PropTypes.bool, // отменить редактирование конеченого значения
    onMove: PropTypes.func, // срабатывает при перетаскивании слайдера
    onChange: PropTypes.func, // срабатывает при отпускании слайдера
    roundingPrecision: PropTypes.number // количество знаков после запятой, до которых будет округляться значение
};
