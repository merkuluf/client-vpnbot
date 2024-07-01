import { useEffect, useMemo, useState, useCallback, useRef } from 'react'
import {
    useCreateLavaPaymentMutation,
    useGetAvailableServersQuery,
    useGetPlansQuery,
    useGetUserQuery,
    useRenameKeyMutation,
} from '../redux/api'
import { useLocation, useNavigate } from 'react-router-dom'

import FlexContainer from '@components/layout/FlexContainer'
import Text from '@components/Text/Text'

import Loading from '@components/Loading/Loading'
import { WebApp, color, sizes } from '@utils/settings'
import Message from '@components/Message/Message'
import Header from '@components/Header/Header'
import WebAppButton from '@components/WebAppButton/WebAppButton'
import WebAppInput from '@components/WebAppInput/WebAppInput'
import { EditOutlined, CopyOutlined, CloseOutlined, CheckOutlined } from '@ant-design/icons'

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
import { parseDateString } from '@utils/TIME'

function Home() {
    const token = sessionStorage.getItem('token')
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
        return user.keys.filter((k) => k.type === 0).sort((a, b) => b.id - a.id)
    }, [user])

    const testKey = useMemo(() => {
        if (!user || !user?.keys?.length) return []
        return user.keys.find((k) => k.type === 1)
    }, [user])

    const handleNavigateAdmin = useCallback(() => {
        navigate('/admin')
    }, [navigate])

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

    const handleGoTuGuide = useCallback(() => {
        navigate('/guide')
    }, [navigate])
    if (isUserLoading || isUserFetching) return <Loading />
    if (isUserError) return <Message />

    return (
        <FlexContainer align="center">
            <Header user={user} />
            <WebAppButton onClick={handleGoTuGuide}>Как пользоватсья?</WebAppButton>
            <Separator text="Ключи" />
            <BuyKey />
            {!userKeys.length ? null : (
                <FlexContainer padding="0px">
                    {userKeys.map((k) => (
                        <ServerKey
                            key={k.id}
                            keyData={k}
                        />
                    ))}
                </FlexContainer>
            )}

            <Separator />
            {!testKeyExist ? (
                <FlexContainer
                    align="center"
                    padding="0px"
                >
                    <Text>Каждый пользователь может создать тестовый ключ</Text>
                    <WebAppButton onClick={handleGoToClicker}>Получить тестовый ключ</WebAppButton>
                </FlexContainer>
            ) : (
                <ServerKey keyData={testKey} />
            )}
        </FlexContainer>
    )
}

export default Home

export function ServerKey({ keyData }) {
    const token = sessionStorage.getItem('token')
    const [triggerRename, { isLoading, isError, isSuccess }] = useRenameKeyMutation()
    const [isNaming, setIsNaming] = useState(false)
    function toggleEdit() {
        setIsNaming(!isNaming)
    }

    const [localKey, setLocalKey] = useState(keyData)
    const newNameRef = useRef()

    const handleOnCopy = useCallback(() => {
        message.info('Скопировано!')
    }, [])

    useEffect(() => {
        if (isSuccess) {
            message.info(`Ключ переименован успешно`)
        }
        if (isError) {
            message.error('Ошибка на сервере, не можем переименовать ключ')
            setLocalKey(keyData)
        }
    }, [isSuccess, isError])

    function handleSaveNewName() {
        const newName = newNameRef.current.input.value
        if (!newName) {
            return message.info('Введите название')
        }
        if (newName.length > 12) {
            return message.info('Название должно влезть в контейнер. Максимум 12 символов :)')
        }

        setLocalKey((prev) => ({ ...prev, name: newName }))
        setIsNaming(false)
        triggerRename({
            token: token,
            name: newName,
            keyId: localKey.id,
        })
    }
    const title =
        localKey.type === 1
            ? 'Тестовый ключ'
            : localKey.name
            ? localKey.name
            : `Полный ключ ${localKey.id} ${localKey.countrycode}`

    // if (isLoading) return <Loading fullHeight={false} />
    return (
        <FlexContainer
            padding={sizes.spacing_small}
            backgroundColor={color.primary_transparent}
        >
            <FlexContainer
                gap={sizes.spacing_small}
                padding="0px"
                align="center"
                justify="flex-start"
                vertical={false}
            >
                {localKey.type === 1 ? (
                    ''
                ) : (
                    <WebAppButton
                        onClick={toggleEdit}
                        style={{
                            width: '80px',
                        }}
                        danger={isNaming}
                        block={false}
                        icon={isNaming ? <CloseOutlined /> : <EditOutlined />}
                    />
                )}
                {!isNaming ? (
                    <>
                        <Text
                            style={
                                localKey.type
                                    ? {
                                          paddingLeft: sizes.spacing_medium,
                                      }
                                    : null
                            }
                            align={!localKey.type ? 'center' : ''}
                        >
                            {title}
                        </Text>
                        <ReactCountryFlag
                            style={{
                                paddingRight: sizes.spacing_medium,
                            }}
                            countryCode={localKey.countrycode}
                        />
                    </>
                ) : (
                    <>
                        <WebAppInput
                            ref={newNameRef}
                            placeholder="Название"
                        />
                        <WebAppButton
                            onClick={handleSaveNewName}
                            style={{
                                width: '80px',
                            }}
                            block={false}
                            icon={<CheckOutlined />}
                        />
                    </>
                )}
            </FlexContainer>
            <FlexContainer
                padding="0px"
                vertical={false}
            >
                <WebAppInput
                    disabled
                    value={localKey.address}
                />
                <CopyToClipboard
                    onCopy={handleOnCopy}
                    text={localKey.address}
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
            <Text
                align="center"
                hint
            >
                Активен до {parseDateString(localKey.validTill)}
            </Text>
        </FlexContainer>
    )
}

export function BuyKey() {
    const token = sessionStorage.getItem('token')
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
                    <ReactCountryFlag countryCode={s.countrycode} /> - {s.name}
                    {/* [{calculatePercentage(s.keys.length, s.maxUsers)}%] */}
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
