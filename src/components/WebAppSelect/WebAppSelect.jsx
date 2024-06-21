import React, { forwardRef } from 'react'
import { ConfigProvider, Select } from 'antd'
import './webappselect.scss'
import { color } from '@utils/settings'

const WebAppSelect = forwardRef(({ className, ...props }, ref) => {
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

export default WebAppSelect
