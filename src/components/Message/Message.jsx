import Text from '@components/Text/Text'
import WebAppButton from '@components/WebAppButton/WebAppButton'
import FlexContainer from '@components/layout/FlexContainer'
import React from 'react'

function Message({ message, description, children }) {
    function handleTryAgain() {
        localStorage.removeItem('token')
        window.location.reload()
    }
    return (
        <FlexContainer
            align='center'
            justify='center'
            className='message-container'
        >
            <FlexContainer className='message-container__content'>
                <Text align='center' subtitle>
                    {message}
                </Text>
                <Text align='center' hint>
                    {description}
                </Text>
                <WebAppButton onClick={handleTryAgain}>
                    Попробовать еще раз
                </WebAppButton>
            </FlexContainer>
        </FlexContainer>
    )
}

export default Message
