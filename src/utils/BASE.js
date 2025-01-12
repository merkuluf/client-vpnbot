export const ENV = import.meta.env.VITE_ENVIRONMENT

const URL = ENV === 'dev' ? 'https://_api.polarcyb.org' : 'https://api.polarcyb.org'

const ADM_URL = URL + '/admin'

export { URL, ADM_URL }
