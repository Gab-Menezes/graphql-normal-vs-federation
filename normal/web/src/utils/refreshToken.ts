export const getRefreshRequest = () => {
    return fetch("http://host.docker.internal:4000/refresh_token", {
        method: "POST",
        credentials: "include"
    });
}
