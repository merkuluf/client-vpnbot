import React from 'react'
import { Flex } from 'antd'
import { sizes } from 'utils/settings'

function FlexContainer({
    children,
    vertical = true,
    gap = sizes.spacing_medium,
    padding = sizes.spacing_medium,
    className,
    ...args
}) {
    return (
        <Flex
            {...args}
            style={{
                gap: gap,
                padding: padding,
                width: '100%',
            }}
            vertical={vertical}
            className={`flexcontainer ${className ? className : ''}`}
        >
            {children}
        </Flex>
    )
}

export default FlexContainer
