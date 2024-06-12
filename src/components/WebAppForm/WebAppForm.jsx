import React from 'react'
import './webappform.scss'
import { Form } from 'antd'

function WebAppForm({ children, ...props }) {
    return (
        <Form className='webapp-form' {...props}>
            {children}
        </Form>
    )
}

export default WebAppForm
