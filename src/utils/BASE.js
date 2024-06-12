const ENV = import.meta.env.VITE_ENVIRONMENT

const URL =
    ENV === 'developement'
        ? 'https://api.dev.frankly.site'
        : 'https://api.frankly.site'

const ADM_URL = URL + '/admin'

export { URL, ADM_URL }
