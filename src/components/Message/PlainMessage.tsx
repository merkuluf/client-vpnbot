import Text from '@components/Text/Text'
import FlexContainer from '@components/layout/FlexContainer'
import openNewTab from '@utils/openNewTab'
import { Button } from 'antd'
import React from 'react'
import { FaTelegramPlane } from 'react-icons/fa'

interface PlainMessageProps {
    message: string
    description: string
    link: string
    buttonText: string
}

const PlainMessage: React.FC<PlainMessageProps> = ({
    message = 'Ошибка',
    description = 'Воспользуйтесь телеграммом',
    link = 'https://t.me/CashCountBot',
    buttonText = 'Перейти в бот',
}) => {
    function handleGoToBot() {
        openNewTab(link)
    }
    return (
        <FlexContainer
            align="center"
            justify="center"
            className="message-container"
        >
            <FlexContainer
                align="center"
                className="message-container__content"
            >
                <Text
                    align="center"
                    subtitle
                >
                    {message}
                </Text>
                <Text align="center">{description}</Text>
                <Button
                    onClick={handleGoToBot}
                    size="large"
                    type="primary"
                    icon={<FaTelegramPlane />}
                >
                    {buttonText}
                </Button>
            </FlexContainer>
        </FlexContainer>
    )
}

export default PlainMessage
