function mockApi(delay = 1000, callback = () => {}) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve()
            callback()
        }, delay)
    })
}

export default mockApi
