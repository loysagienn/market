import React, {PropTypes} from 'react';
import style from './buildCssMap';
import {configClassName} from '../../common/helpers';

function Tile({children, className, onClick, href, target, theme}) {

    className = configClassName(style.main, style[theme], className, {[style.canClick]: onClick || href});

    return href ? renderLink(className, children, href, target) : renderDiv(className, children, onClick);
}

function renderLink(className, children, href, target = '') {
    return (
        <a
            className={className}
            href={href}
            target={target}
        >
            {children}
        </a>
    )
}

function renderDiv(className, children, onClick) {
    return (
        <div
            className={className}
            onClick={onClick}
        >
            {children}
        </div>
    )
}

Tile.propTypes = {
    className: PropTypes.string,
    onClick: PropTypes.func,
    href: PropTypes.string,
    target: PropTypes.string,
    theme: PropTypes.string
};

export default Tile;
