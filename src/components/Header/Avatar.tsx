import React from 'react'
import './header.scss'
// @ts-ignore
import dflt from '@static/jpg/default.jpg'

interface AvatarProps {
    src?: string
    alt?: string | undefined
}

const Avatar: React.FC<AvatarProps> = ({ src, alt }) => {
    return (
        <img
            className="user-header__user-avatar"
            src={src ? src : dflt}
            alt={alt}
        />
    )
}

export default Avatar
