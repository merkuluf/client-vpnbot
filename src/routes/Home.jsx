import { useEffect, useMemo, useState, useCallback } from 'react'
import { useGetAvailableServersQuery, useGetUserQuery } from '../redux/api'
import { useLocation, useNavigate } from 'react-router-dom'

import FlexContainer from '@components/layout/FlexContainer'
import Text from '@components/Text/Text'

import Loading from '@components/Loading/Loading'
import { WebApp, color } from '@utils/settings'
import Message from '@components/Message/Message'
import Header from '@components/Header/Header'
import WebAppButton from '@components/WebAppButton/WebAppButton'
import WebAppInput from '@components/WebAppInput/WebAppInput'
import { CopyOutlined } from '@ant-design/icons'
import CopyToClipboard from 'react-copy-to-clipboard'
import { Form, message } from 'antd'
import Modal from '@components/Modal/Modal'
import Separator from '@components/Separator/Separator'
import WebAppSelect from '@components/WebAppSelect/WebAppSelect'
import WebAppForm from '@components/WebAppForm/WebAppForm'
import ReactCountryFlag from 'react-country-flag'

function Home() {
    const token = localStorage.getItem('token')
    const options = useLocation()
    const shouldRefetch = options?.state?.refetch || false
    const navigate = useNavigate()

    const {
        data: user,
        isLoading: isUserLoading,
        isError: isUserError,
        isSuccess: isUserSuccess,
        isFetching: isUserFetching,
        refetch: refetchUser,
    } = useGetUserQuery(token)

    useEffect(() => {
        if (shouldRefetch) refetchUser(token)
    }, [shouldRefetch])

    const testKeyExist = useMemo(() => {
        if (!user || !user?.keys?.length) return false
        return user.keys.some((k) => k.type === 1)
    }, [user])

    const userKeys = useMemo(() => {
        if (!user || !user?.keys?.length) return []
        return user.keys.filter((k) => k.type === 0)
    }, [user])

    const testKey = useMemo(() => {
        if (!user || !user?.keys?.length) return []
        return user.keys.find((k) => k.type === 1)
    }, [user])

    const handleNavigateAdmin = useCallback(() => {
        navigate('/admin')
    }, [navigate])

    const handleOnCopy = useCallback(() => {
        message.info('Скопировано!')
    }, [])

    const handleGoToClicker = useCallback(() => {
        navigate('/clicker')
    }, [navigate])

    useEffect(() => {
        if (user?.role >= 2) {
            WebApp.SettingsButton.show()
            WebApp.SettingsButton.onClick(handleNavigateAdmin)
        }
        return () => {
            WebApp.SettingsButton.hide()
            WebApp.SettingsButton.offClick(handleNavigateAdmin)
        }
    }, [user, handleNavigateAdmin])

    if (isUserLoading || isUserFetching) return <Loading />
    if (isUserError) return <Message />

    return (
        <FlexContainer align="center">
            <Header user={user} />
            <Separator text="Ключи" />
            {!userKeys.length ? (
                <BuyKey />
            ) : (
                <FlexContainer padding="0px">
                    {userKeys.map((k) => (
                        <div key={k.id}>key</div>
                    ))}
                </FlexContainer>
            )}

            {!testKeyExist ? (
                <FlexContainer
                    align="center"
                    padding="0px"
                >
                    <Text>Каждый пользователь может создать тестовый ключ</Text>
                    <WebAppButton onClick={handleGoToClicker}>Получить тестовый ключ</WebAppButton>
                </FlexContainer>
            ) : (
                <FlexContainer backgroundColor={color.primary_transparent}>
                    <Text>Тестовый ключ</Text>
                    <FlexContainer
                        padding="0px"
                        vertical={false}
                    >
                        <WebAppInput
                            disabled
                            value={testKey.address}
                        />
                        <CopyToClipboard
                            onCopy={handleOnCopy}
                            text={testKey.address}
                        >
                            <WebAppButton
                                style={{
                                    width: '80px',
                                }}
                                block={false}
                                icon={<CopyOutlined />}
                            />
                        </CopyToClipboard>
                    </FlexContainer>
                </FlexContainer>
            )}
        </FlexContainer>
    )
}

export default Home

const planOption = [
    {
        value: 7,
        label: 'Неделя свободного интернета',
    },
    {
        value: 30,
        label: '1 месяц свободного интернета',
    },
    {
        value: 90,
        label: '3 месяца свободного интернета',
    },
    {
        value: 180,
        label: '6 месяцев свободного интернета',
    },
    {
        value: 360,
        label: 'Год свободного интернета',
    },
]

function BuyKey() {
    const token = localStorage.getItem('token')

    const [buyFullModal, setBuyFullModal] = useState(false)
    function toggleBuyModal() {
        setBuyFullModal(!buyFullModal)
    }

    const { data, isLoading } = useGetAvailableServersQuery(token)

    const availableServers = useMemo(() => {
        if (!data || !data.length) return []
        return data.map((s) => ({
            value: s.id,
            label: (
                <span>
                    <ReactCountryFlag countryCode={s.countrycode} /> - {s.name}
                </span>
            ),
        }))
    }, [data])

    return (
        <>
            <WebAppButton onClick={toggleBuyModal}>Купить ключ полного доступа</WebAppButton>
            <Modal
                glow
                isOpen={buyFullModal}
                onClose={toggleBuyModal}
                isLoading={isLoading}
            >
                <FlexContainer padding="0px">
                    <Separator text="Оформление ключа" />
                    <WebAppForm>
                        <Form.Item label="Выберите период">
                            <WebAppSelect
                                defaultActiveFirstOption={planOption[0]}
                                placeholder={planOption[0].label}
                                options={planOption}
                            />
                        </Form.Item>
                        <Form.Item label="Выберите страну">
                            <WebAppSelect options={availableServers} />
                        </Form.Item>
                        <Form.Item>
                            <WebAppButton>Оплатить</WebAppButton>
                        </Form.Item>
                    </WebAppForm>
                </FlexContainer>
            </Modal>
        </>
    )
}
