import WebApp from '@twa-dev/sdk'

let telegramId, telegramUser, theme

if (WebApp.platform != 'unknown') {
    telegramId = WebApp.initDataUnsafe.user?.toString()
    telegramUser = WebApp.initDataUnsafe.user
    theme = WebApp.themeParams
}

export { WebApp, telegramId, telegramUser, theme }

export const color: { [key: string]: `#${string}` } = {
    background: '#070a07',
    modal: '#aaff21',
    background_light: '#152115',
    text: '#f0f0f0',
    primary: '#1aa64b',
    primary_hover: '#18bf52',
    primary_transparent: '#18bf5247',
    secondary: '#14ab3f',
    destructive: '#ab2314',
    google: '#4285f4',
    grey_text: '#909090',
    danger: '#9a2820',
    danger_hover: '#c12b20',
}

export const sizes = {
    spacing_small: '8px',
    spacing_medium: '13px',
    spacing_large: '20px',
}

export const impactStyle = {
    light: 'light',
    medium: 'medium',
    heavy: 'heavy',
    rigid: 'rigid',
    soft: 'soft',
}
export const notificationStyle = {
    success: 'success',
    error: 'error',
    warning: 'warning',
}
