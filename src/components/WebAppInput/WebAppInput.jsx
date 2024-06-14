import React, { forwardRef } from 'react'
import { ConfigProvider, Input } from 'antd'
import { color } from '@utils/settings'

const WebAppInput = forwardRef(({ className, ...props }, ref) => {
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
                ref={ref}
                size='large'
                style={{
                    backgroundColor: color.backgroundColor,
                    borderColor: color.background,
                }}
                className={className ? className : null}
                {...props}
            />
        </ConfigProvider>
    )
})

export default WebAppInput
