import React, { Suspense, lazy, useEffect, useState } from 'react'
import { Form } from 'antd'
const WebAppInput = lazy(() => import('@components/WebAppInput/WebAppInput'))
const WebAppButton = lazy(() => import('@components/WebAppButton/WebAppButton'))
const FlexContainer = lazy(() => import('@components/layout/FlexContainer'))
const WebAppForm = lazy(() => import('@components/WebAppForm/WebAppForm'))
const Separator = lazy(() => import('@components/Separator/Separator'))
const WebAppSelect = lazy(() => import('@components/WebAppSelect/WebAppSelect'))

import { useCreateServerMutation, useGetServersQuery } from '@/redux/adminApi'
import Modal from '@components/Modal/Modal'
import LoaderBar from '@components/LoaderBar/LoaderBar'
import Loading from '@components/Loading/Loading'
import COUNTRYCODES from '@utils/COUNTRYCODES'
import ReactCountryFlag from 'react-country-flag'

function AddOutlineServer() {
    const [isAddServerModalOpen, setIsAddServerModalOpen] = useState(false)
    function toggleAddServerModal() {
        setIsAddServerModalOpen(!isAddServerModalOpen)
    }
    const token = localStorage.getItem('token')

    const [triggerCreateServer, { data, isLoading, isSuccess }] =
        useCreateServerMutation()

    const { refetch: refetchServers } = useGetServersQuery(token)
    function handleAddServer(e) {
        const body = {
            addr: e.addr,
            cert: e.cert,
            name: e.name,
            cc: e.cc.split('|')[0],
            token: token,
        }
        triggerCreateServer(body)
    }

    useEffect(() => {
        if (isSuccess) {
            setIsAddServerModalOpen(false)
            refetchServers()
        }
    }, [isSuccess])

    const PARSED_CC = COUNTRYCODES.map((cc) => ({
        value: `${cc.value}|${cc.label}`,
        label: (
            <span>
                <ReactCountryFlag countryCode={cc.value} /> {cc.label}
            </span>
        ),
    }))

    return (
        <Suspense fallback={<LoaderBar />}>
            <WebAppButton onClick={toggleAddServerModal}>
                Добавить сервер
            </WebAppButton>
            <Modal
                isOpen={isAddServerModalOpen}
                onClose={toggleAddServerModal}
                noCloseButton={isLoading}
            >
                {isLoading ? (
                    <Loading fullWidth={false} />
                ) : (
                    <FlexContainer padding='0px'>
                        <Separator text='Добавить сервер' />
                        <WebAppForm onFinish={handleAddServer}>
                            <Form.Item
                                label='Название'
                                name='name'
                                rules={[
                                    {
                                        required: true,
                                        message: '',
                                    },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value) {
                                                return Promise.reject(
                                                    new Error(
                                                        'Введите название!'
                                                    )
                                                )
                                            }
                                            if (value.length < 4) {
                                                return Promise.reject(
                                                    new Error(
                                                        'Введите название хотя бы из 4 символов!'
                                                    )
                                                )
                                            }
                                            return Promise.resolve()
                                        },
                                    }),
                                ]}
                            >
                                <WebAppInput placeholder='Супер Сервер' />
                            </Form.Item>
                            <Form.Item
                                label='Аддрес'
                                name='addr'
                                rules={[
                                    {
                                        required: true,
                                        message: '',
                                    },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value) {
                                                return Promise.reject(
                                                    new Error(
                                                        'Введите корректный URL!'
                                                    )
                                                )
                                            }
                                            if (!/^https:\/\/.*/.test(value)) {
                                                return Promise.reject(
                                                    new Error(
                                                        'Введите корректный URL!'
                                                    )
                                                )
                                            }
                                            return Promise.resolve()
                                        },
                                    }),
                                ]}
                            >
                                <WebAppInput placeholder='https://1.2.3.4:4321/ZjeLxJ5gbInzZje' />
                            </Form.Item>
                            <Form.Item
                                label='Сертификат'
                                name='cert'
                                rules={[
                                    {
                                        required: true,
                                        message: '',
                                    },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value) {
                                                return Promise.reject(
                                                    new Error(
                                                        'Введите сертификат'
                                                    )
                                                )
                                            }
                                            if (value.length < 10) {
                                                return Promise.reject(
                                                    new Error(
                                                        'Введите корректный сертификат!'
                                                    )
                                                )
                                            }
                                            return Promise.resolve()
                                        },
                                    }),
                                ]}
                            >
                                <WebAppInput placeholder='DD7977FBE5D0F5CB5439A2DA51BBC1D684D803DBDADFBA037B28693858DC33F5' />
                            </Form.Item>
                            <Form.Item
                                label='Страна'
                                name='cc'
                                rules={[
                                    {
                                        required: true,
                                        message: '',
                                    },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value) {
                                                return Promise.reject(
                                                    new Error('Выберите страну')
                                                )
                                            }
                                            return Promise.resolve()
                                        },
                                    }),
                                ]}
                            >
                                <WebAppSelect options={PARSED_CC} showSearch />
                            </Form.Item>
                            <Form.Item>
                                <WebAppButton htmlType='submit'>
                                    Добавить сервер
                                </WebAppButton>
                            </Form.Item>
                        </WebAppForm>
                    </FlexContainer>
                )}
            </Modal>
        </Suspense>
    )
}

export default AddOutlineServer
