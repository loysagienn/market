import React, {Component} from 'react';
import style from './buildCssMap';
import {configClassName} from '../../common/helpers';
import {Tree, ShowHide, List, SvgLoading, Button, SvgArrowLeft} from '../';
import {createLogger} from '../../common/logger';
import {getSelectedTree, getSelectedTreeChildren} from '../../common/tree';

const log = createLogger(module);

const TOGGLE_TREE_TIMEOUT = 300;

export default class CategoriesTree extends Component {

    constructor(props) {
        super(props);
        this.state = {
            treeOpened: false
        };

        this._onMouseEnterHandler = event => this._onMouseEnter(event);
        this._onMouseLeaveHandler = event => this._onMouseLeave(event);
        this._onClickHandler = event => this._onClick(event);

        this._showTreeTimeout = null;
        this._hideTreeTimeout = null;
    }

    _clearToggleTimeouts() {
        if (this._showTreeTimeout !== null) {
            clearTimeout(this._showTreeTimeout);

            this._showTreeTimeout = null;
        }
        if (this._hideTreeTimeout !== null) {
            clearTimeout(this._hideTreeTimeout);

            this._hideTreeTimeout = null;
        }
    }

    _showTree(timeout) {

        if (!timeout) {
            this._clearToggleTimeouts();

            return this.setState({treeOpened: true});
        }

        if (this._hideTreeTimeout !== null) {
            clearTimeout(this._hideTreeTimeout);

            this._hideTreeTimeout = null;
        }

        if (this.state.treeOpened || this._showTreeTimeout !== null) {
            return;
        }

        const {categoriesMap, focusedCategoryId, focusToCategory} = this.props;

        const focusedCategory = categoriesMap[focusedCategoryId];

        if (focusedCategory && focusedCategory.childrenCount > 0 && !focusedCategory.childrenLoaded) {
            focusToCategory(focusedCategoryId);
        }

        this._showTreeTimeout = setTimeout(() => {
            this.setState({treeOpened: true});

            this._showTreeTimeout = null;
        }, timeout);
    }

    _hideTree(timeout) {

        if (!timeout) {
            this._clearToggleTimeouts();

            return this.setState({treeOpened: false});
        }

        if (this._showTreeTimeout !== null) {
            clearTimeout(this._showTreeTimeout);

            this._showTreeTimeout = null;
        }

        if (!this.state.treeOpened || this._hideTreeTimeout !== null) {
            return;
        }

        this._hideTreeTimeout = setTimeout(() => {
            this.setState({treeOpened: false});

            this._hideTreeTimeout = null;
        }, timeout);
    }

    _routeToFocused() {
        const {focusedCategoryId, filterCategoryId, routeTo} = this.props;

        if (focusedCategoryId !== null && focusedCategoryId !== filterCategoryId) {
            this._routeToCategory(focusedCategoryId);
        } else {
            this._hideTree();
        }
    }

    _routeToCategory(categoryId) {
        this._hideTree();

        const {routeTo} = this.props;

        routeTo(categoryId);
    }

    _clearFocused() {
        this._hideTree();

        const {focusToCategory, focusedCategoryId} = this.props;

        if (focusedCategoryId !== null) {
            focusToCategory(null);
        }
    }

    _onMouseEnter(event) {
        this._showTree(TOGGLE_TREE_TIMEOUT);
    }

    _onMouseLeave(event) {
        this._hideTree(TOGGLE_TREE_TIMEOUT);
    }

    _onClick(event) {
        if (!this.state.treeOpened) {
            this._showTree();
        }
    }

    render() {

        const {filterCategoryId, categoriesMap, focusedCategoryId} = this.props;
        const {treeOpened} = this.state;

        const activeCategoryId = focusedCategoryId || filterCategoryId;

        const activeCategories = getSelectedTree(treeOpened ? activeCategoryId : filterCategoryId, categoriesMap);

        const columns = getSelectedTreeChildren(
            getSelectedTree(activeCategoryId, categoriesMap),
            categoriesMap
        );

        return (
            <div
                className={configClassName(style.main, {[style.treeOpened]: treeOpened})}
                onMouseEnter={this._onMouseEnterHandler}
                onMouseLeave={this._onMouseLeaveHandler}
                onClick={this._onClickHandler}
                ref="mainNode"
            >

                {this._renderBackBtn(activeCategoryId)}
                <div className={style.list}>
                    {this._renderList(activeCategories)}
                </div>

                <ShowHide className={style.popup}>
                    {this._renderTree(columns)}
                </ShowHide>

            </div>
        );
    }

    _renderButtons() {

        const {focusedCategoryId, filterCategoryId, categoriesMap} = this.props;

        const disabled = focusedCategoryId === null || focusedCategoryId === filterCategoryId;

        return (
            <div className={style.buttons}>
                <Button
                    className={style.button}
                    onClick={() => this._clearFocused()}
                    theme='transparent'
                >
                    Отменить
                </Button>
                <Button
                    className={style.button}
                    onClick={() => !disabled ? this._routeToFocused() : null}
                    disabled={disabled}
                >
                    Перейти
                </Button>
            </div>
        )
    }

    _renderTree(columns) {

        if (!this.state.treeOpened) {
            return null;
        }

        const {loading, focusToCategory, categoriesMap} = this.props;

        return (
            <div>
                <Tree
                    className={style.treeComponent}
                    columns={columns}
                    loading={loading}
                    onItemSelect={id =>
                        categoriesMap[id].childrenCount > 0 ? focusToCategory(id) : this._routeToCategory(id)}
                />
                {this._renderButtons()}
            </div>
        );
    }

    _renderBackBtn(activeCategoryId) {

        const {categoriesMap} = this.props;

        const activeCategory = categoriesMap[activeCategoryId];

        if (!activeCategory) {
            return null;
        }

        const categoryId = activeCategory.parentId;

        if (!categoryId) {
            return null;
        }

        const {focusToCategory} = this.props;

        return (
            <div
                className={style.backBtn}
                onClick={() => focusToCategory(categoryId)}
            >
                <SvgArrowLeft/>
            </div>
        )
    }

    _renderList(activeItems) {

        const {focusToCategory} = this.props;

        if (activeItems.length > 0) {
            return (
                <List
                    items={activeItems}
                    delimiterType='arrow'
                    routeTo={focusToCategory}
                />
            )
        }

        if (this.props.loading) {
            return (
                <div className={style.loading}>
                    <SvgLoading/>
                </div>
            );
        }

        return (
            <div className={style.emptyPlaceholder}>
                Категории
            </div>
        );
    }
}
