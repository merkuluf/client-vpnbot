import RoundButton from '@components/RoundButton/RoundButton'
import Text from '@components/Text/Text'
import FlexContainer from '@components/layout/FlexContainer'
import { WebApp } from '@utils/settings'
import React, { useCallback, useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { MdOutlineVpnKey } from 'react-icons/md'
import '@styles/clicker.scss'
import WebAppButton from '@components/WebAppButton/WebAppButton'
import { BackTop, message } from 'antd'
import ProgressBar from '@/components/ProgressBar/ProgressBar'
import { useIssueTestVpnKeyMutation } from '@/redux/api'
import Loading from '@components/Loading/Loading'

const clickerSetting = {
    boostTimeMs: 10000,
    megabyteLimit: 4000,
    x2cost: 5,
    boostCost: 10,
}

function Clicker() {
    const navigate = useNavigate()
    const token = localStorage.getItem('token')
    const [localLoading, setLocalLoading] = useState(false)

    const handleGoHome = useCallback(() => {
        navigate('/')
    }, [navigate])

    const [floatingNumbers, setFloatingNumbers] = useState([])
    const [count, setCount] = useState(0)
    const [clickCost, setClickCost] = useState(1)
    const [isBoost, setIsBoost] = useState(false)
    const [isExtraUsed, setIsExtraUsed] = useState({
        boost: false,
        x2: false,
    })

    const boostTimeoutId = useRef(null)
    const afterBoostDouble = useRef(false)

    const [triggerIssueKey, { data: issuedKey, isLoading, isSuccess, isFetching }] = useIssueTestVpnKeyMutation()
    function handleRecordResult(e) {
        setLocalLoading(true)
        triggerIssueKey({
            token: token,
            limit: count,
        })
    }

    useEffect(() => {
        if (isSuccess) {
            setLocalLoading(true)
            navigate('/', { state: { refetch: true } })
        }
    }, [isSuccess])

    useEffect(() => {
        if (count >= clickerSetting.megabyteLimit) {
            message.info('Вы достигли максимума!')
        }
    }, [count])

    function handleDouble() {
        if (isBoost) {
            afterBoostDouble.current = true
        } else {
            setClickCost((prev) => {
                if (prev == 10) return prev
                return prev * 2
            })
        }
        setIsExtraUsed((prev) => {
            return {
                ...prev,
                x2: true,
            }
        })
    }

    function handleBoost() {
        let localClickCost = clickCost
        setClickCost(10)
        setCount((prev) => {
            if (prev < clickerSetting.boostCost) return prev
            return prev - clickerSetting.boostCost
        })
        setIsBoost(true)
        setIsExtraUsed((prev) => {
            return {
                ...prev,
                boost: true,
            }
        })

        if (boostTimeoutId.current) {
            clearTimeout(boostTimeoutId.current)
        }

        boostTimeoutId.current = setTimeout(() => {
            setClickCost(localClickCost)
            setIsBoost(false)

            if (afterBoostDouble.current) {
                setClickCost((prev) => prev * 2)
                setIsExtraUsed((prev) => {
                    return {
                        ...prev,
                        x2: true,
                    }
                })
                afterBoostDouble.current = false
            }
        }, clickerSetting.boostTimeMs)
    }

    const handleClick = useCallback(
        (e) => {
            if (count >= clickerSetting.megabyteLimit) return
            const newNumber = {
                id: Date.now(),
                x: e.clientX,
                y: e.clientY,
                number: count,
            }

            setFloatingNumbers((prevNumbers) => [...prevNumbers, newNumber])
            setCount((prevCount) => prevCount + clickCost)

            setTimeout(() => {
                setFloatingNumbers((prevNumbers) => prevNumbers.filter((number) => number.id !== newNumber.id))
            }, 1500)
        },
        [count, clickCost]
    )

    useEffect(() => {
        WebApp.BackButton.show()
        WebApp.BackButton.onClick(handleGoHome)

        return () => {
            WebApp.BackButton.hide()
            WebApp.BackButton.offClick(handleGoHome)
        }
    }, [handleGoHome])

    if (isLoading || isFetching || localLoading)
        return (
            <Loading
                title="Выпускаем ключ"
                subtitle="Ищем сервер"
            />
        )

    return (
        <FlexContainer
            className="clicker-parent"
            align="center"
            style={{
                paddingTop: WebApp.viewportHeight / 4,
            }}
        >
            <FlexContainer
                style={{
                    position: 'absolute',
                    top: '0px',
                }}
            >
                <Text
                    subtitle
                    align="center"
                >
                    Накликай бесплатный VPN
                </Text>
                <Text
                    hint
                    align="center"
                >
                    У тебя один шанс!
                </Text>
                {isBoost ? <ProgressBar ms={clickerSetting.boostTimeMs} /> : null}
            </FlexContainer>

            <RoundButton
                onClick={handleClick}
                icon={
                    <MdOutlineVpnKey
                        className="round-button__icon"
                        style={{
                            pointerEvents: 'none',
                            userSelect: 'none',
                        }}
                    />
                }
            />
            {floatingNumbers.map((number) => (
                <div
                    key={number.id}
                    className="floating-number"
                    style={{
                        top: number.y,
                        left: number.x,
                        userSelect: 'none',
                        pointerEvents: 'none',
                    }}
                >
                    +{clickCost}
                </div>
            ))}
            <FlexContainer
                style={{
                    position: 'absolute',
                    bottom: '0px',
                }}
            >
                <FlexContainer
                    vertical={false}
                    padding="0px"
                    style={{
                        zIndex: '100',
                    }}
                >
                    {isExtraUsed.x2 ? null : (
                        <WebAppButton
                            onClick={handleDouble}
                            disabled={count < clickerSetting.x2cost}
                            className="feature-btn"
                        >
                            x2
                            <div className="feature-price">{clickerSetting.x2cost} Mb</div>
                        </WebAppButton>
                    )}
                    {isExtraUsed.boost ? null : (
                        <WebAppButton
                            disabled={count < clickerSetting.boostCost}
                            onClick={handleBoost}
                            className="feature-btn"
                        >
                            boost
                            <div className="feature-price">{clickerSetting.boostCost} Mb</div>
                        </WebAppButton>
                    )}
                </FlexContainer>
                <WebAppButton onClick={handleRecordResult}>Забрать {count} Mb</WebAppButton>
            </FlexContainer>
        </FlexContainer>
    )
}

export default Clicker
