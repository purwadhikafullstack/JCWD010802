const headersGen = (token) => {
    const headers = {
        Authorization: `Bearer ${token}`
    }
    return headers
}

export default headersGen