import React from 'react'
import { Button } from 'antd'
import { WebApp, impactStyle } from '@utils/settings'
import './webappbutton.scss'

function WebAppButton({
    children,
    onClick,
    primary = false,
    className,
    block = true,
    circle = false,
    danger,
    confirm,
    haptic = impactStyle.medium,
    ...props
}) {
    function onWebAppButtonClick() {
        WebApp.HapticFeedback.impactOccurred(haptic)
        if (onClick) {
            onClick()
        }
    }
    return (
        <Button
            block={circle ? false : block}
            size='large'
            shape={circle ? 'circle' : 'default'}
            type='primary'
            iconPosition='start'
            className={`${className} webapp-button ${
                danger ? 'danger-button' : confirm ? 'confirm-button' : ''
            }`}
            onClick={onWebAppButtonClick}
            {...props}
        >
            {children}
        </Button>
    )
}

export default WebAppButton
