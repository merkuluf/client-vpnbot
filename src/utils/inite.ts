import WebApp from '@twa-dev/sdk'
import { color } from './settings'
import { ENV } from './BASE'

export default function init() {
    WebApp.setHeaderColor(color.background)
    WebApp.setBackgroundColor(color.background)
    WebApp.expand()
    WebApp.enableClosingConfirmation()
    WebApp.disableVerticalSwipes()
    console.log(ENV)
}
