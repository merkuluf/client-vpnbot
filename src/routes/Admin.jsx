import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import FlexContainer from '@components/layout/FlexContainer'
import Text from '@components/Text/Text'
import AddOutlineServer from '@components/Admin/AddOutlineServer'
import '@styles/admin.scss'
import { FaRegCircleUser } from 'react-icons/fa6'

import { WebApp, color, sizes } from '../utils/settings'

import Loading from '@components/Loading/Loading'
import { useGetServersQuery } from '@/redux/adminApi'
import WebAppButton from '@components/WebAppButton/WebAppButton'
import WebAppInput from '@components/WebAppInput/WebAppInput'

function Admin() {
    const navigate = useNavigate()
    const token = localStorage.getItem('token')

    const { data, isLoading, error } = useGetServersQuery(token)

    useEffect(() => {
        WebApp.BackButton.show()
        WebApp.BackButton.onClick(() => {
            navigate('/')
        })
        return () => {
            WebApp.BackButton.hide()
        }
    })

    if (isLoading) return <Loading />

    const outlineServersExist = data?.length > 0
    return (
        <FlexContainer align="center">
            <Text
                title
                align="center"
            >
                Панель управления
            </Text>
            <AddOutlineServer />
            {!outlineServersExist
                ? null
                : data?.map((s) => (
                      <OutlineServer
                          key={s.id}
                          server={s}
                      />
                  ))}
        </FlexContainer>
    )
}

export default Admin

function OutlineServer({ server }) {
    console.log(server)
    return (
        <FlexContainer
            className="outline-server"
            backgroundColor={color.background_light}
        >
            <Text>{server.name}</Text>
            <div className="outline-server__users">
                <FaRegCircleUser className="icon" />
                <Text block={false}>{server.usersAmt}</Text>
            </div>
            <FlexContainer
                vertical={false}
                gap="0px"
                padding="0px"
            >
                <WebAppButton danger>Удалить сервер</WebAppButton>
            </FlexContainer>
        </FlexContainer>
    )
}
