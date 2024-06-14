import React from 'react'
import './webapptextarea.scss'

function WebAppTextarea({ placeholder = 'Комментарий', ...props }) {
    return (
        <textarea
            className='webapp-textarea'
            placeholder={placeholder}
            {...props}
        />
    )
}

export default WebAppTextarea
