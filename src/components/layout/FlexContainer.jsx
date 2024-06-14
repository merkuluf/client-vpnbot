import React from 'react'
import { Flex } from 'antd'
import { sizes } from '@utils/settings'

function FlexContainer({
    children,
    vertical = true,
    gap = sizes.spacing_medium,
    padding = sizes.spacing_medium,
    borderRadius = sizes.spacing_medium,
    className,
    backgroundColor = 'transparent',
    style,
    ...props
}) {
    return (
        <Flex
            {...props}
            style={{
                gap: gap,
                padding: padding,
                width: '100%',
                backgroundColor: backgroundColor,
                borderRadius: borderRadius,
            }}
            vertical={vertical}
            className={`${className ? className : ''}`}
        >
            {children}
        </Flex>
    )
}

export default FlexContainer
