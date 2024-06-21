import { forwardRef } from 'react'
import { ConfigProvider, Input } from 'antd'
import { color } from '@utils/settings'

const WebAppInput = forwardRef(({ className, ...props }, ref) => {
    return (
        <ConfigProvider
            theme={{
                components: {
                    Input: {
                        colorTextPlaceholder: color.grey_text,
                        colorTextDisabled: color.background,
                    },
                },
            }}
        >
            <Input
                ref={ref}
                size="large"
                style={{
                    backgroundColor: color.text,
                    borderColor: color.background_light,
                    border: '2px',
                }}
                className={className ? className : null}
                {...props}
            />
        </ConfigProvider>
    )
})

export default WebAppInput
