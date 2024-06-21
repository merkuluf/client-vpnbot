import React from 'react'
import Text from '../Text/Text'

import { sizes } from '@utils/settings'
import { color } from '@utils/settings'

interface SeparatorInterface {
    height?: string
    width?: string
    clr?: string
    margin?: number
    text?: string
    bgColor?: string
}

const Separator: React.FC<SeparatorInterface> = ({
    height,
    width,
    clr = '#fafafa30',
    margin = sizes.spacing_small,
    text,
    bgColor = color.background,
}) => {
    const breakStyle = {
        height: height ? height : '2px',
        width: width ? width : '100%',
        backgroundColor: clr ? clr : '#fafafa30',
        margin: `${margin} 0px`,
        position: 'relative',
    }

    return (
        //@ts-ignore
        <div style={breakStyle}>
            {text ? (
                <div
                    style={{
                        position: 'absolute',
                        right: '50%',
                        top: '-50%',
                        transform: 'translate(50%, -50%)',

                        backgroundColor: bgColor,
                        whiteSpace: 'nowrap',
                        padding: '0px 12px',
                    }}
                >
                    <Text>{text}</Text>
                </div>
            ) : null}
        </div>
    )
}

export default Separator
