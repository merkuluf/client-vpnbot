import React, { useEffect, useState } from 'react'
import { Form } from 'antd'
import { FaRegCircleUser } from 'react-icons/fa6'
import WebAppButton from '@components/WebAppButton/WebAppButton'
import FlexContainer from '@components/layout/FlexContainer'
import WebAppForm from '@components/WebAppForm/WebAppForm'
import Separator from '@components/Separator/Separator'
import WebAppSelect from '@components/WebAppSelect/WebAppSelect'
import Text from '@components/Text/Text'

import { useCreateServerMutation, useDeleteServerMutation, useGetServersQuery } from '@/redux/adminApi'
import Modal from '@components/Modal/Modal'
import Loading from '@components/Loading/Loading'
import COUNTRYCODES from '@utils/COUNTRYCODES'
import ReactCountryFlag from 'react-country-flag'
import WebAppInput from '@components/WebAppInput/WebAppInput'
import { color, sizes, WebApp } from '@utils/settings'

function OutlineServersManagement() {
    const [isAddServerModalOpen, setIsAddServerModalOpen] = useState(false)
    function toggleAddServerModal() {
        setIsAddServerModalOpen(!isAddServerModalOpen)
    }
    const [isShowServerModalOpen, setIsShowServerModalOpen] = useState(false)
    function toggleShowServerModal() {
        setIsShowServerModalOpen(!isShowServerModalOpen)
    }
    const token = sessionStorage.getItem('token')
    const { data: servers, isLoading: isServersLoading, refetch: refetchServers } = useGetServersQuery(token)

    const [triggerCreateServer, { isLoading, isSuccess }] = useCreateServerMutation()

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
    }, [isSuccess, refetchServers])

    const PARSED_CC = COUNTRYCODES.map((cc) => ({
        value: `${cc.value}|${cc.label}`,
        label: (
            <span>
                <ReactCountryFlag countryCode={cc.value} /> {cc.label}
            </span>
        ),
    }))

    if (isServersLoading)
        return (
            <Loading
                fullHeight={false}
                title="Грузим сервера"
            />
        )

    return (
        <FlexContainer
            padding="0px"
            gap={sizes.spacing_small}
        >
            <WebAppButton onClick={toggleAddServerModal}>Добавить сервер</WebAppButton>

            <Modal
                isOpen={isAddServerModalOpen}
                onClose={toggleAddServerModal}
                noCloseButton={isLoading}
            >
                {isLoading ? (
                    <Loading fullHeight={false} />
                ) : (
                    <FlexContainer padding="0px">
                        <Separator text="Добавить сервер" />

                        <WebAppForm onFinish={handleAddServer}>
                            <Form.Item
                                label="Название"
                                name="name"
                                rules={[
                                    {
                                        required: true,
                                        message: '',
                                    },
                                    () => ({
                                        validator(_, value) {
                                            if (!value) {
                                                return Promise.reject(new Error('Введите название!'))
                                            }
                                            if (value.length < 4) {
                                                return Promise.reject(
                                                    new Error('Введите название хотя бы из 4 символов!')
                                                )
                                            }
                                            return Promise.resolve()
                                        },
                                    }),
                                ]}
                            >
                                <WebAppInput placeholder="Супер Сервер" />
                            </Form.Item>
                            <Form.Item
                                label="Аддрес"
                                name="addr"
                                rules={[
                                    {
                                        required: true,
                                        message: '',
                                    },
                                    () => ({
                                        validator(_, value) {
                                            if (!value) {
                                                return Promise.reject(new Error('Введите корректный URL!'))
                                            }
                                            if (!/^https:\/\/.*/.test(value)) {
                                                return Promise.reject(new Error('Введите корректный URL!'))
                                            }
                                            return Promise.resolve()
                                        },
                                    }),
                                ]}
                            >
                                <WebAppInput placeholder="https://1.2.3.4:4321/ZjeLxJ5gbInzZje" />
                            </Form.Item>

                            <Form.Item
                                label="Сертификат"
                                name="cert"
                                rules={[
                                    {
                                        required: true,
                                        message: '',
                                    },
                                    () => ({
                                        validator(_, value) {
                                            if (!value) {
                                                return Promise.reject(new Error('Введите сертификат'))
                                            }
                                            if (value.length < 10) {
                                                return Promise.reject(new Error('Введите корректный сертификат!'))
                                            }
                                            return Promise.resolve()
                                        },
                                    }),
                                ]}
                            >
                                <WebAppInput placeholder="DD7977FBE5D0F5CB5439A2DA51BBC1D684D803DBDADFBA037B28693858DC33F5" />
                            </Form.Item>
                            <Form.Item
                                label="Страна"
                                name="cc"
                                rules={[
                                    {
                                        required: true,
                                        message: '',
                                    },
                                    () => ({
                                        validator(_, value) {
                                            if (!value) {
                                                return Promise.reject(new Error('Выберите страну'))
                                            }
                                            return Promise.resolve()
                                        },
                                    }),
                                ]}
                            >
                                <WebAppSelect
                                    options={PARSED_CC}
                                    defaultActiveFirstOption={PARSED_CC[0]}
                                    placeholder={PARSED_CC[0].value}
                                    showSearch
                                />
                            </Form.Item>
                            <Form.Item>
                                <WebAppButton htmlType="submit">Добавить сервер</WebAppButton>
                            </Form.Item>
                        </WebAppForm>
                    </FlexContainer>
                )}
            </Modal>
            <WebAppButton onClick={toggleShowServerModal}>Посмотреть сервера</WebAppButton>
            <Modal
                isOpen={isShowServerModalOpen}
                onClose={toggleShowServerModal}
            >
                <FlexContainer
                    padding="0px"
                    // gap={sizes.spacing_small}
                >
                    {servers?.map((s) => (
                        <OutlineServer
                            key={s.id}
                            server={s}
                        />
                    ))}
                </FlexContainer>
            </Modal>
        </FlexContainer>
    )
}

export default OutlineServersManagement

function OutlineServer({ server }) {
    const isPrivate = server.isPrivate ? 'Приватный' : 'Общий'
    const token = sessionStorage.getItem('token')
    const [deleteServer, { isLoading, isSuccess }] = useDeleteServerMutation()
    function handleDeleteServer() {
        WebApp.showConfirm('Удалить сервер?', (status) => {
            if (status) {
                deleteServer({
                    token,
                    serverId: server.id,
                })
            }
        })
    }

    if (isLoading) {
        return (
            <Loading
                fullHeight={false}
                title="Удаляем сервер"
            />
        )
    }

    return (
        <FlexContainer
            className="outline-server"
            backgroundColor={color.background_light}
            borderRadius={sizes.spacing_small}
        >
            <Text>{server.name}</Text>
            <Text hint>{isPrivate}</Text>
            <div className="outline-server__users">
                <FaRegCircleUser className="icon" />
                <Text block={false}>{server?.keys?.length ? server?.keys?.length : 0}</Text>
            </div>
            <FlexContainer
                vertical={false}
                gap="0px"
                padding="0px"
            >
                <WebAppButton
                    onClick={handleDeleteServer}
                    danger
                >
                    Удалить сервер
                </WebAppButton>
            </FlexContainer>
        </FlexContainer>
    )
}
