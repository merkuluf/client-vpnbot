import Loading from '@components/Loading/Loading'
import ProgressBar from '@components/ProgressBar/ProgressBar'
import Separator from '@components/Separator/Separator'
import Text from '@components/Text/Text'
import WebAppButton from '@components/WebAppButton/WebAppButton'
import FlexContainer from '@components/layout/FlexContainer'
import { useGetPaymentStatusQuery } from '@redux/api'
import { WebApp, color } from '@utils/settings'
import React, { useCallback, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

function Payment() {
    const location = useLocation()
    const navigate = useNavigate()
    const [period, setPeriod] = useState(0)
    const token = localStorage.getItem('token')

    const {
        data: paymentStatus,
        isLoading,
        isError,
        isSuccess,
        refetch,
    } = useGetPaymentStatusQuery({
        token: token,
        paymentId: location.state.payment.id,
    })

    const navigateHome = useCallback(() => {
        navigate('/')
    }, [navigate])

    const handleGoToPayment = useCallback(() => {
        WebApp.openLink(location.state.payment.paymentUrl, {
            // try_instant_view: true,
        })
    }, [WebApp])

    useEffect(() => {
        setPeriod(JSON.stringify(location.state.payment.config.period))
        WebApp.BackButton.show()
        WebApp.BackButton.onClick(navigateHome)
        return () => {
            WebApp.BackButton.offClick(navigateHome)
            WebApp.BackButton.hide()
        }
    }, [location])

    useEffect(() => {
        console.log(paymentStatus)
    }, [paymentStatus])

    if (isLoading) return <Loading title="Ищем платеж" />
    return (
        <FlexContainer>
            <Text
                subtitle
                align="center"
            >
                Платеж успешно создан
            </Text>
            <FlexContainer>
                <Text hint>Проверим оплату через 30 секунд</Text>
                <ProgressBar ms={30000} />
                <Text>Количество дней: {period}</Text>
                <WebAppButton onClick={handleGoToPayment}>Перейти на страницу оплаты</WebAppButton>
                <Separator text="Статус платежа" />
                <Text>{paymentStatus.status}</Text>
            </FlexContainer>
        </FlexContainer>
    )
}

export default Payment
