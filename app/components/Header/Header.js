import React, {Component} from 'react';
import style from './buildCssMap';
import {CategoriesTree, SvgMenu, Tile, ShowHide, Focusable} from '../';


export default class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            menuVisible: false
        }
    }

    _showMenu() {
        this.setState({menuVisible: true});
    }

    _hideMenu() {
        this.setState({menuVisible: false});
    }

    render() {

        return (
            <div className={style.main}>
                <div className={style.categories}>
                    <CategoriesTree/>
                </div>
                {this._renderMenuBtn()}
                <ShowHide className={style.menu}>
                    {this._renderMenu()}
                </ShowHide>
            </div>
        )
    }

    _renderMenu() {

        if (!this.state.menuVisible) {
            return null;
        }

        const {routeTo} = this.props;

        return (
            <Tile className={style.menuTile}>
                <a
                    className={style.menuItem}
                    href="https://github.com/loysagienn/market"
                    target="_blank"
                >
                    Github
                </a>
                <div
                    className={style.menuItem}
                    onMouseDown={event => routeTo({path: '/settings'})}
                >
                    Настройки
                </div>
            </Tile>
        )
    }

    _renderMenuBtn() {

        return (
            <Focusable
                focusGroup="global"
                className={style.menuBtn}
                onFocus={event => this._showMenu()}
                onBlur={event => this._hideMenu()}
            >
                <SvgMenu className={style.menuBtnSvg}/>
            </Focusable>
        )
    }
}
