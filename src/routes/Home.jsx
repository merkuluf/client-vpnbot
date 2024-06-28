import { useEffect, useMemo, useState, useCallback } from 'react'
import {
    useCreateLavaPaymentMutation,
    useGetAvailableServersQuery,
    useGetPlansQuery,
    useGetUserQuery,
} from '../redux/api'
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
import { calculatePercentage } from '@utils/PERCENTAGE'
import { useDispatch } from 'react-redux'
import { setModalLoading } from '@redux/modalStateSlice'

function Home() {
    const token = localStorage.getItem('token')
    const options = useLocation()
    const shouldRefetch = options?.state?.refetch || false
    const navigate = useNavigate()

    const {
        data: user,
        isLoading: isUserLoading,
        isError: isUserError,
        isFetching: isUserFetching,
        refetch: refetchUser,
    } = useGetUserQuery(token)

    useEffect(() => {
        if (shouldRefetch) refetchUser(token)
    }, [shouldRefetch, refetchUser, token])

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
            <BuyKey />
            {!userKeys.length ? null : (
                <FlexContainer padding="0px">
                    {userKeys.map((k) => (
                        <ServerKey
                            title={`Полный ключ ${k.id}`}
                            key={k.id}
                            keyData={testKey}
                            onCopy={handleOnCopy}
                        />
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
                <ServerKey
                    title="Тестовый ключ"
                    keyData={testKey}
                    onCopy={handleOnCopy}
                />
            )}
        </FlexContainer>
    )
}

export default Home

function ServerKey({ keyData, onCopy, title = 'Ключ' }) {
    return (
        <FlexContainer backgroundColor={color.primary_transparent}>
            <Text>{title}</Text>
            <FlexContainer
                padding="0px"
                vertical={false}
            >
                <WebAppInput
                    disabled
                    value={keyData.address}
                />
                <CopyToClipboard
                    onCopy={onCopy}
                    text={keyData.address}
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
    )
}

function BuyKey() {
    const token = localStorage.getItem('token')
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [buyFullModal, setBuyFullModal] = useState(false)
    function toggleBuyModal() {
        setBuyFullModal(!buyFullModal)
    }

    const { data: servers, isLoading } = useGetAvailableServersQuery(token)
    const { data: plans, isLoading: isPlansLoading } = useGetPlansQuery(token)
    const [
        createPayment,
        { data: payment, isLoading: isCreatingPayment, isSuccess: isPaymentCreated, isError: isPaymentError },
    ] = useCreateLavaPaymentMutation()

    useEffect(() => {
        dispatch(setModalLoading(false))
        if (isPaymentError) {
            message.error('Ошибка!')
        }
        if (isPaymentCreated) {
            navigate('/payment/' + payment?.id, { state: { payment: payment } })
        }
    }, [isCreatingPayment, isPaymentError, isPaymentCreated, navigate, dispatch])

    const availableServers = useMemo(() => {
        if (!servers || !servers.length) return []

        return servers.map((s) => ({
            value: s.id,
            label: (
                <span>
                    <ReactCountryFlag countryCode={s.countrycode} /> - {s.name} - [
                    {calculatePercentage(s.keys.length, s.maxUsers)}%]
                </span>
            ),
        }))
    }, [servers])

    const availablePlans = useMemo(() => {
        if (!plans || !plans.length) return []
        return plans.map((p) => ({
            value: p.offerId,
            label: `${p.label} ${p.price}₽`,
        }))
    }, [plans])

    const [priceTag, setPriceTag] = useState(0)
    const [description, setDescription] = useState('Выберите план')
    const handleChangePriceTag = useCallback(
        (e) => {
            const obj = plans.find((p) => p.offerId == e)
            setPriceTag(obj?.price || null)
            setDescription(obj?.label || null)
            return
        },
        [plans]
    )

    const handleCreatePayment = useCallback(
        (e) => {
            dispatch(setModalLoading(true))
            createPayment({ ...e, token })
        },
        [token]
    )

    if (isLoading || isPlansLoading)
        return (
            <Loading
                title="Ищем сервера"
                fullHeight={false}
            />
        )
    if (!availableServers.length) {
        return <Text>Нет доступных серверов</Text>
    }

    return (
        <>
            <WebAppButton onClick={toggleBuyModal}>Купить ключ полного доступа</WebAppButton>
            <Modal
                glow
                isOpen={buyFullModal}
                onClose={toggleBuyModal}
            >
                <FlexContainer padding="0px">
                    <Separator text="Оформление ключа" />
                    <WebAppForm
                        onFinish={handleCreatePayment}
                        disabled={isCreatingPayment}
                    >
                        <Form.Item
                            name="offerId"
                            label="Выберите период"
                            rules={[
                                {
                                    required: true,
                                    message: '',
                                },
                                () => ({
                                    validator(_, value) {
                                        if (!value) {
                                            return Promise.reject(new Error('Выерите период пользования!'))
                                        }
                                        return Promise.resolve()
                                    },
                                }),
                            ]}
                        >
                            <WebAppSelect
                                defaultActiveFirstOption={availablePlans[0]}
                                placeholder={availablePlans[0].label}
                                options={availablePlans}
                                onChange={handleChangePriceTag}
                            />
                        </Form.Item>
                        <Form.Item
                            name="serverId"
                            label="Выберите страну"
                            rules={[
                                {
                                    required: true,
                                    message: '',
                                },
                                () => ({
                                    validator(_, value) {
                                        if (!value) {
                                            return Promise.reject(new Error('Выберите страну!'))
                                        }
                                        return Promise.resolve()
                                    },
                                }),
                            ]}
                        >
                            <WebAppSelect
                                defaultActiveFirstOption={availableServers[0]}
                                placeholder={availableServers[0].label}
                                options={availableServers}
                            />
                        </Form.Item>
                        <Form.Item
                            name="email"
                            label="Ваша почта (для чека)"
                            rules={[
                                {
                                    required: true,
                                    message: '',
                                },
                                {
                                    type: 'email',
                                    message: 'Введите корректный email!',
                                },
                                () => ({
                                    validator(_, value) {
                                        if (!value) {
                                            return Promise.reject(new Error('Введите корректный email!'))
                                        }
                                        return Promise.resolve()
                                    },
                                }),
                            ]}
                        >
                            <WebAppInput
                                disabled={isCreatingPayment}
                                placeholder="user@domain.com"
                            />
                        </Form.Item>
                        <Text hint>{description}</Text>
                        <Form.Item>
                            <WebAppButton
                                loading={isCreatingPayment}
                                htmlType="submit"
                            >
                                Оплатить {priceTag}₽
                            </WebAppButton>
                        </Form.Item>
                    </WebAppForm>
                </FlexContainer>
            </Modal>
        </>
    )
}
