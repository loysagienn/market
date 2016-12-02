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

    _onDragStart(event, side) {
        window.addEventListener('mousemove', this._onDragHandler);
        window.addEventListener('mouseup', this._onDragEndHandler);

        const {minValue = 0, maxValue} = this.props;
        const {valueStart = minValue, valueEnd = maxValue} = this.props;
        const {trackWidth} = this;

        this._dragSide = side;
        this._dragPosition = {
            start: this._getDragPositionPx(valueStart, trackWidth),
            end: this._getDragPositionPx(valueEnd, trackWidth)
        }
    }

    _onDrag(event) {
        const left = event.clientX - this._trackNode.getBoundingClientRect().left;
        const {trackWidth} = this;
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

        this.forceUpdate();
    }

    _onDragEnd(event) {
        window.removeEventListener('mousemove', this._onDragHandler);
        window.removeEventListener('mouseup', this._onDragEndHandler);

        this._dragSide = null;
        this._dragPosition = null;

        this.forceUpdate();
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
                style={{
                    left: dragPosition.start
                }}
            />
        );
    }

    _renderBtnEnd(dragPosition) {

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
                style={{
                    left: dragPosition.end
                }}
            />
        );
    }

    get trackWidth() {
        return this._trackNode ? this._trackNode.offsetWidth : 0;
    }

    _getDragPositionPx(value, trackWidth) {
        const {minValue = 0, maxValue} = this.props;

        return (value - minValue) / (maxValue - minValue) * trackWidth;
    }

    _getDragPositionPercent(value) {
        const {minValue = 0, maxValue} = this.props;

        return (value - minValue) / (maxValue - minValue) * 100;
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
