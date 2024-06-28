import React, { ReactNode } from 'react'
import { Button } from 'antd'
//@ts-ignore
import { WebApp, impactStyle } from '@utils/settings'
import './webappbutton.scss'

interface WebAppButtonProps {
    children?: ReactNode
    onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void
    primary?: boolean
    className?: string
    childrenEvent: boolean
    block?: boolean
    circle?: boolean
    danger?: boolean
    confirm?: boolean
    haptic?: string
}

const WebAppButton: React.FC<WebAppButtonProps> = ({
    children,
    childrenEvent = true,
    onClick,
    primary = false,
    className,
    block = true,
    circle = false,
    danger,
    confirm,
    haptic = impactStyle.medium,
    ...props
}) => {
    function onWebAppButtonClick(e: React.MouseEvent<HTMLButtonElement>) {
        //@ts-ignore
        WebApp.HapticFeedback.impactOccurred(haptic)
        if (onClick) {
            onClick(e)
        }
    }
    return (
        <Button
            block={circle ? false : block}
            size="large"
            shape={circle ? 'circle' : 'default'}
            type="primary"
            iconPosition="start"
            className={`${className} webapp-button ${danger ? 'danger-button' : confirm ? 'confirm-button' : ''} ${
                childrenEvent ? 'no-children-click' : ''
            }`}
            onClick={onWebAppButtonClick}
            {...props}
        >
            {children}
        </Button>
    )
}

export default WebAppButton
