import React, {Component, PropTypes} from 'react';
import style from './buildCssMap';
import {configClassName} from '../../common/helpers';
import {Input} from '../'


export default class FilterNumeric extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {filter: {key, name}, selected, updateFilter, routeToActualFilter} = this.props;

        return (
            <div className={configClassName(style.filter)}>
                <div className={style.name}>
                    {name.charAt(0).toUpperCase() + name.slice(1)}
                </div>
                <div className={style.control}>
                    <Input
                        value={selected || ''}
                        onChange={value => updateFilter({[key]: value || null})}
                        className={style.input}
                        onBlur={routeToActualFilter}
                    />
                </div>
            </div>
        )
    }
}

FilterNumeric.propTypes = {
    filter: PropTypes.object,
    selected: PropTypes.string,
    updateFilter: PropTypes.func,
    routeToActualFilter: PropTypes.func
};
