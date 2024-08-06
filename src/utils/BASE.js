const ENV = import.meta.env.VITE_ENVIRONMENT

const URL = ENV === 'developement' ? 'https://dev.api.bitra.ge' : 'https://api.bitra.ge'

const ADM_URL = URL + '/admin'

export { URL, ADM_URL }
