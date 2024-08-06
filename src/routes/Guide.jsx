import Separator from '@components/Separator/Separator'
import Text from '@components/Text/Text'
import WebAppButton from '@components/WebAppButton/WebAppButton'
import FlexContainer from '@components/layout/FlexContainer'
import { WebApp, color } from '@utils/settings'
import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BuyKey, ServerKey } from './Home'
import { useGetUserQuery } from '@redux/api'

import {
    WindowsFilled,
    AndroidFilled,
    AppleFilled,
    LinuxOutlined,
    ChromeFilled,
    GoogleOutlined,
} from '@ant-design/icons'

const links = {
    macos: 'https://apps.apple.com/us/app/outline-secure-internet-access/id1356178125?mt=12',
    ios: 'https://apps.apple.com/us/app/outline-app/id1356177741',
    android: 'https://play.google.com/store/apps/details?id=org.outline.android.client',
    windows: 'https://s3.amazonaws.com/outline-releases/client/windows/stable/Outline-Client.exe',
    linux: 'https://s3.amazonaws.com/outline-releases/client/linux/stable/Outline-Client.AppImage',
    chrome: 'https://play.google.com/store/apps/details?id=org.outline.android.client',
}

function Guide() {
    const navigate = useNavigate()
    const token = sessionStorage.getItem('token')

    const [hasTestKey, setHasTestKey] = useState(false)
    const { data: user, isSuccess } = useGetUserQuery(token)

    useEffect(() => {
        if (isSuccess) {
            const htk = user.keys.some((k) => k.type === 1)
            setHasTestKey(htk)
        }
    }, [user])

    const handleGoToSupport = useCallback(() => {
        WebApp.openTelegramLink('https://t.me/bitrage')
        WebApp.disableClosingConfirmation()
        WebApp.close()
    }, [WebApp])

    const handleGetIOS = useCallback(() => {
        WebApp.openLink(links.ios)
    }, [WebApp])
    const handleGetMacOS = useCallback(() => {
        WebApp.openLink(links.macos)
    }, [WebApp])
    const handleGetAndroid = useCallback(() => {
        WebApp.openLink(links.android)
    }, [WebApp])
    const handleGetWindows = useCallback(() => {
        WebApp.openLink(links.android)
    }, [WebApp])
    const handleGetLinux = useCallback(() => {
        WebApp.openLink(links.linux)
    }, [WebApp])
    const handleGetChrome = useCallback(() => {
        WebApp.openLink(links.chrome)
    }, [WebApp])
    const handleGoogle = useCallback(() => {
        WebApp.openLink(`https://www.google.com/search?q=Скачать+shadowsocks+клиент+для+${WebApp.platform}`)
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
            {hasTestKey ? (
                <>
                    <Text>Нет. Вы уже сыграли в игру и получили свой ключ. Проверьте наш сервис сами.</Text>
                    <ServerKey keyData={user.keys.find((k) => k.type === 1)} />
                </>
            ) : (
                <>
                    <Text>Нет. Попробуйте получить тестовый ключ и проверьте сами абсолютно бесплатно.</Text>
                    <WebAppButton onClick={navigateClicker}>Получить ключ</WebAppButton>
                </>
            )}
            <Separator />
            <Text
                subtitle
                align="center"
            >
                1. Как начать?
            </Text>
            <Text>Вам необходимо установить клиент для подключения к нашим серверам через протокол shadowsocks</Text>
            <Text align="center">скачать официальный клиент Outline</Text>

            <WebAppButton
                icon={<AppleFilled />}
                onClick={handleGetIOS}
            >
                Для iOS
            </WebAppButton>
            <WebAppButton
                icon={<AppleFilled />}
                onClick={handleGetMacOS}
            >
                Для macOS
            </WebAppButton>
            <WebAppButton
                icon={<WindowsFilled />}
                onClick={handleGetWindows}
            >
                Для Windows
            </WebAppButton>
            <WebAppButton
                icon={<AndroidFilled />}
                onClick={handleGetAndroid}
            >
                Для Android
            </WebAppButton>
            <WebAppButton
                icon={<LinuxOutlined />}
                onClick={handleGetLinux}
            >
                Для Linux
            </WebAppButton>
            <WebAppButton
                icon={<ChromeFilled />}
                onClick={handleGetChrome}
            >
                Для Chrome
            </WebAppButton>
            <Text>Или скачайте любой другой клиент для работы с shadowsocks протоколом</Text>

            <WebAppButton
                onClick={handleGoogle}
                className="google-btn"
                icon={<GoogleOutlined />}
            >
                Скачать Shadowsocks для {WebApp.platform}
            </WebAppButton>
            <Text hint>Мы уже загуглили для вас. Просто нажмите на кнопку!</Text>
            <Separator />
            <Text
                subtitle
                align="center"
            >
                2. Что дальше?
            </Text>
            <Text>После установки shadowsocks клиента купите ключ в боте</Text>
            <BuyKey />
            <Separator />
            <Text
                subtitle
                align="center"
            >
                3. После покупки
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
                Все еще ничего не понятно?
            </Text>
            <Text>Напишите нам в саппорт и мы поможем разобраться</Text>
            <WebAppButton onClick={handleGoToSupport}>Написать в саппорт</WebAppButton>
            <br />
            <br />
            <br />
            <br />
        </FlexContainer>
    )
}

export default Guide
