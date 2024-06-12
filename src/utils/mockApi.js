function mockApi(delay = 1000, callback = () => {}) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve()
            callback()
        }, delay)
    })
}

export default mockApi
