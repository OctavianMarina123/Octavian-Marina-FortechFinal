export const setUsernameSignUp = (usernameSignUp:string) => ({
    type: "setUsernameSignUp",
    payload: {
        usernameSignUp,
    },
});

export const setPasswordSignUp = (passwordSignUp:string) => ({
    type: "setPasswordSignUp",
    payload: {
        passwordSignUp,
    }
});

export const setConfirmPassword = (confirmPassword:string) => ({
    type: "setConfirmPassword",
    payload: {
        confirmPassword,
    }
});

