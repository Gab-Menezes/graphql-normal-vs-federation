export const getRefreshRequest = () => {
    return fetch("http://localhost:4000/refresh_token", {
        method: "POST",
        credentials: "include"
    });
}
