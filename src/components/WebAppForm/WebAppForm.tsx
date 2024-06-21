import React, { ReactNode } from 'react'
import './webappform.scss'
import { Form } from 'antd'

interface WebAppFormProps {
    children: ReactNode
}

const WebAppForm: React.FC<WebAppFormProps> = ({ children, ...props }) => {
    return (
        <Form
            className="webapp-form"
            {...props}
        >
            {children}
        </Form>
    )
}

export default WebAppForm
