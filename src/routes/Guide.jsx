import Separator from '@components/Separator/Separator'
import Text from '@components/Text/Text'
import WebAppButton from '@components/WebAppButton/WebAppButton'
import FlexContainer from '@components/layout/FlexContainer'
import { WebApp } from '@utils/settings'
import React, { useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { BuyKey } from './Home'

const links = {
    macos: 'https://apps.apple.com/us/app/outline-secure-internet-access/id1356178125?mt=12',
    ios: 'https://apps.apple.com/us/app/outline-app/id1356177741',
    android: 'https://play.google.com/store/apps/details?id=org.outline.android.client',
    rest: 'https://getoutline.org/en-GB/get-started/#step-3',
}

function Guide() {
    const navigate = useNavigate()
    const handleGoToOutline = useCallback(() => {
        WebApp.openLink('https://getoutline.org/en-GB/get-started/#step-3')
    }, [WebApp])
    const handleGoToSupport = useCallback(() => {
        WebApp.openTelegramLink('https://t.me/bitrage')
        WebApp.disableClosingConfirmation()
        WebApp.close()
    }, [WebApp])
    const handleGetNativeLink = useCallback(() => {
        switch (WebApp.platform) {
            case 'macos':
                WebApp.openLink(links.macos)
            case 'ios':
                WebApp.openLink(links.ios)
            case 'android':
                WebApp.openLink(links.android)
            default:
                WebApp.openLink(links.rest)
        }
    }, [WebApp])
    const navigateHome = useCallback(() => {
        navigate('/')
    }, [navigate])
    const navigateClicker = useCallback(() => {
        navigate('/clicker')
    }, [navigate])
    useEffect(() => {
        WebApp.BackButton.show()
        WebApp.BackButton.onClick(navigateHome)
        return () => {
            WebApp.BackButton.offClick(navigateHome)
            WebApp.BackButton.hide()
        }
    }, [])
    return (
        <FlexContainer>
            <Text
                title
                align="center"
            >
                Что это такое?
            </Text>
            <Separator />
            <Text
                align="center"
                subtitle
            >
                BitRage VPN-BOT
            </Text>
            <Text>Этот бот позволяет покупать ключи доступа для приложения Outline.</Text>
            <Text>Сервера расположены в европейских странах с наименьшим количеством ограничений.</Text>
            <Text>Ваш траффик шифруется и не передается третьим лицам.</Text>
            <Text>Пользуясь данными Outline ключами вы открываете дверь в свободный интернет.</Text>
            <Separator />
            <Text
                align="center"
                subtitle
            >
                Это не скам?
            </Text>
            <Text>Нет. Попробуйте получить тестовый ключ и проверьте сами абсолютно бесплатно.</Text>
            <WebAppButton onClick={navigateClicker}>Получить ключ</WebAppButton>
            <Separator />
            <Text
                subtitle
                align="center"
            >
                Как начать?
            </Text>
            <WebAppButton onClick={handleGoToOutline}>Скачать Outline с официального сайта</WebAppButton>
            <Text
                hint
                align="center"
            >
                или скачать для {WebApp.platform}
            </Text>
            <WebAppButton onClick={handleGetNativeLink}>Из магазина приложений</WebAppButton>
            <Separator />
            <Text
                subtitle
                align="center"
            >
                Что дальше?
            </Text>
            <Text>После установки приложения Outline – купите ключ в боте</Text>
            <BuyKey />
            <Separator />
            <Text
                subtitle
                align="center"
            >
                После покупки
            </Text>
            <Text>Вам необходимо скопировать ключ из бота и вставить его в приложение.</Text>
            <Text>
                Совершив эти простые действия вы получите доступ к приватному серверу Outline с быстрым соединением
            </Text>
            <Separator />
            <Text
                subtitle
                align="center"
            >
                Все еще ничего не понятно
            </Text>
            <Text>Напишите нам в саппорт и мы поможем разобраться</Text>
            <WebAppButton onClick={handleGoToSupport}>Написать в саппорт</WebAppButton>
            <br />
            <br />
            <br />
        </FlexContainer>
    )
}

export default Guide
