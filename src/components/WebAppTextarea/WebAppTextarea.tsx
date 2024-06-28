import React, { TextareaHTMLAttributes } from 'react'
import './webapptextarea.scss'

interface WebAppTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    placeholder?: string
}

const WebAppTextarea: React.FC<WebAppTextareaProps> = ({ placeholder = 'Комментарий', ...props }) => {
    return (
        <textarea
            className="webapp-textarea"
            placeholder={placeholder}
            {...props}
        />
    )
}

export default WebAppTextarea
