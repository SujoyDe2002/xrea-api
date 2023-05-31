export const setLocalStorageItem = (id, data) => {
    console.log("setLocalStorageItem", data);
    localStorage.setItem(id, JSON.stringify({ data }))
}

