import { forwardRef } from 'react'
import { ConfigProvider, Select, SelectProps } from 'antd'
import './webappselect.scss'
import { color } from '@utils/settings'

interface WebAppSelectProps extends SelectProps {
    className?: string
}

const WebAppSelect = forwardRef(({ className, ...props }: WebAppSelectProps, ref) => {
    return (
        <ConfigProvider
            theme={{
                components: {
                    Select: {
                        colorTextPlaceholder: color.grey_text,
                        colorBgContainerDisabled: color.background_light,
                        optionSelectedColor: color.background,
                    },
                },
            }}
        >
            <Select
                // showSearch

                size="large"
                className={`webapp-select ${className ? className : null}`}
                {...props}
            />
        </ConfigProvider>
    )
})

WebAppSelect.displayName = 'WebAppSelect'

export default WebAppSelect
