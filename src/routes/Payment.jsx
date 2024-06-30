import Loading from '@components/Loading/Loading'
import ProgressBar from '@components/ProgressBar/ProgressBar'
import Separator from '@components/Separator/Separator'
import Text from '@components/Text/Text'
import WebAppButton from '@components/WebAppButton/WebAppButton'
import FlexContainer from '@components/layout/FlexContainer'
import { useGetPaymentStatusQuery } from '@redux/api'
import { PAYMENT_STATUS } from '@utils/PAYMENT_STATUS'
import { oneHourPassed } from '@utils/TIME'
import { ruDays } from '@utils/ruDays'

import { WebApp, color, sizes } from '@utils/settings'
import { message } from 'antd'
import { useCallback, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
const pollingInterval = 30000

function Payment() {
    const location = useLocation()
    const navigate = useNavigate()
    const [period, setPeriod] = useState(0)
    const token = localStorage.getItem('token')

    const {
        data: paymentStatus,
        isLoading,
        isFetching,
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
        WebApp.openLink(location.state.payment.paymentUrl)
    }, [WebApp, location])

    useEffect(() => {
        if (oneHourPassed(location.state.payment.createdAt)) {
            message.error('Ваш платеж истек, создайте новый')
            navigateHome()
        }
        console.log(location.state.payment)
        setPeriod(JSON.stringify(location.state.payment.config.period))
        WebApp.BackButton.show()
        WebApp.BackButton.onClick(navigateHome)
        return () => {
            WebApp.BackButton.offClick(navigateHome)
            WebApp.BackButton.hide()
        }
    }, [location, WebApp])

    useEffect(() => {
        let intervalId

        if (isSuccess && paymentStatus.status === PAYMENT_STATUS.in_progress) {
            intervalId = setInterval(() => {
                refetch()
            }, pollingInterval + 500)
        }

        if (isSuccess && paymentStatus.status === PAYMENT_STATUS.completed) {
            message.info('Оплата прошла успешно!')
            navigateHome()
        }

        return () => {
            if (intervalId) {
                clearInterval(intervalId)
            }
        }
    }, [isSuccess, paymentStatus, refetch])

    if (isLoading || isFetching) return <Loading title="Ищем платеж" />
    return (
        <FlexContainer
            align="center"
            justify="center"
            className="tg-vp-height"
        >
            <FlexContainer backgroundColor={color.background_light}>
                <Text
                    subtitle
                    align="center"
                >
                    Оплата VPN на {period} {ruDays(period)}
                </Text>
                <WebAppButton onClick={handleGoToPayment}>Перейти на страницу оплаты</WebAppButton>

                <ProgressBar ms={pollingInterval} />
                <Text
                    hint
                    align="center"
                >
                    Проверим оплату еще раз через 30 секунд
                </Text>
                <Text
                    hint
                    align="center"
                >
                    Платеж актуален 1 час
                </Text>
                <br />
                <Separator
                    bgColor={color.background_light}
                    text="Статус платежа"
                />
                <Text
                    subtitle
                    align="center"
                >
                    {paymentStatus.status === PAYMENT_STATUS.in_progress ? 'Ожидаем оплаты' : 'Оплачено!'}
                </Text>
            </FlexContainer>
        </FlexContainer>
    )
}

export default Payment
