import { forwardRef } from 'react'
import { ConfigProvider, Input, InputProps, InputRef } from 'antd'
import { color } from '@utils/settings'

interface WebAppInputProps extends InputProps {
    className?: string
    disabled?: boolean
}

const WebAppInput = forwardRef<InputRef, WebAppInputProps>(({ className, disabled = false, ...props }, ref) => {
    return (
        <ConfigProvider
            theme={{
                components: {
                    Input: {
                        colorTextPlaceholder: '#a0a0a0',
                        colorTextDisabled: color.text,
                        colorBgContainer: color.text,
                        colorBgContainerDisabled: color.background_light,
                    },
                },
            }}
        >
            <Input
                ref={ref}
                size="large"
                disabled={disabled}
                style={{
                    borderColor: color.background_light,
                    border: '1px solid',
                }}
                className={className || undefined}
                {...props}
            />
        </ConfigProvider>
    )
})

WebAppInput.displayName = 'WebAppInput'

export default WebAppInput
