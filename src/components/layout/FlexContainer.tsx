import React, { ReactNode } from 'react'
import { Flex } from 'antd'
import { sizes } from '@utils/settings'

interface FlexContainerProps {
    children?: ReactNode
    vertical?: boolean
    gap?: number | string
    borderRadius?: number
    padding?: number | string
    backgroundColor?: string
    height?: number | string
    style?: JSON
    align?: string
    justify?: string
    className?: string
}

const FlexContainer: React.FC<FlexContainerProps> = ({
    children,
    vertical = true,
    gap = sizes.spacing_medium,
    padding = sizes.spacing_medium,
    borderRadius = sizes.spacing_medium,
    backgroundColor = 'transparent',
    height,
    style,
    align,
    justify,
    className,
    ...props
}) => {
    return (
        <Flex
            {...props}
            style={{
                gap: gap,
                padding: padding,
                width: '100%',
                height: height,
                position: 'relative',
                backgroundColor: backgroundColor,
                borderRadius: borderRadius,
                ...style,
            }}
            className={className}
            vertical={vertical}
            align={align}
            justify={justify}
        >
            {children}
        </Flex>
    )
}

export default FlexContainer
