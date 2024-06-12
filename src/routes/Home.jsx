import React, { useEffect, useMemo, useState } from 'react'
import FlexContainer from '../components/layout/FlexContainer'
import Text from '../components/Text/Text'
import WebAppButton from '../components/WebAppButton/WebAppButton'
import { useGetUserQuery } from '../redux/api'
import Modal from '../components/Modal/Modal'

function Home() {
    const token = localStorage.getItem('token')

    const { data, isLoading, isError, error } = useGetUserQuery(token)
    const keysExist = useMemo(() => {
        if (!data || !data.keys.length) return false
        return true
    }, [data])

    useEffect(() => {
        console.log(data)
    }, [data])

    if (isLoading) return

    return (
        <FlexContainer>
            <Text subtitle align='center'>
                Привет, {data?.username}
            </Text>
            {!keysExist ? (
                <CreateKey />
            ) : (
                <FlexContainer padding='0px'>asd</FlexContainer>
            )}
        </FlexContainer>
    )
}
export default Home

function CreateKey() {
    const [isOpen, setIsOpen] = useState(false)
    function toggle() {
        setIsOpen(!isOpen)
    }

    return (
        <FlexContainer padding='0px'>
            <Modal isOpen={isOpen} onClose={toggle}>
                <FlexContainer>
                    <Text align='center' subtitle>
                        Создать ключ
                    </Text>
                </FlexContainer>
            </Modal>
            <Text align='center'>У вас еще нет ключей</Text>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <WebAppButton onClick={toggle}>Создать ключ</WebAppButton>
        </FlexContainer>
    )
}
