import React, {Component} from 'react';
import style from './buildCssMap';

export default class Settings extends Component {
    constructor(props) {
        super(props);
    }
    render() {

        const {settings, changeSettings} = this.props;

        return (
            <div className={style.main}>
                settings
            </div>
        )
    }
}
