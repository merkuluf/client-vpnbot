import React, { Suspense, lazy, useEffect, useMemo, useState } from 'react'
import {
    useGetUserQuery,
    useLazyGetUserQuery,
    useIssueTestVpnKeyMutation,
} from '../redux/api'
import { SiOpenvpn } from 'react-icons/si'
import { useNavigate } from 'react-router-dom'

const FlexContainer = lazy(() => import('@components/layout/FlexContainer'))
const Text = lazy(() => import('@components/Text/Text'))
const Modal = lazy(() => import('@components/Modal/Modal'))
const RoundButton = lazy(() => import('@components/RoundButton/RoundButton'))
import LoaderBar from '@components/LoaderBar/LoaderBar'
import Loading from '@components/Loading/Loading'

import { WebApp } from '@utils/settings'
import Message from '@components/Message/Message'
import WebAppButton from '@components/WebAppButton/WebAppButton'

function Home() {
    const token = localStorage.getItem('token')
    const navigate = useNavigate()

    const [triggerGetUser, { data, isLoading, isError, isSuccess, error }] =
        useLazyGetUserQuery()

    useEffect(() => {
        if (token != undefined) {
            console.log(token)
            triggerGetUser(token)
        }
    }, [token])

    useEffect(() => {
        if (isError) {
            console.log(error)
        }
    }, [isError])

    const testKeyExist = useMemo(() => {
        if (!data || !data.keys.length) return false
        console.log(data?.keys)
        return data?.keys.some((k) => k.type == 1)
    }, [data, isSuccess])

    useEffect(() => {
        console.log(data)
        if (data?.role >= 2) {
            console.log('admin')
            WebApp.SettingsButton.show()
            WebApp.SettingsButton.onClick(() => {
                navigate('/admin')
            })
        }
        return () => {
            WebApp.SettingsButton.hide()
            WebApp.SettingsButton.onClick(() => {
                console.log('')
            })
        }
    }, [data])

    if (isLoading) return <Loading />
    if (isError)
        return (
            <Message
                message='Ошибка!'
                description='Время действия токена истекло, попробуйте запросить новый'
            />
        )

    return (
        <Suspense fallback={<Loading />}>
            <FlexContainer>
                <Text subtitle align='center'>
                    Привет, {data?.username}
                </Text>
                {!testKeyExist ? <CreateKey /> : <UpdateKey />}
            </FlexContainer>
        </Suspense>
    )
}
export default Home

function UpdateKey() {
    const token = localStorage.getItem('token')

    function handleUpdateKey(e) {
        console.log(e)
    }

    return (
        <FlexContainer padding='0px' align='center'>
            {/* <Modal isOpen={isOpen} onClose={toggle} noCloseButton>
                <FlexContainer align='center' padding='0px' gap='0px'>
                    <Text align='center' subtitle>
                        Создаем ключ!
                    </Text>
                    <LoaderBar margin='20px' />
                </FlexContainer>
            </Modal>
            <Text align='center'>У тебя еще нет ключей</Text> */}
            <RoundButton onClick={handleUpdateKey} icon={<SiOpenvpn />} />
        </FlexContainer>
    )
}

function CreateKey({}) {
    const token = localStorage.getItem('token')
    const [isOpen, setIsOpen] = useState(false)

    const [
        triggerIssueTestKey,
        { data, isLoading, isError, isSuccess, error },
    ] = useIssueTestVpnKeyMutation()
    function toggle() {
        setIsOpen(!isOpen)
    }

    useEffect(() => {
        if (!isLoading) {
            setIsOpen(false)
        }
    }, [isLoading])

    const [triggerGetUser] = useLazyGetUserQuery()

    function handleClickMainButton() {
        setIsOpen(true)
        triggerIssueTestKey({
            token: token,
        })
        triggerGetUser(token)
    }
    return (
        <FlexContainer padding='0px' align='center'>
            <Modal isOpen={isOpen} onClose={toggle} noCloseButton>
                <FlexContainer align='center' padding='0px' gap='0px'>
                    <Text align='center' subtitle>
                        Создаем ключ!
                    </Text>
                    <LoaderBar margin='20px' />
                </FlexContainer>
            </Modal>
            <Text align='center'>У тебя еще нет ключей</Text>
            <RoundButton onClick={handleClickMainButton} icon={<SiOpenvpn />} />
        </FlexContainer>
    )
}
