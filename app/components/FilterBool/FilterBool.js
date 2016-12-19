import React, {Component, PropTypes} from 'react';
import style from './buildCssMap';
import {Checkbox} from '../'


export default class FilterNumeric extends Component {
    constructor(props) {
        super(props);

        this._onClickHandler = event => this._onClick(event);
    }

    _onClick(event) {
        const {filter: {key}, routeToFilter, selected} = this.props;

        routeToFilter({[key]: !selected || null})
    }

    render() {
        let {selected} = this.props;


        return (
            <div
                className={style.main}
                onClick={this._onClickHandler}
            >
                <Checkbox
                    checked={selected}
                    className={style.checkbox}
                />
                Да
            </div>
        )
    }
}

FilterNumeric.propTypes = {
    filter: PropTypes.object,
    selected: PropTypes.string,
    routeToFilter: PropTypes.func
};
