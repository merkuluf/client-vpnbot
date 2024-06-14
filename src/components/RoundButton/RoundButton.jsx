import React from 'react'
import './roundbutton.scss'
import { WebApp, impactStyle, notificationStyle } from '../../utils/settings'

function RoundButton({
    haptic = notificationStyle.warning,
    children,
    icon,
    onClick,
    ...props
}) {
    function onRoundButtonClick() {
        WebApp.HapticFeedback.notificationOccurred(haptic)
        if (onClick) {
            onClick()
        }
    }

    return (
        <button
            onClick={onRoundButtonClick}
            className='round-button'
            {...props}
        >
            {children}
            {icon
                ? React.cloneElement(icon, { className: 'round-button__icon' })
                : null}
        </button>
    )
}

export default RoundButton
