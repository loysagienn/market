import React, {Component} from 'react';
import style from './buildCssMap';
import {configClassName} from '../../common/helpers';
import {Tree, ShowHide, List, SvgLoading, Button, SvgArrowLeft} from '../';
import {createLogger} from '../../common/logger';
import {getSelectedTree, getSelectedTreeChildren} from '../../common/tree';

const log = createLogger(module);

export default class CategoriesTree extends Component {

    constructor(props) {
        super(props);
        this._treeOpened = false;
    }

    _showTree() {
        if (this._treeOpened) {
            return;
        }

        this._loadFocusedCategoryChildren();

        this._treeOpened = true;
        this.forceUpdate();
    }

    _loadFocusedCategoryChildren() {
        const {categoriesMap, focusedCategoryId, focusToCategory} = this.props;

        const focusedCategory = categoriesMap[focusedCategoryId];

        if (focusedCategory && focusedCategory.childrenCount > 0 && !focusedCategory.childrenLoaded) {
            focusToCategory(focusedCategoryId);
        }
    }

    _hideTree() {
        if (!this._treeOpened) {
            return;
        }

        this._treeOpened = false;
        this.forceUpdate();
    }

    _routeToFocused() {
        const {focusedCategoryId, filterCategoryId} = this.props;

        if (focusedCategoryId !== null && focusedCategoryId !== filterCategoryId) {
            this._routeToCategory(focusedCategoryId);
        } else {
            this._mainNode.blur();
        }
    }

    _routeToCategory(categoryId) {
        this._treeOpened = false;
        this._mainNode.blur();

        const {routeTo} = this.props;

        routeTo(categoryId);
    }

    _clearFocused() {
        this._mainNode.blur();

        const {focusToCategory, focusedCategoryId} = this.props;

        if (focusedCategoryId !== null) {
            focusToCategory(null);
        }
    }

    render() {

        const {filterCategoryId, categoriesMap, focusedCategoryId} = this.props;
        const treeOpened = this._treeOpened;

        const activeCategoryId = focusedCategoryId || filterCategoryId;

        const activeCategories = getSelectedTree(treeOpened ? activeCategoryId : filterCategoryId, categoriesMap);

        const columns = getSelectedTreeChildren(
            getSelectedTree(activeCategoryId, categoriesMap),
            categoriesMap
        );

        return (
            <div
                className={configClassName(style.main, {[style.treeOpened]: treeOpened})}
                tabIndex="0"
                onFocus={() => this._showTree()}
                onBlur={() => this._hideTree()}
                ref={ref => this._mainNode = ref}
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

        const {focusedCategoryId, filterCategoryId} = this.props;

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

        if (!this._treeOpened) {
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

        if (activeItems.length > 0) {
            return (
                <List
                    items={activeItems}
                    delimiterType="arrow"
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
