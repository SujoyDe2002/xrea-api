
const authHeader = () => {
    const user = getLocalStorageItem("pfc-user");

    if (user && user.token) {
        return { Authorization: 'Bearer ' + user.token };
        //   return { "x-auth-token": user.token };
    } else {
        return {};
    }
}