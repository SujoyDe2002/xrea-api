export const removeLocalStorageItems = (idList) => {
    idList.map((id) => {
        localStorage.removeItem(id);
    })

}