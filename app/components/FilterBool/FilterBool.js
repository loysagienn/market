import React, {Component, PropTypes} from 'react';
import style from './buildCssMap';
import {RadioButton} from '../'

const buttonStates = {
    noMatter: 'noMatter',
    checked: 'checked',
    unChecked: 'unChecked'
};

const selectedStates = {
    noMatter: null,
    checked: 'true',
    unChecked: 'false'
};

export default class FilterNumeric extends Component {
    constructor(props) {
        super(props);

        this._onClickHandler = event => this._onClick(event);
        this._onChangeHandler = (event, id) => this._onChange(event, id);
    }

    _onClick(event) {
        const {filter: {key}, routeToFilter, selected} = this.props;

        routeToFilter({[key]: !selected || null})
    }

    _onChange(event, id) {
        const {filter: {key}, routeToFilter} = this.props;

        routeToFilter({[key]: selectedStates[id]})
    }

    render() {
        let {selected} = this.props;

        const checked = selected === selectedStates.checked;
        const unChecked = selected === selectedStates.unChecked;

        return (
            <div className={style.main}>
                <RadioButton
                    buttons={[
                        {text: 'Неважно', id: buttonStates.noMatter, checked: !checked && !unChecked},
                        {text: 'Да', id: buttonStates.checked, checked: checked},
                        {text: 'Нет', id: buttonStates.unChecked, checked: unChecked}
                    ]}
                    onClick={this._onChangeHandler}
                />
            </div>
        )
    }
}

FilterNumeric.propTypes = {
    filter: PropTypes.object,
    selected: PropTypes.string,
    routeToFilter: PropTypes.func
};
