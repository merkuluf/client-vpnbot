import React from 'react'
import './webapptextarea.scss'

function WebAppTextarea({ placeholder = 'Комментарий', _ref, ...props }) {
    return (
        <textarea
            className='webapp-textarea'
            placeholder={placeholder}
            {...props}
            ref={_ref}
        />
    )
}

export default WebAppTextarea
