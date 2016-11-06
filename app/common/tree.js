
export function getSelectedTree(itemId, itemsMap) {

    if (itemId === null || !(itemId in itemsMap)) {
        return [];
    }

    const item = itemsMap[itemId];

    return getSelectedTree(item.parentId, itemsMap).concat(item);
}

export function getSelectedTreeChildren(selectedItems, itemsMap) {

    const lastIndex = selectedItems.length - 1;

    return selectedItems.reduce((children, {childrenIds, childrenCount}, index) => {
        if (childrenCount === 0) {
            return children;
        }

        const activeChildId = index === lastIndex ? null : selectedItems[index + 1].id;

        const items = childrenIds.map(
            id => id === activeChildId
                ? Object.assign({}, itemsMap[id], {isActive: true})
                : itemsMap[id]
        );

        const notLoaded = childrenIds.length < childrenCount;

        return children.concat({items, notLoaded});
    }, []);
}

export function addItems(itemsMap, items, noParentItems) {
    items.forEach(item => addItem(itemsMap, item, noParentItems));

    checkNoParentItems(itemsMap, noParentItems);
}


function addItem(itemsMap, item, noParentItems) {
    const {id, parentId} = item;

    if (!(id in itemsMap)) {

        itemsMap[id] = Object.assign(createNewItem(id), item);

        updateParentForItem(itemsMap, id, parentId, noParentItems);

    } else {

        itemsMap[id] = Object.assign({}, itemsMap[id], item);

    }
}

function createNewItem() {
    return {
        childrenIds: [],
        childrenLoaded: false
    };
}

function updateParentForItem(itemsMap, itemId, parentId, noParentItems) {

    if (parentId in itemsMap) {

        const parentItem = Object.assign({}, itemsMap[parentId]);

        parentItem.childrenIds.push(itemId);

        if (parentItem.childrenIds.length === parentItem.childrenCount) {
            parentItem.childrenLoaded = true;
        }

        itemsMap[parentId] = parentItem;

    } else {

        noParentItems.add(itemId);

    }
}

function checkNoParentItems(itemsMap, noParentItems) {
    noParentItems.forEach(itemId => {

        const {parentId} = itemsMap[itemId];

        if (parentId in itemsMap) {

            updateParentForItem(itemsMap, itemId, parentId, noParentItems);

            noParentItems.delete(itemId);
        }

    });
}
