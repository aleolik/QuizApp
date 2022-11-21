export const ErrorChecker = (e='') => {
    const defaultMessage = 'Unknown Error!'
    if (e instanceof Error && e.message) return e.message
    return defaultMessage
}