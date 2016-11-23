import React, {Component} from 'react';
import style from './buildCssMap';

export default class Examples extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={style.main}>
                Examples
            </div>
        );
    }
}
