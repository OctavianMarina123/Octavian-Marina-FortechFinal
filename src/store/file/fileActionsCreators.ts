export const setFile = (acceptedFiles: any[]) => ({
    type: "setFile",
    payload: {
        acceptedFiles,
    },
});

