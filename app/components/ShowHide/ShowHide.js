import React, {Component} from 'react';
import style from './buildCssMap';
import {configClassName} from '../../common/helpers';

const visibilityStates = {
    hidden: 'hidden',
    visible: 'visible',
    hideInProcess: 'hideInProcess',
    showInProcess: 'showInProcess'
};

export default class ShowHide extends Component {

    constructor(props) {
        super(props);

        this.state = this._checkVisibilityState(props) || {};

        this._timeout = null;
        this._children = null;
    }

    componentWillReceiveProps(nextProps) {
        var newState = this._checkVisibilityState(nextProps);

        if (newState !== null) {
            this.setState(newState);
        }
    }

    _checkVisibilityState(props) {

        this._children = props.children || this._children || null;

        return props.children ? this._show() : this._hide();
    }

    _show() {
        const {visibilityState} = this.state || {};

        if (visibilityState === visibilityStates.visible || visibilityState === visibilityStates.showInProcess) {
            return null;
        }

        if (visibilityState === visibilityStates.hideInProcess) {
            clearTimeout(this._timeout);

            return {visibilityState: visibilityStates.visible};
        }

        this._timeout = setTimeout(() => {
            this.setState({visibilityState: visibilityStates.visible});

            this._timeout = null;
        }, 50);

        return {visibilityState: visibilityStates.showInProcess};
    }

    _hide() {
        const {visibilityState} = this.state || {};

        if (visibilityState === visibilityStates.hidden || visibilityState === visibilityStates.hideInProcess) {
            return null;
        }

        if (visibilityState === visibilityStates.showInProcess) {
            clearTimeout(this._timeout);

            return {visibilityState: visibilityStates.hidden};
        }

        if (!this._children) {
            return {visibilityState: visibilityStates.hidden};
        }

        this._timeout = setTimeout(() => {
            this.setState({visibilityState: visibilityStates.hidden});

            this._timeout = null;
        }, 300);

        return {visibilityState: visibilityStates.hideInProcess};
    }

    render() {

        const {visibilityState} = this.state;

        if (visibilityState === visibilityStates.hidden) {
            return null;
        }

        const {showInProcess, hideInProcess} = visibilityStates;
        const {className} = this.props;
        const children = this._children;
        const hidden = visibilityState === hideInProcess || visibilityState === showInProcess;

        return (
            <div
                className={configClassName(style.main, className, {[style.hidden]: hidden})}
            >
                {children}
            </div>
        );
    }
}

ShowHide.propTypes = {
    className: React.PropTypes.string
};
