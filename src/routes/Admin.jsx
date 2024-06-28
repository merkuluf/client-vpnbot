import React, { useEffect, Suspense, useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { WebApp } from '@/utils/settings'

import FlexContainer from '@components/layout/FlexContainer'
import Text from '@components/Text/Text'
import Loading from '@components/Loading/Loading'
import Separator from '@components/Separator/Separator'

const OutlineServersManagement = React.lazy(() => import('@components/Admin/OutlineServersManagement'))
const PlansManagement = React.lazy(() => import('@components/Admin/PlansManagement'))

import '@styles/admin.scss'

function Admin() {
    const navigate = useNavigate()
    function handleGoHome() {
        navigate('/')
    }

    useEffect(() => {
        WebApp.BackButton.show()
        WebApp.BackButton.onClick(handleGoHome)
        return () => {
            WebApp.BackButton.offClick(handleGoHome)
            WebApp.BackButton.hide()
        }
    })

    return (
        <Suspense fallback={<Loading title="Грузим админку" />}>
            <FlexContainer align="center">
                <Text
                    title
                    align="center"
                >
                    Панель управления
                </Text>
                <Separator text="Управление серверами" />
                <OutlineServersManagement />
                <Separator text="Управление планами" />
                <PlansManagement />
            </FlexContainer>
        </Suspense>
    )
}

export default Admin
