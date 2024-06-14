import React, { useEffect } from 'react'
import LoaderBar from '@components/LoaderBar/LoaderBar'
import FlexContainer from '@components/layout/FlexContainer'
import Text from '@components/Text/Text'
import { sizes } from '@utils/settings'

function Loading({
    title = 'Загрузка',
    subtitle = 'Еще чуть-чуть...',
    fullWidth = true,
}) {
    return (
        <FlexContainer
            className={`loading ${
                fullWidth
                    ? 'flexcontainer-center-tgvh'
                    : 'flexcontainer-center-inline'
            }`}
            padding='0px'
            gap='0px'
        >
            <FlexContainer
                className={`${
                    fullWidth
                        ? 'flexcontainer-center-tgvh'
                        : 'flexcontainer-center-inline'
                }`}
                padding='0px'
                gap={sizes.spacing_medium}
            >
                <Text subtitle align='center'>
                    {title}
                </Text>
                <LoaderBar />
                <Text hint align='center'>
                    {subtitle}
                </Text>
            </FlexContainer>
        </FlexContainer>
    )
}

export default Loading
