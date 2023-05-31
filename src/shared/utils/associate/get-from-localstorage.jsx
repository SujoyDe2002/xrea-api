export const getLocalStorageItem = (id) => {
    return JSON.parse(localStorage.getItem(id))
}