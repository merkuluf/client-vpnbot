const ENV = import.meta.env.VITE_ENVIRONMENT

const URL = ENV === 'developement' ? 'https://dev.api.wast.ge' : 'https://api.wast.ge'

const ADM_URL = URL + '/admin'

export { URL, ADM_URL }
