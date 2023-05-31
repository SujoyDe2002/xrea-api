import { getLocalStorageItem, setLocalStorageItem } from ".."

export const updateLocalStorage = (localStorageId, itemsObject) => {
    setLocalStorageItem(localStorageId, { ...getLocalStorageItem(localStorageId)?.data, ...itemsObject });
}