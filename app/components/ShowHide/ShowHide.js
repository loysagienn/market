import React, {Component, PropTypes} from 'react';
import style from './buildCssMap';
import {configClassName} from '../../common/helpers';

const visibilityStates = {
    hidden: 'hidden',
    visible: 'visible',
    hideInProcess: 'hideInProcess',
    showInProcess: 'showInProcess'
};

const animationTypes = {
    opacity: style.animationOpacity,
    height: style.animationHeight
};

class ShowHideClient extends Component {

    constructor(props) {
        super(props);

        this.state = {
            visibilityState: props.children ? visibilityStates.visible : visibilityStates.hidden
        };

        this._timeout = null;
        this._children = null;
        this._onResizeHandler = event => this._onResize(event);
    }

    componentDidMount() {
        this._checkHeight();
        window.addEventListener('resize', this._onResizeHandler);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this._onResizeHandler);
    }

    componentWillReceiveProps(nextProps) {
        var newState = this._checkVisibilityState(nextProps);

        if (newState !== null) {
            this.setState(newState);
        }
    }

    componentDidUpdate() {
        this._checkHeight();
    }

    _onResize() {
        this._checkHeight();
    }

    _checkHeight() {
        const {animationType} = this.props;

        if (animationType !== 'height') {
            return;
        }

        if (!this._mainNode) {
            return;
        }

        this._mainNode.style.height = this.state.visibilityState === visibilityStates.visible
            ? this._wrapper.offsetHeight + 'px'
            : '0px';
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
        const {className, animationType, onClick} = this.props;
        const children = this._children;
        const hidden = visibilityState === hideInProcess || visibilityState === showInProcess;

        const animationClassName = animationTypes[animationType] || animationTypes.opacity;

        return (
            <div
                ref={node => this._mainNode = node}
                onClick={onClick}
                className={configClassName(style.main, className, animationClassName, {[style.hidden]: hidden})}
            >
                <div ref={wrapper => this._wrapper = wrapper}>
                    {children}
                </div>
            </div>
        );
    }
}

function ShowHideServer({children, className, animationType, onClick}) {
    if (!children) {
        return null;
    }

    const animationClassName = animationTypes[animationType] || animationTypes.opacity;

    return (
        <div
            className={configClassName(style.main, className, animationClassName)}
            onClick={onClick}
        >
            <div>
                {children}
            </div>
        </div>
    )
}

const ShowHide = typeof window === 'undefined' ? ShowHideServer : ShowHideClient;


ShowHide.propTypes = {
    className: PropTypes.string,
    animationType: PropTypes.oneOf(Object.keys(animationTypes)),
    onClick: PropTypes.func
};

export default ShowHide;
