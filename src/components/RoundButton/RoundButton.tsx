import React, { ReactNode } from 'react'
import './roundbutton.scss'

//@ts-ignore
import { WebApp, impactStyle, notificationStyle } from '../../utils/settings'

interface RoundButtonProps {
    warning: boolean
    haptic: string
    children: ReactNode
    icon: ReactNode
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const RoundButton: React.FC<RoundButtonProps> = ({
    warning = false,
    haptic = impactStyle.medium,
    children,
    icon,
    onClick,
    ...props
}) => {
    function onRoundButtonClick(e: React.MouseEvent<HTMLButtonElement>) {
        if (warning) {
            //@ts-ignore
            WebApp.HapticFeedback.notificationOccurred(notificationStyle.warning)
        } else {
            //@ts-ignore
            WebApp.HapticFeedback.impactOccurred(haptic)
        }
        if (onClick) {
            onClick(e)
        }
    }

    return (
        <div
            //@ts-ignore
            onClick={onRoundButtonClick}
            className="round-button"
            {...props}
        >
            {children}
            {icon ? icon : null}
        </div>
    )
}

export default RoundButton
