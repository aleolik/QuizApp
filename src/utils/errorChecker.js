const ErrorChecker = (e=undefined) => {
    const defaultMessage = 'Unknown Error!'
    if (e instanceof Error && e.message) return e.message
    return defaultMessage
}

export default ErrorChecker