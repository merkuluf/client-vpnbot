import React from 'react'
import { ConfigProvider, Input } from 'antd'
import { color } from 'utils/settings'

function WebAppInput({ className, ...props }) {
    return (
        <ConfigProvider
            theme={{
                components: {
                    Input: {
                        colorTextPlaceholder: color.grey_text,
                        colorTextDisabled: color.grey_text,
                    },
                },
            }}
        >
            <Input
                size='large'
                style={{
                    backgroundColor: color.background_light,
                }}
                className={className ? className : null}
                {...props}
            />
        </ConfigProvider>
    )
}

export default WebAppInput
