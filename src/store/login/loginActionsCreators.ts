export const setUsername = (username:string) => ({
    type: "setUsername",
    payload: {
        username,
    },
});

export const setPassword = (password:string) => ({
    type: "setPassword",
    payload: {
        password,
    }
});
