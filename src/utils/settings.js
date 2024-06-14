export const isTelegram = window.Telegram.WebApp.platform !== 'unknown'

let WebApp, telegramId, telegramUser, theme

if (isTelegram) {
    WebApp = window.Telegram.WebApp
    telegramId = WebApp.initDataUnsafe.user.id.toString()
    telegramUser = WebApp.initDataUnsafe.user
    theme = WebApp.themeParams
}

export { WebApp, telegramId, telegramUser, theme }

export const color = {
    background: '#070a07',
    background_light: '#152115',
    text: '#fafafa',
    primary: '#1aa64b',
    secondary: '#14ab3f',
    destructive: '#ab2314',
    grey_text: '#909090',
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
