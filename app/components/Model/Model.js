import React, {Component} from 'react';
import style from './buildCssMap';


export default class Model extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        const {name} = this.props.model;

        return (
            <div className={style.main}>
                {name}
            </div>
        )
    }
}
